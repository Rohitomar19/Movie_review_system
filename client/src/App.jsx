import { Navbar } from './components/Navbar'
import { SignUp } from './components/SignUp'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { SignIn } from './components/SignIn';
import MainMenu from './components/MainMenu';
import Forgot from './components/Forgot';
import { useEffect } from 'react';
import UserProfile from './components/UserProfile';
import Admin from './components/Admin';
import MovieDetails from './components/MovieDetails';
import { ThemeProvider } from './context/ThemeContext';
import AboutPage from './components/About';

function App() {
  let user;
  // useEffect(() => {
  //   user = JSON.parse(localStorage.getItem("userInfo"));
  // })
  
  // console.log(user);
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 dark:bg-[#131316]">
        <Router>
          <Navbar />
          <main className="pt-28 px-4 mx-auto max-w-7xl transition-colors duration-300 dark:text-white">
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot/>} />
              <Route path="/" element={<MainMenu/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/user" element={<UserProfile/>} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/about" element={<AboutPage/>} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App