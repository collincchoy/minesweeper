import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [success, setSuccess] = useState(false);

  return {
    showModal: (success: boolean) => {
      setSuccess(success);
      setIsShowing(true);
    },
    clearModal: () => {
      setIsShowing(false);
    },
    isShowing,
    success,
  };
};

export default useModal;
