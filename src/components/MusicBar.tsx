
import { useState, useEffect } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface MusicBarProps {
  title: string;
}

const MusicBar = ({ title }: MusicBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="glass-card rounded-xl p-3 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
          <Music className={`w-5 h-5 text-neon-purple ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="mt-1 h-1 bg-muted/30 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-neon-blue" />
            ) : (
              <Play className="w-4 h-4 text-neon-blue" />
            )}
          </button>
          
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicBar;
