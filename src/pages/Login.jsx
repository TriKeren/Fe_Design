import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supaclient";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
    
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    
        if (signInError) {
            console.error('Login error:', signInError.message);
            setErrorMessage('Invalid email or password');
        } else {
            console.log('User signed in');
            const { data, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email);
    
            if (fetchError) {
                console.error('Fetch error:', fetchError.message);
                setErrorMessage('Error fetching user data');
            } else {
                console.log('User data fetched:', data);
                setErrorMessage(null);
                navigate('/');
            }
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p> // Tampilkan pesan error
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
