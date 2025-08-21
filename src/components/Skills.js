import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

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

  if (!skills) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading skills...</div>
      </div>
    );
  }

  const skillSections = [
    { 
      title: "Research Interests", 
      items: skills.researchInterests, 
      type: "list",
      icon: "🔬",
      color: "primary"
    },
    { 
      title: "Technical Skills", 
      items: skills.technicalSkills, 
      type: "tags",
      icon: "⚡",
      color: "secondary"
    },
    { 
      title: "Database Skills", 
      items: skills.databaseSkills, 
      type: "tags",
      icon: "🗄️",
      color: "outline"
    },
    { 
      title: "Full-Stack Development", 
      items: skills.fullStack, 
      type: "tags",
      icon: "🌐",
      color: "secondary"
    },
    { 
      title: "Programming Languages", 
      items: skills.programmingLanguages, 
      type: "tags",
      icon: "💻",
      color: "outline"
    },
    { 
      title: "Languages", 
      items: skills.languages, 
      type: "list",
      icon: "🌍",
      color: "primary"
    },
    { 
      title: "Coursework", 
      items: skills.coursework, 
      type: "tags",
      icon: "📚",
      color: "secondary"
    }
  ];

  return (
    <section id="skills" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Skills & Interests
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise, research interests, and professional capabilities.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillSections.map((section, idx) => (
          <Card 
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-xl">{section.icon}</span>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.type === "list" ? (
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx} 
                      className="text-muted-foreground leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5 text-xs">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {section.items.map((skill, skillIdx) => (
                    <Badge 
                      key={skillIdx}
                      variant={section.color}
                      className="hover:scale-105 transition-transform duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Skills;
