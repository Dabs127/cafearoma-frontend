"use client";

import { routing } from "@/i18n/routing";
import { Locale, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CiGlobe } from "react-icons/ci";

type Props = {};

const languages = {
  es: "Español",
  en: "English",
};

const LocaleSwitcher = (props: Props) => {
  const locale: string = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    nextLocale: string
  ) => {
    router.replace(
      { pathname },
      {
        locale: nextLocale as Locale,
      }
    );
  };

  return (
    <div className="relative w-max">
      <CiGlobe
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
        size={20}
      />
      <select
        className="pl-10 pr-3 py-2 border border-secondary rounded-lg cursor-pointer text-gray-800 text-sm"
        name="language"
        id="language"
        defaultValue={locale}
        onChange={(e) => handleChange(e, e.target.value)}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc in languages ? languages[loc] : loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
