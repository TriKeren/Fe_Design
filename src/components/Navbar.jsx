import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supaclient";

const Navbar = () => {
    const [view, setView] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setView(!view);
    };

    const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        if (heroSection) {
            const offset = window.scrollY;
            const heroBottom = heroSection.getBoundingClientRect().bottom;

            if (offset > heroBottom - 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        } else {
            setScrolled(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data) {
                setUser(data.user);
            } else if (error) {
                console.error("Error fetching user:", error);
            }
        };

        checkUser();

        if (location.pathname.includes("/")) {
            setScrolled(true);
        }
    }, [location]);

    // Check if we are on a product detail page
    const isProductDetailPage = location.pathname.startsWith("/product/");

    const goToLogin = () => {
        navigate("/login");
    };

    const goToMembership = () => {
        navigate("/membership")
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during logout:", error);
        } else {
            setUser(null);
            setIsClosing(true);
            setTimeout(() => {
                setShowLogoutModal(false);
                setIsClosing(false);
            }, 300); // Match the animation duration
        }
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
        setNotificationVisible(true);
    };

    const closeLogoutModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowLogoutModal(false);
            setIsClosing(false);
        }, 300); // Match the animation duration
    };

    return (
        <>
            <nav
                className={`sticky top-0 left-0 w-full z-10 py-4 md:py-0 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/80 backdrop-blur-md"
                        : "bg-[#D9D9D9]"
                } lg:px-4 lg:max-w-screen-xl lg:mx-auto`}
            >
                <div className="container">
                    <div className={`flex items-center justify-between ${view ? "relative" : ""}`}>
                        <div className="flex px-4 text-center">
                            <img
                                className="h-10 mr-2 md:h-10"
                                src="/public/assets/images/logo.svg"
                                alt="Logo"
                            />
                            <span className="text-[#141C24] font-semibold mt-1 text-xl hidden md:flex">
                                UiStellar
                            </span>
                        </div>
                        <div className="flex items-center px-4">
                            <button
                                id="hamburger"
                                name="hamburger"
                                type="button"
                                className={`block absolute border border-[#CED2DA] right-4 md:right-8 py-3 px-2 rounded-lg lg:hidden ${
                                    view ? "active" : ""
                                }`}
                                onClick={toggleMenu}
                            >
                                <span
                                    className={`w-[20px] h-[2px] block bg-[#344051] transition-transform duration-300 ease-in-out transform ${
                                        view ? "rotate-45 translate-y-[6.5px]" : ""
                                    }`}
                                />
                                <span
                                    className={`w-[20px] h-[2px] block bg-[#344051] transition-all duration-300 ease-in-out my-1 ${
                                        view ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                                <span
                                    className={`w-[20px] h-[2px] block bg-[#344051] transition-transform duration-300 ease-in-out transform ${
                                        view ? "-rotate-45 -translate-y-[5.5px]" : ""
                                    }`}
                                />
                            </button>
                            <div
                                id="nav-menu"
                                className={`mt-4 lg:mt-0 absolute py-5 inset-x-0 bg-white shadow-lg rounded-lg px-4 w-full right-4 top-full lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none lg:flex ${
                                    view ? "block" : "hidden"
                                }`}
                            >
                                <ul className="block lg:flex">
                                    <li className="relative group">
                                        <a
                                            href="#"
                                            className={`flex py-2 text-base transition-all duration-500 ease-in-out md:mx-4 ${
                                                isProductDetailPage ? "text-dark" : "text-blue-500 font-bold"
                                            }`}
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a
                                            href="#"
                                            className={`text-base py-2 md:mx-4 flex ${
                                                isProductDetailPage ? "text-blue-500 font-bold" : "text-dark"
                                            }`}
                                        >
                                            Template Design
                                        </a>
                                    </li>
                                    <li className="mt-4 lg:hidden">
                                        {user ? (
                                            <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray whitespace-nowrap lg:mr-0 hover:bg-blue-500" onClick={openLogoutModal}>
                                                Logout
                                            </button>
                                        ) : (
                                            <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray whitespace-nowrap lg:mr-0 hover:bg-blue-500" onClick={goToLogin}>
                                                Login
                                            </button>
                                        )}
                                    </li>
                                    <li className="mt-2 lg:hidden">
                                        <button className="w-full py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 border-2 border-transparent rounded-2xl whitespace-nowrap lg:mr-0 hover:bg-transparent hover:text-black hover:border-black"  onClick={goToMembership}> 
                                            Join Now
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            {user ? (
                                <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray md:w-20 whitespace-nowrap lg:mr-0 hover:bg-blue-500" onClick={openLogoutModal}>
                                    Logout
                                </button>
                            ) : (
                                <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray md:w-20 whitespace-nowrap lg:mr-0 hover:bg-blue-500" onClick={goToLogin}>
                                    Login
                                </button>
                            )}
                            <button className="w-full py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 border-2 border-transparent rounded-2xl md:w-20 whitespace-nowrap lg:mr-0 hover:bg-transparent hover:text-black hover:border-black" onClick={goToMembership}>
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {showLogoutModal && (
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center`}>
                <div className={`bg-white shadow-lg p-4 rounded-lg w-[90%] max-w-xs ${isClosing ? 'animate-slideUp' : 'animate-slideDown'}`}>
                    <p className="text-black text-center">Are you sure you want to log out?</p>
                    <div className="flex justify-between mt-4">
                        <button className="w-full py-2 mr-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray whitespace-nowrap hover:bg-blue-500" onClick={handleLogout}>
                            Yes
                        </button>
                        <button className="w-full py-2 ml-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 border-2 border-transparent rounded-2xl hover:bg-transparent hover:text-black hover:border-black" onClick={closeLogoutModal}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;
