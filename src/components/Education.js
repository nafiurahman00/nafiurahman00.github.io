import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("/education.json")
      .then((res) => {
        console.log("Education fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Education data:", data);
        setEducation(data);
      })
      .catch((error) => {
        console.error("Error fetching education data:", error);
      });
  }, []);

  if (education.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading education...</div>
      </div>
    );
  }

  return (
    <section id="education" className="space-y-8">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-display text-foreground">
          Education
        </h2>
        <div className="w-12 h-0.5 bg-foreground mx-auto"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
          My academic journey and educational qualifications in Computer Science and Engineering.
        </p>
      </div>
      
      <div className="grid gap-8">
        {education.map((ed, idx) => (
          <Card 
            key={idx}
            className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="text-xl text-foreground">
                  {ed.degree}
                </CardTitle>
                <Badge variant="outline" className="self-start md:self-center">
                  {ed.year}
                </Badge>
              </div>
              <p className="text-lg text-primary font-semibold">
                {ed.institution}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground leading-relaxed">
                {ed.details}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Education;
