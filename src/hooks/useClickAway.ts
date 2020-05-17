import { useEffect } from "react";

// THIS HOOK HAS BEEN INSPIRED BY https://usehooks.com/useOnClickOutside/JJ:W

const useClickAway = (ref: any, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);

    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);

      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export { useClickAway };
