"use server";

import CoffeShopPicture from "@/public/coffeShop.jpg";
import Carousel from "@/components/Carousel";
import Latte from "@/public/cafe.png";
import Sandwich from "@/public/sandwich.png";
import Frappe from "@/public/frappe.png";
import { getTranslations } from "next-intl/server";

const slides = [
  {
    src: Latte.src,
    alt: "Cup of coffee",
    title: "Latte",
    description: "Cafe 100% de arabica Tostado medio",
  },
  {
    src: Sandwich.src,
    alt: "Sandwich",
    title: "Sandwich",
    description: "Pan recién horneado con ingredientes frescos",
  },
  {
    src: Frappe.src,
    alt: "Frappe",
    title: "Frappe",
    description: "Cafe helado con crema batida",
  },
];

export default async function ShowProducts() {

  const t = await getTranslations("HomePage");

  slides[0].description = t("image1Description");
  slides[1].description = t("image2Description");
  slides[2].description = t("image3Description");

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${CoffeShopPicture.src})` }}
        className="object-contain max-w-full max-h-1/4 p-10 mx-5 my-20 flex justify-center items-center rounded-4xl shadow-2xl"
      >
        <Carousel slides={slides} />
      </div>
    </section>
  );
}
