import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supaclient';
import Skeleton from './Skeleton';

const HeroDetail = () => {
    const { title } = useParams();
    const [product, setProduct] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndCategory = async () => {
            try {
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('title', title)
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
            setIsLoading(false);
        };

        fetchProductAndCategory();
    }, [title]);

    const handleDownload = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
        if (sessionError || !sessionData.session) {
            navigate('/login');
            return;
        }
    
        const user = sessionData.session.user;
    
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, is_membership')
            .eq('email', user.email)
            .single();
    
        if (userError) {
            console.error('Error fetching user data:', userError);
            return;
        }
    
        if (!userData) {
            console.error('User not found for email:', user.email);
            return;
        }
    
        if (product.is_premium) {
            if (!userData.is_membership) {
                navigate('/membership');
                return;
            }
    
            alert('You can download the product now!');
        } else {
            alert('You can download the product for free!');
        }
    };        

    if (error) {
        return <div className="container mx-auto p-4 lg:p-8">Product not found.</div>;
    }

    if (isLoading || !product) {
        return <Skeleton />;
    }

    return (
        <section className="container mx-auto p-4 lg:p-8">
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className="mb-4 bg-transparent">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
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
                </div>

                <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg mt-4 lg:mt-0">
                    <h3 className="text-xl font-semibold mb-4">Get the Product Now!</h3>
                    <p className="text-gray-700">
                        This is a detailed description of the product, including its features and benefits.
                    </p>
                    <p className="mt-2">Category in <strong>{categoryName}</strong></p>
                    <button
                        onClick={handleDownload}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
                    >
                        {product.is_premium ? 'Download now' : 'Download Free'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroDetail;
