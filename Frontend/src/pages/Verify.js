import React, { useState } from "react";
import { PhoneIcon, MailIcon, Check } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Verify() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const navigate = useNavigate();

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/company/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ otp: emailOtp }), 
      });
  
      const data = await response.json();
  
      if (data.message === "Account verified successfully") {
        setEmailVerified(true); 
        navigate("/login"); 
      } else {
        console.error("Email verification failed:", data.message); 
      }
    } catch (error) {
      console.error("Error during email verification:", error); 
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
      <main className="flex flex-col md:flex-row justify-between items-center p-24 max-w-7xl mx-auto mt-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <p className="text-gray-600 max-w-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="w-5/12 mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-0.5 m-5 -pl-2 rounded-lg">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
              <p className="text-gray-500 text-sm mb-6 text-center">
                Please verify your account.
              </p>
              <form className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative w-96">
                    <MailIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Email OTP"
                      className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                    />
                    {emailVerified && (
                      <Check className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-green-500 rounded-full p-1" />
                    )}
                  </div>
                </div>
                {!emailVerified && (
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-1"
                    onClick={handleEmailVerify}
                  >
                    Verify
                  </button>
                )}
                <div className="flex justify-center">
                  <div className="relative w-96">
                    <PhoneIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Mobile OTP"
                      className="pl-10 w-full p-1.5 bg-gray-100 rounded-lg border"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-2 py-1">
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Verify;
