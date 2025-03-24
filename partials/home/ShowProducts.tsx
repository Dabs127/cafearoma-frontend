import Image from "next/image";
import CoffeShopPicture from "@/public/coffeShop.jpg";
import CoffeCupWithoutBg from "@/public/coffeCupWithoutBg.png";

export default function ShowProducts() {
  return (
    <section>
      <div
        style={{ backgroundImage: `url(${CoffeShopPicture.src})` }}
        className="object-contain max-w-full h-auto p-10 m-10 flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <Image className="w-3/4" src={CoffeCupWithoutBg} alt="Coffe Shop" />
          <h2 
          className="text-5xl text-center text-white font-semibold"
          style={{ WebkitTextStroke: "2px #6C4E31" }}
          >
            Café americano</h2>
          <p className="text-center text-white text-2xl">Cafe 100% de arabica Tostado medio</p>
        </div>
      </div>
    </section>
  );
}
