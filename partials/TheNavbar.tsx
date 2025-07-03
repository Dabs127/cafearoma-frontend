"use client";

import Image from "next/image";
import Link from "next/link";
import logoPic from "@/public/logoCafeAroma.png";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect, useState } from "react";
import { useFetchSession } from "@/hooks/useFetchSession";
import SettingsModal from "./SettingsModal";
import { FaUserGear } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function TheNavbar() {
  const { session, loading } = useSessionStore();
  const fetchSession = useFetchSession();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const t = useTranslations("Navbar")

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <nav className="w-full h-auto bg-primary p-3 flex items-center gap-10">
      {showSettingsModal && (
        <SettingsModal
          onClose={() => {
            setShowSettingsModal(!showSettingsModal);
          }}
        />
      )}
      <Image src={logoPic} alt="Logo cafe aroma" width={60} />
      <ul className="flex grow gap-20">
        <li>
          <Link href="/" className="text-secondary font-semibold">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className="text-secondary font-semibold"
            prefetch={true}
          >
            {t("menu")}
          </Link>
        </li>
        <li>
          <Link href="/promotions" className="text-secondary font-semibold">
            {t("promotions")}
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-secondary font-semibold">
            {t("contact")}
          </Link>
        </li>
      </ul>
      <LocaleSwitcher/>
      {!loading && !session ? (
        <Link
          href="/login"
          className="w-[7rem] text-center p-4 rounded-xl font-semibold bg-secondary  text-text-default"
        >
          {t("login")}
        </Link>
      ) : (
        <button
          className="text-secondary text-4xl cursor-pointer"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaUserGear />
        </button>
      )}
    </nav>
  );
}
