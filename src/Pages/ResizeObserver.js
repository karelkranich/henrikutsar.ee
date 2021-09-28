import { useRef, useCallback, useEffect, useState } from "react";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

export default function ResizeObserver() {
  const [size, setSize] = useState({ width: 0 });
  const resizeObserver = useRef(null);

  const onResize = useCallback((entries) => {
    const { width } = entries[0].contentRect;
    setSize({ width });
  }, []);

  const ref = useCallback(
    (node) => {
      if (node !== null) {
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
        }
        resizeObserver.current = new ResizeObserver(onResize);
        resizeObserver.current.observe(node);
      }
    },
    [onResize]
  );

  useEffect(
    () => () => {
      resizeObserver.current.disconnect();
    },
    []
  );

  return { ref, width: size.width };
}
