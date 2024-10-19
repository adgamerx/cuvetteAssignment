import React, { useState } from 'react';
import {
  UserIcon,
  PhoneIcon,
  BuildingIcon,
  MailIcon,
  UsersIcon,
  LockIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    employeeSize: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const outputData = {
    name: formData.company,
    email: formData.email,
    password: formData.password,
    mobile: formData.phone,
  };

  console.log(outputData);

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/company/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outputData), 
    });

    const data = await response.json();

    if (response.ok) {
      navigate('/verify'); 
    } else {
      console.error('Request failed:', data.message); 
    }
  } catch (error) {
    console.error('Error:', error); 
  }
};


  return (
    <div className="min-h-screen bg-white font-inter">
      <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <img
            src="https://i.ibb.co/WxF4JSV/maxresdefault.jpg"
            alt="cuvette"
            className="w-30 h-10"
          />
        </div>
        <NavLink to="/contact" className="text-gray-600 hover:text-gray-800">
          Contact
        </NavLink>
      </header>
      <main className="flex flex-col md:flex-row justify-between items-center p-3.5 max-w-7xl mx-auto mt-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <p className="text-gray-600 max-w-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="w-4/12 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-0.5 m-2 -pl-2 rounded-lg">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
              <p className="text-gray-500 text-sm mb-6 text-center">
                Lorem Ipsum is simply dummy text
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone no."
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <BuildingIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <MailIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Company Email"
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <UsersIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="employeeSize"
                    placeholder="Employee Size"
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.employeeSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <LockIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By clicking on proceed you will accept our
                  <br />
                  <NavLink
                    to="/terms"
                    className="text-blue-600 hover:underline"
                  >
                    Terms <span className="text-black">&</span> Conditions
                  </NavLink>
                </p>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-1">
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;