import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy } from "lucide-react";

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch("/achievements.json")
      .then((res) => {
        console.log("Achievements fetch response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Achievements data:", data);
        setAchievements(data);
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  if (achievements.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading achievements...</div>
      </div>
    );
  }

  return (
    <section id="achievements" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Achievements
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Recognition and accomplishments throughout my academic and professional journey.
        </p>
      </div>
      
      <Card className="border-l-4 border-l-yellow-500/20 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            My Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="mt-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-foreground leading-relaxed font-medium">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Achievements;
