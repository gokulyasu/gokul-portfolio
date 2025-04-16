import { useState, useEffect } from "react";

const EasterEgg = () => {
  const [showClones, setShowClones] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<number[]>([]);
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
  
  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Update progress
      setKonamiProgress(prev => {
        const newProgress = [...prev, e.keyCode];
        
        // Check if the last N keystrokes match the beginning of the Konami code
        const matchLength = Math.min(newProgress.length, konamiCode.length);
        const relevantProgress = newProgress.slice(newProgress.length - matchLength);
        const relevantCode = konamiCode.slice(0, matchLength);
        
        // If we have a match and it's the complete code, trigger the easter egg
        if (JSON.stringify(relevantProgress) === JSON.stringify(relevantCode) && 
            matchLength === konamiCode.length) {
          triggerEasterEgg();
          return []; // Reset progress
        }
        
        // Keep only the last 10 keystrokes to avoid memory issues
        return newProgress.slice(-konamiCode.length);
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const triggerEasterEgg = () => {
    setShowClones(true);
    
    // Hide the clones after animation completes
    setTimeout(() => {
      setShowClones(false);
    }, 3000);
  };
  
  // Easter egg button for mobile users
  const handleSecretClick = () => {
    triggerEasterEgg();
  };
  
  if (!showClones) return (
    <button 
      onClick={handleSecretClick}
      className="fixed bottom-3 left-3 w-4 h-4 bg-cyber-dark/50 rounded-full z-50 opacity-30 hover:opacity-100"
      aria-label="Secret button"
    />
  );
  
  // Creates 5 shadow clones that animate across the screen
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(5)].map((_, index) => {
        const leftPos = Math.random() * 100;
        const topPos = Math.random() * 100;
        
        return (
          <div 
            key={index}
            className="absolute"
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
              transformOrigin: 'center',
              animation: `clone-appear 0.5s ease forwards ${index * 0.1}s, clone-move 2s ease-in-out ${0.5 + index * 0.1}s`
            }}
          >
            <div className="relative">
              <div 
                className="w-24 h-24 md:w-32 md:h-32 bg-neon-yellow rounded-full opacity-50 absolute -inset-1 animate-pulse-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
              <img 
                src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=1000&auto=format&fit=crop"
                alt="Naruto clone"
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-2 border-neon-yellow"
                onError={(e) => {
                  // Fallback image
                  e.currentTarget.src = "https://via.placeholder.com/100x100.png?text=Ninja";
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EasterEgg;
