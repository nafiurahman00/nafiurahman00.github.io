import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ theme, setTheme }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "About" },
    { path: "/education", label: "Education" },
    { path: "/research", label: "Research" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/achievements", label: "Achievements" }
  ];

  return (
    <nav className="navbar" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "var(--background)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 10px var(--shadow)"
    }}>
      <Link 
        to="/"
        className="navbar-brand"
        style={{ 
          fontWeight: 700, 
          fontSize: "1.4rem", 
          letterSpacing: "1px",
          background: "linear-gradient(135deg, var(--accent), #ff6b6b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none"
        }}
      >
        Nafiu | CS Portfolio
      </Link>
      
      {/* Desktop Navigation */}
      <div className="desktop-nav" style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "2rem"
      }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...navLinkStyle,
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--text)",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = "var(--accent)";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "var(--text)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            background: "var(--accent)",
            border: "none",
            borderRadius: "25px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            fontWeight: 600,
            color: "white",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--accent-hover)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "var(--accent)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.3)";
          }}
          aria-label="Toggle dark/light mode"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav" style={{ 
        display: "none", 
        alignItems: "center", 
        gap: "1rem"
      }}>
        {/* Mobile Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            background: "var(--accent)",
            border: "none",
            borderRadius: "20px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: 600,
            color: "white",
            fontSize: "0.9rem",
            transition: "all 0.3s ease"
          }}
          aria-label="Toggle dark/light mode"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "30px",
            height: "30px",
            justifyContent: "center",
            alignItems: "center"
          }}
          aria-label="Toggle mobile menu"
        >
          <span style={{
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition: "all 0.3s ease",
            transformOrigin: "center",
            transform: isMobileMenuOpen ? "rotate(45deg) translateY(6px)" : "rotate(0deg)"
          }}></span>
          <span style={{
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition: "all 0.3s ease",
            opacity: isMobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition: "all 0.3s ease",
            transformOrigin: "center",
            transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-6px)" : "rotate(0deg)"
          }}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 4px 20px var(--shadow)",
          padding: "1rem",
          zIndex: 99
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "1rem",
                  margin: "0.5rem 0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "white" : "var(--text)",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  textAlign: "center"
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

const navLinkStyle = {
  fontWeight: 600,
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  textTransform: "capitalize"
};

export default Navbar;
