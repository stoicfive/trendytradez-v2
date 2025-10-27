import { describe, it, expect } from 'vitest';
import { createTheme } from '../src/createTheme';

describe('createTheme', () => {
  it('should create dark theme', () => {
    const theme = createTheme('dark');
    
    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.colors.background).toBe('#0d1117');
    expect(theme.palette.colors.text.primary).toBe('#e6edf3');
  });

  it('should create light theme', () => {
    const theme = createTheme('light');
    
    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.colors.background).toBe('#ffffff');
    expect(theme.palette.colors.text.primary).toBe('#24292f');
  });

  it('should include spacing function', () => {
    const theme = createTheme('dark');
    
    expect(theme.spacing(1)).toBe('0.25rem');
    expect(theme.spacing(4)).toBe('1rem');
    expect(theme.spacing(8)).toBe('2rem');
  });

  it('should include typography settings', () => {
    const theme = createTheme('dark');
    
    expect(theme.typography.fontSize).toBe(16);
    expect(theme.typography.fontWeightRegular).toBe(400);
    expect(theme.typography.fontWeightBold).toBe(700);
  });

  it('should include shadow definitions', () => {
    const theme = createTheme('dark');
    
    expect(theme.shadows).toHaveLength(5);
    expect(theme.shadows[0]).toBe('none');
  });
});
