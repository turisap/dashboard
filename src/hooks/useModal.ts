import { useState } from "react";

type UseModalHook = () => [boolean, () => void];

export const useModal: UseModalHook = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => setVisible(!visible);

  return [visible, toggleVisible];
};
