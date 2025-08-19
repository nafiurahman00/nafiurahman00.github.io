import React, { useEffect, useState } from "react";

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch("/achievements.json")
      .then((res) => {
        console.log("Achievements fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Achievements data:", data);
        setAchievements(data);
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  return (
    <section id="achievements" style={{ marginBottom: "3rem" }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: "2.2rem", 
        marginBottom: "2rem",
        color: "var(--accent)",
        textAlign: "center",
        position: "relative"
      }}>
        Achievements
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
      <div style={{ 
        background: "var(--card-bg)", 
        padding: "2rem", 
        borderRadius: "15px", 
        boxShadow: "0 8px 25px var(--shadow)",
        border: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: "linear-gradient(180deg, #ffd700, var(--accent))",
        }}></div>
        <ul style={{ paddingLeft: "2rem", margin: 0 }}>
          {achievements.map((ach, idx) => (
            <li 
              key={idx} 
              style={{ 
                marginBottom: "1rem", 
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "var(--text)",
                position: "relative",
                padding: "0.5rem 0",
                borderBottom: idx < achievements.length - 1 ? "1px solid var(--border)" : "none"
              }}
            >
              <span style={{
                color: "#ffd700",
                marginRight: "0.5rem",
                fontSize: "1.2rem"
              }}>
                🏆
              </span>
              {ach}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Achievements;
