import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function TheFooter() {
  return (
    <footer className="w-full h-auto bg-primary p-15 flex flex-col justify-center items-center mt-auto">
      <div className="w-full h-auto flex flex-col items-center justify-center text-secondary mb-8">
        <p>lun Cerrado</p>
        <p>mar 1:00 p.m. - 10:00 p.m.</p>
        <p>mié 1:00 p.m. - 10:00 p.m.</p>
        <p>jue 1:00 p.m. - 10:00 p.m.</p>
        <p>vie 1:00 p.m. - 10:00 p.m.</p>
        <p>sab 1:00 p.m. - 10:00 p.m.</p>
        <p>dom 1:00 p.m. - 10:00 p.m.</p>
      </div>
      <div className="w-1/2 h-0.5 bg-white"></div>
      <div className="flex gap-5 my-5">
        <FaFacebook className="text-secondary text-3xl" />
        <FaInstagram className="text-secondary text-3xl" />
      </div>
      <p className="text-secondary text-center mb-5">Café Aroma &copy; 2025</p>
      <Link href="#" className="text-secondary underline">
        Aviso de privacidad
      </Link>
    </footer>
  );
}
