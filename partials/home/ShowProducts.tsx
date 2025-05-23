import CoffeShopPicture from "@/public/coffeShop.jpg";
import Carousel from "@/components/Carousel";
import Latte from "@/public/cafe.png";
import Sandwich from "@/public/sandwich.png";
import Frappe from "@/public/frappe.png";

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

export default function ShowProducts() {
  return (
    <section>
      <div
        style={{ backgroundImage: `url(${CoffeShopPicture.src})` }}
        className="object-contain max-w-full max-h-1/4 p-10 mx-10 my-20 flex justify-center items-center rounded-4xl shadow-2xl"
      >
        <Carousel slides={slides} />
      </div>
    </section>
  );
}
