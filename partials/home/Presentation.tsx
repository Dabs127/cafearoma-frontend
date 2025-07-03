"use server";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Presentation() {
  const t = await getTranslations("HomePage");

  return (
    <div className="w-full min-h-10/12 h-1/2 flex flex-col justify-center items-center bg-secondary py-20">
      <h1 className="text-8xl text-light underline decoration-8 decoration-accent  underline-offset-20">Cáfe Aroma</h1>
      <p className="w-2/6 text-2xl text-light my-15 text-center italic">
        {t("heroDescription")}
      </p>

      <Link href="/menu" className="bg-accent w-36 h-18 text-2xl flex items-center justify-center font-semibold text-light p-4 rounded-2xl">{t("seeMenu")}</Link>
    </div>
  );
}
