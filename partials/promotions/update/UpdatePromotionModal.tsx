import {
  getAllPromotions,
  getPromotionById,
  updatePromotion,
} from "@/actions/promotions/promotionsActions";
import {
  getUpdatePromotionFormSchema,
  UpdatePromotionValues,
} from "@/schemas/promotion/UpdatePromotionFormSchema";
import usePromotionsStore from "@/stores/usePromotionsStore";
import { Promotion } from "@/types/promotions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: () => void;
  id: string;
};

const UpdatePromotionModal = (props: Props) => {
  const validationMessages = useTranslations(
    "PromotionsPage.updatePromotionFormValidation"
  );
  const [promotionInfo, setPromotionInfo] = useState<Promotion | undefined>();
  const { setPromotions } = usePromotionsStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePromotionValues>({
    resolver: zodResolver(getUpdatePromotionFormSchema(validationMessages)),
    defaultValues: {
      title: promotionInfo?.title ?? "",
      shortDescription: promotionInfo?.shortDescription ?? "",
      longDescription: promotionInfo?.longDescription ?? "",
      endDate:
        typeof promotionInfo?.endDate === "string"
          ? promotionInfo.endDate
          : new Date().toISOString().slice(0, 10),
      startDate:
        typeof promotionInfo?.startDate === "string"
          ? promotionInfo.startDate
          : new Date().toISOString().slice(0, 10),
      authenticationRequired: promotionInfo?.authenticationRequired,
    },
  });

  const t = useTranslations("PromotionsPage.updatePromotionModal");

  useEffect(() => {
    const fetchPromotionInfo = async () => {
      const response = await getPromotionById(props.id);
      setPromotionInfo(response.promotion);
      setImagePreview(response.promotion.imgUrl);
    };
    if (promotionInfo) {
      reset({
        title: promotionInfo.title,
        shortDescription: promotionInfo.shortDescription,
        longDescription: promotionInfo.longDescription,
        startDate: promotionInfo.startDate.toString().slice(0, 10),
        endDate: promotionInfo.endDate.toString().slice(0, 10),
        authenticationRequired: promotionInfo.authenticationRequired,
      });
    } else {
      fetchPromotionInfo();
    }
  }, [promotionInfo]);

  const onSubmit = async (data: UpdatePromotionValues) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    formData.append("id", promotionInfo?._id || "");

    props.onClose();
    await updatePromotion(formData);

    const { promotions } = await getAllPromotions();
    setPromotions(promotions);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className=" w-[85%] h-[85%] overflow-y-auto bg-white rounded-lg shadow-lg md:w-132">
        <div className="fixed flex justify-between items-center w-[85%] h-15 p-4 bg-white border-b-2 border-b-gray-200 md:w-132">
          <h2 className="basis-2/3 text-2xl text-accent font-semibold">
            {t("modalTitle")}
          </h2>
          <p className="basis-1/3 flex justify-end text-gray-500">
            <IoClose
              className="w- text-4xl cursor-pointer"
              onClick={props.onClose}
            />
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 items-end p-6 mt-20"
        >
          <input
            type="text"
            className={`w-full p-2 border ${
              errors.title?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            placeholder={t("title")}
            {...register("title")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.title?.message}
          </p>

          <input
            type="text"
            className={`w-full p-2 border ${
              errors.shortDescription?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            placeholder={t("shortDescription")}
            {...register("shortDescription")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.shortDescription?.message}
          </p>

          <textarea
            className={`w-full p-2 border ${
              errors.longDescription?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded resize-none `}
            placeholder={t("longDescription")}
            rows={5}
            {...register("longDescription")}
          ></textarea>
          <p className="min-w-full min-h-4 text-red-500">
            {errors.longDescription?.message}
          </p>

          <label
            htmlFor="startDate"
            className="w-full text-start text-gray-500"
          >
            {t("startDate")}
          </label>
          <input
            id="startDate"
            className="w-full text-gray-800"
            type="date"
            {...register("startDate")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.startDate?.message}
          </p>
          <label htmlFor="endDate" className="w-full text-start text-gray-500">
            {t("endDate")}
          </label>
          <input
            className="w-full text-gray-800"
            type="date"
            {...register("endDate")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.endDate?.message}
          </p>

          <label
            htmlFor="authenticationRequired"
            className="w-full text-start text-gray-500"
          >
            {t("authenticationRequired")}
          </label>
          <input
            className="mr-auto w-10 h-5"
            type="checkbox"
            {...register("authenticationRequired")}
          />

          <label className="w-full block text-lg font-medium text-gray-500">
            {t("image")}
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-secondary file:text-white hover:file:bg-secondary-dark cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    field.onChange(undefined);
                    setImagePreview(null);
                  }
                }}
              />
            )}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.image?.message}
          </p>

          {imagePreview && (
            <div className="w-full mt-2">
              <p className="text-sm text-gray-500 mb-1">{t("preview")}</p>
              <div className="w-32 h-32 border border-gray-300 rounded overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-1/2 bg-accent text-white text-xl font-semibold mt-5 p-2 rounded cursor-pointer hover:bg-green-700 transition-colors duration-300"
          >
            {t("submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePromotionModal;
