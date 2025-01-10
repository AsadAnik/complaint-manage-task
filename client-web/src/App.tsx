import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import { useAuthInitializer } from './hooks';
import { Navbar } from './components';
import { Login, Register, AdminDashboard, CustomerDashboard, Profile } from './pages';

function App() {
  useAuthInitializer();

  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {localStorage.getItem('accessToken') ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
