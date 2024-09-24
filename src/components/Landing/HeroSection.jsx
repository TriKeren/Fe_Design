import { useLocation, useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    const goToMembership = () => {
        navigate("/membership")
    }
    
    return ( 
        <>
        <div id="hero-section" className="">
            <div className="max-w-screen-xl mx-auto bg-cover w-full h-96 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-black text-4xl md:text-5xl font-bold">Platform UI/UX Templates</h1>
                    <p className="w-11/12 md:w-7/12 mx-auto mt-3 text-base md:text-lg">
                        Platform UI/UX Templates are pre-designed collections that simplify creating consistent and engaging user interfaces.
                    </p>
                    <button className="mt-6 px-6 py-2 bg-blue-700 text-white text-lg rounded hover:bg-blue-600 transition" onClick={goToMembership}>
                        Join Now
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default HeroSection;
