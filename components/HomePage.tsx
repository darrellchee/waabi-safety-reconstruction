"use client";
import {
  useEffect,
  forwardRef,
  useRef,
  useState,
  type CSSProperties,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { Header, Footer } from "./SiteChrome";
import Film from "./Film";
import HomeHero from "./HomeHero";
import AppLink from "./AppLink";
import partners from "./home-data.json";
import { insights } from "./insights-data";
import { useCarouselMotion } from "./useCarouselMotion";
import "./home.css";
import { motion, AnimatePresence, useIsPresent } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
const MotionLink = motion.create(AppLink);
const sourceEase = [0.19, 1, 0.22, 1] as const;
const careerTransition = { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const };
const media = (name: string) => `/assets/home/${name}`;

const PartnerQuote = forwardRef<HTMLQuoteElement, { children: ReactNode }>(function PartnerQuote({ children }, ref) {
  const present = useIsPresent();
  return <motion.blockquote ref={ref} layout initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: .4, ease: sourceEase, delay: .4 } }}
    exit={{ opacity: 0 }} id={present ? "home-partner-quote" : undefined}
    role="tabpanel" aria-hidden={!present}>{children}</motion.blockquote>;
});

function MotionCopy({
  children,
  as: Tag = "h2",
}: {
  children: ReactNode;
  as?: "h2" | "p";
}) {
  const reduced = useReducedMotion();
  let index = 0;
  const wrap = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (typeof node === "string")
        return node.split(/(\s+)/).map((word, i) =>
          /\S/.test(word) ? (
            <motion.span
              className="home-motion-word"
              initial={reduced ? false : Tag === "p" ? {opacity:.1} : {opacity:0,x:20}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true}}
              transition={{duration:Tag === "p" ? .1 : .4,ease:Tag === "p" ? "linear" : sourceEase,delay:index++ * .07}}
              key={i}
            >
              {word}
            </motion.span>
          ) : (
            word
          ),
        );
      if (isValidElement(node) && node.type !== "br") {
        const element = node as ReactElement<{ children?: ReactNode }>;
        return cloneElement(element, undefined, wrap(element.props.children));
      }
      return node;
    });
  return (
    <Tag className="home-motion-copy is-revealed motion-native-copy">
      {wrap(children)}
    </Tag>
  );
}
const scaleItems = [
  [
    "Purchased",
    "Purchased materials: reinforced concrete piles and structure, watertight concrete, corrugated roofing, shelving and counter, solar panel and battery, 2 recovery kits, 2 PLBs, 2 UHF radios.",
    "scene_1_v2_HD_FINAL.mp4",
  ],
  [
    "Other",
    "Other materials: drinking water (240 L), canned food (120 cans), firewood (8 bags of 20 kg), safety flyers.",
    "Scalable.mp4",
  ],
  [
    "Total",
    "Estimated total cost: about $87,400 AUD, including a 20% contingency. Running cost is about $3,950 AUD a year in the base case.",
    "scene_3_v5_HD_FINAL-small.mp4",
  ],
];
const collage = [
  "1760006286-kevin-wang-1gwy7no_nr4-unsplash_edited_final.webp",
  "1761183718-waabi_road1_01902.webp",
  "1761183902-waabi_exterior_morning_00857.webp",
  "1761183903-waabi_road2_04462.webp",
  "1761184004-251006_waabi_val_fakhrutdinova_0214.webp",
  "1761183902-waabi_road2_05483.webp",
  "1761183903-waabi_scout_00826.webp",
  "1760006943-waabi_scout_00286_final.webp",
  "1761184004-251006_waabi_ashwin_kumar_0866.webp",
  "1761183902-waabi_portrait_neiel_00646.webp",
  "1761184005-251006_waabi_lunch_room_0489.webp",
  "1761183980-waabi_inspection_02285.webp",
];
const technology = [
  [
    "Planned floor height above the ground (to be confirmed)",
    "2 m",
    "intersection-trimmed.mp4",
    "/safety",
  ],
  [
    "Open season, July to November",
    "22 weeks",
    "Crash_variant_1.mp4",
    "/company",
  ],
  [
    "Visitors a year in the base case",
    "220",
    "Copy_of_Copy_of_Full_Video_-_Solution_Ready_Blog-VEED__1_.mp4",
    "/careers",
  ],
];
export default function HomePage() {
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const query = matchMedia("(min-width:768px)");
    const update = () => setDesktop(query.matches);
    update(); query.addEventListener("change",update);
    return () => query.removeEventListener("change",update);
  }, []);
  const [scale, setScale] = useState(0),
    [partner, setPartner] = useState(0),
    [scaleEntered, setScaleEntered] = useState(false),
    [partnerPaused, setPartnerPaused] = useState(false),
    [partnersVisible, setPartnersVisible] = useState(false);
  const scaleSection = useRef<HTMLElement>(null),
    rail = useRef<HTMLDivElement>(null),
    partnerTabs = useRef<HTMLDivElement>(null),
    road = useRef<HTMLElement>(null),
    careers = useRef<HTMLDivElement>(null),
    partnerSection = useRef<HTMLElement>(null);
  useCarouselMotion(rail);
  useCarouselMotion(partnerTabs);
  const [careerIndex, setCareerIndex] = useState(0);
  useEffect(() => {
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    // Solve the same cubic Bezier used by the source's useTransform easing.
    const ease = (
      progress: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const value = (t: number, a: number, b: number) =>
        3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t * t * t;
      let lo = 0,
        hi = 1;
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        if (value(mid, x1, x2) < clamp(progress)) lo = mid;
        else hi = mid;
      }
      return value((lo + hi) / 2, y1, y2);
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = innerHeight;
      const r = road.current;
      if (r) {
        const top = r.getBoundingClientRect().top;
        const progress = clamp((vh - top) / (vh + r.offsetHeight));
        r.style.setProperty("--road-outer-y", `${600 - 1200 * progress}px`);
        const textProgress = clamp(
          (vh - top - r.offsetHeight * 0.5) / (r.offsetHeight * 0.5),
        );
        r.style.setProperty(
          "--road-copy-y",
          `${innerWidth >= 768 ? -200 + 400 * textProgress : 0}px`,
        );
      }
      const section = scaleSection.current;
      if (section && innerWidth >= 768) {
        const top = section.getBoundingClientRect().top;
        // Native source trigger: sticky benefits list start center → end end,
        // with visibility crossing .5, equivalent to section top = -25vh.
        setScaleEntered(top < -vh * 0.25);
        section.style.setProperty(
          "--strength-heading-y",
          `${Math.max(-vh, Math.min(0, top))}px`,
        );
        section.style.setProperty(
          "--strength-tabs-y",
          `${Math.max(0, vh * 0.5 + top)}px`,
        );
        const stackProgress = clamp((-top - vh * 0.5) / (vh * 0.5));
        section.style.setProperty(
          "--strength-stack-y",
          `${-50 * stackProgress}px`,
        );
        section.style.setProperty(
          "--strength-stack-scale",
          String(1 - 0.1 * stackProgress),
        );
        const intro = clamp((vh * 0.75 - top) / (vh * 0.75));
        const eased = ease(intro, 0.645, 0.045, 0.355, 1);
        const image = section.querySelector<HTMLElement>(".home-scale-media");
        if (image) {
          const size = image.offsetWidth;
          const target = (innerWidth * 133) / 1440;
          const finalScale = target / size;
          const x =
            innerWidth / 6 +
            target / 2 -
            (image.offsetLeft +
              (innerWidth >= 1600
                ? innerWidth / 2 - 543
                : innerWidth * 0.1389) +
              size / 2);
          const y = (-innerWidth * 133) / 1440 - (vh - size) / 2;
          image.style.setProperty(
            "--strength-scale",
            String(finalScale + (1 - finalScale) * eased),
          );
          image.style.setProperty("--strength-x", `${x * (1 - eased)}px`);
          image.style.setProperty("--strength-y", `${y * (1 - eased)}px`);
        }
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    update();
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const node = careers.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let inView = false;
    const refresh = () => {
      if (timer) clearInterval(timer);
      if (inView && !document.hidden)
        timer = setInterval(() => setCareerIndex((value) => value + 1), 2000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      if (timer) clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    const section = scaleSection.current;
    if (
      !section ||
      innerWidth >= 768 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timer) clearInterval(timer);
        if (entry.isIntersecting)
          timer = setInterval(() => setScale((value) => (value + 1) % 3), 5000);
      },
      { threshold: 0.5 },
    );
    observer.observe(section.querySelector(".home-scale-media") || section);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [scale, desktop]);
  useEffect(() => {
    if (
      !partnersVisible ||
      innerWidth < 768 ||
      partnerPaused ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setInterval(
      () => setPartner((value) => (value + 1) % partners.length),
      10000,
    );
    return () => clearInterval(timer);
  }, [partner, partnerPaused, partnersVisible]);
  useEffect(() => {
    const node = partnerSection.current;
    const observer = new IntersectionObserver(([entry]) =>
      setPartnersVisible(entry.isIntersecting),
    );
    if (node)
      observer.observe(node.querySelector(".home-partner-card") || node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll(
      ".home-tech-cards > a,.home-insight-card",
    );
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }),
    );
    nodes.forEach((node, index) => {
      node.classList.add("home-clip-reveal");
      (node as HTMLElement).style.setProperty(
        "--clip-delay",
        `${(index % 3) * 0.15}s`,
      );
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  const current = partners[partner];
  const moveInsights = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>(".home-insight-card");
    const step =
      (card?.offsetWidth || 450) +
      parseFloat(getComputedStyle(element).gap || "24");
    element.scrollBy({
      left: direction * step,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <>
      <Header />
      <main className="home-page">
        <HomeHero />
        <section id="our-road" ref={road} className="home-road">
          <div className="home-road-sticky">
            <div className="home-collage">
              {collage.map((name, i) => (
                <img
                  key={name}
                  src={media(name)}
                  alt=""
                  className={`home-tile home-tile-${i}`}
                />
              ))}
              {[
                "Scenario_3_4k_FINAL.mp4",
                "Sim_demo_scenario_4_slow_camera-SUDDEN_BRAKE_FINAL.mp4",
                "Sim_construction_camera_slow_trimmed_w_actors_FINAL.mp4",
                "Scenario_1_4k_FINAL.mp4",
              ].map((name, i) => (
                <div key={name} className={`home-tile home-tile-${i + 12}`}>
                  <Film name={name} />
                </div>
              ))}
            </div>
            <img
              className="home-road-center-tile"
              src={media("1761218404-waabi_inspection_02344.webp")}
              alt=""
            />
            <div className="home-road-copy">
              <p>EWB Challenge 2026 | Design Opportunity 2.1</p>
              <p>
                The project aims to give visitors to Warokutal (Safari Camp)
                access to water, supplies and vehicle recovery equipment when
                floods damage the roads. It proposes an elevated, low-maintenance
                shelter that stocks essentials and hires out recovery kits,
                personal locator beacons (PLBs) and ultra high frequency (UHF)
                radios.
              </p>
            </div>
          </div>
        </section>
        <section ref={scaleSection} className="home-scale" id="scale">
          <div
            className={`home-scale-sticky ${scaleEntered ? "is-entered" : ""}`}
          >
            <div className="home-scale-media">
              <motion.div className="home-preview-visibility" animate={{opacity:scaleEntered && desktop ? 0 : 1,scale:scaleEntered && desktop ? .6 : 1}}>
              <img
                className="home-scale-preview"
                src={media("1761183902-waabi_road2_05483.webp")}
                alt="Concept image: a shelf holding water containers, tins with blank labels and bagged firewood."
              />
              </motion.div>
              {scaleItems.map((item, i) => (
                <motion.div
                  key={item[0]}
                  initial={false}
                  animate={!desktop ? {y:0,scale:1,opacity:i === scale ? 1 : 0} : reducedMotion ? { y: 0, scale: 1, opacity: i === scale ? 1 : 0 } : { opacity:1, y: !scaleEntered || i > scale ? "100vh" : `${-3 * (scale - i)}vh`, scale: i === scale ? 1 : 1 - .05 * (scale - i) }}
                  transition={{ duration: 1, ease: sourceEase, delay: scaleEntered ? .07 * i : .07 * (scale - i) - .07 }}
                  className={
                    i === scale ? "is-active" : i < scale ? "is-stacked" : ""
                  }
                  style={
                    {
                      "--stack-index": i,
                      "--stack-offset": scale - i,
                    } as CSSProperties
                  }
                >
                  <Film name={item[2]} />
                  <motion.div className="home-strength-shade" animate={{ opacity: i === scale ? 0 : 1 }} />
                </motion.div>
              ))}
            </div>
            <div className="home-scale-copy">
              <div className="home-scale-heading">
                <MotionCopy>Overview of design</MotionCopy>
                <p className="home-sans">
                  Provisions Point would improve visitor safety by raising a
                  small supply shelter above the ground and filling it with
                  what a stranded visitor needs.
                </p>
              </div>
              <div
                className="home-scale-tabs"
                role="tablist"
                aria-label="Materials and cost summary"
              >
                {scaleItems.map((item, i) => (
                  <motion.div layout key={item[0]} data-active={scale===i} initial={{opacity:.3}} animate={{opacity:scale === i ? 1 : .46}}>
                    <motion.button layout
                      role="tab"
                      aria-selected={scale === i}
                      aria-controls="home-scale-description"
                      onClick={() => setScale(i)}
                    >
                      {item[0]}
                    </motion.button>
                    {scale === i && (
                      <motion.p layout initial={{opacity:0}} animate={{opacity:1}}
                        id="home-scale-description"
                        role="tabpanel"
                        className="home-sans"
                      >
                        {item[1]}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
                <div className="home-mobile-strength-controls">
                  <div className="home-mobile-strength-track"><motion.div key={scale} initial={{x:"-100%"}} animate={{x:"0%"}} transition={{duration:reducedMotion ? 0 : 5,ease:"easeInOut"}} /></div>
                  <div className="home-mobile-strength-arrows"><motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} aria-label="Previous summary item" onClick={() => setScale(value=>(value+2)%3)}>←</motion.button><motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} aria-label="Next summary item" onClick={() => setScale(value=>(value+1)%3)}>→</motion.button></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="home-tech">
          <div className="home-tech-hero">
            <img
              src={media("1756426717-waabi_road1_00928.webp")}
              alt="Concept image: the raised shelter on concrete piles with brown floodwater around the piles under storm clouds."
            />
            <div className="home-cover-shade" />
            <div>
              <MotionCopy>Key numbers</MotionCopy>
              <motion.a whileHover={{scale:1.05}} whileTap={{scale:.95}} className="home-pill" href="/company">
                Read the background
              </motion.a>
            </div>
          </div>
          <div className="home-tech-cards">
            {technology.map((item) => (
              <a
                key={item[1]}
                href={item[3]}
                aria-label={`${item[1]}: ${item[0]}`}
              >
                <Film name={item[2]} />
                <div className="home-cover-shade" />
                <div>
                  <p>{item[0]}</p>
                  <h3>{item[1]}</h3>
                </div>
                <motion.span whileHover={{scale:1.05}} whileTap={{scale:.95}} className="home-card-plus" aria-hidden="true">→</motion.span>
              </a>
            ))}
          </div>
        </section>
        <section className="home-safety">
          <img
            src={media("1761185044-waabi_road2_05683.webp")}
            alt="Concept image: a red dirt road with floodwater across it and a 4WD stopped at the edge."
          />
          <div className="home-cover-shade" />
          <div>
            <MotionCopy>
              Why this
              <br />
              project
              <br />
              matters
            </MotionCopy>
            <MotionCopy as="p">
              Visitors to Warokutal need dependable access to water, supplies,
              recovery equipment and safety information when roads are damaged
              and help is far away.
            </MotionCopy>
            <MotionLink whileHover={{scale:1.05}} whileTap={{scale:.95}} className="home-pill" href="/safety">
              See the solution
            </MotionLink>
          </div>
        </section>
        <section
          ref={partnerSection}
          className={`home-partners ${partnerPaused || !partnersVisible ? "is-paused" : ""}`}
          onFocusCapture={() => setPartnerPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setPartnerPaused(false);
          }}
        >
          <div className="home-partners-intro">
            <MotionCopy>
              <span>Acknowledgement</span> <span>of Country</span>
            </MotionCopy>
            <p>
              We acknowledge the Gadigal people, the Boorooberongal people of
              the Dharug Nation, the Bidiagal people and the Gamaygal people,
              upon whose ancestral lands our university stands. We also
              acknowledge the Lama Lama people, the Traditional Owners of the
              Country this project is about. We pay respect to Elders past and
              present, as the traditional custodians of knowledge for these
              lands. This is a student proposal. It is for the Yintjingga
              Aboriginal Corporation to accept, change or reject. TEAM TO ADD:
              confirm this wording against the current UTS Acknowledgement of
              Country.
            </p>
          </div>
          <div className="home-partner-stage">
            <AnimatePresence initial={false}>
              <motion.img key={current.image} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.4,ease:sourceEase}} className="home-partner-photo" src={media(current.image)} alt="Placeholder image, to be replaced with a concept image of the shelter at Warokutal." />
            </AnimatePresence>
            <motion.div layout className="home-partner-card">
              <div
                className="home-partner-tabs"
                ref={partnerTabs}
                role="tablist"
                aria-label="Project details"
              >
                {partners.map((p, i) => (
                  <button
                    role="tab"
                    aria-controls="home-partner-quote"
                    aria-selected={i === partner}
                    key={p.name}
                    onClick={() => setPartner(i)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="popLayout">
              <PartnerQuote key={partner}>
                {current.review.split(/(\s+)/).map((word, index) =>
                  /\S/.test(word) ? (
                    <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.1,ease:"linear",delay:Math.floor(index/2)*.03}}
                      className="home-quote-word"
                      key={`${partner}-${index}`}

                    >
                      {word}
                    </motion.span>
                  ) : (
                    word
                  ),
                )}
              </PartnerQuote>
              <motion.p layout initial={{opacity:0}} animate={{opacity:1,transition:{duration:.4,ease:sourceEase,delay:1}}} exit={{opacity:0}} className="home-partner-author" key={`author-${partner}`}>
                <motion.span initial={{opacity:0,x:10}} animate={{opacity:1,x:0,transition:{duration:.4,ease:sourceEase,delay:1}}}>{current.author}</motion.span>
                <br />
                <motion.span initial={{opacity:0,x:10}} animate={{opacity:1,x:0,transition:{duration:.4,ease:sourceEase,delay:1.1}}}>{current.authorTitle}</motion.span>
              </motion.p>
              </AnimatePresence>
              <div className="home-partner-bottom">
                <div className="home-partner-mark" key={partner}>
                  <svg viewBox="0 0 82 82" aria-hidden="true">
                    <circle cx="41" cy="41" r="40" />
                    <circle
                      className="home-partner-progress"
                      cx="41"
                      cy="41"
                      r="40"
                    />
                  </svg>
                  <img src={media(current.logo)} alt={`Plain text tile naming ${["Lama Lama Rangers","Engineers Without Borders Australia","University of Technology Sydney","Yintjingga Aboriginal Corporation"][partner % 4]}.`} />
                </div>
                {current.slug && (
                  <motion.a whileHover={{scale:1.05}} whileTap={{scale:.95}}
                    className="home-pill"
                    href={current.slug}
                  >
                    {current.button?.label}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        <section className="home-insights">
          <div className="home-insights-top">
            <MotionCopy>Project stages.</MotionCopy>
            <div>
              <p>
                Next steps: co-design with YAC, a site survey, engineering
                design, and checks on beacon hire rules and radio coverage.
              </p>
              <div className="home-insights-controls">
                <motion.a whileHover={{scale:1.05}} whileTap={{scale:.95}} className="home-pill" href="/careers">
                  See the plan
                </motion.a>
                <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}}
                  aria-label="Previous project stages"
                  onClick={() => moveInsights(-1)}
                >
                  ←
                </motion.button>
                <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}}
                  aria-label="Next project stages"
                  onClick={() => moveInsights(1)}
                >
                  →
                </motion.button>
              </div>
            </div>
          </div>
          <div className="home-insights-rail" ref={rail}>
            {insights.map(([image, date, title, slug], i) => (
              <a
                key={slug}
                className="home-insight-card"
                href="/careers"
              >
                <div className="home-insight-image">
                  <img src={`/assets/${image}`} alt="" />
                </div>
                <div className="home-insight-meta">
                  <div className="home-insight-tags">
                    {i !== 4 && (
                      <span>Project stage</span>
                    )}
                    {i === 0 && <span>Project stage</span>}
                  </div>
                  <p className="home-insight-date">{date}</p>
                </div>
                <h3>{title}</h3>
              </a>
            ))}
          </div>
        </section>
        <section className="home-careers">
          <MotionCopy>Built with Lama Lama Country in mind</MotionCopy>
          <MotionLink whileHover={{scale:1.05}} whileTap={{scale:.95}} className="home-pill" href="/careers">
            View the plan
          </MotionLink>
          <div className="home-careers-collage" ref={careers}>
            <AnimatePresence initial={false}>
              {[
                "1760350326-waabi_portrait_felicia_00336_final.webp",
                "1760350326-waabi_scout_00761_final.webp",
                "1761184004-251006_waabi_collab_05_1012_a.webp",
                "1760350326-waabi_inspection_02613_final.webp",
                "1760350326-waabi_portrait_felicia_00336_final.webp",
                "1760350326-waabi_scout_00761_final.webp",
              ].map((name, i) => {
                const slot = (i - (careerIndex % 6) + 6) % 6;
                return slot < 4 ? <motion.div layout key={i} data-slot={slot} className="home-career-frame" exit={{zIndex:0}} transition={reducedMotion ? {duration:0} : {layout:careerTransition,...careerTransition,zIndex:{duration:0}}}>
                  <motion.div layout initial={{x:"100%"}} animate={{x:"0%"}} exit={{scale:.5,x:20}} transition={reducedMotion ? {duration:0} : careerTransition} className="home-career-window" style={{borderRadius:12}}>
                    <motion.div layout initial={{scale:1.5}} animate={{scale:1}} transition={reducedMotion ? {duration:0} : careerTransition} className="home-career-crop">
                      <img src={media(name)} alt={["Placeholder image, to be replaced with a concept image of the shelter at Warokutal.","Placeholder image, to be replaced with a concept image of the shelter at Warokutal.","Placeholder image, to be replaced with a concept image of the shelter at Warokutal.","Placeholder image, to be replaced with a concept image of the shelter at Warokutal."][i%4]} />
                    </motion.div>
                  </motion.div>
                </motion.div> : null;
              })}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
