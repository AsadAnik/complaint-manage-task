import { useState } from 'react';
import { TextField, Button, Card, Typography, Link } from '@mui/material';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const handleSubmit = async() => {
    if (email === '' || password === '') {
      toast.error('Please fill out all fields!');
      return;
    }

    try {
      // API requst throw Context..
      await auth.login({ email, password });

    } catch (error) {
      console.error(error);
      toast.error('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full sm:w-96 p-8 shadow-lg">
          <Typography variant="h5" className="mb-6 text-center font-semibold">
            Login to Your Account
          </Typography>
          <div className="space-y-4">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              type="email"
              placeholder="Enter your email"
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              type="password"
              placeholder="Enter your password"
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className="mt-4 py-2"
            >
              Login
            </Button>
            <div className="mt-4 text-center">
              <Link href="/register" variant="body2">
                Don't have an account? Register here
              </Link>
            </div>
          </div>
        </Card>
      </div>
      {/* Right Column: Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://i.pinimg.com/originals/fa/d2/e7/fad2e730bb3a7bb0ecea4e446e283920.gif)',
        }}
      ></div>
    </div>
  );
};

export default Login;
