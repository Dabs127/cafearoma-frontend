"use client";

import Woman from "@/public/coffeHands.png";
import Image from "next/image";
import logoPic from "@/public/logoCafeAroma.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaArrowLeft } from "react-icons/fa6";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [weAreInLoginForm, setWeAreInLoginForm] = useState<boolean>(false);

  const t = useTranslations("AuthLayout");

  const pathName = usePathname();

  const handleClick = () => {
    setWeAreInLoginForm(!weAreInLoginForm);
  };

  return (
    <main className="w-full h-screen overflow-hidden flex flex-col lg:flex-row bg-primary">
      <Link
        href={"/"}
        className="absolute top-0 right-0 m-5 flex items-center gap-x-3 group"
      >
        <FaArrowLeft className="h-7 w-7 z-10 text-secondary group-hover:-translate-x-2 transition-all" />
        <span className="text-xl text-secondary font-semibold">
          {t("backHome")}
        </span>
      </Link>
      <div className="absolute w-full h-full lg:block lg:w-1/2 lg:max-h-screen lg:static">
        <Image
          src={Woman}
          alt="Ejemplo de cliente sosteniendo producto de la cafetería"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center lg:w-1/2">
        <div className="z-10">
          <Image
            src={logoPic}
            alt="Logo cafe aroma"
            width={70}
            className="mt-10"
          />
        </div>

        <div
          className={`w-[90%] h-auto relative flex flex-col mt-10 transition-all duration-500 ease-in-out sm:w-1/2`}
        >
          <div
            className={`bg-accent border-b-2 border-b-accent w-1/2 h-2/4 absolute z-0 rounded-2xl transition duration-300 ease-in-out ${
              pathName === "/es/iniciar-sesion" || pathName === "/en/login"
                ? "transform translate-x-2/2"
                : ""
            }`}
          ></div>
          <div className="w-full h-auto bg-secondary rounded-t-xl z-0">
            <Link href="/register" replace prefetch={true}>
              <button
                className="w-1/2 h-15  text-white text-lg  cursor-pointer"
                onClick={handleClick}
              >
                {t("titleRegister")}
              </button>
            </Link>
            <Link href="/login" replace prefetch={true}>
              <button
                className="w-1/2 h-15 text-white text-lg  cursor-pointer"
                onClick={handleClick}
              >
                {t("titleLogin")}
              </button>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
