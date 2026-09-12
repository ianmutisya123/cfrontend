import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router";
import {MessageCircleIcon, LockIcon , MailIcon, UserIcon, LoaderIcon} from "lucide-react";

import BorderAnimatedContainer from '../components/BorderAnimatedContainer'

function LoginPage() {
  
    const [formData, setFormData] = useState({ email:"", password:""});
    const {login, isLoggingIn} = useAuthStore();
    const handleLogin = async (e)=>{
      e.preventDefault();
      await login(formData);
      }; 
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 py-10 bg-slate-900">
      <div className="w-full max-w-7xl ">
          <BorderAnimatedContainer>
            <div className="w-full flex flex-col md:flex-row ">
                <div className="md:w-1/2  p-10 flex items-center justify-center md:border-r border-slate-600/30" >
                    <div className=" w-full max-w-md">
                        <div className="w-full max-w-md">

                            <div className="text-center mb-8">
                                <MessageCircleIcon  className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
                                <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                                <p className="text-slate-400">Enter your credentials to login</p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-6 ">
                                                          
                                  <div className="">
                                    <label className="auth-input-label">Email</label>
                                    <div className="relative">
                                        <MailIcon  className="auth-input-icon"/>

                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                            className="input"
                                            placeholder="example@gmail.com"                                
                                        />
                                    </div>
                                    
                                </div>
                                  <div className="">
                                    <label className="auth-input-label">Password</label>
                                    <div className="relative">
                                        <LockIcon  className="auth-input-icon"/>

                                        <input 
                                            type="password" 
                                            value={formData.password}
                                            onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                            className="input"
                                            placeholder="*************"                                
                                        />
                                    </div>
                                    
                                </div>
                                <button className="auth-btn" type="submit" disabled={isLoggingIn}>

                                    { isLoggingIn?(<LoaderIcon className="w-full h-5 animate-spin text-center"/>):("Sign in")}

                                </button>
                            </form>
                            <div className="mt-6 text-center">
                                <Link to="/signup" className="auth-link">
                                    Don't have an account? Sign up
                                </Link>
                            </div>
                        </div>                 
                    </div>
                </div>
                <div className="hidden p-10 md:flex md:w-1/2 items-center justify-center">
                    <div>
                        <img 
                            src="/login.png" 
                            alt="WELCOME" 
                            className="w-full h-auto  object-contain"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="text-cyan-500 text-3xl">Chat anytime anywhere to enjoy!!</h3>
                            <div className="mt-4  flex font-medium justify-center gap-4">
                                <span className="auth-badge">fast</span>
                                <span className="auth-badge">Honest</span>
                                <span className="auth-badge"> Transparent</span>
                            </div>
                        </div> 
                    </div>
                    
                </div>
            
            </div>
          </BorderAnimatedContainer>
      </div>
    </div>
  )
}

export default LoginPage;