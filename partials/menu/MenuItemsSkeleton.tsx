import React from "react";

type Props = {};

const MenuItemsSkeleton = (props: Props) => {
  return (
    <div className="w-full h-full">
      <h2 className="w-full h-13 mt-10 pl-10 font-semibold text-secondary text-4xl border-b-4 border-text-muted animate-pulse">
        <div className="w-40 h-10 bg-text-muted inline-block" />
      </h2>
      <div className="grid grid-cols-3 gap-15 w-full h-full justify-center justify-items-center p-20">
        <div className="w-full h-130 max-w-xs rounded-3xl flex flex-col items-center shadow-2xl bg-text-muted relative animate-pulse" />
        <div className="w-full h-130 max-w-xs rounded-3xl flex flex-col items-center shadow-2xl bg-text-muted relative animate-pulse" />
        <div className="w-full h-130 max-w-xs rounded-3xl flex flex-col items-center shadow-2xl bg-text-muted relative animate-pulse" />
      </div>
    </div>
  );
};

export default MenuItemsSkeleton;
