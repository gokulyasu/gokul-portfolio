
import { useState, useEffect, useRef } from "react";
import portfolioData from "../data/portfolio";
import { Mail, Phone, Linkedin, MessageSquare, ChevronRight, Send } from "lucide-react";

const Contact = () => {
  const { contact_section } = portfolioData;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll animation
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

  // Auto-scroll terminal to bottom on content change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [name, email, message, activeField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setFormSubmitted(true);
    // In a real app, you would send this data to a backend service
  };

  // Terminal styling
  const terminalStyle = "font-mono bg-cyber-darker border border-neon-blue/30 rounded-lg p-4 text-white overflow-y-auto";
  const promptStyle = "text-neon-green";
  const cursorStyle = `inline-block w-2 h-4 bg-neon-blue ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`;

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${contact_section.phone.replace(/\D/g, '')}?text=Hi%20Gokul,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 bg-muted/30 dark:bg-cyber-light/5 opacity-0"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary inline-block">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${contact_section.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-neon-blue transition-colors p-2 rounded-md hover:bg-white/5"
                >
                  <Mail className="w-5 h-5" />
                  <span>{contact_section.email}</span>
                </a>
                
                <a 
                  href={`tel:${contact_section.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-neon-blue transition-colors p-2 rounded-md hover:bg-white/5"
                >
                  <Phone className="w-5 h-5" />
                  <span>{contact_section.phone}</span>
                </a>
                
                <a 
                  href={contact_section.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-neon-blue transition-colors p-2 rounded-md hover:bg-white/5"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                </a>
                
                {contact_section.whatsapp_enabled && (
                  <button
                    onClick={openWhatsApp}
                    className="flex items-center gap-3 text-muted-foreground hover:text-neon-green transition-colors p-2 rounded-md hover:bg-white/5 w-full text-left"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>WhatsApp Me</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Quote Widget */}
            {/* <div className="glass-card rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-neon-purple/20 rounded-full blur-xl"></div>
              <h3 className="text-xl font-bold mb-4">Random Quote</h3>
              
              <blockquote className="italic text-muted-foreground">
                "{portfolioData.extras.quote_rotation[Math.floor(Math.random() * portfolioData.extras.quote_rotation.length)]}"
              </blockquote>
            </div> */}
          </div>
          
          <div>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="bg-cyber-darker px-4 py-2 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-center flex-1 font-mono text-white/70">message.sh</div>
              </div>
              
              <div 
                ref={terminalRef}
                className={`${terminalStyle} h-80`}
              >
                {formSubmitted ? (
                  <>
                    <div className="mb-2">
                      <span className={promptStyle}>$ </span>
                      <span>echo $name</span>
                      <div className="pl-4">{name}</div>
                    </div>
                    <div className="mb-2">
                      <span className={promptStyle}>$ </span>
                      <span>echo $email</span>
                      <div className="pl-4">{email}</div>
                    </div>
                    <div className="mb-2">
                      <span className={promptStyle}>$ </span>
                      <span>echo $message</span>
                      <div className="pl-4 whitespace-pre-wrap">{message}</div>
                    </div>
                    <div className="mb-2">
                      <span className={promptStyle}>$ </span>
                      <span>./send_message.sh</span>
                      <div className="pl-4 text-neon-green">Message sent successfully!</div>
                    </div>
                    <div className="mb-2">
                      <span className={promptStyle}>$ </span>
                      <span>echo "Thank you for your message! I'll get back to you soon."</span>
                      <div className="pl-4">Thank you for your message! I'll get back to you soon.</div>
                    </div>
                    <div>
                      <span className={promptStyle}>$ </span>
                      <span className={cursorStyle}></span>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div 
                        className="mb-1 cursor-pointer" 
                        onClick={() => setActiveField("name")}
                      >
                        <span className={promptStyle}>$ </span>
                        <span>enter name</span>
                        {activeField === "name" && <span className={cursorStyle}></span>}
                      </div>
                      {(activeField === "name" || name) && (
                        <div className="pl-4 flex items-center">
                          <ChevronRight className="w-4 h-4 text-neon-blue mr-1" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setActiveField("name")}
                            className="bg-transparent border-none outline-none flex-1 font-mono"
                            required
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div 
                        className="mb-1 cursor-pointer" 
                        onClick={() => setActiveField("email")}
                      >
                        <span className={promptStyle}>$ </span>
                        <span>enter email</span>
                        {activeField === "email" && <span className={cursorStyle}></span>}
                      </div>
                      {(activeField === "email" || email) && (
                        <div className="pl-4 flex items-center">
                          <ChevronRight className="w-4 h-4 text-neon-blue mr-1" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setActiveField("email")}
                            className="bg-transparent border-none outline-none flex-1 font-mono"
                            required
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div 
                        className="mb-1 cursor-pointer" 
                        onClick={() => setActiveField("message")}
                      >
                        <span className={promptStyle}>$ </span>
                        <span>enter message</span>
                        {activeField === "message" && <span className={cursorStyle}></span>}
                      </div>
                      {(activeField === "message" || message) && (
                        <div className="pl-4 flex items-start">
                          <ChevronRight className="w-4 h-4 text-neon-blue mr-1 mt-1.5" />
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setActiveField("message")}
                            className="bg-transparent border-none outline-none flex-1 font-mono resize-none"
                            rows={4}
                            required
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-neon-blue text-white px-4 py-2 rounded font-mono hover:bg-neon-blue/80 transition-colors"
                      >
                        <span className={promptStyle}>$ </span>
                        <span>./send_message.sh</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
