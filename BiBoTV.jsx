import { useState, useEffect, useRef } from "react";

// ─── Asset imports via data URIs (embedded images from uploads) ───────────────
// We'll reference the uploaded images via their public paths for preview
// In production these would be in src/assets/

const PROFILE_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png", // placeholder
];

// Social platform config
const SOCIALS = [
  {
    id: "youtube",
    label: "YouTube",
    sublabel: "@bibotv.official",
    url: "https://youtube.com/@bibotv.official?si=S66twYIPlXKwY0Ax",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.12)",
    border: "rgba(255,0,0,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    sublabel: "@bibotv.official",
    url: "https://www.instagram.com/bibotv.official?igsh=bGI3M2wzbzI3NDd2",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.12)",
    border: "rgba(225,48,108,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    sublabel: "@bibotv.official",
    url: "https://www.tiktok.com/@bibotv.official?_r=1&_t=ZS-95PiSodsuRe",
    color: "#ffffff",
    bg: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.79 1.52V6.86a4.83 4.83 0 01-1.02-.17z" />
      </svg>
    ),
  },
  {
    id: "kick",
    label: "Kick",
    sublabel: "bibotv",
    url: "https://kick.com/bibotv",
    color: "#53FC18",
    bg: "rgba(83,252,24,0.1)",
    border: "rgba(83,252,24,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M2 2h20v20H2V2zm4 4v12h4v-4l4 4h4l-5-6 5-6h-4l-4 4V6H6z"/>
      </svg>
    ),
  },
  {
    id: "spotify",
    label: "Spotify",
    sublabel: "BiBoTV",
    url: "https://open.spotify.com/artist/3E7qZxNnkWgyBv9ba2lzdx",
    color: "#1DB954",
    bg: "rgba(29,185,84,0.12)",
    border: "rgba(29,185,84,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    id: "onlyfans",
    label: "OnlyFans",
    sublabel: "Ekskluzivni sadržaj",
    url: null, // Opens modal
    color: "#00AFF0",
    bg: "rgba(0,175,240,0.12)",
    border: "rgba(0,175,240,0.3)",
    icon: (
      <img src="/mnt/user-data/uploads/3908.png" alt="OnlyFans" style={{ width: 24, height: 24, objectFit: "contain", filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)" }} />
    ),
  },
];

const HERO_ICON_SOCIALS = [
  { id: "youtube", color: "#FF0000", icon: SOCIALS[0].icon, url: SOCIALS[0].url },
  { id: "instagram", color: "#E1306C", icon: SOCIALS[1].icon, url: SOCIALS[1].url },
  { id: "tiktok", color: "#ffffff", icon: SOCIALS[2].icon, url: SOCIALS[2].url },
  { id: "kick", color: "#53FC18", icon: SOCIALS[3].icon, url: SOCIALS[3].url },
  { id: "onlyfans", color: "#00AFF0", icon: SOCIALS[5].icon, url: null },
];

const DISCOGRAPHY = [
  { title: "LAZANJE 2", year: "2025", emoji: "🍝" },
  { title: "ROBLOX GENG", year: "2025", emoji: "🎮" },
  { title: "HV4L4T1B0Ž3!", year: "2025", emoji: "🔥" },
  { title: "67", year: "2025", emoji: "🎵" },
  { title: "Lazanje", year: "2024", emoji: "🍝" },
];

const FALLBACK_VIDEOS = ["H9wmbDXOOqE", "qgYu_Bsox6Q", "5sKsL6J-xq0", "06HDVAkHMEw"];

// Uploaded profile images - map to the actual uploads
const PROFILE_IMGS = [
  "/mnt/user-data/uploads/3888.png", // angry camo jacket
  "/mnt/user-data/uploads/3889.png", // king tshirt
  "/mnt/user-data/uploads/3887.png", // shocked mouth open
  "/mnt/user-data/uploads/3886.png", // smirk face
  "/mnt/user-data/uploads/3890.png", // full body jump
];

export default function BiBoTV() {
  const [profileIdx, setProfileIdx] = useState(0);
  const [profileFading, setProfileFading] = useState(false);
  const [modalPhase, setModalPhase] = useState(null); // null | 'age-check' | 'reveal'
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [copied, setCopied] = useState(false);
  const feedRef = useRef(null);

  // Profile image rotation every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setProfileFading(true);
      setTimeout(() => {
        setProfileIdx((i) => (i + 1) % PROFILE_IMGS.length);
        setProfileFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load Curator.io embed
  useEffect(() => {
    if (!feedRef.current) return;
    const script = document.createElement("script");
    script.src =
      "https://cdn.curator.io/published/f6951b2f-c7ca-4df1-80a9-71409f0e0708.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);

  const openOnlyFans = () => setModalPhase("age-check");
  const handleAgeYes = () => setModalPhase("reveal");
  const handleAgeNo = () => setModalPhase(null);
  const closeModal = () => setModalPhase(null);

  const handleCopyCode = async () => {
    const code = `// BiBoTV Landing Page\n// Generated by Claude\n// Fetch full source from the artifact`;
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialClick = (s) => {
    if (s.id === "onlyfans") { openOnlyFans(); return; }
    window.open(s.url, "_blank", "noopener");
  };

  return (
    <div style={styles.root}>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        {/* Animated gradient background */}
        <div style={styles.heroBg} />
        <div style={styles.heroNoise} />
        <div style={styles.heroGrid} />

        <div style={styles.heroContent}>
          {/* Glow behind photo */}
          <div style={styles.glowRing} className="pulse-glow" />

          {/* Profile photo */}
          <div style={styles.profileWrap}>
            <img
              key={profileIdx}
              src={PROFILE_IMGS[profileIdx]}
              alt="BiBoTV"
              style={{
                ...styles.profileImg,
                opacity: profileFading ? 0 : 1,
                transform: profileFading
                  ? "scale(0.88) rotate(-6deg)"
                  : "scale(1) rotate(0deg)",
              }}
              className="profile-transition"
            />
            <div style={styles.profileRing} />
          </div>

          {/* Badge */}
          <div style={styles.badge} className="fade-up-1">
            🇭🇷 Zagreb, Croatia
          </div>

          {/* Title */}
          <h1 style={styles.title} className="fade-up-2">
            <span style={styles.titleGradient}>BiBo</span>
            <span style={styles.titleWhite}>TV</span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subtitle} className="fade-up-3">
            Video creator · <em>Ozbiljno neozbiljan</em>
          </p>

          {/* Hero social icons */}
          <div style={styles.heroIcons} className="fade-up-4">
            {HERO_ICON_SOCIALS.map((s) => (
              <button
                key={s.id}
                onClick={() => s.url ? window.open(s.url, "_blank", "noopener") : openOnlyFans()}
                style={{ ...styles.iconBtn, color: s.color }}
                className="icon-btn"
                aria-label={s.id}
              >
                {s.icon}
              </button>
            ))}
          </div>

          {/* Scroll hint */}
          <div style={styles.scrollHint} className="fade-up-4">
            <span style={styles.scrollDot} className="bounce" />
          </div>
        </div>
      </section>

      {/* ── PRATI ME ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleGradient}>Prati me</span>
          </h2>
          <div style={styles.divider} />
          <div style={styles.socialList}>
            {SOCIALS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSocialClick(s)}
                style={{
                  ...styles.socialCard,
                  borderColor: s.border,
                  background: s.bg,
                  animationDelay: `${i * 80}ms`,
                }}
                className="social-card"
              >
                <span style={{ ...styles.socialIcon, color: s.color }}>
                  {s.icon}
                </span>
                <div style={styles.socialText}>
                  <span style={styles.socialLabel}>{s.label}</span>
                  <span style={styles.socialSub}>{s.sublabel}</span>
                </div>
                <span style={{ ...styles.socialArrow, color: s.color }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAJNOVIJI POSTOVI ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            Najnoviji Postovi <span style={styles.emoji}>📱</span>
          </h2>
          <div style={styles.divider} />
          <div style={styles.curatorWrap}>
            <div id="curator-feed-default-feed-layout" ref={feedRef}>
              <a
                href="https://curator.io"
                className="crt-logo crt-tag"
                style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}
              >
                Powered by Curator.io
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUTUBE VIDEOS ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            <span style={{ color: "#FF0000" }}>▶</span>{" "}
            <span style={styles.titleGradient}>YouTube</span>
          </h2>
          <div style={styles.divider} />
          <div style={styles.videoScroll} className="no-scrollbar">
            {videos.map((id) => (
              <a
                key={id}
                href={`https://youtube.com/watch?v=${id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.videoCard}
                className="video-card"
              >
                <div style={styles.thumbWrap}>
                  <img
                    src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
                    alt="video"
                    style={styles.thumb}
                    loading="lazy"
                  />
                  <div style={styles.playOverlay} className="play-overlay">
                    <div style={styles.playBtn}>▶</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <a
            href="https://youtube.com/@bibotv.official"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.ytBtn}
            className="yt-btn"
          >
            Pogledaj sve videje →
          </a>
        </div>
      </section>

      {/* ── SPOTIFY ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            Slušaj na Spotifyu <span style={styles.emoji}>🎵</span>
          </h2>
          <div style={styles.divider} />
          <div style={styles.spotifyWrap}>
            <iframe
              title="Spotify BiBoTV"
              src="https://open.spotify.com/embed/artist/3E7qZxNnkWgyBv9ba2lzdx?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={styles.spotifyFrame}
            />
          </div>
        </div>
      </section>

      {/* ── DISKOGRAFIJA ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleGradient}>Diskografija</span>
          </h2>
          <div style={styles.divider} />
          <div style={styles.discoGrid}>
            {DISCOGRAPHY.map((d, i) => (
              <a
                key={i}
                href={`https://open.spotify.com/artist/3E7qZxNnkWgyBv9ba2lzdx`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.discoCard, animationDelay: `${i * 60}ms` }}
                className="disco-card"
              >
                <span style={styles.discoEmoji}>{d.emoji}</span>
                <span style={styles.discoTitle}>{d.title}</span>
                <span style={styles.discoYear}>{d.year}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerGrad} />
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <span style={styles.titleGradient}>BiBo</span>TV
          </div>
          <p style={styles.footerCopy}>
            © {new Date().getFullYear()} BiBoTV. Sva prava pridržana.
          </p>
          <p style={styles.footerMade}>Napravio Franko</p>
          <button
            onClick={handleCopyCode}
            style={styles.copyBtn}
            className="copy-btn"
          >
            {copied ? "✅ Kopirano!" : "📋 Kopiraj cijeli kod"}
          </button>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modalPhase && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div
            style={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
            className="modal-pop"
          >
            {modalPhase === "age-check" && (
              <>
                <div style={styles.modalEmoji}>🔞</div>
                <h3 style={styles.modalTitle}>Provjera dobi</h3>
                <p style={styles.modalText}>
                  Imaš li više od <strong>18 godina</strong>?
                </p>
                <div style={styles.modalBtns}>
                  <button
                    onClick={handleAgeYes}
                    style={styles.modalYes}
                    className="modal-btn"
                  >
                    ✅ Da, imam
                  </button>
                  <button
                    onClick={handleAgeNo}
                    style={styles.modalNo}
                    className="modal-btn"
                  >
                    ❌ Ne, nemam
                  </button>
                </div>
              </>
            )}
            {modalPhase === "reveal" && (
              <>
                <div style={styles.modalOfHeader}>
                  <span style={{ color: "#00AFF0", fontSize: 28 }}>⭕</span>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>
                    {" "}OnlyFans
                  </span>
                </div>
                <img
                  src="/mnt/user-data/uploads/3889.png"
                  alt="BiBoTV OF"
                  style={styles.ofImg}
                />
                <a
                  href="https://onlyfans.com/bibotv"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.ofLink}
                  className="modal-btn"
                >
                  Otvori OnlyFans →
                </a>
                <button onClick={closeModal} style={styles.modalClose}>
                  Zatvori
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const GRAD = "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)";
const GRAD2 = "linear-gradient(135deg, #7c3aed 0%, #2563eb 60%, #059669 100%)";

const styles = {
  root: {
    minHeight: "100vh",
    background: "#050510",
    color: "#fff",
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    overflowX: "hidden",
  },
  // HERO
  hero: {
    position: "relative",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.35) 0%, rgba(37,99,235,0.2) 40%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(5,150,105,0.2) 0%, transparent 60%)",
    zIndex: 0,
  },
  heroNoise: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
    zIndex: 0,
    opacity: 0.5,
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    zIndex: 0,
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 20px 40px",
    textAlign: "center",
    gap: 12,
  },
  glowRing: {
    position: "absolute",
    top: 50,
    width: 180,
    height: 180,
    borderRadius: "50%",
    background: GRAD2,
    filter: "blur(40px)",
    opacity: 0.5,
    zIndex: 0,
  },
  profileWrap: {
    position: "relative",
    width: 140,
    height: 140,
    borderRadius: "50%",
    zIndex: 1,
  },
  profileImg: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "top center",
    border: "3px solid rgba(167,139,250,0.5)",
    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
    transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    display: "block",
  },
  profileRing: {
    position: "absolute",
    inset: -4,
    borderRadius: "50%",
    border: "2px solid transparent",
    background: `linear-gradient(#050510, #050510) padding-box, ${GRAD} border-box`,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
  },
  title: {
    fontSize: "clamp(64px, 18vw, 96px)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    margin: 0,
    lineHeight: 1,
    fontFamily: "'Outfit', sans-serif",
  },
  titleGradient: {
    background: GRAD,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  titleWhite: {
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontWeight: 400,
    margin: 0,
    letterSpacing: "0.02em",
  },
  heroIcons: {
    display: "flex",
    gap: 10,
    marginTop: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  scrollHint: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  scrollDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.4)",
    display: "block",
  },
  // SECTION
  section: {
    padding: "60px 0",
    position: "relative",
  },
  sectionInner: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "0 20px",
  },
  sectionTitle: {
    fontSize: "clamp(26px, 6vw, 36px)",
    fontWeight: 800,
    margin: "0 0 8px",
    letterSpacing: "-0.03em",
  },
  divider: {
    height: 2,
    background: GRAD,
    borderRadius: 2,
    width: 60,
    marginBottom: 28,
  },
  emoji: { fontSize: "0.9em" },
  // SOCIAL LIST
  socialList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  socialCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    borderRadius: 16,
    border: "1px solid",
    backdropFilter: "blur(14px)",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    transition: "all 0.22s ease",
  },
  socialIcon: {
    flexShrink: 0,
    width: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  socialLabel: {
    fontWeight: 700,
    fontSize: 15,
    color: "#fff",
  },
  socialSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  socialArrow: {
    fontSize: 18,
    flexShrink: 0,
    opacity: 0.7,
  },
  // CURATOR
  curatorWrap: {
    minHeight: 200,
    borderRadius: 16,
    overflow: "hidden",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: 16,
  },
  // VIDEO
  videoScroll: {
    display: "flex",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 12,
    scrollSnapType: "x mandatory",
  },
  videoCard: {
    flexShrink: 0,
    width: 240,
    scrollSnapAlign: "start",
    borderRadius: 12,
    overflow: "hidden",
    display: "block",
    position: "relative",
  },
  thumbWrap: {
    position: "relative",
    aspectRatio: "16/9",
    overflow: "hidden",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  thumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
  },
  playOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0)",
    transition: "background 0.2s",
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#fff",
    transform: "scale(0)",
    transition: "transform 0.2s ease",
  },
  ytBtn: {
    display: "inline-block",
    marginTop: 16,
    padding: "10px 20px",
    borderRadius: 10,
    background: "rgba(255,0,0,0.15)",
    border: "1px solid rgba(255,0,0,0.3)",
    color: "#FF5555",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s ease",
  },
  // SPOTIFY
  spotifyWrap: {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(29,185,84,0.2)",
  },
  spotifyFrame: {
    display: "block",
    borderRadius: 16,
  },
  // DISCO
  discoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  discoCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "20px 12px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    textDecoration: "none",
    color: "#fff",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  },
  discoEmoji: { fontSize: 28 },
  discoTitle: { fontWeight: 700, fontSize: 13, textAlign: "center", letterSpacing: "0.05em" },
  discoYear: { fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 },
  // FOOTER
  footer: {
    position: "relative",
    padding: "60px 20px 40px",
    textAlign: "center",
    overflow: "hidden",
  },
  footerGrad: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  footerContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  footerLogo: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },
  footerCopy: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    margin: 0,
  },
  footerMade: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    margin: 0,
  },
  copyBtn: {
    marginTop: 12,
    padding: "10px 20px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
  },
  // MODAL
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    background: "rgba(10,10,20,0.95)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: "36px 28px",
    maxWidth: 360,
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  },
  modalEmoji: { fontSize: 48 },
  modalTitle: { fontSize: 22, fontWeight: 800, margin: 0 },
  modalText: { color: "rgba(255,255,255,0.7)", margin: 0, fontSize: 15 },
  modalBtns: { display: "flex", gap: 10, width: "100%", marginTop: 4 },
  modalYes: {
    flex: 1,
    padding: "12px",
    borderRadius: 12,
    background: "rgba(0,175,240,0.2)",
    border: "1px solid rgba(0,175,240,0.4)",
    color: "#00AFF0",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  modalNo: {
    flex: 1,
    padding: "12px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.6)",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  modalOfHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  ofImg: {
    width: "100%",
    maxWidth: 280,
    borderRadius: 16,
    objectFit: "cover",
    border: "1px solid rgba(0,175,240,0.3)",
  },
  ofLink: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: 12,
    background: "rgba(0,175,240,0.2)",
    border: "1px solid rgba(0,175,240,0.4)",
    color: "#00AFF0",
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  modalClose: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    cursor: "pointer",
    padding: "4px 8px",
  },
};

// ─── CSS animations ───────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }

  .pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.12); }
  }

  .profile-transition {
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }

  .fade-up-1 { animation: fadeUp 0.7s 0.1s both ease-out; }
  .fade-up-2 { animation: fadeUp 0.7s 0.2s both ease-out; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s both ease-out; }
  .fade-up-4 { animation: fadeUp 0.7s 0.4s both ease-out; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .bounce {
    animation: bounce 1.6s ease-in-out infinite;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(8px); opacity: 0.8; }
  }

  .icon-btn:hover {
    background: rgba(255,255,255,0.12) !important;
    transform: translateY(-2px) scale(1.08);
    box-shadow: 0 8px 20px rgba(124,58,237,0.3);
  }

  .social-card:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    filter: brightness(1.1);
  }

  .video-card:hover img {
    transform: scale(1.04);
  }
  .video-card:hover .play-overlay {
    background: rgba(0,0,0,0.4) !important;
  }
  .video-card:hover .play-overlay > div {
    transform: scale(1) !important;
  }

  .disco-card:hover {
    background: rgba(255,255,255,0.08) !important;
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
    border-color: rgba(167,139,250,0.3) !important;
  }

  .yt-btn:hover {
    background: rgba(255,0,0,0.25) !important;
    transform: translateY(-1px);
  }

  .copy-btn:hover {
    background: rgba(255,255,255,0.12) !important;
    color: #fff !important;
  }

  .modal-pop {
    animation: modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.85) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal-btn:hover {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  @media (min-width: 480px) {
    .disco-grid { grid-template-columns: repeat(3, 1fr); }
  }
`;
