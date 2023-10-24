import { Route, Routes } from 'react-router-dom';
import TablePage from './pages/TablePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <TablePage />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
