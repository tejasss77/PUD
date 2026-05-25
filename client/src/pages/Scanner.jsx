import { useState } from 'react';
import URLScanner from '../components/URLScanner';
import ResultCard from '../components/ResultCard';
import { Zap, Search } from 'lucide-react';

const Scanner = () => {
  const [lastScan, setLastScan] = useState(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold mb-6 border border-accent-primary/20">
          <Zap className="w-3 h-3" />
          AI POWERED DETECTION
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Secure Your Digital Journey
        </h2>
        <p className="text-slate-400 text-lg">
          Paste any suspicious link below. Our neural network analyzes 20+ lexical and domain features 
          to identify phishing threats in milliseconds.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <URLScanner setLastScan={setLastScan} />
        {lastScan ? (
          <ResultCard result={lastScan} />
        ) : (
          <div className="glass-card p-12 rounded-2xl border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-slate-500">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>Ready for analysis. Paste a URL to begin.</p>
          </div>
        )}
      </div>

      {/* Feature Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
        <div className="glass-card p-6 rounded-2xl">
          <h4 className="font-bold text-white mb-2">Lexical Analysis</h4>
          <p className="text-sm text-slate-400">Deep inspection of URL string structure, entropy, and special character ratios.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <h4 className="font-bold text-white mb-2">Domain Reputation</h4>
          <p className="text-sm text-slate-400">Real-time checks against TLD risk scores and subdomain depth analysis.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <h4 className="font-bold text-white mb-2">Confidence Scoring</h4>
          <p className="text-sm text-slate-400">Probability-based classification using a production-grade Random Forest model.</p>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
