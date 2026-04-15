import { createSlice } from '@reduxjs/toolkit';

// Theme personalities data - can be imported anywhere
export const themePersonalities = [
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
];

// Get initial theme from localStorage
const getInitialTheme = () => {
   if (typeof window !== 'undefined') {
      return localStorage.getItem('app-theme') || 'nearrock';
   }
   return 'nearrock';
};

const themeSlice = createSlice({
   name: 'theme',
   initialState: {
      currentTheme: getInitialTheme(),
      personalities: themePersonalities
   },
   reducers: {
      setTheme: (state, action) => {
         state.currentTheme = action.payload;
         // Sync to localStorage
         if (typeof window !== 'undefined') {
            localStorage.setItem('app-theme', action.payload);
         }
      }
   }
});

export const { setTheme } = themeSlice.actions;

// Selectors
export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectCurrentPersonality = (state) => {
   return state.theme.personalities.find(p => p.name === state.theme.currentTheme) || state.theme.personalities[0];
};
export const selectAllPersonalities = (state) => state.theme.personalities;
export const selectThemeEmoji = (state) => {
   const personality = state.theme.personalities.find(p => p.name === state.theme.currentTheme);
   return personality?.emoji || '🔥';
};

export default themeSlice.reducer;
