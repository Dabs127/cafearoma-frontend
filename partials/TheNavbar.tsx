import Image from "next/image";
import Link from "next/link";
import logoPic from "@/public/logoCafeAroma.png";

export default function TheNavbar() {
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
          <Link href="/menu" className="text-secondary font-semibold">
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
      <Link
        href="/login"
        className="w-[7rem] text-center mr-5 p-4 rounded-xl font-semibold bg-secondary  text-text-default"
      >
        Unirse
      </Link>
    </nav>
  );
}
