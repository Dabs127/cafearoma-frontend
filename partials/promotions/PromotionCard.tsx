import { useSessionStore } from "@/stores/useSessionStore";
import { Promotion } from "@/types/promotions";
import { FaEdit, FaLock, FaTrash } from "react-icons/fa";
import Image from "next/image";

type PromotionCardProps = {
  promotion: Promotion;
  handleOpenDeleteModal: () => void;
  handleOpenUpdateModal: () => void;
  handleOpenDetailsModal: () => void;
};

export default function PromotionCard({
  promotion,
  handleOpenDeleteModal,
  handleOpenUpdateModal,
  handleOpenDetailsModal,
}: PromotionCardProps) {
  const { session, loading } = useSessionStore();

  return (
    <div className="w-full h-auto min-h-min rounded-3xl flex flex-col shadow-2xl bg-white my-10 md:min-w-min md:min-h-150 md:max-h-150">
      <div className="w-full h-4/9 flex justify-center items-center relative overflow-hidden rounded-t-3xl">
        <Image
          width={800}
          height={500}
          className="w-full h-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
          src={`${promotion.imgUrl}`}
          alt={`Image of promotion ${promotion.title}`}
        />
        <img />
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
      <div className="w-full h-2/9 flex justify-between items-center pr-5 py-2">
        {
          <div className="ml-10 flex gap-x-5">
            <button
              className=" border-4 border-red-700 p-2 rounded-xl bg-white cursor-pointer"
              onClick={handleOpenDeleteModal}
            >
              <FaTrash className="w-7 h-7" />
            </button>
            <button
              className="border-4 border-accent p-2 rounded-xl bg-white cursor-pointer"
              onClick={handleOpenUpdateModal}
            >
              <FaEdit className="w-7 h-7" />
            </button>
          </div>
        }
        {((promotion.authenticationRequired && session) ||
          !promotion.authenticationRequired) && (
          <button
            className="text-xl text-secondary py-2 px-4 border-2 rounded-2xl cursor-pointer border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out"
            onClick={handleOpenDetailsModal}
          >
            Ver más
          </button>
        )}
      </div>
    </div>
  );
}
