
import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolio";
import { Code, Layers, Wrench, Lightbulb } from "lucide-react";

const Skills = () => {
  const { skills } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return <Code className="w-6 h-6 text-neon-blue" />;
      case "frameworks":
        return <Layers className="w-6 h-6 text-neon-purple" />;
      case "tools":
        return <Wrench className="w-6 h-6 text-neon-green" />;
      case "concepts":
        return <Lightbulb className="w-6 h-6 text-neon-yellow" />;
      default:
        return <Code className="w-6 h-6 text-neon-blue" />;
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "from-neon-blue to-neon-purple",
      "from-neon-purple to-neon-pink",
      "from-neon-green to-neon-blue",
      "from-neon-yellow to-neon-green"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 bg-muted/30 dark:bg-cyber-light/5 opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div
              key={category}
              ref={el => cardRefs.current[index] = el}
              className="glass-card rounded-xl overflow-hidden opacity-0"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${getGradientClass(index)}`}></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getCategoryIcon(category)}
                  <h3 className="text-xl font-bold capitalize">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-sm px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:border-neon-blue dark:hover:border-neon-blue transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
