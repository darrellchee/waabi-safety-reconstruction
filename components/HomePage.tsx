"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { Header, Footer, CookieConsent } from "./SiteChrome";
import partners from "./home-data.json";
import { insights } from "./insights-data";
import "./home.css";
const media = (name: string) => `/assets/home/${name}`;
function Film({ name, className = "" }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      src={media(name)}
      muted
      loop
      playsInline
      poster={media(`${name}.jpg`)}
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
function MotionCopy({
  children,
  as: Tag = "h2",
}: {
  children: ReactNode;
  as?: "h2" | "p";
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  let index = 0;
  const wrap = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (typeof node === "string")
        return node.split(/(\s+)/).map((word, i) =>
          /\S/.test(word) ? (
            <span
              className="home-motion-word"
              style={{ "--word-delay": `${index++ * 0.07}s` } as CSSProperties}
              key={i}
            >
              {word}
            </span>
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
    <Tag
      ref={ref}
      className={`home-motion-copy ${visible ? "is-revealed" : ""}`}
    >
      {wrap(children)}
    </Tag>
  );
}
const scaleItems = [
  [
    "Safe",
    "The combination of advanced AI and neural simulation sets a new standard for the entire industry.",
    "scene_1_v2_HD_FINAL.mp4",
  ],
  [
    "Scalable",
    "A single, verifiable end-to-end AI model capable of reasoning serves as a shared brain powering multiple verticals.",
    "Scalable.mp4",
  ],
  [
    "Practical",
    "Our highway and surface street capabilities enable an unprecedented Direct to Customer trucking model and seamless entry into the robotaxi market.",
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
    "Experience",
    "Waabi World",
    "intersection-trimmed.mp4",
    "simulator-realism-the-new-safety-standard-for-the-av-industry",
  ],
  [
    "Dive into",
    "Mixed Reality Testing",
    "Crash_variant_1.mp4",
    "mixed-reality-testing-pushes-the-boundaries-of-av-safety",
  ],
  [
    "Meet the",
    "Waabi Driver",
    "Copy_of_Copy_of_Full_Video_-_Solution_Ready_Blog-VEED__1_.mp4",
    "introducing-the-waabi-driver#waabi-driver",
  ],
];
export default function HomePage() {
  const [scale, setScale] = useState(0),
    [partner, setPartner] = useState(0),
    [scaleEntered, setScaleEntered] = useState(false),
    [partnerPaused, setPartnerPaused] = useState(false),
    [partnersVisible, setPartnersVisible] = useState(false);
  const scaleSection = useRef<HTMLElement>(null),
    rail = useRef<HTMLDivElement>(null),
    hero = useRef<HTMLElement>(null),
    road = useRef<HTMLElement>(null),
    careers = useRef<HTMLDivElement>(null),
    partnerSection = useRef<HTMLElement>(null);
  const [careerIndex, setCareerIndex] = useState(0);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
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
      const h = hero.current;
      if (h) {
        const y = -h.getBoundingClientRect().top;
        const shrink = clamp((y - vh) / (vh * 0.5));
        const target = innerWidth >= 768 ? (innerWidth * 133) / 1440 : 133;
        const targetScale = target / Math.min(innerWidth, vh);
        const scale = 1 + (targetScale - 1) * ease(shrink, 0.25, 0.1, 0.25, 1);
        const clip = (Math.max(innerWidth, vh) - Math.min(innerWidth, vh)) / 2;
        h.style.setProperty(
          "--hero-scale",
          String(reduced.matches ? 1 : scale),
        );
        h.style.setProperty(
          "--hero-clip-x",
          `${innerWidth > vh ? clip * ease(shrink, 0.19, 1, 0.22, 1) : 0}px`,
        );
        h.style.setProperty(
          "--hero-clip-y",
          `${innerWidth <= vh ? clip * ease(shrink, 0.19, 1, 0.22, 1) : 0}px`,
        );
        h.style.setProperty(
          "--hero-radius",
          `${(16 * (1 - clamp((scale - 0.95) / 0.05))) / scale}px`,
        );
        h.style.setProperty(
          "--hero-shade",
          String(1 - clamp((shrink - 0.35) / 0.65)),
        );
        h.style.setProperty("--hero-title-y", `${-Math.min(y, vh * 1.5)}px`);
        h.style.setProperty(
          "--hero-title-x",
          `${innerWidth >= 768 ? clamp(y / (vh * 1.85)) * 50 : 0}px`,
        );
        h.style.setProperty(
          "--hero-intro",
          String(
            clamp((y / (vh * 1.5) - 0.1) / 0.1) *
              (1 - clamp((y - vh * 0.875) / (vh * 0.125))),
          ),
        );
        h.style.setProperty("--hero-dot", String(1 - clamp(y / (vh * 0.15))));
        h.classList.toggle("intro-entered", y > vh * 0.225);
      }
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
    const observer = new IntersectionObserver(([entry]) => {
      if (timer) clearInterval(timer);
      if (entry.isIntersecting)
        timer = setInterval(() => {
          if (!document.hidden) setCareerIndex((value) => value + 1);
        }, 2000);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
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
  }, []);
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
        <section ref={hero} className="home-hero-scroll">
          <div className="home-hero">
            <div className="home-hero-film">
              <Film name="WAABI_27s_2K_antinomy_export_250823.mp4" />
              <div className="home-hero-shade" />
            </div>
            <p className="home-hero-intro">
              Waabi is pioneering the future of Physical AI.
            </p>
            <h1>
              <span className="home-title-line">
                {["Built", "to", "think."].map((word, i) => (
                  <span key={word} style={{ animationDelay: `${i * 0.07}s` }}>
                    {word}
                    {i < 2 ? " " : ""}
                  </span>
                ))}
              </span>
              <br />
              <span className="home-title-line">
                {["Born", "to", "haul."].map((word, i) => (
                  <span
                    key={word}
                    style={{ animationDelay: `${0.07 + i * 0.07}s` }}
                  >
                    {word}
                    {i < 2 ? " " : ""}
                  </span>
                ))}
              </span>
            </h1>
            <a
              className="home-scroll-dot"
              href="#our-road"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({
                  top: innerHeight * 1.65,
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
              }}
              aria-label="Discover Waabi"
            />
          </div>
        </section>
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
              <p>We built our own road.</p>
              <p>
                Our revolutionary Physical AI Platform enables—for the first
                time ever—true scale, generalizing to different form factors,
                geographies, and environments. This breakthrough is powered by
                the same AI model acting as a shared brain for both autonomous
                trucks and robotaxis.
              </p>
            </div>
          </div>
        </section>
        <section ref={scaleSection} className="home-scale" id="scale">
          <div
            className={`home-scale-sticky ${scaleEntered ? "is-entered" : ""}`}
          >
            <div className="home-scale-media">
              <img
                className="home-scale-preview"
                src={media("1761183902-waabi_road2_05483.webp")}
                alt="Waabi truck on a highway"
              />
              {scaleItems.map((item, i) => (
                <div
                  key={item[0]}
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
                </div>
              ))}
            </div>
            <div className="home-scale-copy">
              <div className="home-scale-heading">
                <MotionCopy>Unlocking scale in the real world.</MotionCopy>
                <p className="home-sans">
                  We deliver a product that&apos;s faster, safer, more scalable,
                  and efficient—unlocking the true potential of autonomous
                  transportation.
                </p>
              </div>
              <div
                className="home-scale-tabs"
                role="tablist"
                aria-label="Our strengths"
              >
                {scaleItems.map((item, i) => (
                  <div key={item[0]}>
                    <button
                      role="tab"
                      aria-selected={scale === i}
                      aria-controls="home-scale-description"
                      onClick={() => setScale(i)}
                    >
                      {item[0]}
                    </button>
                    {scale === i && (
                      <p
                        id="home-scale-description"
                        role="tabpanel"
                        className="home-sans"
                      >
                        {item[1]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="home-tech">
          <div className="home-tech-hero">
            <img
              src={media("1756426717-waabi_road1_00928.webp")}
              alt="Waabi autonomous truck"
            />
            <div className="home-cover-shade" />
            <div>
              <MotionCopy>The technology behind Waabi.</MotionCopy>
              <a className="home-pill" href="https://waabi.ai/insights">
                Explore the tech
              </a>
            </div>
          </div>
          <div className="home-tech-cards">
            {technology.map((item) => (
              <a
                key={item[1]}
                href={`https://waabi.ai/insights/${item[3]}`}
                aria-label={`Explore ${item[1]}`}
              >
                <Film name={item[2]} />
                <div className="home-cover-shade" />
                <div>
                  <p>{item[0]}</p>
                  <h3>{item[1]}</h3>
                </div>
                <span className="home-card-plus">↗</span>
              </a>
            ))}
          </div>
        </section>
        <section className="home-safety">
          <img
            src={media("1761185044-waabi_road2_05683.webp")}
            alt="Waabi truck driving safely on a highway"
          />
          <div className="home-cover-shade" />
          <div>
            <MotionCopy>
              Setting new
              <br />
              standards for
              <br />
              AV safety.
            </MotionCopy>
            <MotionCopy as="p">
              For us, safety isn&apos;t a box to check—it&apos;s a commitment we{" "}
              <strong>strengthen daily with</strong> a simulation-first
              approach, rigorous validation, and a culture where safety is
              everyone&apos;s job.
            </MotionCopy>
            <a className="home-pill" href="/safety">
              Explore our approach
            </a>
          </div>
        </section>
        <section
          ref={partnerSection}
          className={`home-partners ${partnerPaused || !partnersVisible ? "is-paused" : ""}`}
          onMouseEnter={() => setPartnerPaused(true)}
          onMouseLeave={() => setPartnerPaused(false)}
          onFocusCapture={() => setPartnerPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setPartnerPaused(false);
          }}
        >
          <div className="home-partners-intro">
            <MotionCopy>
              <span>Trusted by</span> <span>the best in</span>{" "}
              <span>the industry.</span>
            </MotionCopy>
            <p>
              From hardware providers and OEMs to retailers, logistics providers
              and carriers, the best in the business count on Waabi to deliver
              real results.
            </p>
          </div>
          <div className="home-partner-stage">
            <img
              className="home-partner-photo"
              src={media(current.image)}
              alt={`${current.name} and Waabi partnership`}
            />
            <div className="home-partner-card">
              <div
                className="home-partner-tabs"
                role="tablist"
                aria-label="Partners"
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
              <blockquote id="home-partner-quote" role="tabpanel" key={partner}>
                {current.review.split(/(\s+)/).map((word, index) =>
                  /\S/.test(word) ? (
                    <span
                      className="home-quote-word"
                      key={`${partner}-${index}`}
                      style={{
                        animationDelay: `${0.4 + Math.floor(index / 2) * 0.03}s`,
                      }}
                    >
                      {word}
                    </span>
                  ) : (
                    word
                  ),
                )}
              </blockquote>
              <p className="home-partner-author" key={`author-${partner}`}>
                {current.author}
                <br />
                <span>{current.authorTitle}</span>
              </p>
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
                  <img src={media(current.logo)} alt={current.name} />
                </div>
                {current.slug && (
                  <a
                    className="home-pill"
                    href={`https://waabi.ai/insights/${current.slug}`}
                  >
                    See the details
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="home-insights">
          <div className="home-insights-top">
            <MotionCopy>Insights.</MotionCopy>
            <div>
              <p>
                Explore technology deep dives, behind-the-scenes perspectives,
                and the ideas shaping the future of autonomy.
              </p>
              <div className="home-insights-controls">
                <a className="home-pill" href="https://waabi.ai/insights">
                  View all
                </a>
                <button
                  aria-label="Previous insights"
                  onClick={() => moveInsights(-1)}
                >
                  ←
                </button>
                <button
                  aria-label="Next insights"
                  onClick={() => moveInsights(1)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="home-insights-rail" ref={rail}>
            {insights.map(([image, date, title, slug], i) => (
              <a
                key={slug}
                className="home-insight-card"
                href={`https://waabi.ai/insights/${slug}`}
              >
                <div className="home-insight-image">
                  <img src={`/assets/${image}`} alt="" />
                </div>
                <div className="home-insight-meta">
                  <div className="home-insight-tags">
                    {i !== 4 && (
                      <span>{i === 5 ? "Research" : "Company news"}</span>
                    )}
                    {i === 0 && <span>Trucks</span>}
                  </div>
                  <p className="home-insight-date">{date}</p>
                </div>
                <h3>{title}</h3>
              </a>
            ))}
          </div>
        </section>
        <section className="home-careers">
          <MotionCopy>Build Physical AI with us.</MotionCopy>
          <a className="home-pill" href="https://waabi.ai/careers">
            Join the team
          </a>
          <div className="home-careers-collage" ref={careers}>
            {[
              "1760350326-waabi_portrait_felicia_00336_final.webp",
              "1760350326-waabi_scout_00761_final.webp",
              "1761184004-251006_waabi_collab_05_1012_a.webp",
              "1760350326-waabi_inspection_02613_final.webp",
              "1760350326-waabi_portrait_felicia_00336_final.webp",
              "1760350326-waabi_scout_00761_final.webp",
            ].map((name, i) =>
              (i - (careerIndex % 6) + 6) % 6 < 4 ? (
                <img
                  src={media(name)}
                  key={`${name}-${i}`}
                  style={
                    {
                      "--career-slot": (i - (careerIndex % 6) + 6) % 6,
                    } as CSSProperties
                  }
                  data-slot={(i - (careerIndex % 6) + 6) % 6}
                  data-entering={
                    careerIndex > 0 && (i - (careerIndex % 6) + 6) % 6 === 3
                  }
                  alt={
                    [
                      "A Waabi team member",
                      "Waabi trucks on the road",
                      "The Waabi team collaborating",
                      "A team member inspecting a Waabi truck",
                    ][i % 4]
                  }
                />
              ) : null,
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
