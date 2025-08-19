import React, { useEffect, useState } from "react";

function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/profile.json")
      .then((res) => res.json())
      .then(setProfile)
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!profile) return null;

  return (
    <footer style={{
      background: "var(--card-bg)",
      borderTop: "1px solid var(--border)",
      padding: "3rem 2rem 2rem",
      marginTop: "4rem",
      textAlign: "center"
    }}>
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "var(--text)"
        }}>
          Get In Touch
        </h3>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2rem"
        }}>
          <a
            href={`mailto:${profile.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              padding: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-envelope" style={{ fontSize: "1.2rem" }}></i>
            {profile.email}
          </a>

          <a
            href={`tel:${profile.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              padding: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-phone" style={{ fontSize: "1.2rem" }}></i>
            {profile.phone}
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              padding: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fab fa-linkedin" style={{ fontSize: "1.2rem" }}></i>
            LinkedIn
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              padding: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fab fa-github" style={{ fontSize: "1.2rem" }}></i>
            GitHub
          </a>
        </div>

        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          color: "var(--text)",
          opacity: 0.7,
          fontSize: "0.95rem"
        }}>
          <p style={{ margin: 0 }}>
            © 2025 Md Nafiu Rahman. All rights reserved.
          </p>
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem" }}>
            Built with React • Designed with passion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
