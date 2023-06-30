import { filterProps } from "@/types";
const header = {
  "X-RapidAPI-Key": "47eecf5c6fmsh89dea93a9c497b7p16db1ajsnd4d4fcba348a",
  "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
};
export async function fetchCars(filters: filterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers = {
    "X-RapidAPI-Key": "47eecf5c6fmsh89dea93a9c497b7p16db1ajsnd4d4fcba348a",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(title, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
