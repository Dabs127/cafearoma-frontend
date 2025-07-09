"use client";

import { useFetchSession } from "@/hooks/useFetchSession";
import { CiSquarePlus } from "react-icons/ci";
import { use, useEffect, useState } from "react";
import { useSessionStore } from "@/stores/useSessionStore";
import CreateNewMenuItemModal from "./CreateNewMenuItemModal";
import { useTranslations } from "next-intl";

function CreateNewMenuItemButton(props: any) {
  const { session, loading } = useSessionStore();
  const fetchSession = useFetchSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations("MenuPage");

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  function handleModalToggle() {
    setIsModalOpen(!isModalOpen);
  }

  if(loading){
    return <div className="w-1 h-9" />
  }

  // If the user is not an administrator, do not render the button
  return !loading && session?.role === "Administrator" ? (
    <>
      <button
        className="text-secondary text-xl flex items-center gap-2 mb-5 cursor-pointer hover:text-yellow-950 transition-colors duration-300"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <CiSquarePlus className="inline text-4xl" />
        {t("createNewItemButton")}
      </button>

      {isModalOpen && <CreateNewMenuItemModal onClose={handleModalToggle} />}
    </>
  ) : null;
}

export default CreateNewMenuItemButton;
