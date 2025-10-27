import { describe, it, expect } from 'vitest';
import { clamp, roundTo, roundToGrid } from '../src/math';

describe('Math Utils', () => {
  describe('clamp', () => {
    it('should clamp value to minimum', () => {
      expect(clamp(5, 10, 20)).toBe(10);
    });

    it('should clamp value to maximum', () => {
      expect(clamp(25, 10, 20)).toBe(20);
    });

    it('should return value if within range', () => {
      expect(clamp(15, 10, 20)).toBe(15);
    });
  });

  describe('roundTo', () => {
    it('should round to specified decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.14159, 3)).toBe(3.142);
    });
  });

  describe('roundToGrid', () => {
    it('should round to nearest grid size', () => {
      expect(roundToGrid(23, 10)).toBe(20);
      expect(roundToGrid(27, 10)).toBe(30);
      expect(roundToGrid(25, 10)).toBe(30);
    });
  });
});
