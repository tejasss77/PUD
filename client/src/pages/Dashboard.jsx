import ThreatChart from '../components/ThreatChart';
import HistoryTable from '../components/HistoryTable';
import { BarChart3, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Threat Intelligence Dashboard</h2>
        <p className="text-slate-400">Comprehensive overview of detected threats and model performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Stats Column */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl glow-shadow-violet">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-accent-primary" />
              <h3 className="font-semibold text-lg text-white">Threat Distribution</h3>
            </div>
            <ThreatChart />
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-accent-secondary" />
              <h3 className="font-semibold text-lg text-white">System Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-slate-400">ML Engine</span>
                <span className="flex items-center gap-2 text-accent-success text-xs font-bold uppercase">
                  <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-slate-400">Model Precision</span>
                <span className="text-white font-medium">99.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-slate-400">Database History</span>
                <span className="text-white font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Table Column */}
        <div className="lg:col-span-2">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
