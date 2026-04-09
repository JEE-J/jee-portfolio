'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ExternalLink, GitFork, X, Globe, Mail } from 'lucide-react';
// ADD YOUR IMPORT HERE:
import OrraAppPreview from './components/OrraAppPreview';
import AnimatedTerminal from './components/AnimatedTerminal';
// ... rest of your imports

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const orraRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
const [isSending, setIsSending] = useState(false);

const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Don't send if fields are empty
  if (!name || !email || !message) return; 
  
  setIsSending(true);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "7bdfdabd-909d-4b07-84b9-e1f16dd9e766",
        name: name,
        email: email,
        message: message,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setIsSent(true);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    setIsSending(false);
  }
};

useEffect(() => {
  const handleScroll = () => {
    // Check if user scrolled down more than 50px
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Run it once on load just in case the page is already scrolled
  handleScroll(); 

  // Cleanup
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    const titleLines = titleRef.current?.querySelectorAll('span.animate-line');
    gsap.from(titleLines || [], {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.3,
    });

    gsap.from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
    });

    gsap.from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: 'back.out(1.7)',
    });

    gsap.to(imageContainerRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });


      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(imageContainerRef.current, {
          x,
          y,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      if (marqueeRef.current) {
        gsap.from(marqueeRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        });
      }

      if (orraRef.current) {
        const orraElements = orraRef.current.querySelectorAll('.animate-element');
        gsap.from(orraElements, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: orraRef.current,
            start: 'top 70%',
          },
        });
      }

      if (aboutRef.current) {
        const aboutElements = aboutRef.current.querySelectorAll('.animate-element');
        gsap.from(aboutElements, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
          },
        });
      }

      if (contactRef.current) {
        const formElements = contactRef.current.querySelectorAll('.form-element');
        gsap.from(formElements, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
          },
        });
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style jsx global>{`
      html { scroll-behavior: smooth; }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>

      {/* --- HEADER --- */}
      {/* The outer div handles the slide-down and centering animation */}
      {/* --- HEADER --- */}
      {/* Move ref={headerRef} HERE to the outer container so GSAP doesn't block Tailwind */}
      <div ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'pt-6' : 'pt-0'}`}>
        
        <header 
          className={`
            flex items-center justify-between backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
            ${isScrolled 
              ? 'w-[95%] lg:w-[65%] py-3 px-8 bg-[#111111]/90 rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' // Scrolled State
              : 'w-full py-8 px-6 md:px-12 bg-black/20 rounded-none border-b border-transparent' // Top State
            }
          `}
        >
          <div className="text-3xl font-semibold tracking-tighter text-white">JEE</div>
          
          <nav className={`flex items-center transition-all duration-500 ${isScrolled ? 'gap-4 md:gap-5' : 'gap-8'}`}>
            <a href="#work" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest hidden md:block">WORK</a>
            <span className="text-gray-800 hidden md:block">|</span>
            <a href="#about" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest hidden md:block">ABOUT</a>
            <span className="text-gray-800 hidden md:block">|</span>
            <a href="#projects" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest hidden md:block">PROJECTS</a>
            <span className="text-gray-800 hidden md:block">|</span>
            <a href="#contact" className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest hidden md:block">CONTACT</a>
            
            <button className={`border border-gray-600 text-white rounded-full text-xs hover:bg-white hover:text-black transition-all uppercase tracking-widest ${isScrolled ? 'px-5 py-2.5 ml-2' : 'px-6 py-2.5 ml-4'}`}>
              GET IN TOUCH
            </button>
          </nav>
        </header>
        
      </div>

      <main className="relative min-h-screen flex items-center px-6 md:px-12 pt-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto w-full relative min-h-[700px] flex items-center">
          
          <div className="space-y-8 relative w-full lg:w-3/4 z-0 -mt-45">
            <h1 ref={titleRef} className="font-bold tracking-tighter leading-[0.95]">
              
              <div className="text-4xl md:text-6xl lg:text-[4rem] xl:text-[5.5rem]">
                <span className="block text-white animate-line">CRAFTING FUTURE</span>
                <span className="block text-white animate-line flex items-baseline gap-4">
                  CURIOSITIES 
                 
                </span>
              </div>

              <div className="text-3xl md:text-5xl lg:text-[3rem] xl:text-[4.5rem] mt-2 md:mt-3">
                <span className="block text-gray-500 animate-line">THROUGH CODE,</span>
                <span className="block text-gray-300 animate-line">MOTION & DESIGN</span>
              </div>

            </h1>

            <p ref={descRef} className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed font-light mt-8 relative z-20">
              A portfolio of digital products and creative work by JEE.
Focused on design, development, and innovation.
            </p>

            
          </div>

          {/* --- UPDATED POSITIONING HERE --- */}
          {/* Changed top-[50%] to top-[20%] to pull the object right up to your blue mark */}
          <div ref={imageContainerRef} className="absolute right-[-10%] md:right-[-9%] top-[40%] md:top-[30%] lg:top-[32%] -translate-y-1/2 w-[120%] md:w-[65%] lg:w-[55%] h-[500px] md:h-[600px] lg:h-[700px] z-10 opacity-80 md:opacity-100 pointer-events-none">
            {/* Added pointer-events-none to the wrapper temporarily so it doesn't block the button underneath, 
                Spline internal pointer events will still work if configured in Spline */}
            <div className="w-full h-full pointer-events-auto">
              <Spline scene="https://prod.spline.design/J-KIOElR9cdWmFdB/scene.splinecode" />
            </div>
          </div>

        </div>
      </main>

      {/* Marquee, Orra, About, Contact, Footer sections remain identical... */}
      <section ref={marqueeRef} className="relative -mt-70 py-32 overflow-hidden bg-[#050505]">
        <div className="relative mb-8 overflow-hidden">
          <div className="flex gap-6 marquee-left w-max">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-6 shrink-0">
                {['Web Developing', 'App Developing', 'Music Production', 'Freelancing', 'Game Dev', 'AI Content Creating'].map((skill, index) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    className={`
                      px-12 py-8 rounded-2xl backdrop-blur-sm border
                      transition-all duration-500 cursor-pointer shrink-0
                      ${index === 1 && groupIndex === 0
                        ? 'bg-black/40 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-105 hover:scale-110'
                        : 'bg-black/20 border-gray-800/50 hover:border-gray-600 hover:scale-105'}
                    `}
                  >
                    <span className="text-lg text-gray-200 font-light tracking-wide whitespace-nowrap">{skill}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-6 marquee-right w-max">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-6 shrink-0">
                {['Web Developing', 'App Developing', 'Music Production', 'Freelancing', 'Game Dev', 'AI Content Creating'].map((skill, index) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    className="px-12 py-8 rounded-2xl backdrop-blur-sm border bg-black/20 border-gray-800/50 hover:border-gray-600 transition-all duration-500 cursor-pointer hover:scale-105 shrink-0"
                  >
                    <span className="text-lg text-gray-200 font-light tracking-wide whitespace-nowrap">{skill}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={orraRef} className="relative pt-10 pb-40 px-6 md:px-12 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            
            {/* --- LEFT SIDE: YOUR NEW APP PREVIEW COMPONENT --- */}
            <div className="animate-element relative">
              <OrraAppPreview />
            </div>

            {/* The Text for Orra App */}
            <div className="space-y-8 animate-element">
              {/* 1. Changed font-light to font-extrabold for bigger weight */}
              <h2 className="text-6xl md:text-7xl font-medium tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">ORRA</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                A revolutionary app that transforms the way you interact with digital experiences.
                Seamlessly blending design and functionality for an unparalleled user journey.
              </p>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Intuitive gesture controls</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pink-500" />AI-powered personalization</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Real-time collaboration</li>
              </ul>
              
              {/* Button Container */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                
                {/* 2. YouTube Style Interactive Button */}
                <button 
                  onClick={() => {
                    setIsDownloaded(true); // Changes the button look instantly
                    
                    // Creates an invisible link to your APK and clicks it
                    const link = document.createElement('a');
                    link.href = '/orra.apk'; // This must match the exact file name in your public folder!
                    link.download = 'ORRA_App_v1.apk'; // This is the name the file will save as on the user's computer
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className={`
                    group relative px-10 py-4 rounded-full overflow-hidden transition-all duration-300 ease-out active:scale-90
                    ${isDownloaded 
                      ? 'bg-[#272727] text-white hover:bg-[#3f3f3f]' 
                      : 'bg-white text-black'}
                  `}
                >
                  {isDownloaded ? 'Downloaded' : 'Download APK'}
                </button>

                {/* 3. New Browser Continue Button */}
                <button className="px-4 py-4 text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium hover:underline underline-offset-4">
                  Continue with browser
                </button>

              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="relative  px-6 md:px-12 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-element">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                <span className="block">Creating</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Digital</span>
                <span className="block">Experiences</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                I’m JEE — a multidisciplinary developer and creator,
building interactive experiences, digital products, and immersive systems that push creative boundaries.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <div><div className="text-3xl text-white mb-2">3+</div><div>Years Experience</div></div>
                <div><div className="text-3xl text-white mb-2">40+</div><div>Projects Completed</div></div>
                <div><div className="text-3xl text-white mb-2">50+</div><div>Happy Clients</div></div>
              </div>
            </div>

            <div className="animate-element relative">
              <div className="relative w-full max-w-[500px] mx-auto aspect-square">
                {/* Background Glows */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-pink-600/20 to-purple-600/20 blur-2xl" />
                
                {/* The New Animated Terminal */}
                <div className="relative w-full h-full z-10">
                  <AnimatedTerminal />
                </div>

                {/* Decorative floating squares */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-purple-500/40 rounded-2xl rotate-12 -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-pink-500/40 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" className="relative py-30 px-6 md:px-12 bg-black">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-6xl md:text-7xl font-light">Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span></h2>
            <p className="text-gray-400 text-lg">Have a project in mind? Let's create something extraordinary together.</p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-element group">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300" 
                />
              </div>
              <div className="form-element group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300" 
                />
              </div>
            </div>

            <div className="form-element group">
              <textarea 
                placeholder="Your Message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 resize-none" 
              />
            </div>

            <div className="flex justify-center pt-6">
              {/* Note: Changed type="button" back to type="submit" so the form handles the click */}
              <button 
                type="submit" 
                disabled={isSent || isSending}
                className={`
                  group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-300 ease-out active:scale-90
                  ${isSent 
                    ? 'bg-[#272727] text-white' 
                    : 'bg-white text-black hover:scale-105'} 
                `}
              >
                {!isSent && !isSending && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                <span className={`relative z-10 font-bold tracking-wider text-lg transition-colors duration-300 ${!isSent && !isSending && 'group-hover:text-white'}`}>
                  {isSending ? 'Sending...' : isSent ? 'Message Sent' : 'Send Message'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* --- PREMIUM PRO FOOTER --- */}
      <footer className="relative pt-24 pb-12 px-6 md:px-12 bg-[#020202] border-t border-white/5 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-900/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
            
            {/* Column 1: Brand & Status */}
            <div className="space-y-8 md:col-span-5 lg:col-span-6">
              <div className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                JEE.
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed text-lg">
                Crafting premium digital experiences, kinetic structures, and futuristic web applications.
              </p>
              
              {/* Pro Touch: Pulsing Availability Status */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300 font-medium tracking-wide">Available for freelance projects</span>
              </div>
            </div>

           
            {/* Column 2: Social Links */}
            {/* Column 2: Social Links & Email */}
            <div className="space-y-6 md:col-span-3 lg:col-span-3">
              <h4 className="text-white font-semibold tracking-widest uppercase text-xs">Connect</h4>
              <div className="flex flex-col gap-4">
                
                {/* --- NEW EMAIL LINK --- */}
                <a href="mailto:hello@jee.codes" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium tracking-wide">hello@jee.codes</span>
                </a>

                {/* Existing Social Links */}
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300"><GithubIcon className="w-4 h-4" /></div>
                  <span className="font-medium tracking-wide">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300"><LinkedinIcon className="w-4 h-4" /></div>
                  <span className="font-medium tracking-wide">LinkedIn</span>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300"><XIcon className="w-4 h-4" /></div>
                  <span className="font-medium tracking-wide">X (Twitter)</span>
                </a>
              </div>
            </div>

            {/* Column 3: Professional Platforms */}
            <div className="space-y-6 md:col-span-4 lg:col-span-3">
              <h4 className="text-white font-semibold tracking-widest uppercase text-xs">Freelance</h4>
              <div className="flex flex-col gap-4">
                <a href="https://upwork.com/freelancers/yourprofile" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-green-500/50 group-hover:bg-green-500/10 transition-all duration-300"><Briefcase className="w-4 h-4" /></div>
                  <span className="font-medium tracking-wide">Upwork</span>
                </a>
                <a href="https://fiverr.com/yourprofile" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-4 transition-colors group w-fit">
                  <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-green-500/50 group-hover:bg-green-500/10 transition-all duration-300"><ExternalLink className="w-4 h-4" /></div>
                  <span className="font-medium tracking-wide">Fiverr</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-500 tracking-wide">© {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-gray-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}