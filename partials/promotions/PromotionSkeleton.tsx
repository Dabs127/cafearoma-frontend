import React from "react";

type Props = {};

const PromotionSkeleton = (props: Props) => {
  return (
    <div className="w-full h-full flex-col items-center justify-center grid grid-cols-2 gap-15 px-40">
      <div className="w-full h-auto min-h-120 rounded-3xl flex flex-col shadow-2xl bg-text-muted relative animate-pulse my-10" />
      <div className="w-full h-auto min-h-120 rounded-3xl flex flex-col shadow-2xl bg-text-muted relative animate-pulse my-10" />
    </div>
  );
};

export default PromotionSkeleton;
