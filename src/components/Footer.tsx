
import { useEffect, useState } from "react";
import portfolioData from "../data/portfolio";
import MusicBar from "./MusicBar";
import { Heart } from "lucide-react";

const Footer = () => {
  const { name, extras } = portfolioData;
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Rotating quotes
    let currentIndex = 0;
    const quoteInterval = setInterval(() => {
      setQuote(extras.quote_rotation[currentIndex]);
      currentIndex = (currentIndex + 1) % extras.quote_rotation.length;
    }, 5000);

    // Initial quote
    setQuote(extras.quote_rotation[0]);

    return () => clearInterval(quoteInterval);
  }, [extras.quote_rotation]);

  const handleKonamiCode = () => {
    // Implementation for an easter egg when a specific keyboard combo is pressed
    // Will be set up later in a separate component for simplicity
  };

  return (
    <footer className="py-10 px-4 bg-muted/50 dark:bg-cyber-darker">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <MusicBar title={extras.music_bar} />

          <div className="glass-card rounded-xl p-4 max-w-lg mx-auto">
            <blockquote className="italic text-center text-muted-foreground">
              "{quote}"
            </blockquote>
          </div>

          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
            <p className="hidden sm:block">|</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-neon-pink animate-pulse" /> and React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
