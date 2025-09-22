import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";

// Modern Animated Hamburger Component
const AnimatedHamburger = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-9 w-9 flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 hover:bg-accent hover:text-accent-foreground rounded-md",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
          isOpen ? "rotate-45 translate-y-2" : ""
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
          isOpen ? "opacity-0" : ""
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out",
          isOpen ? "-rotate-45 -translate-y-2" : ""
        )}
      />
    </button>
  );
};

function Navbar({ theme, setTheme }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll to add enhanced styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const navItems = [
    { path: "/", label: "About" },
    { path: "/education", label: "Education" },
    { path: "/work", label: "Work" },
    { path: "/research", label: "Research" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/achievements", label: "Achievements" }
  ];

  return (
    <nav 
      ref={navRef} 
      className={cn(
        "navbar-sticky w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-border/80" 
          : "bg-background/80 backdrop-blur-md border-border/60",
        "supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link 
          to="/"
          className="flex items-center space-x-2 font-display text-xl text-foreground hover:text-muted-foreground transition-colors"
        >
          Md Nafiu Rahman
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary font-body",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <AnimatedHamburger
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu - Expanding dropdown */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background border-t",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container px-4 py-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground font-body",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </nav>
  );
}

export default Navbar;
