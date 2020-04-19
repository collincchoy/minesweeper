import { useState } from "react";
import { ModalColor } from "../components/Modal";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalBackground, setModalBackground] = useState(ModalColor.SUCCESS);

  return {
    showModal: (message: string, success: boolean) => {
      setModalMessage(message);
      if (success) {
        setModalBackground(ModalColor.SUCCESS);
      } else {
        setModalBackground(ModalColor.FAILURE);
      }
      setIsShowing(true);
    },
    clearModal: () => {
      setModalMessage("");
      setIsShowing(false);
    },
    isShowing,
    modalMessage,
    modalBackground,
  };
};

export default useModal;
