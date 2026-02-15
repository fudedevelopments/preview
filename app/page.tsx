"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ────────────────────────────────────────────────────
   PARTICLES  — floating dots in the hero background
   ──────────────────────────────────────────────────── */
function Particles() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 35 }).map((_, i) => {
                const size = Math.random() * 5 + 2;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const dur = Math.random() * 6 + 4;
                const delay = Math.random() * 4;
                const colors = [
                    "rgba(244,63,94,0.5)",
                    "rgba(139,92,246,0.5)",
                    "rgba(6,182,212,0.4)",
                    "rgba(245,158,11,0.4)",
                ];
                const color = colors[i % colors.length];
                return (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            width: size,
                            height: size,
                            left: `${left}%`,
                            top: `${top}%`,
                            background: color,
                            animationDuration: `${dur}s`,
                            animationDelay: `${delay}s`,
                        }}
                    />
                );
            })}
        </div>
    );
}

/* ────────────────────────────────────────────────────
   USEREVEAL  — intersection-observer scroll trigger
   ──────────────────────────────────────────────────── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll(".reveal-hidden").forEach((child, i) => {
                        setTimeout(() => child.classList.add("revealed"), i * 120);
                    });
                    obs.unobserve(el);
                }
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

/* ────────────────────────────────────────────────────
   TYPEWRITER HOOK
   ──────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 55) {
    const [display, setDisplay] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            setDisplay(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(id);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);
    return { display, done };
}

/* ────────────────────────────────────────────────────
   MAIN PAGE
   ──────────────────────────────────────────────────── */
export default function Home() {
    const aboutRef = useReveal();
    const stepsRef = useReveal();
    const comingSoonRef = useReveal();
    const contactRef = useReveal();

    const tagline = "India's First Self-Design Customized Platform";
    const { display: typedText, done: typingDone } = useTypewriter(tagline, 50);

    /* Notify form */
    const [formData, setFormData] = useState({ name: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleNotify = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (formData.name && formData.phone) setSubmitted(true);
        },
        [formData]
    );

    /* Scroll-to helper */
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    /* ─── FEATURES DATA ─── */
    const features = [
        {
            icon: "🎨",
            title: "Design Your Own",
            desc: "Create unique, personalized gifts with our intuitive design studio. Your imagination is the only limit.",
        },
        {
            icon: "✨",
            title: "Premium Quality",
            desc: "We use top-grade materials and printing technology to make your designs look stunning.",
        },
        {
            icon: "🚀",
            title: "Fast Delivery",
            desc: "Quick turnaround times so your custom gifts arrive just when you need them.",
        },
        {
            icon: "💝",
            title: "Gift Wrapping",
            desc: "Beautiful gift packaging options to make your present extra special and memorable.",
        },
    ];

    /* ─── STEPS DATA ─── */
    const steps = [
        {
            num: "01",
            icon: "🛒",
            title: "Choose Your Product",
            desc: "Pick from our wide range of customizable gifts — mugs, t-shirts, phone cases, and more.",
        },
        {
            num: "02",
            icon: "🎨",
            title: "Customize It",
            desc: "Upload your photos, add text, choose colors. Make it truly yours with our design studio.",
        },
        {
            num: "03",
            icon: "📦",
            title: "Get It Delivered",
            desc: "We print, pack, and deliver your masterpiece right to your doorstep.",
        },
    ];

    return (
        <>
            {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════ */}
            <section
                id="hero"
                className="snap-section"
                style={{ background: "radial-gradient(ellipse at 50% 20%, #1a1030 0%, #0a0a0f 70%)" }}
            >
                <Particles />

                {/* Decorative gradient orbs */}
                <div
                    className="absolute rounded-full opacity-20 blur-3xl"
                    style={{
                        width: 500,
                        height: 500,
                        top: "-10%",
                        left: "-10%",
                        background: "radial-gradient(circle, #f43f5e, transparent 70%)",
                    }}
                />
                <div
                    className="absolute rounded-full opacity-15 blur-3xl"
                    style={{
                        width: 400,
                        height: 400,
                        bottom: "-5%",
                        right: "-5%",
                        background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
                    }}
                />

                <div className="relative z-10 flex flex-col items-center px-6 text-center">
                    {/* Brand name */}
                    <h1
                        className="anim-fade-scale mb-4"
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(3rem, 8vw, 6rem)",
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: "-2px",
                        }}
                    >
                        <span className="gradient-text">Tanzo</span>{" "}
                        <span style={{ color: "var(--text-primary)" }}>Gifts</span>
                    </h1>

                    {/* Typewriter tagline */}
                    <p
                        className="mb-3 text-lg md:text-xl"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-secondary)",
                            minHeight: "2rem",
                            maxWidth: 550,
                        }}
                    >
                        <span>{typedText}</span>
                        {!typingDone && <span className="typewriter-cursor" />}
                    </p>

                    {/* Sub-tagline */}
                    <p
                        className="anim-fade-up delay-5 mb-10 max-w-md text-sm md:text-base"
                        style={{
                            color: "var(--text-secondary)",
                            opacity: 0,
                            lineHeight: 1.7,
                        }}
                    >
                        We&apos;re building something magical — a platform where you design
                        your own gifts, your way. Stay tuned for the launch! 🎁
                    </p>

                    {/* CTA buttons */}
                    <div className="anim-fade-up delay-7 flex flex-col gap-4 sm:flex-row" style={{ opacity: 0 }}>
                        <button className="cta-btn" onClick={() => scrollTo("about")}>
                            Explore More ↓
                        </button>
                        <button
                            className="cta-btn"
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.15)",
                            }}
                            onClick={() => scrollTo("contact")}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className="anim-float absolute bottom-8 left-1/2 -translate-x-1/2"
                    style={{ opacity: 0.4, fontSize: "1.4rem" }}
                >
                    ↓
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
          SECTION 2 — ABOUT / FEATURES
          ═══════════════════════════════════════════════ */}
            <section
                id="about"
                ref={aboutRef}
                className="snap-section flex-col gap-16 px-6 py-20"
                style={{ background: "var(--bg-primary)" }}
            >
                <div className="reveal-hidden text-center" style={{ maxWidth: 700 }}>
                    <p
                        className="mb-3 text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "var(--accent-violet)" }}
                    >
                        What We Do
                    </p>
                    <h2
                        className="mb-4 text-3xl font-bold md:text-5xl"
                        style={{ fontFamily: "var(--font-heading)", lineHeight: 1.2 }}
                    >
                        <span className="gradient-text">India&apos;s First</span>{" "}
                        Self-Design Platform
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        We empower you to create one-of-a-kind personalized gifts using our
                        breakthrough design studio. No skills needed — just your creativity!
                    </p>
                </div>

                <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="reveal-hidden glass-card flex flex-col items-center p-8 text-center"
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <span className="mb-4 text-4xl">{f.icon}</span>
                            <h3
                                className="mb-2 text-lg font-bold"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {f.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
          ═══════════════════════════════════════════════ */}
            <section
                id="steps"
                ref={stepsRef}
                className="snap-section flex-col gap-14 px-6 py-20"
                style={{ background: "var(--bg-secondary)" }}
            >
                <div className="reveal-hidden text-center" style={{ maxWidth: 600 }}>
                    <p
                        className="mb-3 text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "var(--accent-cyan)" }}
                    >
                        How It Works
                    </p>
                    <h2
                        className="mb-3 text-3xl font-bold md:text-5xl"
                        style={{ fontFamily: "var(--font-heading)", lineHeight: 1.2 }}
                    >
                        Three Simple Steps
                    </h2>
                    <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                        From picking a product to receiving it at your door — it&apos;s that easy.
                    </p>
                </div>

                <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:justify-center md:gap-0">
                    {steps.map((s, i) => (
                        <div key={s.num} className="flex flex-col items-center md:flex-row">
                            <div
                                className="reveal-hidden glass-card flex w-full max-w-xs flex-col items-center p-8 text-center"
                                style={{ transitionDelay: `${i * 0.2}s` }}
                            >
                                <div
                                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                                    style={{
                                        background: "rgba(139,92,246,0.1)",
                                        border: "1px solid rgba(139,92,246,0.2)",
                                    }}
                                >
                                    {s.icon}
                                </div>
                                <span
                                    className="mb-1 text-xs font-bold uppercase tracking-widest"
                                    style={{ color: "var(--accent-violet)" }}
                                >
                                    Step {s.num}
                                </span>
                                <h3
                                    className="mb-2 text-lg font-bold"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {s.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {s.desc}
                                </p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="step-connector mx-4 my-4 md:my-0" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
          SECTION 4 — COMING SOON
          ═══════════════════════════════════════════════ */}
            <section
                id="launch"
                ref={comingSoonRef}
                className="snap-section flex-col gap-10 px-6 py-20"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, #1a1030 0%, #0a0a0f 70%)",
                }}
            >
                <div className="reveal-hidden relative flex items-center justify-center">
                    <div className="glow-ring" />
                    <div
                        className="absolute flex flex-col items-center justify-center"
                        style={{ width: 180, height: 180 }}
                    >
                        <span className="text-4xl">🚀</span>
                    </div>
                </div>

                <div className="reveal-hidden text-center" style={{ maxWidth: 550, transitionDelay: "0.2s" }}>
                    <h2
                        className="mb-4 text-4xl font-bold md:text-6xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <span className="gradient-text">Launching Soon</span>
                    </h2>
                    <p
                        className="mb-6 text-base md:text-lg"
                        style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                    >
                        We&apos;re putting the finishing touches on something truly special.
                        Be among the first to experience India&apos;s first self-design
                        customized gift platform!
                    </p>
                    <button className="cta-btn" onClick={() => scrollTo("contact")}>
                        Get Notified 🔔
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
          SECTION 5 — CONTACT
          ═══════════════════════════════════════════════ */}
            <section
                id="contact"
                ref={contactRef}
                className="snap-section flex-col gap-12 px-6 py-20"
                style={{ background: "var(--bg-primary)" }}
            >
                <div className="reveal-hidden text-center" style={{ maxWidth: 500 }}>
                    <p
                        className="mb-3 text-sm font-semibold uppercase tracking-widest"
                        style={{ color: "var(--accent-rose)" }}
                    >
                        Get In Touch
                    </p>
                    <h2
                        className="mb-4 text-3xl font-bold md:text-5xl"
                        style={{ fontFamily: "var(--font-heading)", lineHeight: 1.2 }}
                    >
                        <span className="gradient-text">Connect With Us</span>
                    </h2>
                    <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                        Have questions or want to know more? Reach out — we&apos;d love to
                        hear from you!
                    </p>
                </div>

                {/* Contact cards */}
                <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Phone */}
                    <a
                        href="tel:+917904329569"
                        className="reveal-hidden glass-card flex items-center gap-4 px-8 py-6"
                        style={{ textDecoration: "none", color: "inherit", transitionDelay: "0.1s" }}
                    >
                        <div
                            className="contact-icon"
                            style={{
                                background: "rgba(244,63,94,0.12)",
                                border: "1px solid rgba(244,63,94,0.25)",
                                color: "var(--accent-rose)",
                            }}
                        >
                            📞
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                                Phone
                            </p>
                            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                                7904329569
                            </p>
                        </div>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://instagram.com/tanzo_gifts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reveal-hidden glass-card flex items-center gap-4 px-8 py-6"
                        style={{ textDecoration: "none", color: "inherit", transitionDelay: "0.2s" }}
                    >
                        <div
                            className="contact-icon"
                            style={{
                                background: "rgba(139,92,246,0.12)",
                                border: "1px solid rgba(139,92,246,0.25)",
                                color: "var(--accent-violet)",
                            }}
                        >
                            📸
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                                Instagram
                            </p>
                            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                                @tanzo_gifts
                            </p>
                        </div>
                    </a>
                </div>

                {/* Get Notified Form */}
                <div
                    className="reveal-hidden glass-card w-full max-w-md p-8"
                    style={{ transitionDelay: "0.3s" }}
                >
                    <h3
                        className="mb-2 text-center text-xl font-bold"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Get Notified on Launch 🔔
                    </h3>
                    <p
                        className="mb-6 text-center text-sm"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Leave your info and we&apos;ll let you know the moment we go live!
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleNotify} className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="notify-input"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, name: e.target.value }))
                                }
                                required
                            />
                            <input
                                type="tel"
                                className="notify-input"
                                placeholder="Your Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, phone: e.target.value }))
                                }
                                required
                            />
                            <button type="submit" className="cta-btn mt-2 w-full">
                                Notify Me 🚀
                            </button>
                        </form>
                    ) : (
                        <div className="anim-fade-scale flex flex-col items-center gap-3 py-4 text-center">
                            <span className="text-5xl">🎉</span>
                            <p className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                                You&apos;re on the list!
                            </p>
                            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                We&apos;ll reach out to you as soon as we launch. Thank you,{" "}
                                <strong>{formData.name}</strong>!
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p
                    className="reveal-hidden mt-8 text-center text-xs"
                    style={{ color: "var(--text-secondary)", transitionDelay: "0.4s" }}
                >
                    © 2026 Tanzo Gifts. All rights reserved. Made with ❤️ in India.
                </p>
            </section>
        </>
    );
}
