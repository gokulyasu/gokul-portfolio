
import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolio";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const Education = () => {
  const { education } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-right");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 px-4 opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="glass-card rounded-xl p-6 opacity-0 card-hover"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-background/80 to-background/40 dark:from-cyber-dark/80 dark:to-cyber-dark/40 p-3 rounded-full">
                  <GraduationCap className="w-8 h-8 text-neon-purple" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <h4 className="text-lg text-neon-blue mt-1">{edu.institute}</h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
