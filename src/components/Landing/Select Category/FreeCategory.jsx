import { useState, useEffect } from 'react';
import data from '/public/assets/json/product.json';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-300 animate-pulse h-[400px] rounded-2xl">
      <div className="w-full h-[300px] bg-gray-200 rounded-t-2xl"></div>
      <div className="px-3 py-4">
        <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
        <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

const FreeCategory = () => {
  const [loading, setLoading] = useState(true);
  const [freeProducts, setFreeProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const filteredProducts = data.products.filter(product => product.options === 'free');
      setFreeProducts(filteredProducts);
      setLoading(false);  
    }, 1500); 
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Render skeleton loader while loading is true
            Array(6).fill().map((_, index) => <SkeletonCard key={index} />)
          : // Render free products when loading is false
            freeProducts.map(({ id, name, image, price, options }) => (
              <div key={id} className="bg-white shadow-2xl border rounded-2xl overflow-hidden">
                <img src={image} alt={name} className="w-full h-[300px] p-3 rounded-[20px] object-cover" />
                <div className="px-3 mb-4">
                  <p className="text-[24px] font-normal mb-4">{name}</p>
                  <div className="flex justify-between items-center text-[20px]">
                    <p className="font-bold text-black">{options}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FreeCategory;
