import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Download, Mail, Phone, ExternalLink, Menu, X, 
  Zap, Award, Sparkles, Check, Send, ChevronRight, GraduationCap, 
  Trophy, ShieldAlert, Cpu, BarChart3, Settings, PenTool, Database, 
  RefreshCw, Layers, Briefcase, Calendar, Globe
} from 'lucide-react';

// Custom LinkedIn SVG Icon component
const Linkedin = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll handler for frosted glass header & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // 1. Frosted glass header trigger
      setScrolled(window.scrollY > 40);

      // 2. Active section tracking
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset for header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active section on page load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered entrance animations (reveal-on-scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-primary-bg text-text-primary overflow-hidden font-body selection:bg-accent-primary/30 selection:text-white">
      
      {/* 4% Opacity Grain Overlay */}
      <div className="grain-overlay" />

      {/* FIXED NAVIGATION */}
      <header className={`fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'nav-scrolled' : 'bg-transparent border-b border-transparent'
      }`}>
        
        {/* Logo */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-350"
        >
          Dipanshi.
        </a>

        {/* Desktop Active Underlay Nav Pill */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-[#111118]/60 border border-accent-primary/10 p-1.5 rounded-full backdrop-blur-md relative">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 rounded-full cursor-pointer ${
                activeSection === item.id ? 'text-[#0A0A0F]' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {activeSection === item.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full -z-10 shadow-[0_0_15px_rgba(124,106,247,0.3)]" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Resume & Hamburger */}
        <div className="flex items-center space-x-4">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 py-2.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 hover:from-accent-primary hover:to-accent-secondary hover:text-[#0A0A0F] border border-accent-primary/30 hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(124,106,247,0.1)] hover:shadow-[0_0_20px_rgba(124,106,247,0.3)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent-secondary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide-Down Drawer */}
      <div 
        className={`fixed top-20 left-0 w-full bg-[#0a0a0f]/95 border-b border-accent-primary/10 z-40 md:hidden flex flex-col items-center py-8 space-y-6 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 w-full px-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full text-center py-2.5 rounded-xl font-display font-bold text-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-[#0A0A0F]' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* SECTIONS WRAPPER */}
      <div className="relative pt-20">
        
        {/* PAGE 1 — HERO SECTION */}
        <section id="home" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center overflow-hidden">
          {/* Radial glow background blobs */}
          <div className="hero-glow-1" />
          <div className="hero-glow-2" />

          <div className="max-w-4xl z-10 flex flex-col items-center reveal-on-scroll">
            
            {/* Circular Profile Photo with Glowing Ring */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-accent-primary via-accent-secondary to-accent-tertiary shadow-[0_0_30px_rgba(124,106,247,0.3)] animate-[pulse_4s_infinite]">
              <div className="relative w-full h-full rounded-full border-2 border-primary-bg overflow-hidden bg-primary-bg">
                <img 
                  src="/profile.png" 
                  alt="Dipanshi Garg"
                  className="w-full h-full object-cover scale-[1.32]"
                  style={{ objectPosition: '50% 40%', transformOrigin: '50% 40%' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback monogram D */}
                <div className="hidden absolute inset-0 bg-surface-bg items-center justify-center rounded-full font-display font-extrabold text-5xl text-accent-primary">
                  D
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-8 flex items-center space-x-2 py-1.5 px-4 rounded-full bg-surface-bg border border-accent-primary/20 text-xs font-semibold text-text-primary shadow-[0_0_15px_rgba(124,106,247,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Available for Opportunities</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 font-display font-extrabold text-4xl md:text-7.5xl tracking-tight leading-none">
              Hi, I'm <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">Dipanshi Garg</span>
            </h1>

            {/* Animated Word Cycling Rotator */}
            <div className="mt-4 text-lg md:text-2xl font-bold font-display">
              <RoleRotator />
            </div>

            {/* Bio Paragraph */}
            <p className="mt-6 max-w-2xl text-sm md:text-base text-text-muted leading-relaxed font-body">
              BBA Entrepreneurship student at Rishihood University, Founder of Apna Safar, and Campus Representative at HATCH. Passionate about building AI-powered products, workflow automations, and early-stage startups through validation and execution.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accent-primary to-accent-secondary text-[#0A0A0F] hover:shadow-[0_0_25px_rgba(124,106,247,0.5)] transition-all duration-350 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-8 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent border border-accent-primary/30 text-text-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="bg-surface-bg/60 border border-accent-primary/10 rounded-2xl p-6 md:p-8 mt-16 max-w-5xl w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg backdrop-blur-md">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-display font-extrabold text-accent-primary leading-tight">3rd</span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted mt-1 font-mono">Hult Prize · IIT Bombay</span>
              </div>
              <div className="flex flex-col items-center border-l border-accent-primary/10 md:border-l">
                <span className="text-3xl font-display font-extrabold text-accent-secondary leading-tight">2,500+</span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted mt-1 font-mono">Global Participants</span>
              </div>
              <div className="flex flex-col items-center border-l border-accent-primary/10 md:border-l">
                <span className="text-3xl font-display font-extrabold text-accent-tertiary leading-tight">6</span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted mt-1 font-mono">Countries Represented</span>
              </div>
              <div className="flex flex-col items-center border-l border-accent-primary/10 md:border-l">
                <span className="text-3xl font-display font-extrabold text-emerald-400 leading-tight">2024</span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted mt-1 font-mono">BBA Started</span>
              </div>
            </div>

          </div>
        </section>

        {/* PAGE 2 — ABOUT SECTION */}
        <section id="about" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-accent-primary/5">
          <div className="reveal-on-scroll">
            
            {/* Title */}
            <div className="mb-16">
              <span className="inline-block bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full mb-3 font-mono">
                About Me
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
                Building at the intersection of <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">ideas & execution</span>
              </h2>
            </div>

            {/* 60/40 Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
              
              {/* Left Column (60) */}
              <div className="lg:col-span-7 space-y-6 text-text-muted text-base leading-relaxed">
                <p>
                  I am currently pursuing a BBA in Entrepreneurship at Rishihood University. I enjoy turning ideas into products through customer validation, AI automation, market research, and execution.
                </p>
                <p>
                  Alongside building Apna Safar, I have gained experience in product strategy, digital marketing, sales, and business analysis through internships and startup projects.
                </p>
                <p>
                  At HATCH, I help build student communities, promote opportunities, organize campus engagement initiatives, and connect students with internships, startups, and career opportunities.
                </p>
                <p>
                  Outside work, I am a district-level athlete in <strong className="text-text-primary">Cricket, Badminton, Wushu, and Skating</strong>, experiences that strengthened my discipline, leadership, and consistency.
                </p>
                
                {/* Badge Chips */}
                <div className="pt-4 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center space-x-2 py-1.5 px-3.5 rounded-full bg-surface-bg border border-accent-primary/10 text-xs font-semibold text-text-primary">
                    <span>🎓</span>
                    <span>Rishihood University · BBA</span>
                  </span>
                  <span className="inline-flex items-center space-x-2 py-1.5 px-3.5 rounded-full bg-surface-bg border border-accent-primary/10 text-xs font-semibold text-text-primary">
                    <span>🏆</span>
                    <span>Hult Prize · 3rd · IIT Bombay</span>
                  </span>
                  <span className="inline-flex items-center space-x-2 py-1.5 px-3.5 rounded-full bg-surface-bg border border-accent-primary/10 text-xs font-semibold text-text-primary">
                    <span>⭐</span>
                    <span>District Athlete · 4 Sports</span>
                  </span>
                </div>
              </div>

              {/* Right Column (40) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1 */}
                <div className="group bg-surface-bg border border-accent-primary/10 p-5 rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(124,106,247,0.15)] hover:border-accent-primary/30 transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-primary mb-3 shadow-[0_0_10px_#7C6AF7]" />
                  <h4 className="text-sm font-display font-extrabold text-text-primary mb-1">Startup Strategy</h4>
                  <p className="text-xs text-text-muted leading-normal">From idea to pitch-ready product with customer validation.</p>
                </div>

                {/* Card 2 */}
                <div className="group bg-surface-bg border border-accent-primary/10 p-5 rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(192,132,252,0.15)] hover:border-accent-secondary/30 transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary mb-3 shadow-[0_0_10px_#C084FC]" />
                  <h4 className="text-sm font-display font-extrabold text-text-primary mb-1">AI Automation</h4>
                  <p className="text-xs text-text-muted leading-normal">n8n workflows connecting AI models with business tasks.</p>
                </div>

                {/* Card 3 */}
                <div className="group bg-surface-bg border border-accent-primary/10 p-5 rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(56,189,248,0.15)] hover:border-accent-tertiary/30 transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-tertiary mb-3 shadow-[0_0_10px_#38BDF8]" />
                  <h4 className="text-sm font-display font-extrabold text-text-primary mb-1">Digital Marketing</h4>
                  <p className="text-xs text-text-muted leading-normal">Data-driven outreach that grows brand visibility.</p>
                </div>

                {/* Card 4 */}
                <div className="group bg-surface-bg border border-accent-primary/10 p-5 rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_10px_35px_rgba(52,211,153,0.15)] hover:border-emerald-400/30 transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-3 shadow-[0_0_10px_#34D399]" />
                  <h4 className="text-sm font-display font-extrabold text-text-primary mb-1">Product Mgt</h4>
                  <p className="text-xs text-text-muted leading-normal">User research, roadmapping, and no-code prototyping.</p>
                </div>

              </div>

            </div>

            {/* Certifications strip */}
            <div className="bg-gradient-to-r from-surface-bg to-surface-bg/30 border border-accent-primary/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-xs font-mono font-bold tracking-widest text-accent-secondary uppercase mb-6 flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Certifications & Credentials</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-1.5">
                  <h4 className="text-sm font-display font-extrabold text-text-primary">24-Module Management</h4>
                  <p className="text-xs text-text-muted">AIFMB program covering fundamentals of corporate administration and operations.</p>
                </div>

                <div className="space-y-1.5 border-t border-accent-primary/5 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6 md:border-accent-primary/10">
                  <h4 className="text-sm font-display font-extrabold text-text-primary">Ignite India Entrepreneur</h4>
                  <p className="text-xs text-text-muted">Wadhwani Foundation program focused on startup operations and lean validation.</p>
                </div>

                <div className="space-y-1.5 border-t border-accent-primary/5 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6 md:border-accent-primary/10">
                  <h4 className="text-sm font-display font-extrabold text-text-primary">Deloitte Data Analytics</h4>
                  <p className="text-xs text-text-muted">Forage job simulation completed in June 2026 using Tableau and MS Excel.</p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* PAGE 3 — EXPERIENCE SECTION */}
        <section id="experience" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-accent-primary/5">
          <div className="reveal-on-scroll">
            
            {/* Title */}
            <div className="mb-16">
              <span className="inline-block bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full mb-3 font-mono">
                Journey
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
                Where I've built & grown
              </h2>
            </div>

            {/* Tabbed Experience Panel */}
            <ExperienceTabPanel />

          </div>
        </section>

        {/* PAGE 4 — SKILLS SECTION */}
        <section id="skills" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-accent-primary/5">
          <div className="reveal-on-scroll">
            
            {/* Title */}
            <div className="mb-16">
              <span className="inline-block bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full mb-3 font-mono">
                My Toolkit
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
                Core Competencies & Stack
              </h2>
            </div>

            {/* Grid of 5 Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              
              {/* Card 1 */}
              <div className="bg-[#111118] border border-accent-primary/10 p-6 rounded-2xl hover:border-accent-primary/30 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-accent-primary" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#F0EFF8]">Automation & AI</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["n8n Workflow Automation", "OpenAI/Gemini Integration", "AI Agent Workflows", "Webhook Automation", "HTTP Request Nodes", "API Authentication", "Conditional Logic", "JavaScript Code Nodes", "Data Transformation", "Error Handling", "Low-Code Automation"].map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono py-1 px-2.5 bg-primary-bg rounded border border-accent-primary/5 text-text-muted hover:text-text-primary hover:border-accent-primary/20 transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#111118] border border-accent-primary/10 p-6 rounded-2xl hover:border-accent-secondary/30 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-accent-secondary" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#F0EFF8]">Startup & Product</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Startup Strategy", "Product Management", "Product Validation", "Customer Validation", "Go-To-Market Planning", "User Research", "Product Roadmapping", "Investor Pitching", "Business Model Design", "No-Code Prototyping", "Community Building", "Partnership Development"].map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono py-1 px-2.5 bg-primary-bg rounded border border-accent-secondary/5 text-text-muted hover:text-text-primary hover:border-accent-secondary/20 transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#111118] border border-accent-primary/10 p-6 rounded-2xl hover:border-accent-tertiary/30 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent-tertiary/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-accent-tertiary" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#F0EFF8]">Marketing & Growth</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Digital Marketing", "Lead Generation", "Market Research", "Content Strategy", "Social Media", "B2B Outreach", "Competitor Analysis", "Campaign Design", "Event Promotion", "Student Engagement", "Campus Leadership", "Networking", "Communication"].map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono py-1 px-2.5 bg-primary-bg rounded border border-accent-tertiary/5 text-text-muted hover:text-text-primary hover:border-accent-tertiary/20 transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#111118] border border-accent-primary/10 p-6 rounded-2xl hover:border-emerald-400/30 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#F0EFF8]">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Google Workspace", "Excel", "Tableau", "Canva", "Figma", "Wix", "Claude", "ChatGPT", "Antigravity", "Codex"].map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono py-1 px-2.5 bg-primary-bg rounded border border-emerald-400/5 text-text-muted hover:text-text-primary hover:border-emerald-400/20 transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-[#111118] border border-accent-primary/10 p-6 rounded-2xl hover:border-orange-400/30 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 className="font-display font-extrabold text-[#F0EFF8]">Data & Analytics</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Data Analysis", "Business Intelligence", "Sales Analytics", "Tableau Dashboards", "MS Excel", "Data Transformation", "Growth Projections", "Market Trends", "Sales Performance Reports"].map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono py-1 px-2.5 bg-primary-bg rounded border border-orange-400/5 text-text-muted hover:text-text-primary hover:border-orange-400/20 transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Featured Skills Callout Block */}
            <div className="bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-transparent border border-accent-primary/35 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center">
              
              <div className="p-4 bg-accent-primary/25 rounded-2xl border border-accent-primary/40 shrink-0 shadow-[0_0_20px_rgba(124,106,247,0.3)]">
                <Zap className="w-8 h-8 text-accent-primary animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-display font-extrabold text-text-primary">AI Workflow Automation</h3>
                  <span className="text-[9px] font-mono font-bold py-0.5 px-2 bg-accent-primary/20 border border-accent-primary/30 text-accent-secondary rounded-full uppercase tracking-wider">Featured Skill</span>
                </div>
                
                <p className="text-sm text-text-muted leading-relaxed">
                  Built AI-powered workflow automations using n8n integrating OpenAI/Gemini, Google Workspace, APIs, webhooks, conditional logic, JavaScript, and AI-agent workflows to automate business operations.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["n8n", "AI Agents", "APIs", "Webhooks"].map((c, idx) => (
                    <span key={idx} className="text-[10px] font-mono py-1 px-3 bg-surface-bg border border-accent-primary/20 text-accent-tertiary rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PAGE 5 — PROJECTS SECTION */}
        <section id="projects" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-accent-primary/5">
          <div className="reveal-on-scroll">
            
            {/* Title */}
            <div className="mb-16">
              <span className="inline-block bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full mb-3 font-mono">
                My Works
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
                Things I've built
              </h2>
            </div>

            {/* 4 Project Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Project 1 */}
              <div className="group bg-surface-bg border border-accent-primary/10 p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(124,106,247,0.15)] hover:border-accent-primary/30 transition-all duration-350 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-primary" />
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-text-primary group-hover:text-accent-primary transition-colors duration-300">Apna Safar</h3>
                      <p className="text-xs font-mono text-accent-primary">Travel Tech Startup</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Early-stage travel-safety platform offering verified local routes, vetted accommodations, and emergency support for student and solo travellers. Built through customer validation, traveller behaviour research, product roadmapping, landing pages, user journey flows, UI/UX prototypes, pitch decks, and operating budgets.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Travel Tech", "Startup", "Customer Validation", "Product Roadmap", "Pitch Deck"].map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono py-1 px-2.5 rounded bg-primary-bg border border-accent-primary/10 text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#1b1b26] pt-5 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="flex items-center space-x-1.5 text-accent-secondary">
                    <Trophy className="w-3.5 h-3.5 shrink-0" />
                    <span>🏆 3rd Place · Hult Prize · IIT Bombay</span>
                  </span>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group bg-surface-bg border border-[#38BDF8]/10 p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] hover:border-[#38BDF8]/30 transition-all duration-350 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#38BDF8]" />
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-text-primary group-hover:text-[#38BDF8] transition-colors duration-300">n8n AI Automation Suite</h3>
                      <p className="text-xs font-mono text-[#38BDF8]">End-to-End Workflow Automation</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Built AI-powered workflow automations using n8n, OpenAI, Gemini, Google Workspace, APIs, webhooks, conditional logic, JavaScript, and AI-agent workflows to automate business operations.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["n8n", "AI Agents", "Automation", "API", "Webhooks", "JavaScript"].map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono py-1 px-2.5 rounded bg-primary-bg border border-[#38BDF8]/10 text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#1b1b26] pt-5 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="flex items-center space-x-1.5 text-accent-tertiary">
                    <Cpu className="w-3.5 h-3.5 shrink-0" />
                    <span>AI Agents · APIs · Webhooks</span>
                  </span>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group bg-surface-bg border border-[#C084FC]/10 p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(192,132,252,0.15)] hover:border-[#C084FC]/30 transition-all duration-350 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C084FC]" />
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#C084FC]/10 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-[#C084FC]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-text-primary group-hover:text-[#C084FC] transition-colors duration-300">Hult Prize Boot Camp</h3>
                      <p className="text-xs font-mono text-[#C084FC]">Global Entrepreneurship Competition</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Co-developed the original concept for Apna Safar during a month of startup masterclasses and workshops at IIT Bombay, placing 3rd among 2,500+ participants from 6 countries.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Hult Prize", "IIT Bombay", "Startup", "Pitching", "Validation"].map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono py-1 px-2.5 rounded bg-primary-bg border border-[#C084FC]/10 text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#1b1b26] pt-5 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="flex items-center space-x-1.5 text-accent-secondary">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>3rd Place · 2,500+ Participants · 6 Countries</span>
                  </span>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group bg-surface-bg border border-[#34D399]/10 p-8 rounded-3xl flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(52,211,153,0.15)] hover:border-[#34D399]/30 transition-all duration-350 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#34D399]" />
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#34D399]/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#34D399]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-text-primary group-hover:text-[#34D399] transition-colors duration-300">DMart Job Satisfaction</h3>
                      <p className="text-xs font-mono text-[#34D399]">Field Research Study</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Co-authored a research study on workplace dynamics, compensation, and employee retention at DMart. Collected and analyzed field data to deliver actionable recommendations to the project panel.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Research", "Data Analysis", "Business Strategy", "Field Study"].map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono py-1 px-2.5 rounded bg-primary-bg border border-[#34D399]/10 text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#1b1b26] pt-5 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="flex items-center space-x-1.5 text-emerald-400">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>📊 Primary Research · Field Data</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PAGE 6 — CONTACT SECTION */}
        <section id="contact" className="relative py-24 px-6 md:px-12 max-w-3xl mx-auto border-t border-accent-primary/5">
          <div className="reveal-on-scroll text-center flex flex-col items-center">
            
            {/* Title */}
            <span className="inline-block bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full mb-3 font-mono">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
              Let's build something <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">great together</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-text-muted max-w-lg leading-relaxed">
              Open to internships, collaborations, freelance projects, and startup conversations. Let's connect.
            </p>

            {/* 3 Contact Cards Stacked */}
            <div className="w-full mt-10 space-y-4">
              
              {/* Card 1: Email */}
              <a 
                href="mailto:dipanshigarg2712@gmail.com"
                className="group w-full flex items-center justify-between p-5 bg-surface-bg border border-accent-primary/10 hover:border-accent-primary/45 rounded-2xl hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(124,106,247,0.1)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">Email</span>
                    <span className="block text-sm font-bold text-text-primary mt-0.5">dipanshigarg2712@gmail.com</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1.5 transition-all duration-300" />
              </a>

              {/* Card 2: Phone */}
              <a 
                href="tel:+919988522870"
                className="group w-full flex items-center justify-between p-5 bg-surface-bg border border-[#38BDF8]/10 hover:border-[#38BDF8]/45 rounded-2xl hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">Phone</span>
                    <span className="block text-sm font-bold text-text-primary mt-0.5">+91 9988522870</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-[#38BDF8] group-hover:translate-x-1.5 transition-all duration-300" />
              </a>

              {/* Card 3: LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/dipanshi-garg-369721313/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-between p-5 bg-surface-bg border border-[#C084FC]/10 hover:border-[#C084FC]/45 rounded-2xl hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(192,132,252,0.1)] transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/20 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">LinkedIn</span>
                    <span className="block text-sm font-bold text-text-primary mt-0.5">Connect on LinkedIn</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-[#C084FC] group-hover:translate-x-1.5 transition-all duration-300" />
              </a>

            </div>

            {/* Bottom Large CTA Button */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-12 w-full sm:w-auto flex items-center justify-center space-x-3 py-4 px-10 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-accent-primary to-accent-secondary text-[#0A0A0F] hover:shadow-[0_0_30px_rgba(124,106,247,0.5)] transition-all duration-350 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-accent-primary/10 py-12 px-6 text-center text-xs font-mono text-text-muted mt-12">
          <span>© 2026 Dipanshi Garg · Built with intention · </span>
          <span className="text-accent-primary font-bold">Rishihood University</span>
        </footer>

      </div>

    </div>
  );
}

/* ==========================================
   ROLE ROTATOR COMPONENT (HERO CYCLER)
   ========================================== */
function RoleRotator() {
  const roles = [
    "Startup Founder",
    "Product Builder",
    "AI Automation Enthusiast",
    "Marketing & Growth",
    "BBA Entrepreneurship Student"
  ];
  
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState('fade-in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFade('fade-out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setFade('fade-in');
      }, 400); // fade out duration
    }, 2800); // cycle duration

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 py-2">
      <span className="text-text-muted">I'm a</span>
      <span className={`inline-block text-text-primary px-3 py-1 bg-surface-bg border border-accent-primary/20 rounded-lg shadow-inner font-display font-bold uppercase tracking-wide transition-all duration-400 transform ${
        fade === 'fade-in' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'
      }`}>
        {roles[index]}
      </span>
    </div>
  );
}

/* ==========================================
   EXPERIENCE TAB PANEL
   ========================================== */
function ExperienceTabPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [fade, setFade] = useState(true);

  const tabs = [
    {
      company: "Apna Safar",
      role: "Founder",
      period: "June 2026 – Present",
      color: "#7C6AF7",
      type: "Startup Founding",
      bullets: [
        "Founded Apna Safar after placing 3rd at the Hult Prize, building on the original idea to launch an early-stage platform offering verified local routes, vetted accommodations, and emergency support for student and solo travellers",
        "Built business model, monetization plan, and go-to-market strategy based on direct customer validation",
        "Conducted user interviews and traveller behaviour research to identify key safety pain points and shape the product roadmap",
        "Built landing pages, user journey flows, and UI/UX prototypes using no-code tools and AI-assisted design",
        "Created investor pitch decks and operating budgets for university incubation and startup validation programs"
      ]
    },
    {
      company: "HNNOIX India",
      role: "Marketing Intern",
      period: "June 2026 – Present",
      color: "#38BDF8",
      type: "Marketing Internship",
      bullets: [
        "Worked with the marketing team to design digital campaigns and content that grew brand visibility",
        "Researched competitors and emerging technology trends to inform marketing strategy",
        "Wrote and designed marketing materials, presentations, and promotional copy for outreach campaigns",
        "Used AI research and productivity tools to streamline workflow tracking and social media engagement"
      ]
    },
    {
      company: "HATCH",
      role: "Campus Representative",
      period: "Present",
      color: "#38BDF8",
      type: "Campus Leadership",
      bullets: [
        "Represent HATCH at my university",
        "Promote internships, startup programs, and career opportunities",
        "Build and engage the student community",
        "Organize awareness campaigns and campus initiatives",
        "Collaborate with the HATCH team to increase student participation"
      ]
    },
    {
      company: "MatrixLife Training Pvt. Ltd.",
      role: "Sales Intern",
      period: "February 2026 – Present",
      color: "#C084FC",
      type: "B2B / Outreach",
      bullets: [
        "Managed B2B and B2C sales prospecting and LinkedIn outreach to corporate professionals and organizations",
        "Qualified inbound leads for executive coaching and professional development programs",
        "Maintained sales trackers, organized prospect databases, and scheduled discovery meetings"
      ]
    },
    {
      company: "Skillfied Mentor",
      role: "Business Analyst Intern",
      period: "June 2023 – August 2023",
      color: "#34D399",
      type: "Data Analytics",
      bullets: [
        "Analysed historical sales data to identify seasonal trends and shifts in customer behaviour",
        "Built growth projections to help management identify high-profit market opportunities",
        "Prepared sales performance reports to support strategic decision-making"
      ]
    },
    {
      company: "Evoke",
      role: "Consultant",
      period: "June 2023 – August 2023",
      color: "#FB923C",
      type: "Consulting",
      bullets: [
        "Facilitated communication between mentors and student cohorts during leadership training",
        "Led structured problem-solving exercises and team-building activities within group workshops"
      ]
    }
  ];

  const handleTabChange = (idx) => {
    if (idx === activeTab) return;
    setFade(false);
    setTimeout(() => {
      setActiveTab(idx);
      setFade(true);
    }, 250);
  };

  const active = tabs[activeTab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Sidebar Tab List (lg:col-span-4) */}
      <div className="lg:col-span-4 space-y-3">
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => handleTabChange(idx)}
              className="w-full p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: isSelected ? tab.color : 'rgba(124, 106, 247, 0.08)',
                backgroundColor: isSelected ? `${tab.color}08` : 'rgba(17, 17, 24, 0.4)'
              }}
            >
              {/* Highlight accent pill on active */}
              {isSelected && (
                <div 
                  className="absolute left-0 top-0 h-full w-[4px]" 
                  style={{ backgroundColor: tab.color }}
                />
              )}
              
              <div className="flex justify-between items-start">
                <span className="font-display font-extrabold text-text-primary group-hover:text-text-primary/90">
                  {tab.company}
                </span>
                <span 
                  className="text-[10px] font-mono font-medium py-0.5 px-2.5 rounded bg-primary-bg border"
                  style={{ borderColor: `${tab.color}20`, color: tab.color }}
                >
                  {tab.role}
                </span>
              </div>
              <span className="text-[11px] font-mono text-text-muted mt-2 block">
                {tab.period}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Detail Panel (lg:col-span-8) */}
      <div className="lg:col-span-8 bg-surface-bg border border-accent-primary/10 p-6 md:p-8 rounded-3xl min-h-[360px] flex flex-col justify-between shadow-xl">
        <div className={`transition-all duration-350 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1b1b26] pb-5 gap-3 mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-text-primary">
                {active.role}
              </h3>
              <p className="text-sm font-mono mt-1 flex items-center gap-1.5" style={{ color: active.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active.color }} />
                {active.company}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span 
                className="text-[10px] font-mono py-1 px-3 rounded-full bg-primary-bg border text-text-primary"
                style={{ borderColor: `${active.color}35` }}
              >
                {active.type}
              </span>
              <span className="text-[10px] font-mono py-1 px-3 bg-primary-bg rounded-full text-text-muted border border-accent-primary/5">
                {active.period}
              </span>
            </div>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-4 text-sm md:text-base text-text-muted leading-relaxed pl-1.5">
            {active.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 shrink-0 text-text-muted mt-0.5" style={{ color: active.color }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

        </div>

        {/* Footer Accent Decoration */}
        <div className="border-t border-[#1b1b26] pt-5 mt-8 flex justify-end text-xs font-mono text-text-muted">
          <span>Focus: {active.type}</span>
        </div>

      </div>

    </div>
  );
}
