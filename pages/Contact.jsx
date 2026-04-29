import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const pageRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-page" id="contact" ref={pageRef}>

      <div className="page-header">
        <h1>Get In <span className="highlight">Touch</span></h1>
        <p className="page-sub">Have a project in mind? Let's build something amazing together.</p>
      </div>

      <div className="contact-wrapper">

        {/* Info */}
        <div className="contact-info">
          {[
            { icon: "📧", label: "Email",    value: "greeshmachoukikar@gmail.com",       href: "mailto:greeshmachoukikar@gmail.com" },
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/greeshma-choukikar", href: "https://www.linkedin.com/in/greeshma-choukikar-093a362b6" },
            { icon: "🐙", label: "GitHub",   value: "github.com/greeshma",               href: "https://github.com/greeshma" },
            { icon: "📍", label: "Location", value: "India",                              href: null },
          ].map((item) => (
            <div className="contact-card" key={item.label}>
              <div className="contact-icon">{item.icon}</div>
              <div>
                <h4>{item.label}</h4>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="contact-link">
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent && (
            <div className="success-msg">✅ Message sent! I'll get back to you soon.</div>
          )}
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" placeholder="John Doe"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="john@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows={5} placeholder="Tell me about your project..."
              value={form.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary full-width">
            Send Message 🚀
          </button>
        </form>

      </div>
    </section>
  );
}
