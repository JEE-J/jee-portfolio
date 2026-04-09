// components/AnimatedTerminal.tsx
'use client';

import React, { useState, useEffect } from 'react';

const AnimatedTerminal = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // The expanded code detailing your skills
  const codeString = `
// Initialize Creative Technologist
const alex = new Developer({
  name: "JEE",
  status: "Crafting Digital Experiences"
});

// System Architect: Coding & Logic
alex.deploySkills({
  webDev: ["Next.js", "React", "TailwindCSS", "Node.js"],
  appDev: ["Flutter", "React Native", "SwiftUI"]
});

// Creative Engine: Audio & Visuals
alex.loadModules({
  musicProduction: ["Ableton Live", "Sound Design", "Mixing"],
  contentCreation: ["Video Editing", "3D Motion", "AI Workflows"]
});

// Execute Main Loop
alex.buildFutureCuriosities();
  `.trim();

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    let isMounted = true; // Prevents errors if you navigate away from the page

    const startTyping = () => {
      if (!isMounted) return;
      setIsTyping(true);
      setText('');
      i = 0;

      // The typing animation
      typingInterval = setInterval(() => {
        if (i < codeString.length) {
          setText((prev) => prev + codeString.charAt(i));
          i++;
        } else {
          // When finished typing, stop the interval
          clearInterval(typingInterval);
          setIsTyping(false); // Keeps the cursor blinking without typing
          
          // Wait 4 seconds, then restart the animation
          timeoutId = setTimeout(() => {
            if (isMounted) startTyping();
          }, 4000); 
        }
      }, 30); // Typing speed: 30ms per character (slightly faster)
    };

    // Kick off the loop
    startTyping();

    // Cleanup function when component unmounts
    return () => {
      isMounted = false;
      clearInterval(typingInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full h-full p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30">
      <div className="w-full h-full bg-black/80 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col font-mono text-xs md:text-sm shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-white/5">
        
        {/* Terminal Header (Mac style dots) */}
        <div className="flex gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>

        {/* The Typing Code Area */}
        <div className="text-gray-300 whitespace-pre-wrap flex-grow overflow-hidden">
          {/* Syntax Highlighting hack for the simple text */}
          <span dangerouslySetInnerHTML={{ 
            __html: text
              .replace(/const|new/g, '<span class="text-pink-400">$&</span>')
              .replace(/Developer/g, '<span class="text-purple-400">$&</span>')
              .replace(/"(.*?)"/g, '<span class="text-green-300">"$&"</span>')
              .replace(/\/\/ (.*)/g, '<span class="text-gray-500">$&</span>')
              .replace(/([a-zA-Z]+)(?=:)/g, '<span class="text-blue-300">$&</span>') // Highlights object keys (webDev, appDev)
          }} />
          
          {/* Blinking Cursor */}
          <span className={`inline-block w-2 h-4 ml-1 bg-purple-400 align-middle ${isTyping ? 'animate-pulse' : 'animate-pulse opacity-50'}`}></span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTerminal;