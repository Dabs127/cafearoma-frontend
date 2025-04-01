import MenuItemCard from "@/components/MenuItemCard";

export default function CategorySection() {
  return (
    <div className="w-full h-full">
      <h2 className="w-full h-13 mt-10 pl-10 font-semibold text-secondary text-4xl border-b-4 border-secondary">
        Bebidas
      </h2>
      <div className="grid grid-cols-3 gap-15 w-full h-full justify-center p-20">
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
        <MenuItemCard />
      </div>
    </div>
  );
}
