import React from 'react';
import { useEffect } from 'react'

export function useCloseCallback({ref, callback}: {ref: React.RefObject<any>, callback: (e?: any) => void}) {
  useEffect(() => {
    const el = ref.current!;
    el.addEventListener('kuiEventCloseButtonClose', callback, false);
    return () => {
      el.removeEventListener('kuiEventCloseButtonClose', callback);
    };
  }, [ref, callback]);
}