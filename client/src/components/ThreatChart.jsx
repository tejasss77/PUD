import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ThreatChart = () => {
  const { data } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5001/api/scan/history');
      return response.data;
    },
  });

  const stats = data?.scans.reduce((acc, scan) => {
    acc[scan.verdict] = (acc[scan.verdict] || 0) + 1;
    return acc;
  }, { SAFE: 0, PHISHING: 0 });

  const chartData = [
    { name: 'Safe', value: stats?.SAFE || 0, color: '#10b981' },
    { name: 'Phishing', value: stats?.PHISHING || 0, color: '#ef4444' }
  ];

  if (!data || data.scans.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-slate-600 text-sm italic">
        Insufficient data for visualization
      </div>
    );
  }

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#16161a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-success"></div>
          <span className="text-xs text-slate-400">Safe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-danger"></div>
          <span className="text-xs text-slate-400">Phishing</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatChart;
