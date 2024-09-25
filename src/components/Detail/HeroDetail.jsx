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
    const [showModal, setShowModal] = useState(false); // State buat modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndCategory = async () => {
            try {
                const { data: productData, error: productError } = await supabase
                    .from('products')
                    .select('*')
                    .ilike('title', title)
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
                setShowModal(true); // Tampilkan modal kalau belum membership
                return;
            }

            alert('You can download the product now!');
        } else {
            alert('You can download the product for free!');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const goToMembership = () => {
        navigate('/membership');
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
                        className="bg-blue-500 text-white py-2 px-6 my-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
                    >
                        {product.is_premium ? 'Download now' : 'Download Free'}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-black">
                                    Oops, Akses Terbatas!
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base leading-relaxed text-black">
                                    Untuk mengunduh produk ini, kamu perlu menjadi bagian dari komunitas premium kami! 😎
                                </p>
                                <p className="text-base leading-relaxed text-black">
                                    Nikmati konten eksklusif dan fitur-fitur spesial hanya untuk member premium. Yuk, segera bergabung!
                                </p>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={goToMembership}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Bergabung Sekarang
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                >
                                    Nanti Saja
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section> 
    );
};

export default HeroDetail;
