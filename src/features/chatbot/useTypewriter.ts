import { useEffect, useRef, useState } from 'react';
import { TYPING_TICK_MS, charsPerTick, nextVisibleLength } from './typewriter.ts';

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export interface TypewriterCallbacks {
  /** Called after each step (e.g. to keep the chat scrolled to the bottom). */
  readonly onProgress?: () => void;
  /** Called once when the whole text is visible. */
  readonly onDone?: () => void;
}

/**
 * How much of `text` is visible. With `enabled` false, or when the visitor prefers
 * reduced motion, the whole text shows at once.
 */
export function useTypewriter(text: string, enabled: boolean, callbacks: TypewriterCallbacks = {}): string {
  const [shouldType] = useState(() => enabled && !prefersReducedMotion());
  const [visibleLength, setVisibleLength] = useState(shouldType ? 0 : text.length);
  const callbacksRef = useRef(callbacks);
  const isDone = visibleLength >= text.length;

  useEffect(() => {
    callbacksRef.current = callbacks;
  });

  useEffect(() => {
    if (isDone) {
      return undefined;
    }
    const step = charsPerTick(text.length);
    const timer = window.setInterval(() => {
      setVisibleLength((current) => nextVisibleLength(current, text.length, step));
    }, TYPING_TICK_MS);
    return () => window.clearInterval(timer);
  }, [isDone, text]);

  useEffect(() => {
    if (isDone) {
      callbacksRef.current.onDone?.();
    } else {
      callbacksRef.current.onProgress?.();
    }
  }, [isDone, visibleLength]);

  return text.slice(0, visibleLength);
}
