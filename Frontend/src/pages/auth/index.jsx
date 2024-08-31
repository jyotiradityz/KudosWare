import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Background from '../../assets/login2.png'
import Victory from '../../assets/victory.svg'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constant'
import {  useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store'


const Auth = () => {

    const navigate = useNavigate();

    const { setUserInfo } = useAppStore();
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const validateSignup = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (password.length<8) {
            toast.error("Password Should be minimum 8 letter len");
            return false;
        }
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be same");
            return false;
        }
        return true;
    }

    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (password.length<8) {
            toast.error("Password Should be minimum 8 letter len");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if(validateLogin()){
            const res = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true});
            if(res.data.user.id){
                setUserInfo(res.data.user)
                if(res.data.user.profileSetup) navigate('/jobs')
                else navigate('/profile')
            }
        }
    }

    const handleSignup = async () => {
        if(validateSignup()){
            const res = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
            if(res.status === 201){
                setUserInfo(res.data.user)
                navigate('/profile');
            }
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
                <div className="flex flex-col gap-10 items-center justify-center ">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center ">
                            <h1 className="text-5xl  font-bold md:text-6xl">Welcome</h1>
                            <img src={Victory} alt="sideImage" className='h-[90px]  ' />
                        </div>
                        <p className='font-medium text-cente ' >Fill the details to get started with best chat app</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className='w-3/4' defaultValue="login" >
                            <TabsList className="bg-transparent rounded-none w-full  " >
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state-active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>

                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state-active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" >SignUp</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-10 " value="login">
                                <Input
                                    className="rounded-full p-6"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    className="rounded-full p-6"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>

                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5 " value="signup">
                                <Input
                                    className="rounded-full p-6"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    className="rounded-full p-6"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    className="rounded-full p-6"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button className="rounded-full p-6" onClick={handleSignup}>SignUp</Button>

                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="hidden xl:flex items-center justify-center ">
                    <img src={Background} alt="sideImage" className='h-[600px]' />
                </div>
            </div>
        </div>
    )
}

export default Auth
