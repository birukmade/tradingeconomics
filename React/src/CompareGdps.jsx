import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import fetchData from "./utils/fetchData";
const key = import.meta.env.VITE_TRADING_ECONOMICS_KEY || "guest:guest";

const CompareGdps = ({ backToHomeHandler }) => {
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [displayCountry1, setDisplayCountry1] = useState("");
  const [displayCountry2, setDisplayCountry2] = useState("");
  const [gdpData1, setGdpData1] = useState([]);
  const [gdpData2, setGdpData2] = useState([]);
  const [success, setSuccess] = useState(null);

  const handleChange1 = (e) => {
    setCountry1(e.target.value);
  };

  const handleChange2 = (e) => {
    setCountry2(e.target.value);
  };

  const handleCompare = async () => {
    try {
      const countryGDP1 = await fetchData(
        `https://api.tradingeconomics.com/historical/country/${country1}/indicator/gdp?c=${key}`
      );
      const countryGDP2 = await fetchData(
        `https://api.tradingeconomics.com/historical/country/${country2}/indicator/gdp?c=${key}`
      );
      setSuccess(true);
      setDisplayCountry1(country1);
      setDisplayCountry2(country2);
      const polishedGdpData1 = countryGDP1
        .map((dataObj) => {
          return {
            year: new Date(dataObj.DateTime).getFullYear(),
            value: dataObj.Value,
          };
        })
        .filter((dataObj) => dataObj.value !== null && dataObj.value !== 0)
        .reverse();
      setGdpData1(polishedGdpData1);

      const polishedGdpData2 = countryGDP2
        .map((dataObj) => {
          return {
            year: new Date(dataObj.DateTime).getFullYear(),
            value: dataObj.Value,
          };
        })
        .filter((dataObj) => dataObj.value !== null && dataObj.value !== 0)
        .reverse();
      setGdpData2(polishedGdpData2);
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg mt-4 mx-4 p-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="w-3/4">
          <button
            className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
            onClick={backToHomeHandler}
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center border-b-2 border-blue-500 py-2 w-1/3 mr-4">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter first country"
                aria-label="First country"
                value={country1}
                onChange={handleChange1}
              />
            </div>
            <div className="flex items-center border-b-2 border-blue-500 py-2 w-1/3 ml-4">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter second country"
                aria-label="Second country"
                value={country2}
                onChange={handleChange2}
              />
            </div>
            <button
              className="flex-shrink-0 bg-green-600 dark:bg-green-400 hover:bg-green-700 dark:hover:bg-green-500 text-lg border-1 text-white py-2 px-4 rounded"
              type="button"
              onClick={handleCompare}
            >
              Compare
            </button>
          </div>
          {success === false && (
            <div
              className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>
                Sorry, we are unable to fetch GDP data for the given countries
                at this moment😔
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        {success === true && gdpData1.length > 0 && gdpData2.length > 0 && (
          <>
            <div className="flex justify-between mt-4">
              <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2 w-1/4 mr-2 text-center">
                {displayCountry1.charAt(0).toUpperCase() +
                  displayCountry1.slice(1)}
              </h2>
              <div className="w-1/2 text-center">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-200 border-4 border-green-500 mr-2"></div>
                    <p className="text-sm text-gray-500">Higher GDP</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-200 border-4 border-red-500 mr-2"></div>
                    <p className="text-sm text-gray-500">Lower GDP</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-200 border-4 border-orange-500 mr-2"></div>
                    <p className="text-sm text-gray-500">Equal GDP</p>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2 w-1/4 ml-2 text-center">
                {displayCountry2.charAt(0).toUpperCase() +
                  displayCountry2.slice(1)}
              </h2>
            </div>
            {gdpData1.map((data1, index) => {
              const data2 = gdpData2[index];
              const isGdp1Greater = data1.value > data2.value;
              const isGdpEqual = data1.value === data2.value;
              return (
                <div key={index} className="flex justify-between mt-4">
                  <div
                    className={`bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-1/2 mr-2 border-4 ${
                      isGdpEqual
                        ? "border-orange-500 bg-orange-200"
                        : isGdp1Greater
                        ? "border-green-500 bg-green-200"
                        : "border-red-500 bg-red-200"
                    } transition-colors duration-300 transform hover:scale-105`}
                  >
                    <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">
                      Year: {data1.year}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-xl font-semibold">
                      GDP: {data1.value}
                    </p>
                  </div>
                  <div
                    className={`bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-1/2 ml-2 border-4 ${
                      isGdpEqual
                        ? "border-orange-500 bg-orange-200"
                        : isGdp1Greater
                        ? "border-red-500 bg-red-200"
                        : "border-green-500 bg-green-200"
                    } transition-colors duration-300 transform hover:scale-105`}
                  >
                    <h2 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-2">
                      Year: {data2.year}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-xl font-semibold">
                      GDP: {data2.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CompareGdps;
