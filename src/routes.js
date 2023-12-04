import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import BoardListPage from './pages/BoardListPage';
//import BoardFormPage from 'pages/BoardFormPage';
import BoardCreateForm from './pages/BoardCreatePage'
import BoardModifyForm from './pages/BoardModifyPage'
import BoardDetail from './pages/BoardDetailPage'
//import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PetFormPage from './pages/PetFormPage';
import MainPage from './pages/Main';
import Logout from 'components/member/Logout';
import SignUpPage from 'pages/SignUpPage';
import EditNick from 'components/member/mypage/EditNick';
import EditPw from 'components/member/mypage/EditPw';
import PetEditPage from 'pages/PetEditPage';
import DiaryPage from './pages/DiaryPage';
import { PrivateRoute } from 'components/member/PrIvateRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/main" />, index: true },
        { path: 'main', element: <MainPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'logout',
      element: <PrivateRoute element={<Logout />} />,
    },
    {
      path: 'signup',
      element: < SignUpPage/>,
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
      path: '/pet',
      element: <PrivateRoute element={<DashboardLayout />} />,
      children: [
        { path: 'petform',element: <PetFormPage />},
        { path: 'edit',element: <PetEditPage />},
        { path: 'petdiary', element: <DiaryPage /> },
      ],
    },
    {
      path: '/board',
      element: <PrivateRoute element={<DashboardLayout />}/>,
      children: [
        { element: <Navigate to="/board/list/all?page=1" />, index: true },
        { path: ':boardId', element: <BoardDetail  /> },
        { path: 'create', element: <BoardCreateForm /> },
        { path: 'modify/:boardId', element: <BoardModifyForm />},
        { path: 'list/:category', element: <BoardListPage /> },
      ],
    },
    {
      path: '/member',
      element: <PrivateRoute element={<DashboardLayout/>}/>,
      children: [
        {element: <EditNick/>, path:'editNick' },
        {element: <EditPw/>, path:'editPw' },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
