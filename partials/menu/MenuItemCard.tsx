import Image from "next/image";
import { Item } from "@/types/items";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useSessionStore } from "@/stores/useSessionStore";

type MenuItemCardProps = {
  item: Item;
  handleOpenDeleteModal: () => void;
  handleOpenUpdateModal: () => void;
};

export default function MenuItemCard({
  item,
  handleOpenDeleteModal,
  handleOpenUpdateModal,
}: MenuItemCardProps) {
  const { session, loading } = useSessionStore();
  
  return (
    <div className="w-full h-auto min-h-min rounded-3xl flex flex-col items-center shadow-2xl bg-white relative">
      <div className="w-full flex justify-center items-center overflow-hidden rounded-t-3xl shadow-lg">
        <Image
          className="w-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
          width={300}
          height={300}
          src={item.imgUrl}
          alt={`Imagen de ${item.name}`}
          priority
        />
      </div>
      <h3 className="mt-5 text-accent text-center text-4xl">{item.name}</h3>
      <p className="p-5 text-text-muted text-center text-xl">
        {item.description}
      </p>
      <p className="text-text-muted text-xl mt-5">${item.price}</p>
      {
        !loading && session?.role === "Administrator" ? <div className="absolute bottom-0 flex gap-x-15">
          <button
            className="relative -bottom-5 border-4 border-red-700 p-2 rounded-xl bg-white"
            onClick={handleOpenDeleteModal}
          >
            <FaTrash className="w-7 h-7" />
          </button>
          <button className="" onClick={handleOpenUpdateModal}>
            <FaEdit className="w-13 h-13 relative -bottom-5 border-4 border-accent p-2 rounded-xl bg-white" />
          </button>
        </div> : <div className="w-5 h-13 bg-amber-700" />
      }
    </div>
  );
}
