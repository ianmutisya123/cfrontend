
import { Navigate, Route, Routes } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import {useAuthStore} from "./store/useAuthStore.js"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader.jsx";
import {Toaster} from "react-hot-toast";




function App() {
  const{ checkAuth,authUser,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  console.log({ authUser });
  if(isCheckingAuth) return <PageLoader/>;
  
  return (
  
  <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden" >
    
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f2c6c2_1px, transparent_1px), linear-gradient(to_bottom,#f2c6c2_1px,transparent_1px)] bg-[size:14px_24px]"/>
    <div className="absolute top-0 -left-4 size-96 bg-[#1f4d3a] opacity-30 blur-[100px]"/>
    <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]"/>
    <div className="flex items-center justify-center ">

    <Routes>
      <Route path="/" element={ authUser?<ChatPage />:<Navigate to={"/login"}/> } />
      <Route path="/login" element={!authUser?<LoginPage />:<Navigate to={"/"}/>} />
      <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to={"/"}/>} />
    </Routes>
    <Toaster/>
    </div>
  </div>
  )
}
export default App;