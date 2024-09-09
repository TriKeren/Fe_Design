import { useState } from "react";
import AllCategory from "./Select Category/AllCategory";
import PremiumCategory from "./Select Category/PremiumCategory";
import FreeCategory from "./Select Category/FreeCategory";

const Category = () => {
  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fungsi untuk mengubah kategori yang dipilih
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5 text-[#020E35]">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-3 font-merriweather cursor-pointer">
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

      {/* Render based on selected category */}
      {selectedCategory === "all" && <AllCategory />}
      {selectedCategory === "premium" && <PremiumCategory />}
      {selectedCategory === "free" && <FreeCategory/>}
    </>
  );
};

export default Category;
