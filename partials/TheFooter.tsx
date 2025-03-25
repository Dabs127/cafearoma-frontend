import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function TheFooter() {

    return (
        <footer className="w-full h-auto bg-primary p-15 flex flex-col justify-center items-center mt-auto">
            <div className="flex gap-5 my-5">
                <FaFacebook className="text-secondary text-3xl" />
                <FaInstagram className="text-secondary text-3xl" />
            </div>
            <p className="text-secondary text-center mb-5">Café Aroma &copy; 2025</p>
            <Link href="#" className="text-secondary underline">Aviso de privacidad</Link>
        </footer>
    )
}