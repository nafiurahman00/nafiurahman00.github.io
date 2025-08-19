import React, { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => {
        console.log("Projects fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Projects data:", data);
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
  }, []);

  return (
    <section id="projects" style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: "2.2rem", 
        marginBottom: "2rem",
        color: "var(--accent)",
        textAlign: "center",
        position: "relative"
      }}>
        Projects
        <div style={{
          position: "absolute",
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "3px",
          background: "linear-gradient(90deg, var(--accent), #ff6b6b)",
          borderRadius: "2px"
        }}></div>
      </h2>
      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            style={{ 
              background: "var(--card-bg)", 
              padding: "2rem", 
              borderRadius: "15px", 
              boxShadow: "0 8px 25px var(--shadow)",
              border: "1px solid var(--border)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 40px var(--shadow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px var(--shadow)";
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              background: `linear-gradient(180deg, #4ecdc4, ${idx % 2 === 0 ? 'var(--accent)' : '#ff6b6b'})`,
            }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <h3 style={{ 
                fontSize: "1.4rem", 
                fontWeight: 700, 
                color: "var(--text)",
                margin: 0
              }}>
                {project.name}
              </h3>
              {project.githubLink && (
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text)",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease",
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
                  title="View on GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "var(--text)", 
              opacity: 0.8,
              lineHeight: "1.6",
              marginBottom: "1.5rem"
            }}>
              {project.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.technologies.map((tech, techIdx) => (
                <span 
                  key={techIdx} 
                  style={{ 
                    background: "var(--background)", 
                    padding: "0.4rem 0.8rem", 
                    borderRadius: "20px", 
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
