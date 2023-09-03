const Hero = ({ showGdpDataHandler, showCompareGdpsHandler }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg mt-4 mx-4 p-4">
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Here at GDPSpace, you can access the historical GDP data of a
            country. You can also compare countries with their yeerly GDPs.
          </h1>
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 bg-blue-600 dark:bg-blue-400 rounded-md text-white dark:text-black font-bold mr-4 hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-300"
              onClick={showGdpDataHandler}
            >
              Access GDP Data
            </button>
            <button
              className="px-6 py-3 bg-green-600 dark:bg-green-400 rounded-md text-white dark:text-black font-bold hover:bg-green-700 dark:hover:bg-green-500 transition-colors duration-300"
              onClick={showCompareGdpsHandler}
            >
              Compare Countries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
