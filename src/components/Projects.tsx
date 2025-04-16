
import { useEffect, useRef, useState } from "react";
import portfolioData from "../data/portfolio";
import { Database, Code, Wand2 } from "lucide-react";

const Projects = () => {
  const { projects } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getProjectIcon = (techStack: string[]) => {
    if (techStack.some(tech => tech.toLowerCase().includes("ui5"))) {
      return <Wand2 className="w-10 h-10 text-neon-blue" />;
    } else if (techStack.some(tech => tech.toLowerCase().includes("abap"))) {
      return <Database className="w-10 h-10 text-neon-purple" />;
    } else {
      return <Code className="w-10 h-10 text-neon-pink" />;
    }
  };

  const handleMouseEnter = (index: number) => {
    setActiveProject(index);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Here are some of the key projects I've worked on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden card-hover relative group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Ripple effect on hover */}
              {activeProject === index && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white dark:bg-neon-blue opacity-10 animate-ripple rounded-full"></span>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gradient-to-br from-background/80 to-background/40 dark:from-cyber-dark/80 dark:to-cyber-dark/40 p-3 rounded-xl">
                    {getProjectIcon(project.tech_stack)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-full bg-muted/50 dark:bg-cyber-muted/30 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
              
              {/* Animated border on active project */}
              <div 
                className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 ${
                  activeProject === index ? 'border-neon-blue shadow-[0_0_20px_rgba(67,97,238,0.3)]' : ''
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
