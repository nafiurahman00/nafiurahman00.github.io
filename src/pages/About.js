import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/profile.json")
      .then((res) => res.json())
      .then(setProfile)
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background to-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-purple-500"></div>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-shrink-0">
              <img 
                src="/nfu.jpg" 
                alt="Md Nafiu Rahman"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {profile.title}
                </Badge>
                {profile.location && (
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    📍 {profile.location}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
          
          {profile.highlights && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {profile.highlights.map((highlight, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {highlight.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {highlight.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {profile.contactInfo && (
            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {profile.contactInfo.email && (
                <a 
                  href={`mailto:${profile.contactInfo.email}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  📧 {profile.contactInfo.email}
                </a>
              )}
              {profile.contactInfo.linkedin && (
                <a 
                  href={profile.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  💼 LinkedIn
                </a>
              )}
              {profile.contactInfo.github && (
                <a 
                  href={profile.contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  🐙 GitHub
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <a 
          href="/Md_Nafiu_Rahman_resume.pdf" 
          download="Md_Nafiu_Rahman_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>
    </main>
  );
}

export default About;
