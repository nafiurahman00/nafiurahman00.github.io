import React, { useEffect, useState } from "react";

function Research() {
  const [research, setResearch] = useState([]);

  useEffect(() => {
    fetch("/research.json")
      .then((res) => {
        console.log("Research fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Research data:", data);
        setResearch(data);
      })
      .catch((error) => {
        console.error("Error fetching research data:", error);
      });
  }, []);

  return (
    <section id="research" style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: "2.2rem", 
        marginBottom: "2rem",
        color: "var(--accent)",
        textAlign: "center",
        position: "relative"
      }}>
        Research Experience
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
        {research.map((item, idx) => (
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
              background: `linear-gradient(180deg, #ff6b6b, ${idx % 2 === 0 ? 'var(--accent)' : '#4ecdc4'})`,
            }}></div>
            <h3 style={{ 
              fontSize: "1.3rem", 
              fontWeight: 700, 
              marginBottom: "1rem",
              color: "var(--text)"
            }}>
              {item.title}
            </h3>
            <p style={{ 
              fontSize: "1.05rem", 
              color: "var(--text)", 
              opacity: 0.8,
              lineHeight: "1.6",
              marginBottom: "1rem"
            }}>
              {item.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center" }}>
              <span style={{ 
                fontSize: "0.95rem", 
                color: "var(--accent)", 
                fontWeight: 600,
                background: "var(--background)",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                border: "1px solid var(--border)"
              }}>
                {item.year}
              </span>
              <span style={{ 
                fontSize: "0.9rem", 
                color: item.status === "Published" ? "#28a745" : item.status.includes("Accepted") ? "#ffc107" : "#6c757d", 
                fontWeight: 600,
                background: "var(--background)",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                border: "1px solid var(--border)"
              }}>
                {item.status}
              </span>
              {item.arxivLink && (
                <a 
                  href={item.arxivLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    padding: "0.3rem 0.5rem",
                    borderRadius: "4px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--accent)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--text)";
                    e.target.style.transform = "translateY(0)";
                  }}
                  title="View on arXiv"
                >
                  📄 arXiv
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Research;
