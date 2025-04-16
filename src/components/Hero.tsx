
import { useEffect, useState } from "react";
import portfolioData from "../data/portfolio";
import { ExternalLink, Download, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  const { name, title, hero_section, contact, profile_picture } = portfolioData;
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const targetText = hero_section.headline;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [hero_section.headline]);

  const handleCtaClick = (buttonText: string) => {
    switch (buttonText) {
      case "Download Resume":
        window.open(contact.resume_link, "_blank");
        break;
      case "LinkedIn":
        window.open(contact.linkedin, "_blank");
        break;
      case "Let's Connect":
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        break;
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log("Profile image loaded successfully");
  };

  const handleImageError = () => {
    console.error("Failed to load profile image from", profile_picture.url);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden bg-grid bg-radial">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:to-cyber-dark opacity-70 z-0"></div>
      
      <div className="container max-w-6xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className={`inline-block ${isTypingComplete ? "" : "typing-container"}`}>
                {displayText}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
              {hero_section.subtext}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 animate-fade-in opacity-0" style={{ animationDelay: "1.5s" }}>
              {hero_section.cta_buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleCtaClick(button)}
                  className={`btn-cyberpunk ${index === 0 ? 'bg-neon-purple' : index === 1 ? 'bg-neon-blue' : 'bg-neon-pink'} 
                    flex items-center gap-2 group`}
                >
                  <span>{button}</span>
                  {index === 0 ? (
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  ) : index === 1 ? (
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-xl opacity-20 animate-pulse-glow"></div>
              <div className="profile-image overflow-hidden border-4 border-neon-purple/50 w-64 h-64 sm:w-80 sm:h-80">
                <img 
                  src={profile_picture.url}
                  alt={profile_picture.alt}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                    {name.split(' ').map(part => part[0]).join('')}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(114,9,183,0.3)] animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
          <span className="sr-only">Scroll down</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
