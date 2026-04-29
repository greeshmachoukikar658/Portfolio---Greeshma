import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const defaultProjects = [
  {
    id: 1,
    title: "3D Portfolio",
    desc: "Interactive 3D portfolio built with React, Three.js, and GSAP animations. Features scroll-based 3D model transitions.",
    tags: ["React", "Three.js", "GSAP"],
    color: "#60a5fa",
    live: "",
    github: "",
  },
  {
    id: 2,
    title: "E-Commerce UI",
    desc: "Modern e-commerce frontend with product filters, cart, and smooth animations. Fully responsive design.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    color: "#38bdf8",
    live: "",
    github: "",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    desc: "Real-time weather app with dynamic backgrounds, location search, and 7-day forecast using OpenWeather API.",
    tags: ["React", "API", "CSS"],
    color: "#a78bfa",
    live: "",
    github: "",
  },
];

const COLORS = [
  "#60a5fa","#38bdf8","#a78bfa","#34d399",
  "#f472b6","#fb923c","#facc15","#4ade80",
];

const STORAGE_KEY = "greeshma_projects";

function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProjects;
  } catch { return defaultProjects; }
}

function saveProjects(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function Projects() {
  const pageRef  = useRef();
  const cardsRef = useRef([]);

  const [projects,    setProjects]    = useState(loadProjects);
  const [showModal,   setShowModal]   = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);

  const emptyForm = { title:"", desc:"", tagsInput:"", color: COLORS[0], live:"", github:"" };
  const [form,   setForm]   = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* ── animations — fromTo so opacity never gets stuck ── */
  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, delay: i * 0.07, ease: "power2.out" }
      );
    });
  }, [projects]);

  /* ── modal helpers ── */
  const openAdd = () => {
    setEditProject(null); setForm(emptyForm); setErrors({}); setShowModal(true);
  };
  const openEdit = (p) => {
    setEditProject(p);
    setForm({ title: p.title, desc: p.desc, tagsInput: p.tags.join(", "),
              color: p.color, live: p.live||"", github: p.github||"" });
    setErrors({}); setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false); setEditProject(null); setForm(emptyForm); setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.desc.trim())  e.desc  = "Description is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const tags = form.tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    let updated;

    if (editProject) {
      updated = projects.map(p =>
        p.id === editProject.id
          ? { ...p, title: form.title, desc: form.desc, tags,
              color: form.color, live: form.live, github: form.github }
          : p
      );
    } else {
      updated = [...projects, {
        id: Date.now(), title: form.title, desc: form.desc,
        tags, color: form.color, live: form.live, github: form.github,
      }];
    }
    setProjects(updated); saveProjects(updated); closeModal();
  };

  const handleDelete = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated); saveProjects(updated); setDeleteId(null);
  };

  return (
    <section className="projects-page" id="projects" ref={pageRef}>

      {/* ── Header ── */}
      <div className="page-header">
        <h1>My <span className="highlight">Projects</span></h1>
        <p className="page-sub">Things I've built — from 3D experiences to production-ready UIs.</p>
        <button className="btn-primary add-project-btn" onClick={openAdd}>
          + Add Project
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div
            className="project-card"
            key={project.id}
            ref={el => (cardsRef.current[i] = el)}
          >
            {/* Top color bar */}
            <div className="project-color-bar" style={{ background: project.color }} />

            {/* Content */}
            <div className="project-content">
              <h3 className="project-title" style={{ color: project.color }}>
                {project.title}
              </h3>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tags">
                {project.tags.map(tag => (
                  <span className="tag" key={tag}
                    style={{ borderColor: project.color, color: project.color }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.live
                  ? <a href={project.live} target="_blank" rel="noreferrer" className="btn-sm">Live Demo</a>
                  : <span className="btn-sm btn-sm-disabled">Live Demo</span>
                }
                {project.github
                  ? <a href={project.github} target="_blank" rel="noreferrer" className="btn-sm-outline">GitHub</a>
                  : <span className="btn-sm-outline btn-sm-disabled">GitHub</span>
                }
                <button className="btn-icon" onClick={() => openEdit(project)} title="Edit">✏️</button>
                <button className="btn-icon btn-icon-del" onClick={() => setDeleteId(project.id)} title="Delete">🗑️</button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="empty-state">
            <p>No projects yet.</p>
            <button className="btn-primary" onClick={openAdd}>+ Add Your First Project</button>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editProject ? "Edit Project" : "Add New Project"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title *</label>
                <input type="text" placeholder="e.g. My Portfolio"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})} />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea rows={3} placeholder="What does this project do?"
                  value={form.desc}
                  onChange={e => setForm({...form, desc: e.target.value})} />
                {errors.desc && <span className="form-error">{errors.desc}</span>}
              </div>

              <div className="form-group">
                <label>Tags <span className="label-hint">(comma separated)</span></label>
                <input type="text" placeholder="React, Node.js, CSS"
                  value={form.tagsInput}
                  onChange={e => setForm({...form, tagsInput: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Card Color</label>
                <div className="color-picker">
                  {COLORS.map(c => (
                    <button type="button" key={c}
                      className={`color-dot ${form.color === c ? "selected" : ""}`}
                      style={{ background: c }}
                      onClick={() => setForm({...form, color: c})} />
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Live URL</label>
                  <input type="url" placeholder="https://..."
                    value={form.live}
                    onChange={e => setForm({...form, live: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input type="url" placeholder="https://github.com/..."
                    value={form.github}
                    onChange={e => setForm({...form, github: e.target.value})} />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {editProject ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <h3>Delete Project?</h3>
            <p style={{ color:"#9ca3af", marginTop:8, marginBottom:24 }}>
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
