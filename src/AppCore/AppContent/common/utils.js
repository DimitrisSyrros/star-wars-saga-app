import { useCallback, useEffect, useState } from 'react';

/**
 * This hook gets and tracks the width of the window
 * @returns {number}
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  /**
   * Memoized callback function to update the state with the current window's inner width.
   * This prevents the creation of multiple instances of the resize event handler function.
   */
  const handleResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  /**
   * Sets up and cleans up the window resize event listener. The event listener
   * calls the `handleResize` function, which updates the window size state.
   */
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowSize;
};
