import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supaclient';
import Skeleton from './Skeleton';

const HeroDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndCategory = async () => {
            try {
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (productError) {
                    setError(true);
                    console.error(productError);
                    return;
                }

                setProduct(productData);

                const { data: categoryData, error: categoryError } = await supabase
                    .from('categories')
                    .select('name')
                    .eq('id', productData.category_id)
                    .single();

                if (categoryError) {
                    setError(true);
                    console.error(categoryError);
                } else {
                    setCategoryName(categoryData.name);
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching product and category:', error);
            }
        };

        fetchProductAndCategory();
    }, [id]);

    if (error) {
        return <div className="container mx-auto p-4 lg:p-8">Product not found.</div>;
    }

    if (!product) {
        return <Skeleton />;
    }

    return (
        <section className="container mx-auto p-4 lg:p-8">
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className='mb-4 bg-transparent'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p>
                    This product is available as
                    <span className="text-blue-500 ml-1">
                        {product.is_premium ? 'Premium' : 'Free'}
                    </span>
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-2/3">
                    <img
                        src={product.cover}
                        alt={product.title}
                        className="w-full h-auto mb-4"
                    />
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                        <p className="text-gray-600">{product.description}</p>
                    </div>
                </div>

                <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg mt-4 lg:mt-0">
                    <h3 className="text-xl font-semibold mb-4">Get the Product Now!</h3>
                    <p className="text-gray-700">
                        Hello folks, this time I explored about Job Finder Mobile App. This is my new product of UI/UX Kits, this product is pretty much a unique design.
                    </p>
                    <p className="mt-2">Category in <strong>{categoryName}</strong></p>
                    <div className="gap-2 my-5">
                        {product.features && product.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="mb-1">{feature}</p>
                            </div>
                        ))}
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600">
                        {product.is_premium ? 'Buy Now' : 'Download Free'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroDetail;
