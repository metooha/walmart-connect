/**
 * ThemeContext
 * Provides theme switching functionality via CSS custom property swapping
 * Themes are loaded dynamically by injecting/removing <link> tags
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AVAILABLE_THEMES, DEFAULT_THEME, getThemeById, type Theme } from './theme-registry';

interface ThemeContextValue {
  currentTheme: Theme['id'];
  currentThemeData: Theme | undefined;
  availableThemes: Theme[];
  switchTheme: (themeId: Theme['id']) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'ld-theme';

/**
 * Load theme CSS files dynamically using inheritance model
 * Base theme is loaded statically via global.css
 * This function manages theme OVERRIDE files and inheritance chains
 */
function loadThemeCSS(theme: Theme): Promise<void> {
  return new Promise((resolve, reject) => {
    // Remove existing theme override links
    const existingOverrides = document.querySelectorAll('link[data-theme-override]');
    console.log(`🗑️ Removing ${existingOverrides.length} existing override link(s)`);
    existingOverrides.forEach(link => link.remove());

    console.log(`🎨 Loading theme: ${theme.name} (inherits: ${theme.inherits || 'none'})`);

    // Determine which CSS files to load based on inheritance
    const cssFilesToLoad: Array<{href: string, type: 'primitive' | 'semantic', source: string}> = [];

    // If theme inherits WCP, load WCP semantic.css first
    const inheritsWCP = theme.inherits === 'wcp' || theme.inherits?.includes('wcp') || theme.id === 'walmart';
    if (inheritsWCP) {
      cssFilesToLoad.push({
        href: '/styles/themes/wcp/semantic.css',
        type: 'semantic',
        source: 'WCP (parent)'
      });
    }

    // If theme inherits Sam's Club, load Sam's Club semantic.css (which will also load WCP)
    if (theme.inherits === 'sams-club') {
      // Sam's Club inherits WCP, so load WCP first if not already added
      if (!inheritsWCP) {
        cssFilesToLoad.push({
          href: '/styles/themes/wcp/semantic.css',
          type: 'semantic',
          source: 'WCP (grandparent)'
        });
      }
      cssFilesToLoad.push({
        href: '/styles/themes/sams-club/semantic.css',
        type: 'semantic',
        source: 'Sam\'s Club (parent)'
      });
    }

    // Then load the theme's own files (if not walmart, which just uses WCP)
    if (theme.id !== 'walmart') {
      if (theme.primitiveCSS !== '/styles/themes/base/primitive.css') {
        cssFilesToLoad.push({
          href: theme.primitiveCSS,
          type: 'primitive',
          source: theme.name
        });
      }
      cssFilesToLoad.push({
        href: theme.semanticCSS,
        type: 'semantic',
        source: theme.name
      });
    }

    // If no files to load, just resolve
    if (cssFilesToLoad.length === 0) {
      console.log('✅ No override files needed - using base theme only');
      resolve();
      return;
    }

    console.log(`📥 Loading ${cssFilesToLoad.length} CSS file(s):`);
    cssFilesToLoad.forEach(file => console.log(`  - ${file.type}: ${file.href} (from ${file.source})`));

    // Add cache-busting timestamp
    const cacheBust = `?v=${Date.now()}`;

    // Create link elements for all files in inheritance chain
    const linkElements = cssFilesToLoad.map((file, index) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = file.href + cacheBust;
      link.setAttribute('data-theme-override', file.type);
      link.setAttribute('data-theme-id', theme.id);
      link.setAttribute('data-theme-source', file.source);
      link.setAttribute('data-load-order', String(index));
      return link;
    });

    // Track loading state
    let loadedCount = 0;
    let hasError = false;

    const checkAllLoaded = () => {
      if (loadedCount === linkElements.length && !hasError) {
        console.log(`✅ All ${linkElements.length} theme CSS files loaded successfully`);

        // Log final computed values for debugging
        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--ld-semantic-color-action-fill-primary').trim();
        console.log(`🔍 Primary action color:`, primaryColor || 'NOT FOUND');

        resolve();
      }
    };

    const handleError = (error: Event, file: {href: string, source: string}) => {
      if (!hasError) {
        hasError = true;
        console.error('❌ Failed to load theme CSS:', file.href, 'from', file.source);
        reject(new Error(`Failed to load theme: ${theme.name}`));
      }
    };

    // Attach load handlers and append to head
    linkElements.forEach((link, index) => {
      const file = cssFilesToLoad[index];

      link.onload = () => {
        loadedCount++;
        console.log(`✅ Loaded (${loadedCount}/${linkElements.length}): ${file.source} ${file.type}`);
        checkAllLoaded();
      };

      link.onerror = (error) => handleError(error, file);

      document.head.appendChild(link);
    });
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default
  const [currentTheme, setCurrentTheme] = useState<Theme['id']>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && AVAILABLE_THEMES.some(t => t.id === stored)) {
        return stored as Theme['id'];
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    return DEFAULT_THEME;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Switch theme function
  const switchTheme = useCallback((themeId: Theme['id']) => {
    const theme = getThemeById(themeId);
    if (!theme) {
      console.error(`Theme not found: ${themeId}`);
      return;
    }

    console.log(`🎨 Switching theme to: ${theme.name} (${themeId})`);
    setIsLoading(true);

    loadThemeCSS(theme)
      .then(() => {
        console.log(`✅ Theme loaded successfully: ${theme.name}`);
        console.log(`🎨 Primary button color should now be:`,
          themeId === 'base' ? '#0053e2 (Walmart blue)' : '#002e99 (Navy blue)');

        // Force a small delay and reflow to ensure CSS is fully applied
        setTimeout(() => {
          // Force browser to recalculate styles
          document.body.offsetHeight;

          setCurrentTheme(themeId);

          // Persist to localStorage
          try {
            localStorage.setItem(THEME_STORAGE_KEY, themeId);
          } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
          }

          setIsLoading(false);

          // Log computed style for debugging
          const computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--ld-semantic-color-action-fill-primary').trim();
          console.log(`🔍 Computed primary color after switch:`, computedColor || 'NOT FOUND');

          // Check if override files are in the DOM
          const overrideLinks = document.querySelectorAll('link[data-theme-override]');
          console.log(`🔗 Override links in DOM:`, overrideLinks.length);
          overrideLinks.forEach(link => {
            console.log(`  - ${link.getAttribute('data-theme-override')}:`, (link as HTMLLinkElement).href);
          });
        }, 100);
      })
      .catch((error) => {
        console.error('❌ Theme loading failed:', error);
        setIsLoading(false);

        // Fallback to default theme on error
        if (themeId !== DEFAULT_THEME) {
          const defaultTheme = getThemeById(DEFAULT_THEME);
          if (defaultTheme) {
            loadThemeCSS(defaultTheme).catch(console.error);
          }
        }
      });
  }, []);

  // Load initial theme on mount (if not base, since base is already in global.css)
  useEffect(() => {
    const theme = getThemeById(currentTheme);
    if (theme && theme.id !== 'base') {
      setIsLoading(true);
      loadThemeCSS(theme)
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error('Initial theme loading failed:', error);
          setIsLoading(false);
        });
    }
  }, []); // Only run once on mount

  const currentThemeData = getThemeById(currentTheme);

  const value: ThemeContextValue = {
    currentTheme,
    currentThemeData,
    availableThemes: AVAILABLE_THEMES,
    switchTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
