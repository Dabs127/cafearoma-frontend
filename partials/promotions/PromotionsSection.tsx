"use client";
import {
  deletePromotion,
  getAllPromotions,
} from "@/actions/promotions/promotionsActions";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import PromotionCard from "@/partials/promotions/PromotionCard";
import usePromotionsStore from "@/stores/usePromotionsStore";
import { useEffect, useState } from "react";
import UpdatePromotionModal from "./update/UpdatePromotionModal";
import { MdDoNotDisturbAlt } from "react-icons/md";
import PromotionSkeleton from "./PromotionSkeleton";
import PromotionDetailsModal from "./details/PromotionDetailsModal";

export default function PromotionsSection() {
  const { promotions, setPromotions } = usePromotionsStore();
  const [isDeleteConfirmActionModalOpen, setIsDeleteConfirmActionModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [promotionId, setPromotionId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      const { promotions } = await getAllPromotions();
      setPromotions(promotions);
      setIsLoading(false);
    };
    fetchPromotions();
  }, []);

  const handleOpenDeleteModal = (id: string) => {
    setIsDeleteConfirmActionModalOpen(!isDeleteConfirmActionModalOpen);
    setPromotionId(id);
    document.body.style.overflow = "hidden";
  };

  const handleOpenUpdateModal = (id: string) => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
    setPromotionId(id);
    document.body.style.overflow = "hidden";
  };

  const handleOpenPromotionDetailsModal = (id: string) => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
    setPromotionId(id);
    document.body.style.overflow = "hidden";
  };

  if (isLoading) return <PromotionSkeleton />;

  return (
    <>
      {isDeleteConfirmActionModalOpen && (
        <ConfirmActionModal
          onClose={() => {
            setIsDeleteConfirmActionModalOpen(false);
            document.body.style.overflow = "";
          }}
          actionType="delete"
          action={async () => {
            deletePromotion(promotionId?.toString() || "");
            const { promotions } = await getAllPromotions();
            setPromotions(promotions);
          }}
          id={promotionId}
        />
      )}
      {isUpdateModalOpen && (
        <UpdatePromotionModal
          onClose={() => {
            setIsUpdateModalOpen(false);
            document.body.style.overflow = "";
          }}
          id={promotionId?.toString() || ""}
        />
      )}
      {isDetailsModalOpen && (
        <PromotionDetailsModal
          onClose={() => {
            setIsDetailsModalOpen(false);
            document.body.style.overflow = "";
          }}
          id={promotionId?.toString() || ""}
        />
      )}
      {promotions.length !== 0 && !isLoading ? (
        <div className="w-full h-full grid grid-cols-1 items-center justify-center gap-25 md:grid-cols-2">
          {promotions.map((promotion) => {
            return (
              <PromotionCard
                key={promotion._id}
                promotion={promotion}
                handleOpenDeleteModal={() =>
                  handleOpenDeleteModal(promotion._id)
                }
                handleOpenUpdateModal={() =>
                  handleOpenUpdateModal(promotion._id)
                }
                handleOpenDetailsModal={() =>
                  handleOpenPromotionDetailsModal(promotion._id)
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center text-text-muted p-30">
          <MdDoNotDisturbAlt className="w-20 h-20" />
          <span className="text-xl w-50 text-center mt-5">
            Agregue sus primeras promociones y haga conocer su negocio!
          </span>
        </div>
      )}
    </>
  );
}
