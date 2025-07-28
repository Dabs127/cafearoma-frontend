"use client";

import Woman from "@/public/coffeHands.png";
import Image from "next/image";
import logoPic from "@/public/logoCafeAroma.png";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaArrowLeft } from "react-icons/fa6";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("AuthLayout");

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
          {children}
        </div>
      </div>
    </main>
  );
}
