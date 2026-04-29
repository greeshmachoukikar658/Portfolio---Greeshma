import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Scene from "../components/Scene";

const PHOTO_KEY    = "greeshma_profile_photo";
const STORAGE_KEY  = "greeshma_projects";

export default function Home() {
  const leftRef      = useRef();
  const fileInputRef = useRef();

  const [photo, setPhoto] = useState(
    () => localStorage.getItem(PHOTO_KEY) || "/greeshma.jpg"
  );
  const [showHint, setShowHint] = useState(false);

  // Auto-count projects from localStorage
  const getProjectCount = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).length : 3;
    } catch { return 3; }
  };

  const [projectCount, setProjectCount] = useState(getProjectCount);

  // Refresh count when window gets focus (user comes back from projects page)
  useEffect(() => {
    const refresh = () => setProjectCount(getProjectCount());
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  /* ── photo ── */
  const handlePhotoClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target.result);
      localStorage.setItem(PHOTO_KEY, ev.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const stats = [
    { num: `${projectCount}`,  label: "Projects Built",  icon: "🚀" },
    { num: "5+",               label: "Technologies",    icon: "⚡" },
    { num: "Fresher",          label: "Experience Level",icon: "🌱" },
  ];

  return (
    <section className="hero" id="home">

      <div className="left" ref={leftRef}>

        {/* ── Profile ── */}
        <div className="profile-block">
          <div
            className="profile-img-wrapper clickable-photo"
            onClick={handlePhotoClick}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            title="Click to change photo"
          >
            <img src={photo} alt="Greeshma" className="profile-photo" />
            <div className={`photo-overlay ${showHint ? "visible" : ""}`}>
              <span className="photo-overlay-icon">📷</span>
              <span className="photo-overlay-text">Change</span>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handleFileChange} />
          <div className="profile-badge">Frontend Engineer</div>
        </div>

        {/* ── Name ── */}
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Greeshma</span>
        </h1>

        {/* ── Bio ── */}
        <p className="hero-sub">
          A passionate <span className="hero-sub-bright">Frontend Engineer</span> who builds
          immersive <span className="hero-sub-bright">3D + Web experiences</span> using{" "}
          <span className="hero-sub-bright">React</span>,{" "}
          <span className="hero-sub-bright">Three.js</span> &amp;{" "}
          <span className="hero-sub-bright">modern UI</span> — turning ideas into
          beautiful, fast interfaces.
        </p>

        {/* ── Stats ── */}
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-group">
              <div className="stat">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
              {i < stats.length - 1 && <div className="stat-divider" />}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="hero-btns">
          <a href="/projects" className="btn-primary">View Projects</a>
          <a href="/contact" className="btn-outline">Contact Me</a>
        </div>

      </div>

      <div className="right">
        <Scene />
      </div>

    </section>
  );
}
