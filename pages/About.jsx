import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTO_KEY = "greeshma_profile_photo";

const skills = [
  { name: "React.js",        level: 90, color: "#60a5fa" },
  { name: "JavaScript",      level: 88, color: "#fbbf24" },
  { name: "Three.js / WebGL",level: 75, color: "#a78bfa" },
  { name: "HTML & CSS",      level: 95, color: "#34d399" },
  { name: "GSAP Animations", level: 80, color: "#f472b6" },
  { name: "Tailwind CSS",    level: 85, color: "#38bdf8" },
  { name: "Node.js",         level: 65, color: "#4ade80" },
  { name: "Git & GitHub",    level: 82, color: "#fb923c" },
];

const tools = ["VS Code","Figma","Blender","Vite","Postman","Chrome DevTools"];

export default function About() {
  const pageRef = useRef();
  const [photo] = useState(() => {
    return localStorage.getItem(PHOTO_KEY) || "/greeshma.jpg";
  });

  useEffect(() => {
    // Simple fade in — no opacity stuck issue
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="about-page" id="about" ref={pageRef}>

      {/* ── About Header ── */}
      <div className="about-header">
        <div className="about-img-wrapper">
          <img src={photo} alt="Greeshma" className="about-photo" />
        </div>
        <div className="about-intro">
          <h1>About <span className="highlight">Me</span></h1>
          <p>
            I'm a passionate <strong>Frontend Engineer</strong> who loves building
            beautiful, performant, and interactive web experiences. From pixel-perfect
            UIs to immersive 3D scenes — I bring ideas to life on the web.
          </p>
          <p>
            Currently focused on React, Three.js, and creative web development.
            Always learning, always building.
          </p>
        </div>
      </div>

      {/* ── Skills ── */}
      <div className="skills-section">
        <h2 className="section-title">My <span className="highlight">Skills</span></h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.name}>
              <div className="skill-top">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%`, background: skill.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools ── */}
      <div className="tools-section">
        <h2 className="section-title">Tools I <span className="highlight">Use</span></h2>
        <div className="tools-grid">
          {tools.map((tool) => (
            <div className="tool-chip" key={tool}>{tool}</div>
          ))}
        </div>
      </div>

    </section>
  );
}
