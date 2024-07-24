import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import MainLayout from './components/layout/MainLayout';
import MainLayoutLogin from './components/layout/MainLayoutLogin';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentPage from './pages/student/StudentPage';
import MainLayoutAdmin from './components/layout/MainLayoutAdmin';
import AdminHomePage from './pages-admin/home/AdminHomePage';
import AdminTeacherPage from './pages-admin/teacher/AdminTeacherPage';
import AdminStudentPage from './pages-admin/student/AdminStudentPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='*' element={<h1>Route not found</h1>}/>
        </Route>

        <Route element={<MainLayoutAdmin />} path='admin'>
          <Route path='' element={<AdminHomePage />}/>
          <Route path='teacher' element={<AdminTeacherPage />}/>
          <Route path='student' element={<AdminStudentPage />}/>
          <Route path='*' element={<h1>Route not found!</h1>}/>
        </Route>

        <Route element={<MainLayoutLogin />}>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='*' element={<LoginPage />}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
