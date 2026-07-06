/**
 * ThemeSwitcher Component
 * Dropdown selector for switching between available themes
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import * as Icons from './icons';

const ChevronDown = Icons.ChevronDown || (() => <span>▼</span>);
const Check = Icons.Check || (() => <span>✓</span>);

export function ThemeSwitcher() {
  const { currentTheme, availableThemes, switchTheme, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter out hidden themes (platforms: WCP, AX, PX and their variants)
  const visibleThemes = availableThemes.filter(t => !t.hidden);
  const currentThemeData = availableThemes.find(t => t.id === currentTheme);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        minWidth: '280px',
      }}
    >
      {/* Label */}
      <label
        htmlFor="theme-selector"
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text)',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}
      >
        Theme
      </label>

      {/* Dropdown Button */}
      <button
        id="theme-selector"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-border-subtle)',
          borderRadius: 'var(--ld-semantic-border-radius-input)',
          fontSize: '14px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          transition: 'all 0.2s ease',
          outline: 'none',
          opacity: isLoading ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-focus-outline)';
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--ld-primitive-color-blue-20)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtle)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-border-subtle)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          {/* Color indicator */}
          {currentThemeData?.previewColor && (
            <span
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: currentThemeData.previewColor,
                border: '1px solid var(--ld-semantic-color-border-subtlest)',
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 600 }}>
              {isLoading ? 'Loading...' : currentThemeData?.name || 'Select Theme'}
            </div>
          </div>
        </div>
        <ChevronDown
          style={{
            width: '20px',
            height: '20px',
            color: 'var(--ld-semantic-color-icon)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: '1px solid var(--ld-semantic-color-border-subtle)',
            borderRadius: 'var(--ld-semantic-border-radius-medium)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease',
          }}
        >
          {visibleThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                switchTheme(theme.id);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: theme.id === currentTheme 
                  ? 'var(--ld-semantic-color-fill-brand-subtle, var(--ld-primitive-color-blue-10))' 
                  : 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--ld-semantic-font-family-sans)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text)',
                transition: 'background-color 0.15s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (theme.id !== currentTheme) {
                  e.currentTarget.style.backgroundColor = 'var(--ld-primitive-color-gray-5)';
                }
              }}
              onMouseLeave={(e) => {
                if (theme.id !== currentTheme) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Color indicator */}
              {theme.previewColor && (
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: theme.previewColor,
                    border: '1px solid var(--ld-semantic-color-border-subtlest)',
                    flexShrink: 0,
                  }}
                />
              )}
              
              {/* Theme info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: theme.id === currentTheme ? 600 : 400 }}>
                  {theme.name}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--ld-semantic-color-text-subtle)',
                    marginTop: '2px',
                  }}
                >
                  {theme.description}
                </div>
              </div>

              {/* Check icon for selected theme */}
              {theme.id === currentTheme && (
                <Check
                  style={{
                    width: '20px',
                    height: '20px',
                    color: 'var(--ld-semantic-color-action-fill-primary)',
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontStyle: 'italic',
          }}
        >
          Switching theme...
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
