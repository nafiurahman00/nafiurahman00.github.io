import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Mail, Linkedin, Github, GraduationCap, Heart } from "lucide-react";

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
    <footer className="bg-card border-t mt-16">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Get In Touch
            </h3>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" size="icon" asChild>
              <a href={`mailto:${profile.email}`} title="Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" size="icon" asChild>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" size="icon" asChild>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button variant="outline" size="icon" asChild>
              <a
                href="https://scholar.google.com/citations?user=VComsdEAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                title="Google Scholar"
              >
                <GraduationCap className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="border-t pt-8 space-y-2">
            <p className="text-muted-foreground text-sm">
              © 2025 Md Nafiu Rahman. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
              Built with React & Shadcn/UI • Designed with 
              <Heart className="h-3 w-3 text-foreground fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
