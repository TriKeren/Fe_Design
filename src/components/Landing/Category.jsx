import { useState } from "react";
import AllCategory from "./Select Category/AllCategory";
import PremiumCategory from "./Select Category/PremiumCategory";
import FreeCategory from "./Select Category/FreeCategory";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Tabs Section */}
      <div className="max-w-screen-xl mx-auto flex justify-center items-center mt-12 text-[#020E35]">
        <div className="relative mx-8 md:mx-0 bg-gray-100 rounded-lg p-1 md:w-1/2 flex justify-between items-center">
          
          {/* Background biru yang bergeser */}
          <div
            className={`absolute top-0 h-full w-1/3 bg-blue-700 rounded-lg transition-all duration-300 ease-in-out ${
              selectedCategory === "all" ? "left-0" :
              selectedCategory === "free" ? "left-1/3" : "left-2/3"
            }`}
          ></div>

          {/* All Category */}
          <div
            onClick={() => handleCategoryChange("all")}
            className={`relative z-10 w-1/3 flex justify-center items-center text-center font-medium py-2 px-6 cursor-pointer transition-all duration-300 ${
              selectedCategory === "all" ? "text-white" : "text-[#020E35]"
            } text-sm md:text-base`} // Kelas ukuran font ditambahkan
          >
            All Category
          </div>

          {/* Free Category */}
          <div
            onClick={() => handleCategoryChange("free")}
            className={`relative z-10 w-1/3 flex justify-center items-center text-center font-medium py-2 px-6 cursor-pointer transition-all duration-300 ${
              selectedCategory === "free" ? "text-white" : "text-[#020E35]"
            } text-sm md:text-base`} // Kelas ukuran font ditambahkan
          >
            Free Category
          </div>

          {/* Premium Category */}
          <div
            onClick={() => handleCategoryChange("premium")}
            className={`relative z-10 w-1/3 flex justify-center items-center text-center font-medium py-2 px-6 cursor-pointer transition-all duration-300 ${
              selectedCategory === "premium" ? "text-white" : "text-[#020E35]"
            } text-sm md:text-base`} // Kelas ukuran font ditambahkan
          >
            Premium Category
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {/* Render content based on selected category */}
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            selectedCategory === "all" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          {selectedCategory === "all" && <AllCategory />}
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            selectedCategory === "free" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          {selectedCategory === "free" && <FreeCategory />}
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            selectedCategory === "premium" ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          {selectedCategory === "premium" && <PremiumCategory />}
        </div>
      </div>
    </>
  );
};

export default Category;
