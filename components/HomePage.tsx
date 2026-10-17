"use client";
import { useEffect, useRef, useState } from "react";
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
    [heroIntro, setHeroIntro] = useState(true),
    [scaleEntered, setScaleEntered] = useState(false),
    [partnerPaused, setPartnerPaused] = useState(false);
  const scaleSection = useRef<HTMLElement>(null),
    rail = useRef<HTMLDivElement>(null),
    hero = useRef<HTMLElement>(null),
    road = useRef<HTMLElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => setHeroIntro(false), 1900);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let ticking = false;
    const scroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = scaleSection.current?.getBoundingClientRect();
        if (rect && innerWidth >= 768) {
          const p = Math.max(0, Math.min(0.999, -rect.top / innerHeight));
          setScaleEntered(p > 0.18);
          setScale(Math.min(2, Math.floor((Math.max(0, p - 0.3) / 0.7) * 3)));
        }
        const h = hero.current?.getBoundingClientRect();
        if (h)
          hero.current?.style.setProperty(
            "--hero-fade",
            String(Math.max(0, Math.min(1, 1 + h.top / innerHeight / 1.2))),
          );
        const r = road.current?.getBoundingClientRect();
        if (r)
          road.current?.style.setProperty(
            "--road-progress",
            String(
              Math.max(
                0,
                Math.min(1, (innerHeight - r.top) / (innerHeight * 1.1)),
              ),
            ),
          );
        ticking = false;
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (partnerPaused || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = setInterval(
      () => setPartner((value) => (value + 1) % partners.length),
      10000,
    );
    return () => clearInterval(timer);
  }, [partner, partnerPaused]);
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
            <Film name="WAABI_27s_2K_antinomy_export_250823.mp4" />
            <div className="home-hero-shade" />
            <p className={`home-hero-intro ${heroIntro ? "is-visible" : ""}`}>
              Waabi is pioneering the future of Physical AI.
            </p>
            <h1 className={heroIntro ? "is-entering" : ""}>
              Built to think.
              <br />
              Born to haul.
            </h1>
            <a
              className="home-scroll-dot"
              href="#our-road"
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
                <div key={item[0]} className={i === scale ? "is-active" : ""}>
                  <Film name={item[2]} />
                </div>
              ))}
            </div>
            <div className="home-scale-copy">
              <div className="home-scale-heading">
                <h2>Unlocking scale in the real world.</h2>
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
              <h2>The technology behind Waabi.</h2>
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
            <h2>
              Setting new
              <br />
              standards for
              <br />
              AV safety.
            </h2>
            <p>
              For us, safety isn&apos;t a box to check—it&apos;s a commitment we{" "}
              <strong>strengthen daily with</strong> a simulation-first
              approach, rigorous validation, and a culture where safety is
              everyone&apos;s job.
            </p>
            <a className="home-pill" href="/safety">
              Explore our approach
            </a>
          </div>
        </section>
        <section
          className={`home-partners ${partnerPaused ? "is-paused" : ""}`}
          onMouseEnter={() => setPartnerPaused(true)}
          onMouseLeave={() => setPartnerPaused(false)}
          onFocusCapture={() => setPartnerPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setPartnerPaused(false);
          }}
        >
          <div className="home-partners-intro">
            <h2>
              <span>Trusted by</span> <span>the best in</span>{" "}
              <span>the industry.</span>
            </h2>
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
                {current.review}
              </blockquote>
              <p className="home-partner-author">
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
            <h2>Insights.</h2>
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
          <h2>Build Physical AI with us.</h2>
          <a className="home-pill" href="https://waabi.ai/careers">
            Join the team
          </a>
          <div className="home-careers-collage">
            {[
              "1760350326-waabi_portrait_felicia_00336_final.webp",
              "1760350326-waabi_scout_00761_final.webp",
              "1761184004-251006_waabi_collab_05_1012_a.webp",
              "1760350326-waabi_inspection_02613_final.webp",
            ].map((name, i) => (
              <img
                src={media(name)}
                key={name}
                alt={
                  [
                    "A Waabi team member",
                    "Waabi trucks on the road",
                    "The Waabi team collaborating",
                    "A team member inspecting a Waabi truck",
                  ][i]
                }
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
