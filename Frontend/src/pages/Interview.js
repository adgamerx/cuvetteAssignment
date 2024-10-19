import { Home, ChevronDown, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Interview() {
    const navigate = useNavigate();
    const createJob = () =>{
        navigate("/job/create");
    }
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
      <img
            src="https://i.ibb.co/WxF4JSV/maxresdefault.jpg"
            alt="cuvette"
            className="w-30 h-10"
          />
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          <div className="flex items-center space-x-2 border-2 border-gray-300 rounded-md  px-3 py-1">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Your Name</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-16 bg-gray-50 border-r flex flex-col items-center py-4">
          <a href="#" className="p-2 rounded-lg hover:bg-gray-200">
            <Home className="w-6 h-6 text-gray-600" />
          </a>
        </aside>
        <main className="flex-1 p-6">
          <button onClick={()=>createJob()} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Create Interview
          </button>
        </main>
      </div>
    </div>
  )
}

export default Interview;