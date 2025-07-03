"use server";

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default async function TheFooter() {
  
  const t = await getTranslations("Footer");
  
  return (
    <footer className="w-full h-auto bg-primary p-15 flex flex-col justify-center items-center mt-auto">
      <div className="w-full h-auto flex flex-col items-center justify-center text-secondary mb-8">
        <p>{t("Days.Monday")} {t("Closed")} </p>
        <p>{t("Days.Tuesday")} 1:00 p.m. - 10:00 p.m.</p>
        <p>{t("Days.Wednesday")} 1:00 p.m. - 10:00 p.m.</p>
        <p>{t("Days.Thursday")} 1:00 p.m. - 10:00 p.m.</p>
        <p>{t("Days.Friday")} 1:00 p.m. - 10:00 p.m.</p>
        <p>{t("Days.Saturday")} 1:00 p.m. - 10:00 p.m.</p>
        <p>{t("Days.Sunday")} 1:00 p.m. - 10:00 p.m.</p>
      </div>
      <div className="w-1/2 h-0.5 bg-white"></div>
      <div className="flex gap-5 my-5">
        <FaFacebook className="text-secondary text-3xl" />
        <FaInstagram className="text-secondary text-3xl" />
      </div>
      <p className="text-secondary text-center mb-5">Café Aroma &copy; 2025</p>
      <Link href="#" className="text-secondary underline">
        {t("PrivacyPolicy")}
      </Link>
    </footer>
  );
}
