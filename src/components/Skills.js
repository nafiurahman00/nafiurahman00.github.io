import React, { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    fetch("/skills.json")
      .then((res) => {
        console.log("Skills fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Skills data:", data);
        setSkills(data);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  }, []);

  if (!skills) return null;

  return (
    <section id="skills" style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: "2.2rem", 
        marginBottom: "2rem",
        color: "var(--accent)",
        textAlign: "center",
        position: "relative"
      }}>
        Skills & Interests
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
      
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {[
          { title: "Research Interests", items: skills.researchInterests, type: "list" },
          { title: "Technical Skills", items: skills.technicalSkills, type: "tags" },
          { title: "Database Skills", items: skills.databaseSkills, type: "tags" },
          { title: "Full-Stack Development", items: skills.fullStack, type: "tags" },
          { title: "Programming Languages", items: skills.programmingLanguages, type: "tags" },
          { title: "Languages", items: skills.languages, type: "list" },
          { title: "Coursework", items: skills.coursework, type: "tags" }
        ].map((section, idx) => (
          <div 
            key={idx}
            style={{
              background: "var(--card-bg)", 
              padding: "2rem", 
              borderRadius: "15px", 
              boxShadow: "0 8px 25px var(--shadow)",
              border: "1px solid var(--border)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 30px var(--shadow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px var(--shadow)";
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              background: `linear-gradient(180deg, ${idx % 3 === 0 ? 'var(--accent)' : idx % 3 === 1 ? '#ff6b6b' : '#4ecdc4'}, var(--accent))`,
            }}></div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: "1.2rem", 
              marginBottom: "1rem",
              color: "var(--text)"
            }}>
              {section.title}
            </h3>
            {section.type === "list" ? (
              <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ 
                    marginBottom: "0.5rem", 
                    color: "var(--text)", 
                    opacity: 0.8,
                    lineHeight: "1.5"
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
                {section.items.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx} 
                    style={{ 
                      background: "var(--background)", 
                      padding: "0.6rem 1.2rem", 
                      borderRadius: "25px", 
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "var(--accent)";
                      e.target.style.color = "white";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "var(--background)";
                      e.target.style.color = "var(--text)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
