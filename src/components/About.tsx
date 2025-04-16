
import { useEffect, useRef } from "react";
import portfolioData from "../data/portfolio";
import { Sparkles, Code, Coffee, Building } from "lucide-react";

const About = () => {
  const { about_me, location } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const factRefs = useRef<(HTMLLIElement | null)[]>([]);

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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    factRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getIconForFact = (factText: string) => {
    if (factText.toLowerCase().includes("anime")) return <Sparkles className="w-5 h-5 text-neon-pink" />;
    if (factText.toLowerCase().includes("debug")) return <Code className="w-5 h-5 text-neon-blue" />;
    if (factText.toLowerCase().includes("chai") || factText.toLowerCase().includes("coffee")) 
      return <Coffee className="w-5 h-5 text-neon-green" />;
    if (factText.toLowerCase().includes("architecture")) return <Building className="w-5 h-5 text-neon-purple" />;
    return <Sparkles className="w-5 h-5 text-neon-yellow" />;
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 relative opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
              <p className="text-muted-foreground">{about_me.bio}</p>
              <p className="mt-4 text-sm text-muted-foreground">Based in: <span className="text-foreground">{location}</span></p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Fun Facts</h3>
            <ul className="space-y-4">
              {about_me.fun_facts.map((fact, index) => (
                <li 
                  key={index}
                  ref={el => factRefs.current[index] = el}
                  className="flex items-start gap-3 opacity-0"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <span className="mt-1">{getIconForFact(fact)}</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] opacity-30"></div>
    </section>
  );
};

export default About;
