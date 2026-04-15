import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import gsap from 'gsap'

const Home = () => {
   const userData = useSelector(state => state.user)
   const heroRef = useRef(null)
   const taglineRef = useRef(null)
   const themesRef = useRef(null)
   const [currentTheme, setCurrentTheme] = useState(() => {
      // Initialize from localStorage immediately to avoid hydration mismatch
      if (typeof window !== 'undefined') {
         return localStorage.getItem('app-theme') || 'nearrock'
      }
      return 'nearrock'
   })

   // Theme personalities - each theme represents a different vibe/personality
   const themePersonalities = [
      {
         name: 'nearrock',
         label: 'The Classic',
         mood: 'Balanced & Timeless',
         description: 'For those who appreciate simplicity and elegance. A refined palette that never goes out of style.',
         emoji: '🎭',
         traits: ['Sophisticated', 'Reliable', 'Understated']
      },
      {
         name: 'midnight-purple',
         label: 'The Dreamer',
         mood: 'Mysterious & Creative',
         description: 'Deep purples for the imaginative souls. Perfect for night owls and creative minds.',
         emoji: '🌙',
         traits: ['Artistic', 'Intuitive', 'Enigmatic']
      },
      {
         name: 'cyberpunk-neon',
         label: 'The Rebel',
         mood: 'Electric & Bold',
         description: 'Neon lights and electric vibes. For those who live fast and stand out from the crowd.',
         emoji: '⚡',
         traits: ['Daring', 'Futuristic', 'Energetic']
      },
      {
         name: 'forest-dark',
         label: 'The Naturalist',
         mood: 'Grounded & Calm',
         description: 'Earthy greens for nature lovers. Find your peace in the digital wilderness.',
         emoji: '🌲',
         traits: ['Harmonious', 'Growth-oriented', 'Peaceful']
      },
      {
         name: 'sunset-dark',
         label: 'The Romantic',
         mood: 'Warm & Passionate',
         description: 'Warm oranges and deep reds. For the passionate hearts and sunset chasers.',
         emoji: '🌅',
         traits: ['Passionate', 'Warm', 'Adventurous']
      },
      {
         name: 'nordic-frost',
         label: 'The Minimalist',
         mood: 'Cool & Focused',
         description: 'Icy blues and clean aesthetics. Clarity and focus for the modern minimalist.',
         emoji: '❄️',
         traits: ['Clear-minded', 'Efficient', 'Serene']
      },
      {
         name: 'glassymax',
         label: 'The Optimist',
         mood: 'Bright & Cheerful',
         description: 'Soft pastels with a glass-like clarity. For those who see the world through rose-tinted glasses.',
         emoji: '✨',
         traits: ['Positive', 'Transparent', 'Joyful']
      },
      {
         name: 'dancinglol',
         label: 'The Playful',
         mood: 'Fun & Quirky',
         description: 'Vibrant and unexpected. For the free spirits who dance to their own beat.',
         emoji: '🎉',
         traits: ['Spontaneous', 'Fun-loving', 'Unique']
      }
   ]

   // Ensure theme is applied to root element on mount
   useEffect(() => {
      const root = document.getElementById('root')
      if (root && currentTheme) {
         root.setAttribute('data-theme', currentTheme)
      }
   }, [])

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Hero text animation
         gsap.fromTo(
            taglineRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
         )

         // Theme cards stagger animation
         gsap.fromTo(
            '.theme-personality-card',
            { opacity: 0, y: 60, scale: 0.9 },
            {
               opacity: 1,
               y: 0,
               scale: 1,
               duration: 0.6,
               stagger: 0.1,
               ease: 'power3.out',
               delay: 0.3
            }
         )

         // Floating animation for decorative elements
         gsap.to('.floating-emoji', {
            y: -10,
            rotation: 5,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.2
         })
      }, heroRef)

      return () => ctx.revert()
   }, [])

   // Listen for theme changes
   useEffect(() => {
      const observer = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
               const newTheme = document.getElementById('root')?.getAttribute('data-theme')
               if (newTheme) setCurrentTheme(newTheme)
            }
         })
      })

      const root = document.getElementById('root')
      if (root) {
         observer.observe(root, { attributes: true })
      }

      return () => observer.disconnect()
   }, [])

   const currentPersonality = themePersonalities.find(t => t.name === currentTheme) || themePersonalities[0]

   return (
      <div ref={heroRef} className="min-h-screen bg-base-100 overflow-hidden">
         {/* Dynamic background based on current theme */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
         </div>

         {/* Hero Section */}
         <section className="relative z-10 min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Floating emojis */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               {themePersonalities.map((theme, idx) => (
                  <div
                     key={theme.name}
                     className="floating-emoji absolute text-4xl opacity-20"
                     style={{
                        top: `${15 + (idx * 10)}%`,
                        left: `${5 + (idx * 12)}%`,
                        animationDelay: `${idx * 0.3}s`
                     }}
                  >
                     {theme.emoji}
                  </div>
               ))}
            </div>

            {/* Main content */}
            <div ref={taglineRef} className="text-center max-w-5xl mx-auto">
               {/* Dynamic Logo based on current theme */}
               <div className="mb-6">
                  <div className="relative inline-block">
                     <span className="text-6xl">{currentPersonality.emoji}</span>
                     <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary-content" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                     </div>
                  </div>
               </div>

               {/* Current Theme Badge */}
               <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-sm">
                     <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                     You're feeling <span className="font-semibold text-primary">{currentPersonality.label}</span> today
                  </span>
               </div>

               {/* Main headline */}
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="text-base-content">Express Your</span>
                  <br />
                  <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                     True Colors
                  </span>
               </h1>

               {/* Subheadline */}
               <p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Every person has a unique vibe. Switch themes to match your mood and connect with people who resonate with your energy.
               </p>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {userData?.user ? (
                     <Link
                        to="/dashboard"
                        className="btn btn-primary btn-lg px-10 text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        Explore Connections
                     </Link>
                  ) : (
                     <>
                        <Link
                           to="/register"
                           className="btn btn-primary btn-lg px-10 text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                           </svg>
                           Find Your Vibe
                        </Link>
                        <Link
                           to="/login"
                           className="btn btn-outline btn-lg px-10 text-lg border-2 hover:bg-base-200 transition-all duration-300 hover:-translate-y-1"
                        >
                           Already a Member
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </section>

         {/* Theme Personalities Section */}
         <section ref={themesRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                     What's Your <span className="text-primary">Vibe</span>?
                  </h2>
                  <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                     Each color palette represents a different personality. Use the color picker in the navbar to switch themes and find your match.
                  </p>
               </div>

               {/* Theme Cards Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {themePersonalities.map((theme) => (
                     <div
                        key={theme.name}
                        className={`theme-personality-card card bg-base-200/50 backdrop-blur-sm border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group ${
                           currentTheme === theme.name
                              ? 'border-primary shadow-primary/20 shadow-lg'
                              : 'border-base-300 hover:border-primary/50'
                        }`}
                        onClick={() => {
                           const root = document.getElementById('root')
                           if (root) {
                              root.setAttribute('data-theme', theme.name)
                              localStorage.setItem('app-theme', theme.name)
                              setCurrentTheme(theme.name)
                           }
                        }}
                     >
                        <div className="card-body p-6">
                           {/* Emoji & Name */}
                           <div className="flex items-center gap-3 mb-4">
                              <span className="text-4xl group-hover:scale-110 transition-transform">{theme.emoji}</span>
                              <div>
                                 <h3 className="font-bold text-lg">{theme.label}</h3>
                                 <p className="text-xs text-base-content/60">{theme.mood}</p>
                              </div>
                           </div>

                           {/* Description */}
                           <p className="text-sm text-base-content/70 mb-4 leading-relaxed">
                              {theme.description}
                           </p>

                           {/* Traits */}
                           <div className="flex flex-wrap gap-2">
                              {theme.traits.map((trait, idx) => (
                                 <span
                                    key={idx}
                                    className="text-xs px-2 py-1 rounded-full bg-base-300/50 text-base-content/80"
                                 >
                                    {trait}
                                 </span>
                              ))}
                           </div>

                           {/* Active Indicator */}
                           {currentTheme === theme.name && (
                              <div className="absolute top-3 right-3">
                                 <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Click hint */}
               <p className="text-center text-sm text-base-content/50 mt-8">
                  Click any card to try that vibe, or use the color palette icon in the navbar
               </p>
            </div>
         </section>

         {/* How It Works Section */}
         <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-base-200/30">
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                     How <span className="text-primary">Vibe Matching</span> Works
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                     <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold mb-2">1. Pick Your Colors</h3>
                     <p className="text-base-content/70">Choose a theme that matches your personality and current mood.</p>
                  </div>

                  <div className="text-center">
                     <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold mb-2">2. Find Your People</h3>
                     <p className="text-base-content/70">Connect with others who share your vibe or complement it perfectly.</p>
                  </div>

                  <div className="text-center">
                     <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold mb-2">3. Start Chatting</h3>
                     <p className="text-base-content/70">Break the ice with people who get your energy. Real conversations, real connections.</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
               <div className="card bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-base-300">
                  <div className="card-body items-center text-center p-12">
                     <div className="text-5xl mb-4">{currentPersonality.emoji}</div>
                     <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to find your <span className="text-primary">{currentPersonality.label}</span> match?
                     </h2>
                     <p className="text-lg text-base-content/70 mb-8 max-w-xl">
                        Join thousands of others expressing their true colors. Your vibe attracts your tribe.
                     </p>
                     {!userData?.user && (
                        <Link
                           to="/register"
                           className="btn btn-primary btn-lg px-12 text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1"
                        >
                           Join the Community
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                           </svg>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 border-t border-base-300">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentPersonality.emoji}</span>
                  <span className="font-bold text-lg">tinder.</span>
               </div>
               <p className="text-sm text-base-content/60">
                  Express yourself. Find your vibe. Connect for real.
               </p>
            </div>
         </footer>
      </div>
   )
}

export default Home




