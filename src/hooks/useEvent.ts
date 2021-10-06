import { useEffect } from 'react';

export default function useEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options: boolean | AddEventListenerOptions = false,
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return function cleanup() {
      window.removeEventListener(type, listener);
    };
  });
}
