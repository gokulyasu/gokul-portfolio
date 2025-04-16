
import { useState, useEffect } from "react";
import portfolioData from "../data/portfolio";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-2 bg-background/80 dark:bg-cyber-dark/80 backdrop-blur-lg shadow-md' 
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a 
            href="#" 
            className="text-2xl font-bold text-gradient-primary"
          >
            {portfolioData.name.split(' ')[0]}
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neon-blue hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/95 dark:bg-cyber-dark/95 backdrop-blur-md pt-20 md:hidden">
          <nav className="container mx-auto px-4">
            <ul className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link, index) => (
                <li key={index} className="w-full">
                  <a 
                    href={link.href}
                    className="block py-2 text-center text-lg font-medium hover:text-neon-blue transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      
      {/* Theme toggle is handled separately from navbar */}
    </>
  );
};

export default Navbar;
