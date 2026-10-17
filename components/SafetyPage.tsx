"use client";
import { useEffect, useRef, useState } from "react";
import { Header, Footer, CookieConsent } from "./SiteChrome";
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
export default function SafetyPage() {
  const [active, setActive] = useState(0),
    [tech, setTech] = useState(0),
    [slide, setSlide] = useState(0);
  const story = useRef<HTMLDivElement>(null),
    rail = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLElement>(null);
  const practicesRail = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const previousActive = useRef(0);
  // Analytic damped spring samples reproduce the reference Framer spring without
  // introducing a second animation runtime.
  const springFrames = (stiffness: number, damping: number, from: number, unit = "px") => {
    const rate = damping / 2, frequencySquared = stiffness - rate * rate;
    const omega = Math.sqrt(Math.abs(frequencySquared));
    return Array.from({ length: 91 }, (_, i) => {
      const t = i / 60;
      const remaining = Math.exp(-rate * t) * (frequencySquared > 0
        ? Math.cos(omega * t) + rate / omega * Math.sin(omega * t)
        : Math.cosh(omega * t) + rate / omega * Math.sinh(omega * t));
      return { transform: `translateY(${from * remaining}${unit})`, offset: i / 90 };
    });
  };
  useEffect(() => {
    if (!page.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = page.current;
    const animations: Animation[] = [];
    const words: HTMLElement[] = [];
    page.current.querySelectorAll<HTMLElement>("h1, .section-heading h2, .philosophy-intro h2, .insights > .container > h2").forEach(heading => {
      let wordIndex = 0, lineIndex = 0;
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach(node => {
        if (node.previousSibling?.nodeName === "BR") wordIndex = ++lineIndex;
        const fragment = document.createDocumentFragment();
        node.textContent?.split(/(\s+)/).forEach(word => {
          if (!word.trim()) { fragment.append(word); return; }
          const span = document.createElement("span");
          span.textContent = word;
          span.className = "safety-motion-word";
          span.style.setProperty("--word-delay", `${wordIndex++ * .07}s`);
          fragment.append(span); words.push(span);
        });
        node.replaceWith(fragment);
      });
    });
    const wordObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("motion-visible"); wordObserver.unobserve(entry.target); }
    }));
    words.forEach(word => wordObserver.observe(word));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const group = entry.target as HTMLElement;
      const items = group.matches(".stats") ? group.querySelectorAll<HTMLElement>(".stat") : group.matches(".technology-panels") ? group.children : group.querySelectorAll<HTMLElement>(".insight-card");
      Array.from(items).forEach((item, index) => {
        (item as HTMLElement).style.transform = "";
        animations.push(item.animate(springFrames(80, 20, 200 * (index + 1)), { duration: 1500, fill: "both" }));
      });
      revealObserver.unobserve(group);
    }), { threshold: .2 });
    page.current.querySelectorAll<HTMLElement>(".stats, .technology-panels, .insights-rail").forEach(group => {
      Array.from(group.children).forEach((item, index) => (item as HTMLElement).style.transform = `translateY(${200 * (index + 1)}px)`);
      revealObserver.observe(group);
    });
    return () => {
      wordObserver.disconnect(); revealObserver.disconnect();
      animations.forEach(animation => animation.cancel());
      words.forEach(word => word.replaceWith(document.createTextNode(word.textContent || "")));
      root.querySelectorAll<HTMLElement>(".stat, .technology-panel, .insight-card").forEach(item => { item.style.transform = ""; });
    };
  }, []);
  useEffect(() => {
    const image = story.current?.querySelector<HTMLElement>(".story-visual img.is-active");
    const counter = story.current?.querySelector<HTMLElement>(".story-number > span");
    const previous = previousActive.current;
    previousActive.current = active;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frames = Array.from({ length: 91 }, (_, i) => {
      const t = i / 60, rate = 11, omega = Math.sqrt(19);
      const remaining = Math.exp(-rate * t) * (Math.cos(omega * t) + rate / omega * Math.sin(omega * t));
      return { transform: `scale(${1 + .2 * remaining})`, opacity: Math.max(0, Math.min(1, 1 - remaining)), offset: i / 90 };
    });
    const animations = [image?.animate(frames, { duration: 1500 })];
    if (previous !== active) {
      const oldImage = story.current?.querySelectorAll<HTMLElement>(".story-visual img")[previous];
      animations.push(oldImage?.animate(frames.map(frame => ({ opacity: 1 - frame.opacity, offset: frame.offset })), { duration: 1500 }));
    }
    let outgoing: HTMLElement | undefined;
    if (counter && previous !== active) {
      animations.push(counter.animate(springFrames(140, 22, 120 * direction.current, "%"), { duration: 1500 }));
      outgoing = document.createElement("span");
      outgoing.textContent = `0${previous + 1}`;
      outgoing.className = "story-number-exit";
      outgoing.setAttribute("aria-hidden", "true");
      counter.parentElement?.append(outgoing);
      const outgoingFrames = springFrames(140, 22, 120 * direction.current, "%").map(frame => ({
        ...frame, transform: `${frame.transform} translateY(${-120 * direction.current}%)`,
      }));
      const exitAnimation = outgoing.animate(outgoingFrames, { duration: 1500, fill: "forwards" });
      exitAnimation.finished.then(() => outgoing?.remove()).catch(() => {});
      animations.push(exitAnimation);
    }
    return () => { animations.forEach(animation => animation?.cancel()); outgoing?.remove(); };
  }, [active]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = story.current;
        if (element && innerWidth >= 768) {
          const rect = element.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight / 2 - rect.top) / (rect.height - innerHeight / 2)));
          const selected = Math.max(1, Math.min(3, Math.round(progress * 3))) - 1;
          setActive(previous => { direction.current = selected >= previous ? 1 : -1; return selected; });
          element.style.setProperty("--story-progress", `${progress}`);
        }
        const hero = page.current?.querySelector<HTMLElement>(".hero");
        if (hero) {
          const rect = hero.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (rect.height + innerHeight)));
          hero.style.setProperty("--safety-parallax", `${-12 + progress * 24}%`);
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
  const move = (d: number) => {
    const element = practicesRail.current;
    element?.scrollBy({ left: d * element.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <>
      <Header />
      <main ref={page} className="safety-page">
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
              <div className="story-number"><span>0{active + 1}</span></div>
              <small>/3</small>
            </div>
            <div className="story-line" aria-hidden="true">
              <div className="story-line-track"><i /></div>
            </div>
            <div
              className="story-copies"
              onScroll={(e) => {
                if (innerWidth < 768) {
                  const el = e.currentTarget;
                  const progress = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth);
                  story.current?.style.setProperty("--story-progress", `${progress}`);
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
                onClick={() => practicesRail.current?.scrollTo({ left: i * practicesRail.current.clientWidth, behavior: "smooth" })}
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
