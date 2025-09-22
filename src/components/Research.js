import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";

function Research() {
  const [research, setResearch] = useState([]);

  useEffect(() => {
    fetch("/research.json")
      .then((res) => {
        console.log("Research fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Research data:", data);
        setResearch(data);
      })
      .catch((error) => {
        console.error("Error fetching research data:", error);
      });
  }, []);

  if (research.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading research...</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === "Published") return "default";
    if (status.includes("Accepted")) return "secondary";
    if (status === "Ongoing") return "outline";
    return "outline";
  };

  return (
    <section id="research" className="space-y-8">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-display text-foreground">
          Research Experience
        </h2>
        <div className="w-12 h-0.5 bg-foreground mx-auto"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-body">
          My research work in Computer Science, focusing on cybersecurity, machine learning, and software engineering.
        </p>
      </div>
      
      <div className="grid gap-8">
        {research.map((item, idx) => (
          <Card 
            key={idx}
            className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3">
                <CardTitle className="text-xl text-foreground leading-tight">
                  {item.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {item.year}
                  </Badge>
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  {item.arxivLink && (
                    <a 
                      href={item.arxivLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      arXiv
                    </a>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Research;
