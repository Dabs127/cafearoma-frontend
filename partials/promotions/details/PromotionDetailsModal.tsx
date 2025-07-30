"use client";

import { getPromotionById } from "@/actions/promotions/promotionsActions";
import { Promotion } from "@/types/promotions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: () => void;
  id: string;
};

const PromotionDetailsModal = (props: Props) => {
  const [promotionInfo, setPromotionInfo] = useState<Promotion | undefined>();

  useEffect(() => {
    const fetchPromotionInfo = async () => {
      const response = await getPromotionById(props.id);
      setPromotionInfo(response.promotion);
      console.log(response.promotion);
    };

    fetchPromotionInfo();
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[85%] max-h-[80%] min-h-[60%] overflow-y-auto bg-white rounded-lg shadow-lg md:w-132">
          <div className="fixed flex justify-end items-center w-[85%] h-15 pr-4 bg-white border-b-2 rounded-t-lg border-b-gray-200 md:w-132">
            <p className="basis-1/3 flex justify-end text-gray-500">
              <IoClose
                className="w- text-4xl cursor-pointer"
                onClick={props.onClose}
              />
            </p>
          </div>
          {promotionInfo?.imgUrl && (
            <Image
              src={promotionInfo.imgUrl}
              alt="Promotion Image"
              width={500}
              height={300}
              className="w-full h-64 object-cover mt-15"
            />
          )}

          <h2 className="text-accent text-2xl font-bold my-2 px-5 py-3">
            {promotionInfo?.title}
          </h2>
          <p className="px-5 py-2">{promotionInfo?.longDescription}</p>
        </div>
      </div>
    </>
  );
};

export default PromotionDetailsModal;
