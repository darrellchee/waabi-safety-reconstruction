"use client";
import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useInView, useMotionValue, useMotionValueEvent, usePresenceData, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Header, Footer } from "./SiteChrome";
import { useCarouselMotion } from "./useCarouselMotion";
import { insights } from "./insights-data";
const A = "/assets/";
const philosophy = [
  {
    title: "Safety from the inside out.",
    text: (
      <>
        Our governance structure ensures that every decision prioritizes safety.
        Every team member, from engineers to operators, has the authority to
        raise a concern. Our publicly shared{" "}
        <a
          href="https://research-assets.waabi.ai/Waabi%20VSSA/231030%20StAn%20Waabi%20Voluntary%20Safety%20Self-Assessment%2A.pdf"
          target="_blank"
          rel="noreferrer"
        >
          VSSA
        </a>{" "}
        openly documents our strategy—giving everyone access to the approaches
        that guide our operations.
      </>
    ),
    image: "1761185044-waabi_road2_05683.webp",
  },
  {
    title: "Built different. Built safer.",
    text: "Our simulation-first approach tests thousands of safety-critical scenarios before they ever happen on public roads, making every mile driven more valuable and safe.",
    image: "1761183960-waabi_inspection_02285.webp",
  },
  {
    title: "Pioneering new standards.",
    text: "We rigorously adhere to many established industry best practices while pioneering new methodologies where existing standards fall short. Our work in simulation realism and Mixed Reality Testing is establishing benchmarks for the entire industry.",
    image: "1760350326-shutterstock_1058062604_edited_final.webp",
  },
];
const technology = [
  {
    title: "Waabi Driver",
    image: "1761183903-waabi_road2_04462.webp",
    text: "Our end-to-end trained system is fully interpretable, and can see exactly why a decision was made. Designed for generalizability, Waabi Driver adapts to new scenarios while maintaining multiple layers of redundancy across both hardware and software. This ensures that if a fault ever occurs, the system defaults to minimal-risk maneuvers.",
  },
  {
    title: "Waabi World",
    image: "1761947979-screenshot-2025-10-31-at-2-59-29-pm.webp",
    text: "Our high-fidelity neural simulator is capable of replicating both routine situations and rare edge cases with a high degree of realism.. Efficient, comprehensive testing allows us to launch responsibly and continually improve performance in the highest-risk scenarios.",
  },
  {
    title: "Mixed Reality Testing",
    image: "1762294277-screenshot-2025-11-04-at-2-11-01-pm.webp",
    text: "By combining real trucks with real-time synthetic scenarios, we’re unlocking unlimited testing possibilities that were previously impossible to achieve safely or practically. MRT allows us to inject rare and dangerous situations into live operations without putting people or cargo at risk.",
  },
];
const technologyLinks = [
  "introducing-the-waabi-driver#waabi-driver",
  "simulator-realism-the-new-safety-standard-for-the-av-industry#waabi-world",
  "mixed-reality-testing-pushes-the-boundaries-of-av-safety#mixed-reality-testing",
];
const practices = [
  {
    title: "Design",
    image: "1761183902-waabi_road2_04965.webp",
    text: "Well-defined requirements for each capability, with multiple layers of hardware and software redundancy.",
  },
  {
    title: "Testing & Validation",
    image: "1761183937-waabi_garageinterior_03851.webp",
    text: "From simulation to closed course testing to low exposure driving, and finally, the public road. We only advance when safety criteria are met.",
  },
  {
    title: "Deployment",
    image: "1761183980-waabi_road1_01029.webp",
    text: "Structured releases to ensure readiness before any expansion.",
  },
  {
    title: "Monitoring",
    image: "1760350326-waabi_laptop_03392_final.webp",
    text: "Continuous performance tracking and immediate safety-critical handling within the onboard system.",
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
            alt="Waabi truck and safety operators viewed from above"
          />
          <div className="hero-shade" />
          <h1 className="container">
            <SafetyTitle lines={["Redefining", "safety."]} />
          </h1>
        </section>
        <section className="stakes section-space" id="stakes">
          <div className="container section-heading">
            <h2>
              <SafetyTitle lines={["The stakes are", "real and rising."]} />
            </h2>
            <p className="serif-description">
              It’s time for an approach to safety that is designed for the
              realities of our roads and the possibilities of Physical AI.
            </p>
          </div>
          <div className="container stats" ref={stats}>
            {[
              [
                "39,345",
                "number of lives lost each year in vehicle accidents in the United States.",
              ],
              [
                "5,472",
                "number of lives lost each year in large truck crashes in the United States.",
              ],
              [
                "87%",
                "percent of fatal truck crashes where human error was a critical factor.",
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
              <SafetyTitle lines={["Safety is core", "to our DNA."]} />
            </h2>
            <p>
              The future of autonomous transportation requires us to build on
              established safety constructs and leverage transformative
              technologies that allow us to do more than what’s previously been
              possible.
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
                  {philosophy[active] && <motion.img key={active} src={A + philosophy[active].image} alt={philosophy[active].title}
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
              <SafetyTitle lines={["Technology", "designed", "to protect."]} mobileJoinLast />
            </h2>
            <div className="technology-intro">
              <p className="serif-description">
                Learn how our technology is delivering a safer path forward and
                setting a new standard for the entire AV industry.
              </p>
              <motion.a className="pink-button" href="https://waabi.ai/insights" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
                Explore our approach
              </motion.a>
            </div>
          </div>
          <div className="technology-panels" ref={panels}><LayoutGroup>
            {technology.map((item, i) => (
              <motion.article layout transition={{ layout: { duration: .4, ease } }} {...reveal(i, panelsInView)}
                key={item.title}
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
                  href={"https://waabi.ai/insights/" + technologyLinks[i]}
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
          aria-label="Safety-first best practices"

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
                    Safety-first best practices.
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
              aria-label="Previous safety practice"
            >
              ←
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
              className="circle-button"
              onClick={() => move(1)}
              aria-label="Next safety practice"
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
            <h2><SafetyTitle lines={["Insights"]} /></h2>
            <div className="insights-intro">
              <p>
                Explore product deep dives, behind-the-scenes perspectives, and
                the ideas shaping the future of autonomy.
              </p>
              <div className="insights-controls">
                <motion.a className="pink-button" href="https://waabi.ai/insights" style={{ x: narrow ? "-50%" : "0%" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
                  View all
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
              <motion.a {...reveal(i, insightsInView)}
                className="insight-card"
                href={"https://waabi.ai/insights/" + slug}
                key={title}
              >
                <div className="insight-image">
                  <img src={A + image} alt="" />
                </div>
                <div className="insight-meta">
                  {i !== 4 && (
                    <span>{i === 5 ? "Research" : "Company news"}</span>
                  )}
                  {i === 0 && <span>Trucks</span>}
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
