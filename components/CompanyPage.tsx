"use client";
import { useEffect, useRef, useState } from "react";
import { Header, Footer, CookieConsent } from "./SiteChrome";
import "./company.css";
import { insights } from "./insights-data";
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
function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const paragraphs = [
    "In 2021, AI visionary Raquel Urtasun founded Waabi with an unwavering belief that Physical AI could revolutionize how humanity moves and connects.",
    "What began as a bold dream has become something far greater. Waabi is a global force pioneering a breakthrough approach that demonstrates autonomous vehicles can be scalable, efficient, and safe.",
  ];
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      if (!ref.current) return;
      const words = ref.current.querySelectorAll<HTMLElement>(".co-word");
      const progress =
        (innerHeight * 0.9 - ref.current.getBoundingClientRect().top) /
        (ref.current.offsetHeight + innerHeight * 0.35);
      words.forEach((word, i) => {
        word.style.color =
          reduced || progress > i / words.length ? "#191818" : "#ffe5ee";
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <section id="our-story" className="co-story">
      <div ref={ref}>
        {paragraphs.map((p) => (
          <p key={p}>
            {p.split(" ").map((w, i) => (
              <span className="co-word" key={i}>
                {w}{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
export default function CompanyPage() {
  const quoteRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const el = quoteRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
      );
      el.style.setProperty("--co-parallax", `${-12 + progress * 24}%`);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
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
        <section className="co-hero">
          <img
            src={A + "1760350326-waabi_washstation_03082_final.webp"}
            alt="Waabi truck being prepared for the road"
          />
          <div className="co-hero-shade" />
          <div className="co-hero-content">
            <h1>
              We built our
              <br className="co-desktop-break" /> own road.
            </h1>
            <button
              aria-label="Scroll Down"
              onClick={() =>
                document
                  .getElementById("our-story")
                  ?.scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "instant"
                      : "smooth",
                  })
              }
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
          <div className="co-portraits">
            <img
              src={A + "1761188599-251006_waabi_ashwin_kumar_0866.webp"}
              alt="Waabi team member"
            />
            <img
              src={A + "1761700499-251006_waabi_collab_02_0612.webp"}
              alt="Waabi teammates collaborating"
            />
          </div>
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
            className="co-logo-window"
            tabIndex={0}
            aria-label="Waabi investors"
          >
            <div className="co-logo-track">
              {[...logos, ...logos].map(([file, alt], i) => (
                <div className="co-logo" key={i}>
                  <img src={A + file} alt={i < logos.length ? alt : ""} />
                </div>
              ))}
            </div>
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
