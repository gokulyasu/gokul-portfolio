
import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolio";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const Experience = () => {
  const { experience } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 bg-muted/30 dark:bg-cyber-light/5 opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            Professional Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full"></div>
          
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div 
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } opacity-0`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-neon-blue border-4 border-background dark:border-cyber-dark"></div>
                
                {/* Content Card */}
                <div className={`ml-10 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <div className="glass-card p-6 rounded-xl hover:shadow-[0_0_15px_rgba(67,97,238,0.3)] transition-all duration-300 card-hover">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <h4 className="text-lg text-neon-purple font-semibold">{job.company}</h4>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-muted-foreground">{job.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
