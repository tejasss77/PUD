import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { History, ShieldCheck, ShieldAlert } from 'lucide-react';

const HistoryTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5001/api/scan/history');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="glass-card p-8 rounded-2xl animate-pulse">
        <div className="h-4 bg-white/5 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-white/5 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <History className="w-5 h-5 text-accent-secondary" />
        <h3 className="font-semibold text-lg">Scan History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-xs font-bold uppercase text-slate-500 tracking-wider">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data?.scans.map((scan) => (
              <tr key={scan._id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  {scan.verdict === 'PHISHING' ? (
                    <div className="flex items-center gap-2 text-accent-danger text-sm font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      PHISHING
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-accent-success text-sm font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      SAFE
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 max-w-xs md:max-w-md">
                  <div className="text-sm font-medium text-slate-300 truncate">{scan.url}</div>
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-500 font-mono">
                  {new Date(scan.scannedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {data?.scans.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                  No scans yet. Start by entering a URL above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
