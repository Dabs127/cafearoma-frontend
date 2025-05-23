"use client";

import Woman from "@/public/coffeHands.png";
import Image from "next/image";
import logoPic from "@/public/logoCafeAroma.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [weAreInLoginForm, setWeAreInLoginForm] = useState<boolean>(false);

  const pathName = usePathname();

  const handleClick = () => {
    setWeAreInLoginForm(!weAreInLoginForm);
  };


  return (
    <main className="w-full h-screen overflow-hidden flex flex-row bg-primary">
      <div className="w-1/2">
        <Image
          src={Woman}
          alt="Ejemplo de cliente sosteniendo producto de la cafetería"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-start items-center mt-10">
        <Image src={logoPic} alt="Logo cafe aroma" width={70} />
        <div
          className={`w-2/4 max-h-44 relative flex flex-col mt-10 transition-all duration-500 ease-in-out`}
        >
          <div
            className={`bg-accent border-b-2 border-b-accent w-1/2 h-2/4 absolute z-0 rounded-2xl transition duration-300 ease-in-out ${
              pathName === "/login" ? "transform translate-x-2/2" : ""
            }`}
          ></div>
          <div className="w-full h-auto bg-secondary rounded-t-xl z-0">
            <Link href="/register" replace prefetch={true}>
              <button
                className="w-1/2 h-15  text-white text-lg  cursor-pointer"
                onClick={handleClick}
              >
                Registrarse
              </button>
            </Link>
            <Link href="/login" replace prefetch={true}>
              <button
                className="w-1/2 h-15 text-white text-lg  cursor-pointer"
                onClick={handleClick}
              >
                Iniciar sesión
              </button>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
