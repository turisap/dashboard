import { useEffect, useState } from "react";

import { LoadingStatus } from "types/";

type Hook = (delay: number, status: LoadingStatus) => boolean;

const useDelayedLoading: Hook = (delay = 500, status) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  let id = 0;

  useEffect(() => {
    switch (status) {
      case "pristine":
        setShowLoading(true);

        return undefined;
      case "success":
        setShowLoading(false);

        return undefined;
      case "loading":
        id = window.setTimeout(() => setShowLoading(true), delay);

        return () => clearTimeout(id);
      default:
        return undefined;
    }
  }, [status]);

  return showLoading;
};

export { useDelayedLoading };
