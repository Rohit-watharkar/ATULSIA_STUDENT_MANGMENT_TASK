import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { getExams } from "../api/excelTestApi"; 

export default function Statistics() {
  const [stats, setStats] = useState({ total: 0, byType: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const data = await getExams();
        const statsData = {
          total: data.statsByType?.reduce((sum, s) => sum + s.count, 0) || 0,
          byType: data.statsByType || [],
        };
        setStats(statsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load statistics");

       
        setStats({
          total: 12,
          byType: [
            { type: "PSAT", count: 5 },
            { type: "SAT", count: 4 },
            { type: "GRE", count: 3 },
          ],
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Statistics</h3>
      <p>Total Tests Completed: {stats.total}</p>

      <PieChart width={250} height={250}>
        <Pie
          data={stats.byType}
          dataKey="count"
          nameKey="type"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {stats.byType.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
 