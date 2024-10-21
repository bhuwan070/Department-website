import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ClientLayout from './layouts/ClientLayout';
import Home from './pages/Home';
import About from './pages/About';
import Notice from './pages/Notice';
import Gallery from './pages/Gallery';
import Routine from './pages/Routine';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/admin/Admin';
import AdminRoutine from './pages/admin/AdminRoutine';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNotice from './pages/admin/AdminNotice';
import AdminLogin from './pages/admin/AdminLogin';
import AcademicCalendar from './pages/AcademicCalendar';
import CampusOfficials from './pages/CampusOfficials';
import Contact from './pages/Contact';
import Project from './pages/Project';
import AdminCalendar from './pages/admin/AdminCalendar';
import SingleNotice from './components/Notice/SingleNotice';
import SingleGallery from './components/Gallery/SingleGallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/notice',
        element: <Notice />,
      },
      {
        path: '/notice/:id',
        element: <SingleNotice />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/gallery/:id',
        element: <SingleGallery />,
      },
      {
        path: '/routine',
        element: <Routine />,
      },
      {
        path: '/project',
        element: <Project />,
      },
      {
        path: '/academic-calendar',
        element: <AcademicCalendar />,
      },

      {
        path: '/campus-officials',
        element: <CampusOfficials />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: '/admin/notice',
        element: <AdminNotice />,
      },
      {
        path: '/admin/calendar',
        element: <AdminCalendar />,
      },
      {
        path: '/admin/gallery',
        element: <AdminGallery />,
      },
      {
        path: '/admin/routine',
        element: <AdminRoutine />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
]);

function App() {
  return (
    <main className="bg-neutral-200">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
