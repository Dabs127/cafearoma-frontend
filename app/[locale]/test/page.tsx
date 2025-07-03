import Carousel from "@/components/Carousel";
import Latte from "@/public/latte.jpg";
import Sandwich from "@/public/sandwich.jpg";
import Frappe from "@/public/frappe.jpg";

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

export default function Test() {
  return (
    <div className="w-full h-auto">
      <main className="w-[20%] m-auto pt-11">
        <Carousel slides={slides} />
      </main>
    </div>
  );
}
