/* ============================================
   Dark Mode Toggle Functionality
   ============================================ */

(function() {
  'use strict';
  
  // Theme configuration
  const THEME_KEY = 'portfolio-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  
  // Get saved theme or default to light
  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
  }
  
  // Save theme to localStorage
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        if (theme === DARK_THEME) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    }
    
    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  // Toggle between light and dark themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    // Add transition class for smooth color changes
    document.documentElement.classList.add('theme-transitioning');
    
    applyTheme(newTheme);
    saveTheme(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  }
  
  // Create theme toggle button if it doesn't exist
  function createToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle')) {
      return;
    }
    
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.setAttribute('title', 'Toggle theme');
    
    const icon = document.createElement('i');
    icon.className = 'fa fa-moon';
    
    button.appendChild(icon);
    document.body.appendChild(button);
    
    // Add click event listener
    button.addEventListener('click', toggleTheme);
    
    // Add keyboard accessibility
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
  
  // Initialize theme on page load
  function initTheme() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    createToggleButton();
  }
  
  // Check for system preference
  function checkSystemPreference() {
    if (!localStorage.getItem(THEME_KEY)) {
      // Only use system preference if user hasn't set a preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(DARK_THEME);
      }
    }
  }
  
  // Listen for system theme changes
  function watchSystemTheme() {
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Modern browsers
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', (e) => {
          // Only auto-switch if user hasn't manually set a preference
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
          }
        });
      }
      // Older browsers
      else if (darkModeQuery.addListener) {
        darkModeQuery.addListener((e) => {
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
          }
        });
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      checkSystemPreference();
      watchSystemTheme();
    });
  } else {
    initTheme();
    checkSystemPreference();
    watchSystemTheme();
  }
  
  // Export public API
  window.ThemeToggle = {
    toggle: toggleTheme,
    setTheme: (theme) => {
      if (theme === DARK_THEME || theme === LIGHT_THEME) {
        applyTheme(theme);
        saveTheme(theme);
      }
    },
    getCurrentTheme: () => document.documentElement.getAttribute('data-theme'),
    isDark: () => document.documentElement.getAttribute('data-theme') === DARK_THEME
  };
  
})();

/* ============================================
   Theme-specific adjustments
   ============================================ */

// Listen for theme changes and update other components
window.addEventListener('themechange', (e) => {
  const theme = e.detail.theme;
  
  // Update any third-party components that need theme awareness
  // For example, update chart colors, map styles, etc.
  
  // Update meta theme-color for mobile browsers
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.head.appendChild(metaThemeColor);
  }
  
  if (theme === 'dark') {
    metaThemeColor.content = '#0a0e27';
  } else {
    metaThemeColor.content = '#ffffff';
  }
});

/* ============================================
   Smooth transitions for theme switching
   ============================================ */

// Add CSS for smooth theme transitions
const style = document.createElement('style');
style.textContent = `
  .theme-transitioning,
  .theme-transitioning *,
  .theme-transitioning *::before,
  .theme-transitioning *::after {
    transition: background-color 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease !important;
  }
`;
document.head.appendChild(style);
