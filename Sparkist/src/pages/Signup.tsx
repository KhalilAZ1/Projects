// src/Signup.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import PasswordChecklist from "react-password-checklist"
import { Button } from '@/components/ui/button';


const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed up successfully');
      navigate('/login');

    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <form onSubmit={handleSignup}>
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
                <Label htmlFor="name">Password</Label>
                <Input 
                  id="password" 
                  placeholder="Password" 
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}/>
                </div>
                <div className="flex flex-col space-y-2 items-start">
                  <Label htmlFor="name">Repeat password</Label>
                  <Input 
                    id="repeatPassword" 
                    placeholder="repeat password" 
                    type='password'
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value)
                    }}/>
                </div>
                <PasswordChecklist 
                  className='text-sm text-left'
                  iconSize={12}
                  rules={["minLength","specialChar","number","capital","match"]}
                  minLength={8}
                  value={password}
                  valueAgain={repeatPassword}
                  messages={{
                    minLength: "Password must contain 8 characters",
                    specialChar: "Password must contain a special characters",
                    number: "Password must contain a number",
                    capital: "Password must contain a big character",
                    match: "Same password must be repeated",
                  }}
                />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/login")}>Go to Login</Button>
            <Button>Login</Button>
          </CardFooter> 
        </form>
      </Card>
    </div>
  );
};

export default Signup;
