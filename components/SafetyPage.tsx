"use client";
import { useEffect, useRef, useState } from "react";
import { Header, Footer, CookieConsent } from "./SiteChrome";
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
const insights = [
  [
    "1791944791-edit-1-1.webp",
    "October 14, 2026",
    "Waabi and Warrior Logistics partner on autonomous trucking operations in Texas",
    "waabi-and-warrior-logistics-partner-on-autonomous-trucking-operations-in-texas",
  ],
  [
    "1790974044-vas-waabi-warp.webp",
    "October 5, 2026",
    "Volvo and Waabi Kick Off Customer Operations in Texas, Starting with Warp",
    "volvo-and-waabi-kick-off-customer-operations-in-texas-starting-with-warp",
  ],
  [
    "1790628632-blog-dallas-sanantonio.webp",
    "September 22, 2026",
    "Built to generalize. Proven on I-35.",
    "built-to-generalize-proven-on-i-35",
  ],
  [
    "1790628632-blog-dallas-houston.webp",
    "September 15, 2026",
    "80% Growth on Long Haul’s Toughest Corridor",
    "80percent-growth-on-long-hauls-toughest-corridor",
  ],
  [
    "1790628632-blog.webp",
    "June 26, 2026",
    "Waabi crosses the next frontier of generalization, unlocking truly scalable AVs",
    "waabi-crosses-the-next-frontier-of-generalization-unlocking-truly-scalable-avs",
  ],
  [
    "1756264338-png-image-2.webp",
    "April 22, 2026",
    "All You Need to Know About Self-Driving | CVPR Tutorial 2026",
    "tutorial-cvpr-2026",
  ],
  [
    "1769595209-screenshot-2026-01-28-at-2-12-00-am.webp",
    "January 28, 2026",
    "Waabi secures $1 Billion in new funding to lead Physical AI revolution",
    "waabi-secures-1-billion-in-new-funding-to-lead-physical-ai-revolution",
  ],
  [
    "1767826472-screenshot-2026-01-07-at-12-54-15-pm.webp",
    "December 19, 2025",
    "From closed course to public roads: The path to driverless",
    "from-closed-course-to-public-roads-the-path-to-driverless",
  ],
  [
    "1756426717-waabi_road2_04115.webp",
    "November 25, 2025",
    "Waabi unlocks direct-to-customer model with surface street driving capabilities",
    "waabi-unlocks-direct-to-customer-model-enabled-by-industry-leading-surface-street",
  ],
];
export default function SafetyPage() {
  const [active, setActive] = useState(0),
    [tech, setTech] = useState(0),
    [slide, setSlide] = useState(0);
  const story = useRef<HTMLDivElement>(null),
    rail = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rows =
          story.current?.querySelectorAll<HTMLElement>(".story-copy");
        if (rows && innerWidth >= 768) {
          let selected = 0;
          rows.forEach((el, i) => {
            if (el.getBoundingClientRect().top < innerHeight * 0.62)
              selected = i;
          });
          setActive(selected);
        }
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  const move = (d: number) => setSlide((s) => Math.max(0, Math.min(3, s + d)));
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <img
            src={A + "1760007662-e65a0af926da45b75ba890d3d0a5bb24469ce5be.webp"}
            alt="Waabi truck and safety operators viewed from above"
          />
          <div className="hero-shade" />
          <h1 className="container">
            Redefining
            <br />
            safety.
          </h1>
        </section>
        <section className="stakes section-space" id="stakes">
          <div className="container section-heading">
            <h2>
              The stakes are
              <br />
              real and rising.
            </h2>
            <p className="serif-description">
              It’s time for an approach to safety that is designed for the
              realities of our roads and the possibilities of Physical AI.
            </p>
          </div>
          <div className="container stats">
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
            ].map(([n, t]) => (
              <div className="stat" key={n}>
                <p>{t}</p>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="philosophy" id="philosophy">
          <div className="philosophy-intro container">
            <h2>
              Safety is core
              <br />
              to our DNA.
            </h2>
            <p>
              The future of autonomous transportation requires us to build on
              established safety constructs and leverage transformative
              technologies that allow us to do more than what’s previously been
              possible.
            </p>
          </div>
          <div className="story container" ref={story}>
            <div className="story-counter">
              <span>0{active + 1}</span>
              <small>/3</small>
            </div>
            <div className="story-line">
              <i />
            </div>
            <div
              className="story-copies"
              onScroll={(e) => {
                if (innerWidth < 768) {
                  const el = e.currentTarget;
                  setActive(Math.round(el.scrollLeft / (el.clientWidth + 24)));
                }
              }}
            >
              {philosophy.map((item, i) => (
                <article
                  className={"story-copy " + (active === i ? "is-active" : "")}
                  key={item.title}
                >
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="story-visual">
              {philosophy.map((item, i) => (
                <img
                  key={item.image}
                  src={A + item.image}
                  alt={item.title}
                  className={active === i ? "is-active" : ""}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="technology section-space" id="technology">
          <div className="container section-heading">
            <h2>
              Technology
              <br />
              designed <br className="desktop-break" />
              to protect.
            </h2>
            <div className="technology-intro">
              <p className="serif-description">
                Learn how our technology is delivering a safer path forward and
                setting a new standard for the entire AV industry.
              </p>
              <a className="pink-button" href="https://waabi.ai/insights">
                Explore our approach
              </a>
            </div>
          </div>
          <div className="technology-panels">
            {technology.map((item, i) => (
              <article
                key={item.title}
                className={"technology-panel " + (tech === i ? "expanded" : "")}
                onMouseEnter={() => {
                  if (innerWidth >= 768) setTech(i);
                }}
                onClick={() => setTech(i)}
              >
                <img src={A + item.image} alt="" />
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
                <div className="panel-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <button
                  aria-label={"Explore " + item.title}
                  aria-expanded={tech === i}
                  onClick={() => setTech(i)}
                  className="panel-toggle"
                >
                  {tech === i ? "−" : "+"}
                </button>
              </article>
            ))}
          </div>
        </section>
        <section
          className="practices"
          id="practices"
          aria-label="Safety-first best practices"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
          }}
        >
          <div
            className="practice-slides"
            style={{ transform: `translateX(-${slide * 100}%)` }}
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
            <button
              className="circle-button"
              onClick={() => move(-1)}
              aria-label="Previous safety practice"
            >
              ←
            </button>
            <button
              className="circle-button"
              onClick={() => move(1)}
              aria-label="Next safety practice"
            >
              →
            </button>
          </div>
          <div className="practice-dots">
            {practices.map((x, i) => (
              <button
                key={x.title}
                aria-label={"Show " + x.title}
                aria-current={slide === i}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </section>
        <section className="insights section-space" id="insights">
          <div className="container">
            <h2>Insights</h2>
            <div className="insights-intro">
              <p>
                Explore product deep dives, behind-the-scenes perspectives, and
                the ideas shaping the future of autonomy.
              </p>
              <div className="insights-controls">
                <a className="pink-button" href="https://waabi.ai/insights">
                  View all
                </a>
                <button
                  className="circle-button"
                  aria-label="Previous insights"
                  onClick={() =>
                    rail.current?.scrollBy({ left: -474, behavior: "smooth" })
                  }
                >
                  ←
                </button>
                <button
                  className="circle-button"
                  aria-label="Next insights"
                  onClick={() =>
                    rail.current?.scrollBy({ left: 474, behavior: "smooth" })
                  }
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="insights-rail" ref={rail}>
            {insights.map(([image, date, title, slug], i) => (
              <a
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
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
