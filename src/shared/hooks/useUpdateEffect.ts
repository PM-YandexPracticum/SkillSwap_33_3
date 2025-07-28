import { useEffect, useRef } from 'react';

export function useUpdateEffect(
  cb: React.EffectCallback,
  deps: unknown[] = []
) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cb();
  }, deps);
}
