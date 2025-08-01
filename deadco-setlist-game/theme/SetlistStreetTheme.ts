// Setlist Street Theme - Professional Dead & Company Inspired Design
export const SetlistStreetTheme = {
  // 🎯 Professional Color Palette - Inspired by deadandcompany.com
  colors: {
    primary: {
      // Sophisticated neutrals with subtle Dead & Company inspired accents
      deadRed: '#8B0000',        // Deep burgundy red
      steelBlue: '#2C3E50',      
      charcoal: '#2C2C2C',       // Deep charcoal
      gold: '#D4AF37',           // Subtle gold accent
      rust: '#8B4513',           // Earth tone rust
      forest: '#355E3B',         // Deep forest green
      midnight: '#191970',       // Midnight blue
    },
    neutrals: {
      // Clean neutral palette
      white: '#FFFFFF',
      offWhite: '#FAFAFA', 
      lightGray: '#F5F5F5',
      mediumGray: '#E0E0E0',
      gray: '#9E9E9E',
      darkGray: '#616161',
      charcoal: '#424242',
      black: '#212121',
    },
    accents: {
      // Subtle accent colors for interactions
      hoverGray: '#F8F8F8',
      borderGray: '#E5E5E5',
      focusBlue: '#1976D2',
      successGreen: '#4CAF50',
      errorRed: '#F44336',
    }
  },

  // 🎨 Clean, professional backgrounds
  backgrounds: {
    main: '#FFFFFF',           // Pure white main background
    secondary: '#FAFAFA',      // Subtle off-white
    card: '#FFFFFF',           // White cards with borders
    navigation: '#FFFFFF',     // White navigation
    footer: '#2C2C2C',         // Dark footer
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // 📝 Professional Typography Stack
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
    mono: '"JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
    weights: {
      light: '300',
      normal: '400', 
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },

  // 📐 Professional Layout & Spacing
  layout: {
    maxWidth: '1200px',
    sectionSpacing: '4rem',
    containerPadding: '1.5rem',
    borderRadius: '8px',
    cardPadding: '2rem',
  },

  // 🎯 Component Styles
  components: {
    // Navigation
    navigation: {
      height: '80px',
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },

    // Cards
    card: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      hoverShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      borderRadius: '8px',
    },

    // Buttons
    button: {
      primary: {
        background: '#2C2C2C',
        color: '#FFFFFF',
        border: '1px solid #2C2C2C',
        hoverBackground: '#424242',
        shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      secondary: {
        background: '#FFFFFF',
        color: '#2C2C2C',
        border: '1px solid #E5E5E5',
        hoverBackground: '#F8F8F8',
      },
      ghost: {
        background: 'transparent',
        color: '#616161',
        hoverColor: '#2C2C2C',
        hoverBackground: '#F8F8F8',
      }
    },

    // Forms
    form: {
      input: {
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        focusBorder: '#1976D2',
        borderRadius: '6px',
        padding: '12px 16px',
      }
    },

    // Typography
    text: {
      heading: {
        color: '#212121',
        lineHeight: '1.2',
      },
      body: {
        color: '#616161',
        lineHeight: '1.6',
      },
      caption: {
        color: '#9E9E9E',
        fontSize: '0.875rem',
      }
    }
  },

  // 🎵 Dead & Company Specific Elements
  deadco: {
    // Inspired by the band's aesthetic
    logo: {
      primary: '#2C2C2C',
      secondary: '#8B0000',
    },
    typography: {
      headline: {
        fontFamily: 'Inter',
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
      subheader: {
        fontFamily: 'Inter', 
        fontWeight: '500',
        letterSpacing: '0.01em',
      }
    }
  },

  // 🎨 Gradients (minimal, professional)
  gradients: {
    subtle: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)',
    dark: 'linear-gradient(180deg, #2C2C2C 0%, #424242 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
  },

  // 🎯 Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px', 
    desktop: '1024px',
    wide: '1200px',
  },

  // ⚡ Animations
  animations: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // 🎨 States
  states: {
    hover: {
      transform: 'translateY(-1px)',
      transition: 'all 0.2s ease',
    },
    focus: {
      outline: '2px solid #1976D2',
      outlineOffset: '2px',
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    }
  }
};

export default SetlistStreetTheme; 