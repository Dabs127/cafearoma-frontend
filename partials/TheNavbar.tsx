"use client";

import Image from "next/image";
import Link from "next/link";
import logoPic from "@/public/logoCafeAroma.png";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect, useState } from "react";
import { useFetchSession } from "@/hooks/useFetchSession";
import SettingsModal from "./SettingsModal";
import { FaUserGear } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { usePathname } from "@/i18n/navigation";

export default function TheNavbar() {
  const { session, loading } = useSessionStore();
  const fetchSession = useFetchSession();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathName = usePathname();

  const t = useTranslations("Navbar");

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <nav className="w-full h-auto bg-primary flex justify-between p-2 gap-10 md:items-center">
      {showSettingsModal && (
        <SettingsModal
          onClose={() => {
            setShowSettingsModal(!showSettingsModal);
            document.body.style.overflow = "";
          }}
        />
      )}
      <Image
        src={logoPic}
        alt="Logo cafe aroma"
        className="w-10 md:w-[60px]"
        width={0}
        sizes="100vw"
      />
      <ul
        className={`w-2/4 h-full flex flex-col items-center gap-5 bg-primary fixed ${
          navbarOpen ? "left-0" : "-left-full"
        } top-0 grow z-10 duration-500 transition-all md:static md:flex-row md:gap-20 md:items-center`}
      >
        <div className="mt-5 w-1 md:hidden" />
        <li>
          <Link href="/" className={`${pathName === "/" ? "text-white border-b-2 border-b-white" : "text-secondary"} font-semibold`}>
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className={`${pathName === "/menu" ? "text-white border-b-2 border-b-white" : "text-secondary"} font-semibold`}
            prefetch={true}
          >
            {t("menu")}
          </Link>
        </li>
        <li>
          <Link href="/promotions" className={`${pathName === "/promotions" ? "text-white border-b-2 border-b-white" : "text-secondary"} font-semibold`}>
            {t("promotions")}
          </Link>
        </li>
        <li>
          <Link href="/contact" className={`${pathName === "/contact" ? "text-white border-b-2 border-b-white" : "text-secondary"} font-semibold`}>
            {t("contact")}
          </Link>
        </li>
        <li className="w-full h-full flex flex-col items-center justify-end pb-10 md:hidden">
          {session ? (
            <button
              className="text-secondary text-4xl cursor-pointer md:mr-5 md:block"
              onClick={() => {
                setShowSettingsModal(true);
                document.body.style.overflow = "hidden";
              }}
            >
              <FaUserGear />
            </button>
          ) : (
            <Link
              href="/login"
              className="w-1/2 text-center m-4 p-4 rounded-xl font-semibold bg-secondary  text-text-default"
            >
              {t("login")}
            </Link>
          )}
        </li>
      </ul>
      {!loading && !session ? (
        <div className="h-full flex justify-end basis-80 items-center space-x-5 py-3">
          <LocaleSwitcher />
          <button
            className="text-3xl text-secondary relative cursor-pointer md:hidden"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <IoIosMenu />
          </button>
          <Link
            href="/login"
            className="hidden text-center h-full rounded-xl font-semibold bg-secondary  text-text-default md:flex items-center justify-center grow"
          >
            {t("login")}
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-5">
          <LocaleSwitcher />

          <button
            className="text-3xl text-secondary relative cursor-pointer md:hidden"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <IoIosMenu />
          </button>
          <button
            className="text-secondary text-4xl cursor-pointer hidden md:mr-5 md:block"
            onClick={() => {
              setShowSettingsModal(true);
              document.body.style.overflow = "hidden";
            }}
          >
            <FaUserGear />
          </button>
        </div>
      )}
    </nav>
  );
}
