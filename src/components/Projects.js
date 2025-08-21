import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => {
        console.log("Projects fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Projects data:", data);
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading projects...</div>
      </div>
    );
  }

  return (
    <section id="projects" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A showcase of my personal and academic projects demonstrating various technologies and problem-solving skills.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => (
          <Card 
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    title="View on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIdx) => (
                  <Badge 
                    key={techIdx}
                    variant="secondary"
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Projects;
