import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidNumber, isInRange } from '../src/validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isValidNumber', () => {
    it('should validate numbers', () => {
      expect(isValidNumber(42)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-10)).toBe(true);
    });

    it('should reject non-numbers', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('42')).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should check if number is in range', () => {
      expect(isInRange(5, 0, 10)).toBe(true);
      expect(isInRange(0, 0, 10)).toBe(true);
      expect(isInRange(10, 0, 10)).toBe(true);
    });

    it('should return false if out of range', () => {
      expect(isInRange(-1, 0, 10)).toBe(false);
      expect(isInRange(11, 0, 10)).toBe(false);
    });
  });
});
