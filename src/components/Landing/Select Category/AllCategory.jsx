import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supaclient';
import SkeletonCard from './SkeletonCard';

const AllCategory = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-6 mt-5 md:mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6).fill().map((_, index) => <SkeletonCard key={index} />)
          : products.map(({ id, title, cover, price, is_premium }) => (
            <Link key={id} to={`/product/${id}`} className="bg-white shadow-2xl border rounded-2xl overflow-hidden cursor-pointer">
              <img src={cover} alt={title} className="w-full h-[300px] p-3 rounded-[20px] object-cover" />
              <div className="px-3 mb-4">
                <p className="text-[24px] font-normal mb-4">{title}</p>
                <div className="flex justify-between items-center text-[20px]">
                  <p className="font-bold text-black">{is_premium ? 'Premium' : 'Free'}</p>
                  {is_premium && <p className="font-semibold text-blue-600">{price}</p>}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AllCategory;
