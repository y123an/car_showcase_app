"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

const ShowMore = ({
  pageNumber,
  isNext,
  setLimit,
}: {
  pageNumber: number;
  isNext: boolean;
  setLimit: () => void;
}) => {

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    setLimit(newLimit)
  };
  return (
    <div className="w-full flex-center gap-5  mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          containerStyles="bg-primary-blue text-white rounded-full"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
