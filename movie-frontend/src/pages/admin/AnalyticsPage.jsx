// src/pages/admin/AnalyticsPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/admin/analytics').then(res => {
      setLogs(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = logs.filter(log =>
    log.method.toLowerCase().includes(filter.toLowerCase()) ||
    log.endpoint.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Activity Logs</h2>
      <input
        type="text"
        placeholder="Filter by method or endpoint"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((log, idx) => (
            <li key={idx} className="bg-white border p-3 rounded shadow-sm text-sm">
              <span className="font-mono text-blue-700">[{log.method}]</span> {log.endpoint}
              <div className="text-xs text-gray-600 mt-1">
                by <strong>{log.userId}</strong> @ {new Date(log.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
