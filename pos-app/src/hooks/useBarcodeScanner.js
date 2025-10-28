import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for barcode scanner support
 * Detects rapid keyboard input (barcode scanner simulation)
 * 
 * @param {Function} onScan - Callback function when barcode is scanned
 * @param {Object} options - Configuration options
 */
const useBarcodeScanner = (onScan, options = {}) => {
  const {
    minLength = 3,
    maxLength = 20,
    timeout = 100, // Time window for scanner input (ms)
    endChar = 'Enter',
    preventDefault = true,
  } = options;

  const buffer = useRef('');
  const timeoutRef = useRef(null);

  const resetBuffer = useCallback(() => {
    buffer.current = '';
  }, []);

  const handleKeyPress = useCallback((event) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Ignore if modifier keys are pressed
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const key = event.key;

    // Check if it's the end character
    if (key === endChar) {
      const scannedValue = buffer.current.trim();
      
      if (scannedValue.length >= minLength && scannedValue.length <= maxLength) {
        if (preventDefault) {
          event.preventDefault();
        }
        
        // Call the callback with scanned value
        onScan(scannedValue);
      }
      
      resetBuffer();
      return;
    }

    // Add character to buffer if it's alphanumeric or allowed special char
    if (key.length === 1) {
      buffer.current += key;

      // Prevent default if buffer is building up (likely a scanner)
      if (buffer.current.length > 2 && preventDefault) {
        event.preventDefault();
      }

      // Set timeout to reset buffer if input stops
      timeoutRef.current = setTimeout(() => {
        resetBuffer();
      }, timeout);
    }
  }, [onScan, minLength, maxLength, timeout, endChar, preventDefault, resetBuffer]);

  useEffect(() => {
    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  return {
    resetBuffer,
  };
};

export default useBarcodeScanner;
