import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // imported FaArrowLeft icon
import fetchData from "./utils/fetchData";
const key = import.meta.env.VITE_TRADING_ECONOMICS_KEY || "guest:guest";

const Gdp = ({ backToHomeHandler }) => {
  const [country, setCountry] = useState("");
  const [displayedCountry, setDisplayedCountry] = useState("");
  const [success, setSuccess] = useState(null);
  const [gdpData, setGdpData] = useState();

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const handleFetchGdp = async () => {
    try {
      const countryGDP = await fetchData(
        `https://api.tradingeconomics.com/historical/country/${country}/indicator/gdp?c=${key}`
      );
      setSuccess(true);
      const polishedGdpData = countryGDP
        .map((dataObj) => {
          return {
            year: new Date(dataObj.DateTime).getFullYear(),
            value: dataObj.Value,
          };
        })
        .filter((dataObj) => dataObj.value !== null && dataObj.value !== 0)
        .reverse();
      setGdpData(polishedGdpData);
      setDisplayedCountry(country.charAt(0).toUpperCase() + country.slice(1));
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg mt-4 mx-4 p-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="w-3/4">
          <button
            className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300" // added a button with text and icon
            onClick={backToHomeHandler}
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
          <div className="flex items-center border-b-2 border-blue-500 py-2 mt-8">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Enter a country name"
              aria-label="Country name"
              value={country}
              onChange={handleChange}
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-lg border-4 text-white py-2 px-4 rounded" // increased font size, padding and border
              type="button"
              onClick={handleFetchGdp}
            >
              Search
            </button>
          </div>
          {success === false && (
            <div
              className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>
                Sorry, we are unable to fetch GDP data for the given country at
                this moment😔
              </p>
            </div>
          )}
        </div>
      </div>
      {success === true && gdpData && (
        <>
          <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-4 text-center mt-8">
            GDP Data for {displayedCountry} (USD Billion)
          </h1>
          {gdpData.map((data, index) => (
            <div
              key={index}
              className="mt-4 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-3/4 mx-auto border-2 border-blue-500"
            >
              <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">
                Year: {data.year}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-xl font-semibold">
                Value: {data.value}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Gdp;
