"use server";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Presentation() {
  const t = await getTranslations("HomePage");

  return (
    <div className="w-full min-h-10/12 h-1/2 flex flex-col justify-center items-center bg-secondary py-20">
      <h1 className="text-5xl text-light underline decoration-8 decoration-accent  underline-offset-20 sm:text-7xl">Cáfe Aroma</h1>
      <p className="text-md w-2/5 text-light my-15 text-center italic sm:text-2xl">
        {t("heroDescription")}
      </p>

      <Link href="/menu" className="bg-accent w-30 h-15 text-center text-xl flex items-center justify-center font-semibold text-light p-4 rounded-2xl sm:w-32 sm:h-15 sm:text-xl">{t("seeMenu")}</Link>
    </div>
  );
}
