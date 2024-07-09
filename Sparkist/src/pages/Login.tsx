// src/Login.tsx
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from '@/components/theme-provider';



const Login: React.FC = () => {
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const navigate = useNavigate();
const { setTheme } = useTheme()
setTheme("dark")

const handleLogin = async (e: React.FormEvent) => {
	e.preventDefault();
	try {
	await signInWithEmailAndPassword(auth, email, password);
	alert('Logged in successfully');
	navigate('/');
	console.log("navigated")

	} catch (error) {
	console.error('Error logging in:', error);
	alert('Error logging in');
	}
};

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
  await signInWithPopup(auth, provider);
  alert('Signed in with Google successfully');
  navigate('/');
  } catch (error: any) {
  console.error('Error signing in with Google:', error.message);
  alert(`Error signing in with Google: ${error.message}`);
  }
};

return (
  <div className="flex flex-col items-center" >
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2 items-start">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="example@example.com" 
                  type='email' 
                  value={email} 
                  onChange={(e) => {
                  setEmail(e.target.value)
                }}/>
              </div>
              <div className="flex flex-col space-y-2 items-start">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  placeholder="Password" 
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}/>
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/signup")}>Go to Sign Up</Button>
          <Button>Login</Button>
        </CardFooter>
      </form>
    </Card>
    <p className='my-2'>or continue with</p>
    <Button onClick={handleGoogleSignIn} className='w-1/6 colo' variant={'outline'}>
        <img className="h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
    </Button>
  </div>
);
};

export default Login;
