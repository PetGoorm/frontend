import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import TodoPage from './pages/Todo';
import BoardPage from './pages/BoardListPage';
//import BoardFormPage from 'pages/BoardFormPage';
import BoardCreateForm from 'pages/BoardCreatePage'
import BoardModifyForm from 'pages/BoardModifyPage'
import BoardDetail from 'pages/BoardDetailPage'
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/todo" />, index: true },
        { path: 'todo', element: <TodoPage /> },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/board/" />, index: true },
        { path: ':boardId', element: <BoardDetail  /> },
        { path: 'create', element: <BoardCreateForm /> },
        { path: 'modify/:boardId', element: <BoardModifyForm />},
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
