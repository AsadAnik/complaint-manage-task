import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AppContext';

const steps = ['User Details', 'Personal Details'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const [personalDetails, setPersonalDetails] = useState({
    firstname: '',
    lastname: '',
  });
  const auth = useAuth();

  const handleNext = async() => {
    setActiveStep(prevState => prevState + 1);

    if (activeStep === 0 && (!userDetails.email || !userDetails.password)) {
      toast.error('Please fill out all user details!');
      return;
    }

    if (activeStep === steps.length - 1) {
      try {
        // API requst throw Context..
        await auth.register({
          firstname: personalDetails.firstname,
          lastname: personalDetails.lastname,
          email: userDetails.email,
          password: userDetails.password,
        });

      } catch (error) {
        console.error(error);
        toast.error('Something wrong! Please try again.');
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full sm:w-96 p-8 shadow-lg">
          <Typography variant="h5" className="mb-6 text-center font-semibold">
            Register Your Account
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box className="mt-4">
            {activeStep === 0 && (
              <div className="space-y-4">
                <TextField
                  label="Email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  type="email"
                  placeholder="Enter your email"
                />
                <TextField
                  label="Password"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            )}
            {activeStep === 1 && (
              <div className="space-y-4">
                <TextField
                  label="First Name"
                  value={personalDetails.firstname}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      firstname: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your first name"
                />
                <TextField
                  label="Last Name"
                  value={personalDetails.lastname}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      lastname: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your last name"
                />
              </div>
            )}
            <div className="mt-4 flex justify-between">
              {activeStep === 1 && (
                <Button variant="outlined" color="primary" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Register' : 'Next'}
              </Button>
            </div>
          </Box>
        </Card>
      </div>
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

export default Register;
