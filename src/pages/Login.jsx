import { useState } from 'react';
import { supabase } from '../supabase/supaclient'; // Import client Supabase
import bcrypt from 'bcryptjs'; // Import bcrypt untuk verifikasi password hash
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(''); // State untuk email
    const [password, setPassword] = useState(''); // State untuk password
    const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan error
    const navigate = useNavigate(); // Untuk navigasi ke halaman lain setelah login berhasil

    // Fungsi untuk menangani form submit
   const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form

    try {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setErrorMessage('Login gagal: ' + error.message);
            return;
        }

        // Jika login berhasil
        console.log('Login berhasil:', user);

        // Arahkan ke halaman dashboard
        navigate('/');
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('Terjadi kesalahan saat login.');
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {errorMessage && (
                    <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
                )}

                <p className="mt-4 text-center">
                    Belum punya akun? <a href="/register" className="text-blue-500 hover:underline">Daftar</a>
                </p>
            </div>
        </div>
    );
};

export default Login;