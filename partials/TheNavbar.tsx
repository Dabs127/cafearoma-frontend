"use client";

import Image from "next/image";
import Link from "next/link";
import logoPic from "@/public/logoCafeAroma.png";
import { RiAccountCircleFill } from "react-icons/ri";
import { Session, useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import { useFetchSession } from "@/hooks/useFetchSession";

export default function TheNavbar() {
 const { session, loading} = useSessionStore();
  const fetchSession = useFetchSession();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <nav className="w-full h-auto bg-primary p-3 flex items-center gap-10">
      <Image src={logoPic} alt="Logo cafe aroma" width={60} />
      <ul className="flex grow gap-20">
        <li>
          <Link href="/" className="text-secondary font-semibold">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/menu" className="text-secondary font-semibold" prefetch={true}>
            Menú
          </Link>
        </li>
        <li>
          <Link href="/promotions" className="text-secondary font-semibold">
            Promociones
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-secondary font-semibold">
            Contacto
          </Link>
        </li>
      </ul>
      {!loading && !session ? (
        <Link
          href="/login"
          className="w-[7rem] text-center p-4 rounded-xl font-semibold bg-secondary  text-text-default"
        >
          Unirse
        </Link>
      ) : (
        <Link
          href="/profile"
          className=" text-center text-5xl rounded-xl font-semibold bg-secondary text-text-default"
        >
          <RiAccountCircleFill />
        </Link>
      )}
    </nav>
  );
}
