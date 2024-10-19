import React, { useState } from "react";
import { Home, ChevronDown, User, Calendar, X } from "lucide-react";

export default function Component() {
  const [endDate, setEndDate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const addCandidate = (e) => {
    e.preventDefault(); // Prevent form submission
    if (newCandidate.trim() !== "") {
      setCandidates([...candidates, newCandidate.trim()]);
      setNewCandidate("");
    }
  };

  const removeCandidate = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    const outputData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      endDate,
      candidates, 
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/job/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outputData),
      });
  
      const data = await response.json();
  
      if (data.status) {
        console.log("Submission successful:", data);
      } else {
        console.error("Submission failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <img
          src="https://i.ibb.co/WxF4JSV/maxresdefault.jpg"
          alt="cuvette"
          className="w-30 h-10"
        />
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
          <div className="flex items-center space-x-2 bg-white border rounded-md px-3 py-1">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Your Name</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-16 bg-white border-r flex flex-col items-center py-4">
          <a href="#" className="p-2 rounded-lg hover:bg-gray-100">
            <Home className="w-6 h-6 text-gray-600" />
          </a>
        </aside>
        <main className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="jobTitle" className="text-right font-medium">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                placeholder="Enter Job Title"
                className="col-span-2 p-2 border rounded-md"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <label
                htmlFor="jobDescription"
                className="text-right font-medium pt-2"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                placeholder="Enter Job Description"
                rows={4}
                className="col-span-2 p-2 border rounded-md"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label
                htmlFor="experienceLevel"
                className="text-right font-medium"
              >
                Experience Level
              </label>
              <div className="col-span-2 relative">
                <select
                  id="experienceLevel"
                  className="w-full p-2 border rounded-md appearance-none bg-white"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="" disabled>
                    Select Experience Level
                  </option>
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="addCandidate" className="text-right font-medium">
                Add Candidate
              </label>
              <div className="col-span-2 flex flex-wrap items-center border rounded-md p-2">
                {candidates.map((candidate, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-full px-3 py-1 flex items-center mr-2 mb-2"
                  >
                    <span className="text-sm text-gray-600">{candidate}</span>
                    <button
                      type="button"
                      onClick={() => removeCandidate(index)}
                      className="ml-2 focus:outline-none"
                      aria-label={`Remove ${candidate}`}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
                <input
                  id="addCandidate"
                  type="email"
                  placeholder="Add more..."
                  className="flex-grow outline-none"
                  value={newCandidate}
                  onChange={(e) => setNewCandidate(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCandidate(e);
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="endDate" className="text-right font-medium">
                End Date
              </label>
              <div className="col-span-2 relative">
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-24 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
