const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">Register</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
