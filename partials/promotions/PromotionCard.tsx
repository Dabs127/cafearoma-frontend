import { useSessionStore } from "@/stores/useSessionStore";
import { Promotion } from "@/types/promotions";
import Link from "next/link";
import { FaEdit, FaLock, FaTrash } from "react-icons/fa";

type PromotionCardProps = {
  promotion: Promotion;
  handleOpenDeleteModal: () => void;
  handleOpenUpdateModal: () => void;
};

export default function PromotionCard({
  promotion,
  handleOpenDeleteModal,
  handleOpenUpdateModal,
}: PromotionCardProps) {
  const { session, loading } = useSessionStore();

  return (
    <div className="w-full h-auto min-h-min rounded-3xl flex flex-col shadow-2xl bg-white my-10 md:min-w-min md:min-h-150 md:max-h-150">
      <div className="w-full h-4/9 flex justify-center items-center relative overflow-hidden rounded-t-3xl">
        <img
          className="w-full h-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
          src={`${promotion.imgUrl}`}
          alt={`Image of promotion ${promotion.title}`}
        />
        {promotion.authenticationRequired && !session && (
          <div className="w-full h-full absolute flex justify-center items-center bg-black/80">
            <FaLock className="w-1/4 h-1/4 text-white" />
          </div>
        )}
      </div>
      <div className="w-full h-3/9 border-b-2 border-b-text-muted">
        <h3 className="mt-5 px-5 text-secondary text-4xl font-semibold">
          {promotion.title}
        </h3>
        <p className="my-5 px-5 text-2xl min-h-28">
          {promotion.shortDescription}
        </p>
      </div>
      <div className="w-full h-2/9 flex justify-between items-center pr-5">
        {
          <div className="ml-10 flex gap-x-5">
            <button
              className=" border-4 border-red-700 p-2 rounded-xl bg-white"
              onClick={handleOpenDeleteModal}
            >
              <FaTrash className="w-7 h-7" />
            </button>
            <button
              className="border-4 border-accent p-2 rounded-xl bg-white"
              onClick={handleOpenUpdateModal}
            >
              <FaEdit className="w-7 h-7" />
            </button>
          </div>
        }
        <Link
          href={`/promotions/${promotion._id}`}
          className="text-xl text-secondary my-5 py-2 px-4 border-2 rounded-2xl border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out"
        >
          Ver más
        </Link>{" "}
        {/*Agregar el id de la promoción*/}
      </div>
    </div>
  );
}
