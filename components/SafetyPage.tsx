"use client";
import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useInView, useMotionValue, useMotionValueEvent, usePresenceData, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
import { Header, Footer } from "./SiteChrome";
import { useCarouselMotion } from "./useCarouselMotion";
import { insights } from "./insights-data";
const A = "/assets/";
const rows = (...items: string[]) => (
  <>{items.map((item, i) => <Fragment key={i}>{i > 0 && <br />}{item}</Fragment>)}</>
);
const philosophy = [
  {
    title: "Option A: Provisions Point",
    text: "A raised supply and equipment-hire shelter at Warokutal. It stocks water, food, firewood and safety information, and hires out recovery kits, personal locator beacons (PLBs) and ultra high frequency (UHF) radios. TEAM TO ADD: source for this type of remote supply point.",
    image: "1761185044-assignment_road2_05683.webp",
  },
  {
    title: "Option B: Distributed emergency checkpoints",
    text: "Several small emergency points placed along the access route, each holding basic supplies and a radio. TEAM TO ADD: source for roadside emergency points, and confirm this description.",
    image: "1761183960-assignment_inspection_02285.webp",
  },
  {
    title: "Option C: Elevated tent-site platform",
    text: "Raised camping platforms that keep campers above floodwater. TEAM TO ADD: source for elevated camp platforms, and confirm this description.",
    image: "1760350326-shutterstock_1058062604_edited_final.webp",
  },
];
const technology = [
  {
    title: "Ideas A and B",
    image: "1761183903-assignment_road2_04462.webp",
    text: rows(
      "Weights are in brackets.",
      "Idea: A Provisions Point. Culture and Country (3): 5. Low cost (4): 3. Visitor support (5): 4. Feasibility (5): 3. Safety and access (4): 5. Community fit (4): 4. Flood resilience (5): 3. Revenue (3): 5. Total: 128. Rank: 1.",
      "Idea: B Distributed checkpoints. Culture and Country (3): 4. Low cost (4): 3. Visitor support (5): 3. Feasibility (5): 3. Safety and access (4): 4. Community fit (4): 4. Flood resilience (5): 3. Revenue (3): 1. Total: 104. Rank: 2.",
    ),
  },
  {
    title: "Idea C and the beacon",
    image: "1761947979-screenshot-2025-10-31-at-2-59-29-pm.webp",
    text: rows(
      "Idea: C Tent-site platform. Culture and Country (3): 3. Low cost (4): 4. Visitor support (5): 2. Feasibility (5): 2. Safety and access (4): 3. Community fit (4): 3. Flood resilience (5): 4. Revenue (3): 2. Total: 95. Rank: 3.",
      "Idea: Screened out, crossing beacon. Culture and Country (3): 3. Low cost (4): 4. Visitor support (5): 1. Feasibility (5): 3. Safety and access (4): 4. Community fit (4): 3. Flood resilience (5): 3. Revenue (3): 1. Total: 91. Rank: 4.",
    ),
  },
  {
    title: "Reading the scores",
    image: "1762294277-screenshot-2025-11-04-at-2-11-01-pm.webp",
    text: rows(
      "Option A scores 5 for culture, safety and revenue and 3 for low cost, feasibility and flood resilience. It scores 3 for flood resilience until the 2 m floor height is checked against flood data.",
      "Option B scores 3 for visitor support and 1 for revenue.",
      "Option C scores 4 for flood resilience, the highest of the four, and 2 for visitor support and feasibility.",
      "TEAM TO ADD: confirm the reasons for each rating.",
      "Decision: The team will develop Option A, Provisions Point, in detail.",
    ),
  },
];
const technologyLinks = ["/company", "/company", "/careers"];
const practices = [
  {
    title: "What it is",
    image: "1761183902-assignment_road2_04965.webp",
    text: "A 24 square metre shelter at Warokutal, planned for ground that is already cleared and above flood level. A site survey must confirm this. It would stand on reinforced concrete piles (Menard Asia, 2025), with the floor planned 2 m above the ground. Walls would be watertight concrete (Leading Architecture, 2024) and the roof corrugated sheeting (material to be confirmed). Inside would be shelves, a counter, a solar panel and a battery. The shelter is unstaffed. Visitors serve themselves and pay by the method YAC sets.",
  },
  {
    title: "Entry, stock and hire items",
    image: "1761183937-assignment_garageinterior_03851.webp",
    text: rows(
      "Entry: TEAM TO ADD: confirm the entry type (stairs or ramp) so it matches the prototype.",
      "Stock: drinking water, non-perishable food, firewood and safety information.",
      "Hire items: traction boards for soft ground, a tyre deflation kit (Supercheap Auto, 2017), a 12 V compressor, and shackles with a recovery strap (Bober, 2025). Each kit also holds a personal locator beacon (PLB) and an ultra high frequency (UHF) radio. YAC sets the check-out and payment method. One option is a lockable kit cage with a code given at booking.",
    ),
  },
  {
    title: "How a visitor would use it",
    image: "1761183980-assignment_road1_01029.webp",
    text: rows(
      "1. Check road conditions on the Cook Shire Council website before travel (Cook Shire Council, 2026).",
      "2. Arrive at Warokutal and read the safety information at the shelter.",
      "3. Buy water, food or firewood, or hire a recovery kit if the vehicle is stuck.",
      "4. In a life-threatening emergency, use the PLB. If radio coverage is confirmed, the UHF radio can reach the Rangers. Then return the kit.",
    ),
  },
  {
    title: "Community concerns",
    image: "1760350326-assignment_laptop_03392_final.webp",
    text: "Ground disturbance. The design uses a small number of drilled piles on cleared ground, not trench footings. No piles are drilled until Traditional Owners and heritage checks agree. Ranger workload. The routine would be one weekly restock in the open season and two inspections a year. Visitor numbers. The stock and kits suit small groups. The design is not for mass tourism. Theft or damage. The team proposes a lockable, raised building for the stock and kits. Fire and waste. Bagged firewood would be sold, and the team will check park rules with YAC and QPWS. A waste plan would be agreed with YAC. Cost. A grant would pay for the build. Sales and hire fees would pay for running costs.",
  },
];
const ease = [.19, 1, .22, 1] as const;
const spring = { type: "spring", stiffness: 140, damping: 22 } as const;
const revealVariants = {
  hidden: (index: number) => ({ y: 200 * (index + 1) }),
  visible: { y: 0, transition: { y: { type: "spring" as const, stiffness: 80, damping: 20 } } },
};
function SafetyTitle({ lines, mobileJoinLast = false }: { lines: string[]; mobileJoinLast?: boolean }) {
  const reduced = useReducedMotion();
  return <>{lines.map((line, lineIndex) => <Fragment key={line}>
    {line.split(" ").map((word, wordIndex, words) => <Fragment key={`${word}-${wordIndex}`}>
      <motion.span className="safety-motion-word" initial={reduced ? false : { opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        transition={{ duration: .4, ease, delay: reduced ? 0 : (lines.slice(0, lineIndex).reduce((count, text) => count + text.split(" ").length, 0) + wordIndex) * .07 }}>{word}</motion.span>
      {wordIndex < words.length - 1 && " "}
    </Fragment>)}{lineIndex < lines.length - 1 && <>{mobileJoinLast && lineIndex === lines.length - 2 && " "}<br className={mobileJoinLast && lineIndex === lines.length - 2 ? "desktop-break" : undefined} /></>}
  </Fragment>)}</>;
}
function TechnologyImage({ image, active, width, mobile }: { image: string; active: boolean; width: number; mobile: boolean }) {
  const ratio = image.includes("04462") ? 2000 / 1333 : image.includes("10-31") ? 2000 / 1118 : 2000 / 1121;
  const available = Math.max(1, width - 96);
  const panelWidth = mobile ? Math.max(1, width - 48) : available / 1.314 * (active ? 1 : .157);
  const panelHeight = mobile ? (active ? 600 : 120) : 720;
  const fittedWidth = Math.max(panelWidth, panelHeight * ratio);
  const percentage = fittedWidth / panelWidth * 100;
  return <motion.div layout className="panel-media"><motion.div layout style={{
    aspectRatio: ratio, width: `${percentage}%`, marginLeft: `${-(percentage - 100) * .5}%`,
    marginTop: `${-(fittedWidth / ratio - panelHeight) * .5}px`,
  }}><img src={A + image} alt="" /></motion.div></motion.div>;
}
const StoryNumber = forwardRef<HTMLSpanElement, { current: number }>(function StoryNumber({ current }, ref) {
  const direction = usePresenceData() as { get: () => number };
  return <motion.span ref={ref} initial={{ y: `${120 * direction.get()}%` }} animate={{ y: 0 }}
    exit={{ y: `${-120 * direction.get()}%` }} transition={spring}>0{current + 1}</motion.span>;
});
export default function SafetyPage() {
  const [active, setActive] = useState(-1), [tech, setTech] = useState(0), [slide, setSlide] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [panelWidth, setPanelWidth] = useState(1440);
  const reduced = useReducedMotion();
  const story = useRef<HTMLDivElement>(null), storyCopies = useRef<HTMLDivElement>(null), rail = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLElement>(null), hero = useRef<HTMLElement>(null);
  const practicesRail = useRef<HTMLDivElement>(null), stats = useRef<HTMLDivElement>(null), panels = useRef<HTMLDivElement>(null);
  useCarouselMotion(practicesRail);
  useCarouselMotion(rail);
  const direction = useMotionValue(1);
  const storyInView = useInView(story, { once: true, amount: .2 });
  const statsInView = useInView(stats, { once: true, amount: .2 });
  const panelsInView = useInView(panels, { once: true, amount: .2 });
  const insightsInView = useInView(rail, { once: true, amount: .2 });
  const { scrollYProgress, scrollXProgress } = useScroll({ target: story, container: mobile ? storyCopies : undefined, offset: ["start center", "end end"] });
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start end", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["-12%", "12%"]);
  const lineY = useTransform(mobile ? scrollXProgress : scrollYProgress, [0, 1], ["-100%", "0%"]);
  const lineX = useTransform(scrollXProgress, [0, 1], ["-100%", "0%"]);
  useEffect(() => {
    const query = matchMedia("(max-width: 768px)");
    const update = () => { setMobile(query.matches); setNarrow(innerWidth < 768); };
    update(); query.addEventListener("change", update); window.addEventListener("resize", update);
    return () => { query.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);
  const updateSection = (progress: number) => {
    direction.set(progress > (scrollYProgress.getPrevious() ?? 0) ? 1 : -1);
    setActive(Math.max(1, Math.min(3, Math.round(progress * 3))) - 1);
  };
  useEffect(() => {
    if (!panels.current) return;
    const observer = new ResizeObserver(([entry]) => setPanelWidth(entry.borderBoxSize[0]?.inlineSize || entry.target.getBoundingClientRect().width));
    observer.observe(panels.current);
    return () => observer.disconnect();
  }, []);
  useMotionValueEvent(scrollYProgress, "change", updateSection);
  useMotionValueEvent(scrollXProgress, "change", updateSection);
  const reveal = (index: number, visible: boolean) => reduced ? {} : ({
    custom: index, variants: revealVariants, initial: "hidden", animate: visible ? "visible" : "hidden",
  });
  const move = (d: number) => {
    const element = practicesRail.current;
    element?.scrollBy({ left: d * element.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <>
      <Header />
      <MotionConfig transition={{ duration: .4, ease }} reducedMotion="user">
      <main ref={page} className="safety-page">
        <section className="hero" id="top" ref={hero}>
          <motion.img style={{ y: reduced ? 0 : heroY }}
            src={A + "1760007662-e65a0af926da45b75ba890d3d0a5bb24469ce5be.webp"}
            alt="Concept image: aerial view of a raised shelter in a cleared bush campground in the dry season"
          />
          <div className="hero-shade" />
          <h1 className="container">
            <SafetyTitle lines={["Raising supplies", "and safety above", "the flood."]} />
          </h1>
        </section>
        <section className="stakes section-space" id="stakes">
          <div className="container section-heading">
            <h2>
              <SafetyTitle lines={["Why it", "should work"]} />
            </h2>
            <p className="serif-description">
              Safety and access: visitors could recover their own vehicles, call
              for help and get water close by. The Ranger Base is not the only
              point of help. Flood resilience: the building is raised and made
              of concrete and steel, so it should need little upkeep after the
              wet season. An engineer must confirm this. Culture and Country:
              one hub on cleared ground keeps foot traffic away from restricted
              sites, and the team proposes that Yintjingga Aboriginal
              Corporation (YAC) co-designs how it runs.
            </p>
          </div>
          <div className="container stats" ref={stats}>
            {[
              [
                "2 m",
                "planned floor height above the ground (to be confirmed). Note on the 2 m height: this is a planning figure. An engineer must confirm it against local flood levels and wind loads.",
              ],
              [
                "22",
                "weeks in the open season, July to November.",
              ],
              [
                "220",
                "visitors a year in the base case.",
              ],
            ].map(([n, t], index) => (
              <motion.div className="stat" key={n} {...reveal(index, statsInView)}>
                <p>{t}</p>
                <span>{n}</span>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="philosophy" id="philosophy">
          <div className="philosophy-intro container">
            <h2>
              <SafetyTitle lines={["Design", "options"]} />
            </h2>
            <p>
              The team developed four ideas and scored them against the eight
              criteria. The three highest scoring ideas are the design options
              below. Screened out: a solar-powered river crossing status beacon
              scored lowest (91 out of 165). It would warn drivers. TEAM TO ADD:
              confirm this description.
            </p>
          </div>
          <div className="story container" ref={story}>
            <div className="story-content">
            <div className="story-counter-positioner">
            <motion.div className="story-counter" {...reveal(0, storyInView)}>
              <div className="story-number"><AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <StoryNumber key={active} current={active} />
              </AnimatePresence></div>
              <small>/3</small>
            </motion.div>
            </div>
            <div className="story-line" aria-hidden="true">
              <motion.div className="story-line-track" style={narrow ? { x: reduced ? 0 : lineX } : { y: reduced ? 0 : lineY }}><b /><i /></motion.div>
            </div>
            <div
              className="story-copies" ref={storyCopies}

            >
              {philosophy.map((item, i) => (
                <motion.article
                  className={"story-copy " + (active === i ? "is-active" : "")}
                  key={item.title} {...reveal(i === 0 ? 1 : i, storyInView)}
                >
                  <motion.div className="story-copy-content" initial={{ opacity: i === 0 ? 1 : .15 }} animate={{ opacity: narrow || active === i ? 1 : .15 }}>
                    <h3>{item.title}</h3><p>{item.text}</p>
                  </motion.div>
                </motion.article>
              ))}
            </div>
            </div>
            <div className="story-visual">
              <div className="story-visual-frame">
              <motion.div className="story-visual-inner" {...reveal(2, storyInView)}>
                <AnimatePresence initial={false} mode="popLayout">
                  {philosophy[active] && <motion.img key={active} src={A + philosophy[active].image} alt={["Concept image: a raised shelter on concrete piles with brown floodwater around the piles in the wet season", "Placeholder image, to be replaced with a concept image of the shelter at Warokutal.", "Concept image: a bench with a concrete pile cross-section, a watertight concrete sample and a roof sheet sample"][active]}
                    className="is-active" initial={reduced ? false : { opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={spring} />}
                </AnimatePresence>
              </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="technology section-space" id="technology">
          <div className="container section-heading">
            <h2>
              <SafetyTitle lines={["How the", "team", "chose"]} mobileJoinLast />
            </h2>
            <div className="technology-intro">
              <p className="serif-description">
                Each idea was rated from 1 (poor) to 5 (best) against the eight
                criteria. Each criterion has a weight from 3 to 5, where 5
                matters most. Weighted score is rating times weight. The maximum
                score is 165. Why the weights differ: Visitor support,
                feasibility and flood resilience carry weight 5, because a
                shelter that is unusable, impossible to build or flooded fails
                the brief. Culture and Country has weight 3 in the matrix, but
                it is also a condition for every option. No option would go
                ahead without Traditional Owner agreement.
              </p>
              <motion.a className="pink-button" href="/careers" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
                See the plan
              </motion.a>
            </div>
          </div>
          <div className="technology-panels" ref={panels}><LayoutGroup>
            {technology.map((item, i) => (
              <motion.article key={item.title} layout transition={{ layout: { duration: .4, ease } }} {...reveal(i, panelsInView)}
                className={"technology-panel " + (tech === i ? "expanded" : "")}
                onMouseEnter={() => setTech(i)}
                onClick={() => setTech(i)}
              >
                <TechnologyImage image={item.image} active={tech === i} width={panelWidth} mobile={mobile} />
                <div className="panel-shade" />
                <a
                  className="technology-link"
                  tabIndex={tech === i ? 0 : -1}
                  aria-label={"Read about " + item.title}
                  href={technologyLinks[i]}
                  onClick={(e) => {
                    if (tech !== i) {
                      e.preventDefault();
                      setTech(i);
                    }
                  }}
                />
                <motion.div layout className="panel-copy" initial={{ opacity: 0 }} animate={{ opacity: tech === i ? 1 : 0 }}>
                  <motion.h3 layout>{item.title}</motion.h3>
                  <motion.p layout>{item.text}</motion.p>
                </motion.div>
                <motion.button layout animate={{ scale: tech === i ? 0 : 1 }} whileHover={tech === i ? {} : { scale: 1.05 }} whileTap={tech === i ? {} : { scale: .95 }}
                  aria-label={"Explore " + item.title}
                  aria-expanded={tech === i}
                  onClick={() => setTech(i)}
                  className="panel-toggle"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><rect x="3.5" width="1" height="8" rx=".5" fill="currentColor" /><rect y="4.5" width="1" height="8" rx=".5" transform="rotate(-90 0 4.5)" fill="currentColor" /></svg>
                </motion.button>
              </motion.article>
            ))}
          </LayoutGroup></div>
        </section>
        <section
          className="practices"
          id="practices"
          aria-label="How Provisions Point would work"

        >
          <div
            className="practice-slides"
            ref={practicesRail}
            onScroll={(event) => setSlide(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}
          >
            {practices.map((item, i) => (
              <article
                className="practice-slide"
                key={item.title}
                aria-hidden={slide !== i}
              >
                <img src={A + item.image} alt="" />
                <div className="practice-shade" />
                <div className="container practice-copy">
                  <div className="practice-counter">
                    0{i + 1}
                    <small>/4</small>
                  </div>
                  <h3>
                    How Provisions Point would work.
                    <br />
                    {item.title}
                  </h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="practice-controls">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
              className="circle-button"
              onClick={() => move(-1)}
              aria-label="Previous step"
            >
              ←
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
              className="circle-button"
              onClick={() => move(1)}
              aria-label="Next step"
            >
              →
            </motion.button>
          </div>
          <div className="practice-dots">
            {practices.map((x, i) => (
              <button
                key={x.title}
                aria-label={"Show " + x.title}
                aria-current={slide === i}
                onClick={() => practicesRail.current?.scrollTo({ left: i * practicesRail.current.clientWidth, behavior: "smooth" })}
              />
            ))}
          </div>
        </section>
        <section className="insights section-space" id="insights">
          <div className="container">
            <h2><SafetyTitle lines={["Project stages"]} /></h2>
            <div className="insights-intro">
              <p>
                The design is a student proposal. It is for the Yintjingga
                Aboriginal Corporation to review, change or reject.
              </p>
              <div className="insights-controls">
                <motion.a className="pink-button" href="/careers" style={{ x: narrow ? "-50%" : "0%" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
                  See the plan
                </motion.a>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                  className="circle-button"
                  aria-label="Previous insights"
                  onClick={() =>
                    rail.current?.scrollBy({ left: -474, behavior: "smooth" })
                  }
                >
                  ←
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                  className="circle-button"
                  aria-label="Next insights"
                  onClick={() =>
                    rail.current?.scrollBy({ left: 474, behavior: "smooth" })
                  }
                >
                  →
                </motion.button>
              </div>
            </div>
          </div>
          <div className="insights-rail" ref={rail}>
            {insights.map(([image, date, title, slug], i) => (
              <motion.a key={slug} {...reveal(i, insightsInView)}
                className="insight-card"
                href="/careers"
              >
                <div className="insight-image">
                  <img src={A + image} alt="" />
                </div>
                <div className="insight-meta">
                  {i !== 4 && (
                    <span>Project stage</span>
                  )}
                  {i === 0 && <span>Project stage</span>}
                  <time>{date}</time>
                </div>
                <h3>{title}</h3>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
      </MotionConfig>
      <Footer />
    </>
  );
}
