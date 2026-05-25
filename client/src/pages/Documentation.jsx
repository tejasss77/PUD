import { Code, Cpu, Info } from 'lucide-react';

const Documentation = () => {
  const features = [
    { name: 'URL Entropy', desc: 'Measures the randomness of characters in the URL. High entropy often indicates obfuscated phishing links.', redFlag: 'Entropy > 4.5' },
    { name: 'Subdomain Depth', desc: 'Counts the number of subdomains. Scammers use many layers (e.g., login.bank.secure.com) to mimic real brands.', redFlag: 'Dots > 3' },
    { name: 'Digit Ratio', desc: 'Calculates the percentage of digits in the URL. Malicious scripts often use long numeric strings.', redFlag: 'Ratio > 0.2' },
    { name: 'Domain Age', desc: 'Checks WHOIS records. Phishing sites are typically hosted on very young domains (often < 1 week old).', redFlag: 'Age < 30 days' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-white/10 pb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Documentation</h2>
        <p className="text-slate-400 text-lg">Understanding the intelligence behind PhishGuard's detection engine.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-accent-primary">
          <Cpu className="w-6 h-6" />
          <h3 className="text-2xl font-semibold">Detection Logic</h3>
        </div>
        <p className="text-slate-400 leading-relaxed">
          PhishGuard uses a **Random Forest Classifier** trained on 30,000+ verified phishing and legitimate URLs. 
          Unlike traditional blacklists which can be bypassed by new domains, our AI looks for structural "DNA" patterns 
          that are common across all phishing attempts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {features.map((f) => (
            <div key={f.name} className="glass-card p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white">{f.name}</h4>
                <span className="text-[10px] font-bold px-2 py-1 bg-accent-danger/10 text-accent-danger rounded border border-accent-danger/20">
                  RED FLAG: {f.redFlag}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-accent-secondary">
          <Code className="w-6 h-6" />
          <h3 className="text-2xl font-semibold">API Usage</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl font-mono text-sm overflow-x-auto bg-black/40">
          <div className="text-slate-500 mb-2">// Sample Request</div>
          <div className="text-white">
            <span className="text-accent-primary">POST</span> /api/scan <br />
            {`{ "url": "https://suspicious-link.xyz" }`}
          </div>
          <div className="text-slate-500 mt-4 mb-2">// Sample Response</div>
          <div className="text-white">
            {`{ "verdict": "PHISHING", "confidence": 98.4 }`}
          </div>
        </div>
      </section>

      <div className="p-6 bg-accent-primary/5 rounded-2xl border border-accent-primary/10 flex gap-4">
        <Info className="w-6 h-6 text-accent-primary shrink-0" />
        <p className="text-sm text-slate-400">
          Note: This tool is for educational and research purposes. Always verify sensitive links manually 
          regardless of the AI verdict.
        </p>
      </div>
    </div>
  );
};

export default Documentation;
