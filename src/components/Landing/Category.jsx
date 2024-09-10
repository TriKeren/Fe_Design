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
      <div className="flex justify-center items-center mt-12 text-[#020E35]">
        {/* Container untuk opsi kategori yang bisa di-scroll pada tampilan mobile */}
        <div className="flex overflow-x-auto whitespace-nowrap md:grid md:grid-cols-3 gap-2 font-merriweather cursor-pointer">
          <h1
            onClick={() => handleCategoryChange("all")}
            className={`font-medium hover:bg-blue-600 rounded-full border-[1px] border-black hover:text-white duration-300 py-2 px-6 md:px-5 text-center md:text-center ${
              selectedCategory === "all" ? "bg-blue-600 text-white" : ""
            }`}
          >
            All Category
          </h1>
          <h1
            onClick={() => handleCategoryChange("free")}
            className={`font-medium hover:bg-blue-600 rounded-full border-[1px] border-black hover:text-white duration-300 py-2 px-6 md:px-5 text-center md:text-center ${
              selectedCategory === "free" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Free Category
          </h1>
          <h1
            onClick={() => handleCategoryChange("premium")}
            className={`font-medium hover:bg-blue-600 rounded-full border-[1px] border-black hover:text-white duration-300 py-2 px-6 md:px-5 text-center md:text-center ${
              selectedCategory === "premium" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Premium Category
          </h1>
        </div>
      </div>

      {/* Render content based on selected category */}
      {selectedCategory === "all" && <AllCategory />}
      {selectedCategory === "premium" && <PremiumCategory />}
      {selectedCategory === "free" && <FreeCategory />}
    </>
  );
};

export default Category;
