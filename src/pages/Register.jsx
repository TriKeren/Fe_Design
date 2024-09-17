import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supaclient";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_membership: 'false' 
  });

  const [modalData, setModalData] = useState({
    isVisible: false,
    message: '',
    isSuccess: false
  });

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
    const { name, email, password, is_membership } = formData;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name } 
        }
      });
      
      if (signUpError) {
        if (signUpError.message.includes('Rate Limit')) {
          setModalData({
            isVisible: true,
            message: 'Too many attempts. Please try again later.',
            isSuccess: false
          });
        } else {
          setModalData({
            isVisible: true,
            message: signUpError.message,
            isSuccess: false
          });
        }
      } else {
        const rememberToken = uuidv4().substring(0, 10);
        const currentTime = new Date(); // Get the current timestamp
  
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            name,
            email,
            is_membership: is_membership === 'true', // convert string to boolean
            password: hashedPassword, 
            email_verified_at: currentTime, // Set email_verified_at to current time
            remember_token: rememberToken, 
            created_at: currentTime, 
            updated_at: currentTime
          }]);
  
        if (insertError) {
          setModalData({
            isVisible: true,
            message: `Insert Error: ${insertError.message}`,
            isSuccess: false
          });
        } else {
          setModalData({
            isVisible: true,
            message: 'User registered successfully!',
            isSuccess: true
          });
        }
      }
    } catch (error) {
      setModalData({
        isVisible: true,
        message: `Error hashing password: ${error.message}`,
        isSuccess: false
      });
    }
  };
  

  const closeModal = () => {
    setModalData({
      ...modalData,
      isVisible: false
    });
    if (modalData.isSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your username" 
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-700">Membership</label>
            <select 
              name="is_membership"
              value={formData.is_membership}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required
            >
              <option value="false">Non-Member</option>
              <option value="true">Member</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>

      {/* Modal */}
      {modalData.isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className={`text-xl font-bold mb-4 ${modalData.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {modalData.isSuccess ? 'Success' : 'Error'}
            </h2>
            <p className="mb-6">{modalData.message}</p>
            <button 
              onClick={closeModal} 
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
