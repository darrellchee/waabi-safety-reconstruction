"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Header, Footer, CookieConsent } from "./SiteChrome";
import "./company.css";
import { insights } from "./insights-data";
import roads from "./company-roads.json";
const A = "/assets/company/";
const news = insights;
const logos = [
  ["1761842750-investor-logos-1.svg", "Khosla ventures"],
  ["1769751291-investor-logos-13.svg", "G2 Venture Partners"],
  ["1760431047-uber-logo.svg", "Uber"],
  ["1760431057-nvidia-logo.svg", "Nvidia"],
  ["1760431072-volvo-logo.svg", "Volvo"],
  ["1769593390-blk_big-d.svg", "BlackRock"],
  ["1769612389-porschese_logo_white_rgb.svg", "Porsche SE"],
  ["1761843948-investor-logos-5.svg", "Scania"],
  ["1761843971-investor-logos-4.svg", "Harbourvest"],
  ["1761844105-investor-logos-6.svg", "BDC"],
  ["1761845577-investor-logos-7.svg", "EDC"],
  ["1761924223-radical-circle-logo-1.svg", "Radical"],
  ["1761931707-10.svg", "Ingka"],
  ["1761931728-11.svg", "Incharge"],
  ["1769596790-investor-logos-10.svg", "BMO"],
];
const events = [
  [
    "October 17, 2026",
    "ATA Management Conference & Exhibition",
    "Charlotte, NC",
    "https://mce.trucking.org/",
  ],
  [
    "October 26, 2026",
    "FreightWaves F3: Future of Freight Festival",
    "Chattanooga, TN",
    "https://live.freightwaves.com/f3-future-of-freight-festival-2026",
  ],
  [
    "October 28, 2026",
    "NASTC Annual Conference",
    "Nashville, TN",
    "https://nastc.com/",
  ],
];
const locations = [
  {
    name: "San Francisco",
    address: "1407 Indiana St. San Francisco, CA 94107",
    style: { bottom: "36.2%", left: "3.2%" },
  },
  {
    name: "Dallas",
    address: "3005 West Wintergreen Rd. Lancaster, TX 75134",
    style: { bottom: "16.8%", left: "41.2%" },
  },
  {
    name: "Phoenix",
    address: "23445 North 19th Ave. Phoenix, AZ 85027",
    style: { bottom: "23.8%", left: "18.3%" },
  },
  {
    name: "Pittsburgh",
    address: "1967 Eastern Avenue, Verona PA 15147",
    style: { top: "60.3%", right: "31.5%" },
  },
  {
    name: "Toronto",
    address: "440 Bathurst St. Toronto ON, M5T 2S6, Canada",
    style: { top: "51.2%", right: "32.6%" },
  },
];
function Controls({
  name,
  move,
}: {
  name: string;
  move: (direction: number) => void;
}) {
  return (
    <div className="co-controls">
      <button aria-label={`Previous ${name}`} onClick={() => move(-1)}>
        ←
      </button>
      <button aria-label={`Next ${name}`} onClick={() => move(1)}>
        →
      </button>
    </div>
  );
}
/** Source Title/Paragraph motions: independent words, once in view. */
function MotionWords({ text, title = false, wordOffset = 0 }: { text: string; title?: boolean; wordOffset?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        const word = target as HTMLElement;
        const index = Number(word.dataset.word);
        word.animate(title ? [
          { opacity: 0, transform: "translateX(20px)" },
          { opacity: 1, transform: "translateX(0px)" },
        ] : [
          { opacity: 0.1, color: "rgb(255, 44, 107)" },
          { opacity: 1, color: "rgb(0, 0, 0)" },
        ], {
          duration: title ? 400 : 100,
          delay: (index + wordOffset) * 70,
          easing: title ? "cubic-bezier(.19,1,.22,1)" : "linear",
          fill: "both",
        });
        observer.unobserve(word);
      });
    });
    ref.current?.querySelectorAll("[data-word]").forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, [title, wordOffset]);
  return <span ref={ref}>{text.split(" ").map((word, index, words) => <span key={index}>
    <span data-word={index} className={title ? "co-title-word" : "co-word"}>{word}</span>{index < words.length - 1 ? " " : ""}
  </span>)}</span>;
}
function Story() {
  return (
    <section id="our-story" className="co-story">
      <div>
        <p><MotionWords text="In 2021, AI visionary Raquel Urtasun founded Waabi with an unwavering belief that Physical AI could revolutionize how humanity moves and connects." /></p>
        <p><MotionWords text="What began as a bold dream has become something far greater. Waabi is a global force pioneering a breakthrough approach that demonstrates autonomous vehicles can be scalable, efficient, and safe." /></p>
      </div>
    </section>
  );
}
const portraits = [
  "1761188599-251006_waabi_ashwin_kumar_0866.webp",
  "1761700499-251006_waabi_collab_02_0612.webp",
  "1761700304-251006_waabi_saloni_mulani_0355-1.webp",
  "1761183937-waabi_portrait_dave_00283.webp",
];
/** Native FLIP equivalent of the reference's two-slot AnimatePresence layout. */
function PeoplePortraits() {
  const ref = useRef<HTMLDivElement>(null);
  const boxes = useRef(new Map<number, DOMRect>());
  const [step, setStep] = useState(0);
  const generationRef = useRef(0);
  const [exiting, setExiting] = useState<number | null>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    const schedule = () => {
      clearInterval(timer);
      if (!visible || document.hidden) return;
      timer = setInterval(() => {
        boxes.current.clear();
        container.querySelectorAll<HTMLElement>(".co-portrait").forEach((card) => {
          boxes.current.set(Number(card.dataset.generation), card.getBoundingClientRect());
        });
        setExiting(generationRef.current);
        generationRef.current += 1;
        setStep(generationRef.current);
      }, 2000);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    observer.observe(container);
    document.addEventListener("visibilitychange", schedule);
    return () => { clearInterval(timer); observer.disconnect(); document.removeEventListener("visibilitychange", schedule); };
  }, []);
  useLayoutEffect(() => {
    if (!step || !ref.current) return;
    const options = { duration: 800, easing: "cubic-bezier(.77,0,.175,1)", fill: "both" as const };
    ref.current.querySelectorAll<HTMLElement>(".co-portrait").forEach((card) => {
      const generation = Number(card.dataset.generation);
      const before = boxes.current.get(generation);
      const after = card.getBoundingClientRect();
      if (generation < step) {
        card.querySelector(".co-portrait-clip")?.animate([{ transform: "translateX(0) scale(1)" }, { transform: "translateX(20px) scale(.5)" }], options);
      } else if (before) {
        card.animate([{ transform: `translate(${before.left - after.left}px, ${before.top - after.top}px) scale(${before.width / after.width}, ${before.height / after.height})` }, { transform: "none" }], options);
      } else {
        card.querySelector(".co-portrait-clip")?.animate([{ transform: "translateX(100%)" }, { transform: "translateX(0)" }], options);
        card.querySelector("img")?.animate([{ transform: "scale(1.5)" }, { transform: "scale(1)" }], options);
      }
    });
    const timeout = setTimeout(() => setExiting(null), 800);
    return () => clearTimeout(timeout);
  }, [step]);
  const cards = [...(exiting === null ? [] : [exiting]), step, step + 1];
  return <div ref={ref} className="co-portraits">{cards.map((generation) => <div key={generation} data-generation={generation} data-slot={generation === step + 1 ? 1 : 0} className={`co-portrait${generation === exiting ? " co-portrait-exit" : ""}`}>
    <div className="co-portrait-clip"><img src={A + portraits[generation % portraits.length]} alt="Waabi team member" /></div>
  </div>)}</div>;
}
/** Overdamped spring from source: mass 1, stiffness 3.2, damping 4. */
const mapSpring = (seconds: number) => 1 - 1.61803398875 * Math.exp(-1.105572809 * seconds) + .61803398875 * Math.exp(-2.894427191 * seconds);
function MapMotion() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      animations.splice(0).forEach((animation) => animation.cancel());
      if (!entry.isIntersecting) return;
      svg.querySelectorAll<SVGPathElement>("path").forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        const total = 18450;
        const start = index * 2500;
        const keyframes: Keyframe[] = [{ strokeDashoffset: length, opacity: 1, offset: 0 }];
        if (start) keyframes.push({ strokeDashoffset: length, opacity: 1, offset: start / total });
        for (let time = 50; time < 5250; time += 50) keyframes.push({ strokeDashoffset: length * (1 - mapSpring(time / 1000)), opacity: 1, offset: (start + time) / total });
        keyframes.push({ strokeDashoffset: 0, opacity: 1, offset: (start + 5250) / total, ...(index === 4 ? { easing: "ease-in-out" } : {}) });
        if (index < 4) keyframes.push({ strokeDashoffset: 0, opacity: 1, offset: 15250 / total, easing: "ease-in-out" });
        keyframes.push({ strokeDashoffset: 0, opacity: 0, offset: 15950 / total }, { strokeDashoffset: 0, opacity: 0, offset: 1 });
        animations.push(path.animate(keyframes, { duration: total, iterations: Infinity }));
      });
      svg.parentElement?.querySelectorAll<SVGRectElement>(".co-city-pulse rect").forEach((rect, index) => {
        const frames: Keyframe[] = [{ opacity: 0, transform: "scale(1)", offset: 0 }, { opacity: 0, transform: "scale(1)", offset: 1000 / 3500 }];
        for (let time = 25; time < 550; time += 25) {
          const progress = mapSpring(time / 100);
          frames.push({ opacity: progress, transform: `scale(${1 + 1.5 * progress})`, offset: (1000 + time) / 3500 });
        }
        frames.push({ opacity: 1, transform: "scale(2.5)", offset: 1550 / 3500 }, { opacity: 1, transform: "scale(2.5)", offset: .5 });
        for (let time = 25; time < 550; time += 25) frames.push({ opacity: 1 - mapSpring(time / 100), transform: "scale(2.5)", offset: (1750 + time) / 3500 });
        frames.push({ opacity: 0, transform: "scale(2.5)", offset: 2300 / 3500 }, { opacity: 0, transform: "scale(2.5)", offset: 1 });
        animations.push(rect.animate(frames, { duration: 3500, iterations: Infinity, delay: index % 2 * 1750 }));
      });
    });
    observer.observe(svg);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); };
  }, []);
  return <svg ref={ref} className="co-map-roads" viewBox="0 0 1465 1156" preserveAspectRatio="none" aria-hidden="true">{roads.map((d, index) => <path key={index} d={d} fill="none" stroke="#ff2c6b" />)}</svg>;
}
export default function CompanyPage() {
  const quoteRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      [quoteRef.current, heroRef.current].forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
        el.style.setProperty("--co-parallax", `${-12 + progress * 24}%`);
      });
    };
    let frame = 0;
    let lastScroll = -1;
    const tick = () => {
      if (lastScroll !== scrollY) { lastScroll = scrollY; update(); }
      frame = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    const observer = new IntersectionObserver(([entry]) => {
      marqueeRef.current?.classList.toggle("co-marquee-visible", entry.isIntersecting);
    });
    if (marqueeRef.current) observer.observe(marqueeRef.current);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", update); removeEventListener("resize", update); observer.disconnect(); };
  }, []);
  const newsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<string | null>(null);
  const move = (ref: React.RefObject<HTMLDivElement | null>, d: number) => {
    if (ref.current)
      ref.current.scrollBy({
        left: d * (ref.current.querySelector("a")?.clientWidth || 315) + d * 24,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <>
      <Header />
      <main className="company-page">
        <section ref={heroRef} className="co-hero">
          <img
            src={A + "1760350326-waabi_washstation_03082_final.webp"}
            alt="Waabi truck being prepared for the road"
          />
          <div className="co-hero-shade" />
          <div className="co-hero-content">
            <div className="co-hero-heading"><h1>
              <MotionWords title text="We built our" />
              <br className="co-desktop-break" /> <MotionWords title wordOffset={3} text="own road." />
            </h1></div>
            <button
              aria-label="Scroll Down"
              onClick={() => window.scrollTo({
                top: innerHeight,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              })}
            >
              ↓
            </button>
          </div>
        </section>
        <Story />
        <section ref={quoteRef} className="co-quote">
          <div className="co-quote-frame">
            <img
              src={A + "1761183960-waabi_portrait_raquel_02880.webp"}
              alt="Raquel Urtasun"
            />
            <div className="co-quote-shade" />
            <div className="co-quote-copy">
              <p>
                &quot;When this technology is at scale, it will save so many
                lives. Improving safety on the road is one of the most important
                motivators for me.&quot;
              </p>
              <div>
                <span>Raquel Urtasun</span>
                <span>Founder &amp; CEO of Waabi</span>
              </div>
            </div>
          </div>
        </section>
        <section className="co-people co-width">
          <div className="co-people-copy">
            <h2>The people moving us forward.</h2>
            <p>
              Behind every breakthrough at Waabi are people who care deeply
              about reshaping the physical world through diverse perspectives,
              from AI researchers and roboticists to trucking experts and
              operators.
            </p>
            <a className="co-pill" href="https://waabi.ai/careers">
              Learn more
            </a>
          </div>
          <PeoplePortraits />
        </section>
        <section className="co-investors">
          <div className="co-investor-copy">
            <h2>Investors</h2>
            <p>
              Our approach to Physical AI has earned the backing of world-class
              investors who share our vision for efficient, safe, and scalable
              autonomous solutions.
            </p>
          </div>
          <div
            ref={marqueeRef}
            className="co-logo-window"
            tabIndex={0}
            aria-label="Waabi investors"
          >
            {[0, 1].map((group) => <div className="co-logo-track" key={group} aria-hidden={group === 1 ? true : undefined}>
              {[...logos, ...logos, ...logos].map(([file, alt], i) => (
                <div className="co-logo" key={i}>
                  <img src={A + file} alt={group === 0 && i < logos.length ? alt : ""} />
                </div>
              ))}
            </div>)}
          </div>
        </section>
        <section className="co-news">
          <div className="co-width">
            <h2>The latest from Waabi.</h2>
            <div className="co-news-intro">
              <p>
                We’re leading conversations across AI, autonomy, freight, and
                transportation. Explore our latest news, insights, and
                milestones.
              </p>
              <Controls name="news" move={(d) => move(newsRef, d)} />
            </div>
          </div>
          <div ref={newsRef} className="co-news-track">
            {news.map(([img, date, title, slug], i) => (
              <a
                className="co-news-card"
                href={"https://waabi.ai/insights/" + slug}
                key={slug}
              >
                <div className="co-news-image">
                  <img src={"/assets/" + img} alt="" />
                </div>
                <div className="co-news-meta">
                  {(i === 4
                    ? []
                    : i === 5
                      ? ["Research"]
                      : i > 6
                        ? ["Technology", "Company news"]
                        : i === 0
                          ? ["Company news", "Trucks"]
                          : ["Company news"]
                  ).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  <time>{date}</time>
                </div>
                <h3>{title}</h3>
              </a>
            ))}
            <a className="co-viewall co-pill" href="https://waabi.ai/insights">
              View all ↗
            </a>
          </div>
          <a
            className="co-mobile-viewall co-pill"
            href="https://waabi.ai/insights"
          >
            View all ↗
          </a>
        </section>
        <section className="co-events">
          <div className="co-width">
            <div className="co-event-heading">
              <h2>Upcoming events</h2>
              <Controls name="events" move={(d) => move(eventsRef, d)} />
            </div>
            <div ref={eventsRef} className="co-events-track">
              {events.map(([date, title, city, url], i) => (
                <a
                  className="co-event"
                  href={url}
                  key={title}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="co-event-image">
                    {i === 1 && (
                      <img
                        src={A + "1788170473-f3.webp"}
                        alt="FreightWaves F3"
                      />
                    )}
                    <time>{date}</time>
                  </div>
                  <h3>{title}</h3>
                  <span>{city}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="co-locations">
          <div className="co-map">
            <div className="co-map-art">
              <img src={A + "map.svg"} alt="Map of North America" />
              <MapMotion />
              {locations.map((l) => (
                <button
                  key={l.name}
                  style={l.style}
                  aria-label={l.name}
                  aria-pressed={location === l.name}
                  onClick={() => setLocation(l.name)}
                  onMouseEnter={() => setLocation(l.name)}
                  onMouseLeave={() => setLocation(null)}
                  onFocus={() => setLocation(l.name)}
                  onBlur={() => setLocation(null)}
                >
                  <svg className="co-city-pulse" viewBox="0 0 100 100" aria-hidden="true"><rect x="0" y="0" width="100" height="100" /><rect x="0" y="0" width="100" height="100" /></svg>
                  {location === l.name && (
                    <span>
                      <strong>{l.name}</strong>
                      <small>{l.address}</small>
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="co-location-copy co-width">
              <h2>Our locations.</h2>
              <p>
                With teams across Toronto, San Francisco, Dallas, Phoenix, and
                Pittsburgh, Waabi is expanding within major tech and logistics
                centers.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
