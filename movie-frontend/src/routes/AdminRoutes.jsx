// src/App.jsx or src/routes/AdminRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AnalyticsPage from './pages/admin/AnalyticsPage';
// import other admin pages like UsersPage...

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Nested admin routes */}
          <Route path="analytics" element={<AnalyticsPage />} />
          {/* <Route path="users" element={<UsersPage />} /> */}
        </Route>
        {/* other routes */}
      </Routes>
    </Router>
  );
}
