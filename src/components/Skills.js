import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, Zap, Database, Globe, Code, Languages, BookOpen } from "lucide-react";

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
      icon: Search,
      color: "primary"
    },
    { 
      title: "Technical Skills", 
      items: skills.technicalSkills, 
      type: "tags",
      icon: Zap,
      color: "secondary"
    },
    { 
      title: "Database Skills", 
      items: skills.databaseSkills, 
      type: "tags",
      icon: Database,
      color: "outline"
    },
    { 
      title: "Full-Stack Development", 
      items: skills.fullStack, 
      type: "tags",
      icon: Globe,
      color: "secondary"
    },
    { 
      title: "Programming Languages", 
      items: skills.programmingLanguages, 
      type: "tags",
      icon: Code,
      color: "outline"
    },
    { 
      title: "Languages", 
      items: skills.languages, 
      type: "list",
      icon: Languages,
      color: "primary"
    },
    { 
      title: "Coursework", 
      items: skills.coursework, 
      type: "tags",
      icon: BookOpen,
      color: "secondary"
    }
  ];

  return (
    <section id="skills" className="space-y-8">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-display text-foreground">
          Skills & Interests
        </h2>
        <div className="w-12 h-0.5 bg-foreground mx-auto"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
          A comprehensive overview of my technical expertise, research interests, and professional capabilities.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillSections.map((section, idx) => (
          <Card 
            key={idx}
            className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-muted">
                  <section.icon className="h-5 w-5" />
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.type === "list" ? (
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx} 
                      className="text-muted-foreground leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-foreground mt-1.5 text-sm">•</span>
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
                      className="hover:scale-105 transition-transform duration-200 cursor-default px-3 py-1"
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
