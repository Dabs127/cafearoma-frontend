"use client";

import { useFetchSession } from "@/hooks/useFetchSession";
import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/stores/useSessionStore";
import CreateNewPromotionModal from "./CreateNewPromotionModal";

function CreateNewPromotionButton(props: any) {
  const { session, loading } = useSessionStore();
  const fetchSession = useFetchSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  function handleModalToggle() {
    setIsModalOpen(!isModalOpen);
  }

  // If the user is not an administrator, do not render the button
  return !loading && session?.role === "Administrator" ? (
    <>
      <button
        className="text-secondary text-xl flex items-center gap-2 mb-5 cursor-pointer hover:text-yellow-950 transition-colors duration-300"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <CiSquarePlus className="inline text-4xl" />
        Agregar nuevo
      </button>

      {isModalOpen && <CreateNewPromotionModal onClose={handleModalToggle} />}
    </>
  ) : null;
}

export default CreateNewPromotionButton;
