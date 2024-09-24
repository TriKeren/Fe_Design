import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supaclient';
import SkeletonCard from './SkeletonCard';

const AllCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          cover,
          is_premium,
          category_id,
          categories (name)
        `);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setTimeout(() => {
          setProducts(data);
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {isLoading
          ? <SkeletonCard />
          : products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.title}`}
              className="rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative">
                <img className="w-full" src={product.cover} alt={product.title} />
                {product.is_premium && (
                  <div className="text-xs absolute top-0 right-0 bg-red-600 rounded-xl px-4 py-2 text-white mt-3 mr-3">
                    Premium
                  </div>
                )}
              </div>
              <div className="px-4 py-4 flex justify-between items-center">
                <h1 className="font-medium text-lg">
                  {product.title}
                </h1>
                <p className="text-gray-500 text-sm">
                  {product.categories.name}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AllCategory;
