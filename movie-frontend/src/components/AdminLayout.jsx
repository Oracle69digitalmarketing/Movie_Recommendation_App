import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="analytics" className="hover:text-yellow-300">Analytics</NavLink>
          <NavLink to="users" className="hover:text-yellow-300">Users</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
