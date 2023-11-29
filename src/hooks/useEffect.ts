import { useEffect } from 'react';

// Custom useEffect-like hook
export const useCustomEffect = (callback:  () => void, dependencies: any[] = []) => {
  useEffect(() => {
    // Your custom logic goes here
    callback();

    // Cleanup function (if needed)
    return () => {
      // Cleanup logic (if needed)
    };
  }, dependencies);
};