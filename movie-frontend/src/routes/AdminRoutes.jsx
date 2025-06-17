import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AnalyticsPage from '../pages/admin/AnalyticsPage';
import AdminUsers from '../pages/admin/AdminUsers';
import NotFound from '../pages/NotFound';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
