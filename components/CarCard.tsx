"use client";
import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent } from "@/utils";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { year, model, transmission, city_mpg, make, drive } = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-6 font-extrabold text-[32px]">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-semibold">/day</span>
      </p>

      <div className="w-full h-40 relative my-3 object-contain">
        <Image
          src="/hero.png"
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="w-full flex relative mt-2">
        <div className="flex group-hover:invisible justify-between w-full text-gray">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              alt="steering wheel"
              height={20}
            />
            <p className="text-[14px]">{transmission === "a" ? "Automatic" : "Manual"}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/tire.svg"
              width={20}
              alt="tire"
              height={20}
            />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/gas.svg"
              width={20}
              alt="gas"
              height={20}
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="rounded-full w-full py-[16px] bg-primary-blue"
            textStyles = "text-white text-[14px] font-bold leading-[17px]"
            rightIcon = "/right-arrow.svg"
            handleClick={()=> setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails isOpen={isOpen} closeModel = {()=>setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
