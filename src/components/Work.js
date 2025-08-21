import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building, User } from "lucide-react";

function Work() {
  const [work, setWork] = useState([]);

  useEffect(() => {
    fetch("/work.json")
      .then((res) => {
        console.log("Work fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Work data:", data);
        setWork(data);
      })
      .catch((error) => {
        console.error("Error fetching work data:", error);
      });
  }, []);

  if (work.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading work experience...</div>
      </div>
    );
  }

  return (
    <section id="work" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Work Experience
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My professional journey in academia and research, contributing to education and advancing knowledge in computer science.
        </p>
      </div>
      
      <div className="grid gap-6">
        {work.map((position, idx) => (
          <Card 
            key={idx}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/20"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground mb-2">
                    {position.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <Building className="h-4 w-4" />
                      {position.company}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {position.duration}
                    </div>
                    {position.supervisor && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        Supervisor: {position.supervisor}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {position.type}
                  </Badge>
                  {position.department && (
                    <Badge variant="secondary" className="max-w-xs">
                      {position.department}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {position.description}
              </p>
              
              {position.responsibilities && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {position.responsibilities.map((responsibility, respIdx) => (
                      <li 
                        key={respIdx}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1.5 text-xs">•</span>
                        <span className="leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {position.skills && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Skills & Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, skillIdx) => (
                      <Badge 
                        key={skillIdx}
                        variant="outline"
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Work;
