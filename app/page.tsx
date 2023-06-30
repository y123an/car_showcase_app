"use client";

import {
  CarCard,
  CustomFilter,
  Hero,
  SearchBar,
  SearchManufacturer,
  ShowMore,
} from "@/components";
import { fetchCars } from "@/utils";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [limit, setLimit] = useState(10);
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");

  const getCars = async () => {
    try {
      setLoading(true);
      const result = await fetchCars({
        manufacturer: manufacturer,
        model: model,
        limit: limit,
        year: year,
        fuel: fuel,
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCars();
  }, [year, limit, fuel, model, manufacturer]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Cataloges</h1>
          <p>explore the cars you may like</p>
        </div>

        <div className="home_filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div>
                <Image
                  src="loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, Noo results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
