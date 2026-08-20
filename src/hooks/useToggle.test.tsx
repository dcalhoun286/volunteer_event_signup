import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  describe('initialization', () => {
    it('should initialize toggle to false', () => {
      const { result } = renderHook(() => useToggle());

      expect(result.current.toggle).toBe(false);
    });

    it('should return an object with toggle and handleToggle properties', () => {
      const { result } = renderHook(() => useToggle());

      expect(result.current).toHaveProperty('toggle');
      expect(result.current).toHaveProperty('handleToggle');
    });

    it('should provide handleToggle as a function', () => {
      const { result } = renderHook(() => useToggle());

      expect(typeof result.current.handleToggle).toBe('function');
    });
  });

  describe('toggle functionality', () => {
    it('should toggle from false to true when handleToggle is called', () => {
      const { result } = renderHook(() => useToggle());

      expect(result.current.toggle).toBe(false);

      act(() => result.current.handleToggle());

      expect(result.current.toggle).toBe(true);
    });

    it('should toggle from true to false when handleToggle is called', () => {
      const { result } = renderHook(() => useToggle());

      act(() => result.current.handleToggle());
      expect(result.current.toggle).toBe(true);

      act(() => result.current.handleToggle());
      expect(result.current.toggle).toBe(false);
    });

    it('should handle multiple consecutive toggles', () => {
      const { result } = renderHook(() => useToggle());

      const expectedSequence = [false, true, false, true, false, true];

      for (let i = 1; i < expectedSequence.length; i++) {
        act(() => result.current.handleToggle());
        expect(result.current.toggle).toBe(expectedSequence[i]);
      }
    });
  });

  describe('state persistance', () => {
    it('should maintain state across re-renders', () => {
      const { result, rerender } = renderHook(() => useToggle());

      act(() => result.current.handleToggle());
      expect(result.current.toggle).toBe(true);

      rerender();
      expect(result.current.toggle).toBe(true);
    });

    it('should maintain state through multiple re-renders and toggles', () => {
      const { result, rerender } = renderHook(() => useToggle());

      act(() => result.current.handleToggle());
      rerender();
      expect(result.current.toggle).toBe(true);

      act(() => result.current.handleToggle());
      rerender();
      expect(result.current.toggle).toBe(false);

      rerender();
      expect(result.current.toggle).toBe(false);
    });
  });

  describe('function stability', () => {
    it('should return a stable handleToggle function reference', () => {
      const { result, rerender } = renderHook(() => useToggle());
      const firstToggleRef = result.current.handleToggle;

      rerender();

      const secondToggleRef = result.current.handleToggle;
      expect(firstToggleRef).toBe(secondToggleRef);
    });

    it('should maintain stable handleToggle reference even after state changes', () => {
      const { result } = renderHook(() => useToggle());
      const firstToggleRef = result.current.handleToggle;

      act(() => result.current.handleToggle());

      const secondToggleRef = result.current.handleToggle;
      expect(firstToggleRef).toBe(secondToggleRef);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid successive toggles', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.handleToggle();
        result.current.handleToggle();
        result.current.handleToggle();
        result.current.handleToggle();
        result.current.handleToggle();
      });

      expect(result.current.toggle).toBe(true);
    });

    it('should work correctly with multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useToggle());
      const { result: result2 } = renderHook(() => useToggle());

      act(() => result1.current.handleToggle());

      expect(result1.current.toggle).toBe(true);
      expect(result2.current.toggle).toBe(false);

      act(() => result2.current.handleToggle());

      expect(result1.current.toggle).toBe(true);
      expect(result2.current.toggle).toBe(true);
    });
  });
});
