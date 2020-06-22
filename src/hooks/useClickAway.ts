import { useEffect, RefObject } from "react";

// THIS HOOK HAS BEEN INSPIRED BY https://usehooks.com/useOnClickOutside

/* eslint-disable @typescript-eslint/no-explicit-any */
type UseClickAwayHook = (ref: RefObject<any>, handler: Function) => void;

const useClickAway: UseClickAwayHook = (ref, handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const excludedTargets = document.querySelectorAll(
        "[data-excluded-target]"
      );
      const isExcluded = [...excludedTargets].some((target) =>
        target.contains(event.target as HTMLElement)
      );

      const shouldSkipCall =
        !ref.current || ref.current.contains(event.target) || isExcluded;

      if (shouldSkipCall) {
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
