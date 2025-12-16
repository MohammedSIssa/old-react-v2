import { API, DEV_API } from "../../../scripts/globals";
import { useState, useEffect } from "react";

import LoadingLogs from "../../../components/Loaders/LoadingLogs";

// import { fetchWithCache } from "../../../scripts/cache";

import { useAuth } from "../../hooks/useAuth";

const Logs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const API_CALL =
    import.meta.env.MODE !== "development" ? `${API}/logs` : `${DEV_API}/logs`;

  useEffect(() => {
    async function getLogs() {
      try {
        setLoading(true);
        const res = await fetch(API_CALL, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.apikey}` },
        });
        const raw = await res.json();
        setData(raw);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getLogs();
  }, [API_CALL, user.apikey]);

  if (loading) return <LoadingLogs />;
  if (error) return <h1>Error getting logs</h1>;
  if (data.length === 0) return <h1>Empty log</h1>;

  if (data.length > 0) {
    return (
      <table className="pb-5" dir="ltr">
        <thead dir="ltr">
          <tr>
            <th>Username</th>
            <th>Details</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody dir="ltr">
          {data.map((log, idx) => (
            <tr key={idx}>
              <td>{log.username}</td>
              <td dir="ltr">
                <small>{log.details}</small>
              </td>
              <td>{log.visited}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default Logs;
