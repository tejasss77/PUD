import { ShieldCheck, ShieldAlert } from 'lucide-react';

const ResultCard = ({ result }) => {
  const isPhishing = result.verdict === 'PHISHING';
  
  return (
    <div className={`glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 ${isPhishing ? 'glow-shadow-danger border-accent-danger/20' : 'glow-shadow-success border-accent-success/20'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl ${isPhishing ? 'bg-accent-danger/10 text-accent-danger' : 'bg-accent-success/10 text-accent-success'}`}>
            {isPhishing ? <ShieldAlert className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-bold tracking-widest uppercase ${isPhishing ? 'text-accent-danger' : 'text-accent-success'}`}>
                Verdict: {result.verdict}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white truncate max-w-md" title={result.url}>
              {result.url}
            </h3>
          </div>
        </div>
        
        <div className="text-right bg-white/5 p-4 rounded-2xl min-w-[140px]">
          <div className="text-sm text-slate-400 mb-1">Confidence</div>
          <div className={`text-3xl font-black ${isPhishing ? 'text-accent-danger' : 'text-accent-success'}`}>
            {result.confidence}%
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">Length</div>
          <div className="text-lg font-semibold">{result.features.url_length}</div>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">Subdomains</div>
          <div className="text-lg font-semibold">{result.features.num_subdomains}</div>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">HTTPS</div>
          <div className="text-lg font-semibold">{result.features.is_https ? 'Yes' : 'No'}</div>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">Entropy</div>
          <div className="text-lg font-semibold">{result.features.entropy.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
