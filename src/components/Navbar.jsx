import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const [view, setView] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setView(!view);
    };

    // Detect when user scrolls past the hero section
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
            // Jika hero-section tidak ada, navbar selalu scrolled
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
        // Set navbar tetap dalam keadaan scrolled ketika di halaman HeroDetail
        if (location.pathname.includes("/hero-detail")) {
            setScrolled(true);
        }
    }, [location]);

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
                    <div
                        className={`flex items-center justify-between ${
                            view ? "relative" : ""
                        }`}
                    >
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
                                            className="flex py-2 text-base transition-all duration-500 ease-in-out text-dark md:mx-4"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a
                                            href="#"
                                            className="text-base text-dark py-2 md:mx-4 flex"
                                        >
                                            Template Design
                                        </a>
                                    </li>
                                    <li className="mt-4 lg:hidden">
                                        <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray whitespace-nowrap lg:mr-0 hover:bg-blue-500">
                                            Login
                                        </button>
                                    </li>
                                    <li className="mt-2 lg:hidden">
                                        <button className="w-full py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 border-2 border-transparent rounded-2xl whitespace-nowrap lg:mr-0 hover:bg-transparent hover:text-black hover:border-black">
                                            Join Now
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            <button className="w-full py-2 text-sm text-black transition-colors duration-300 ease-in-out bg-transparent border-2 border-black rounded-2xl hover:text-white hover:border-transparent textgray md:w-20 whitespace-nowrap lg:mr-0 hover:bg-blue-500">
                                Login
                            </button>
                            <button className="w-full py-2 text-sm text-white transition-colors duration-300 ease-in-out bg-blue-500 border-2 border-transparent rounded-2xl md:w-20 whitespace-nowrap lg:mr-0 hover:bg-transparent hover:text-black hover:border-black">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
