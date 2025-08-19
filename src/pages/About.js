import React, { useEffect, useState } from "react";

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/profile.json")
      .then((res) => res.json())
      .then(setProfile)
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <main style={{ maxWidth: 1000, margin: "2rem auto", padding: "0 2rem" }}>
      <section style={{ 
        marginBottom: "3rem", 
        background: "var(--card-bg)", 
        borderRadius: "20px", 
        boxShadow: "0 10px 30px var(--shadow)", 
        padding: "3rem",
        border: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, var(--accent), #ff6b6b, #4ecdc4)",
        }}></div>
        <h1 style={{ 
          fontWeight: 800, 
          fontSize: "3.2rem", 
          marginBottom: "1rem", 
          letterSpacing: "2px",
          background: "linear-gradient(135deg, var(--accent), #ff6b6b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {profile.name}
        </h1>
        <h2 style={{ 
          fontWeight: 600, 
          fontSize: "1.5rem", 
          marginBottom: "1.5rem", 
          color: "var(--accent)",
          opacity: 0.9
        }}>
          {profile.title}
        </h2>
        <p style={{ 
          fontSize: "1.2rem", 
          marginBottom: "2rem", 
          lineHeight: "1.7",
          color: "var(--text)",
          opacity: 0.8
        }}>
          {profile.bio}
        </p>
      </section>
    </main>
  );
}

export default About;
