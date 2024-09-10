import { useState, useEffect } from "react";

const Navbar = () => {
    const [view, setView] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleMenu = () => {
        setView(!view);
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
    };

    const handleItemClick = (index, sectionId) => {
        setActiveIndex(index);

        if (sectionId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        window.history.pushState(null, '', window.location.pathname);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`sticky top-0 left-0 w-full z-10 py-4 md:px-8 lg:px-20 lg:max-w-screen-xl lg:mx-auto transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent shadow-none'}`}>
                <div className="container">
                    <div className={`flex items-center justify-between ${view ? 'relative' : ''}`}>
                        <div className="flex px-4 text-center">
                            <img className="h-10 mr-2 md:h-10" src="/public/assets/images/logo.svg" alt="Logo" />
                            <span className="text-[#141C24] font-semibold mt-1 text-xl hidden md:flex">UiStellar</span>
                        </div>
                        <div className="flex items-center px-4">
                            <button
                                id="hamburger"
                                name="hamburger"
                                type="button"
                                className={`block absolute border border-[#CED2DA] right-4 md:right-8 py-3 px-2 rounded-lg lg:hidden ${view ? 'active' : ''}`}
                                onClick={toggleMenu}
                            >
                                <span
                                    className={`w-[25px] h-[2px] block bg-[#344051] transition-transform duration-300 ease-in-out transform ${view ? 'rotate-45 translate-y-[6.5px]' : ''}`}
                                />
                                <span
                                    className={`w-[15px] h-[2px] block bg-[#344051] transition-all duration-300 ease-in-out my-1 ${view ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <span
                                    className={`w-[25px] h-[2px] block bg-[#344051] transition-transform duration-300 ease-in-out transform ${view ? '-rotate-45 -translate-y-[5.5px]' : ''}`}
                                />
                            </button>
                            <div
                                id="nav-menu"
                                className={`mt-4 lg:mt-0 absolute py-5 inset-x-0 bg-white shadow-lg rounded-lg px-4 w-full right-4 top-full lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none lg:flex ${view ? 'block' : 'hidden'}`}
                            >
                                <ul className="block lg:flex">
                                    <li className="relative group">
                                        <a
                                            href="#"
                                            className={`text-base text-dark py-2 mx-8 md:mx-4 flex group-hover:text-primary transition-all duration-500 ease-in-out ${activeIndex === 0 ? 'text-blue-500' : ''}`}
                                            onClick={(e) => { e.preventDefault(); handleItemClick(0, 'top'); }}
                                        >
                                            <div className={`transition-all duration-500 ease-in-out ${activeIndex === 0 ? 'transform scale-110' : ''}`}>Home</div>
                                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-transparent transition-all duration-300 ease-in-out group-hover:bg-[#1A75FF]"></span>
                                        </a>
                                    </li>
                                    <li className="relative group">
                                        <a
                                            href="#"
                                            className={`text-base text-dark py-2 mx-8 md:mx-4 flex group-hover:text-primary transition-all duration-500 ease-in-out ${activeIndex === 1 ? 'text-blue-500' : ''}`}
                                            onClick={(e) => { e.preventDefault(); handleItemClick(1, 'features'); }}
                                        >
                                            <div className={`transition-all duration-500 ease-in-out ${activeIndex === 1 ? 'transform scale-110' : ''}`}>Template Design</div>
                                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-transparent transition-all duration-300 ease-in-out group-hover:bg-[#1A75FF]"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
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
}

export default Navbar;