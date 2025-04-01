import { LuCoffee, LuCakeSlice, LuEggFried, LuSandwich } from "react-icons/lu";
import { PiOrange } from "react-icons/pi";

const categories = [
  { name: "Cafés", icon: <LuCoffee /> },
  { name: "Postres", icon: <LuCakeSlice /> },
  { name: "Desayunos", icon: <LuEggFried /> },
  { name: "Comida",  icon: <LuSandwich /> },
  { name: "Jugos", icon: <PiOrange /> },
];

export default function CategorySelector() {
  return (
    <div className="w-full mb-10">
      <ul className="flex">
        {
            categories.map((category) => {
                return (
                <li key={category.name} className="w-full h-15 flex flex-col justify-center items-center text-lg text-accent font-semibold">
                    <span className="text-3xl p-2 text-text-muted rounded-full hover:text-accent transition-all duration-300 ease-in-out cursor-pointer">{category.icon}</span>
                    <span>{category.name}</span>
                </li>
                );
            })
        }
      </ul>
    </div>
  );
}
