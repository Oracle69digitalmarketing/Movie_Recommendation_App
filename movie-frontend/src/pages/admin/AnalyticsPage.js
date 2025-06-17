import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/analytics').then(res => setLogs(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Activity Logs</h2>
      <ul className="space-y-2">
        {logs.map((log, idx) => (
          <li key={idx} className="bg-gray-100 p-2 rounded">
            [{log.method}] {log.endpoint} by {log.userId} at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
