import React, { useEffect, useState } from "react";

function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("/education.json")
      .then((res) => {
        console.log("Education fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Education data:", data);
        setEducation(data);
      })
      .catch((error) => {
        console.error("Error fetching education data:", error);
      });
  }, []);

  return (
    <section id="education" style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: "2.2rem", 
        marginBottom: "2rem",
        color: "var(--accent)",
        textAlign: "center",
        position: "relative"
      }}>
        Education
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
        {education.map((ed, idx) => (
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
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 35px var(--shadow)";
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
              background: `linear-gradient(180deg, var(--accent), ${idx % 2 === 0 ? '#ff6b6b' : '#4ecdc4'})`,
            }}></div>
            <h3 style={{ 
              fontSize: "1.3rem", 
              fontWeight: 700, 
              marginBottom: "0.5rem",
              color: "var(--text)"
            }}>
              {ed.degree}
            </h3>
            <p style={{ 
              fontSize: "1.1rem", 
              color: "var(--accent)", 
              fontWeight: 600,
              marginBottom: "0.5rem"
            }}>
              {ed.institution}
            </p>
            <p style={{ 
              fontSize: "1rem", 
              color: "var(--text)", 
              opacity: 0.8,
              marginBottom: "0.5rem"
            }}>
              {ed.details}
            </p>
            <p style={{ 
              fontSize: "0.95rem", 
              color: "var(--text)", 
              opacity: 0.6,
              fontStyle: "italic"
            }}>
              {ed.year}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
