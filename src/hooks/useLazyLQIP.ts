import React, { useState, useEffect, MutableRefObject, RefObject } from "react";

import { PurchaseItem } from "types/";

type ItemsWithRefs<T> = Array<any & { ref: RefObject<T> }>;

const useLazyLQIP = <T = HTMLElement>(
  cards: Array<any>,
  root: MutableRefObject<HTMLDivElement | null>,
  threshold: number
): ItemsWithRefs<T> => {
  if (typeof IntersectionObserver === "undefined") {
    throw new Error(
      "Your browser does not support the Intersection observer API"
    );
  }

  const [items, setItems] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    const withRefs: ItemsWithRefs<T> = cards.map((item) => ({
      ...item,
      ref: React.createRef<T>(),
    }));

    setItems(withRefs);
  }, [cards]);

  useEffect(() => {
    if (items.length) {
      const opt = {
        root: root.current,
        threshold,
      };

      const observerCallback = (entries, observer) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            const link = target.dataset.img;

            target.src = link;
            observer.unobserve(target);
          }
        });
      };

      const imageObserver = new IntersectionObserver(observerCallback, opt);

      items.forEach(({ ref }) => {
        if (ref) {
          imageObserver.observe(ref.current as HTMLElement);
        }
      });
    }
  }, [items]);

  return items;
};

export { useLazyLQIP };
