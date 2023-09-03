import { FaChartLine } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-gray-800 shadow-md">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between px-4 py-2 sticky top-0">
          <div className="flex items-center">
            <FaChartLine className="text-4xl text-green-500 dark:text-gray-300 mr-2" />
            <span className="text-4xl font-bold text-white dark:text-gray-300">
              GDPSpace
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
