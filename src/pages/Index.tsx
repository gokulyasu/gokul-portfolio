import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";

const Index = () => {
  // Force dark mode by default as specified in the requirements
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background dark:bg-cyber-dark text-foreground relative">
        <EasterEgg />
        <ThemeToggle />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
