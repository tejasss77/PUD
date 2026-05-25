import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';

const URLScanner = ({ setLastScan }) => {
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();

  const scanMutation = useMutation({
    mutationFn: async (urlToScan) => {
      const response = await axios.post('http://localhost:5001/api/scan', { url: urlToScan });
      return response.data;
    },
    onSuccess: (data) => {
      setLastScan(data);
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      scanMutation.mutate(url);
    }
  };

  return (
    <div className="glass-card p-1 rounded-2xl glow-shadow-violet">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze (e.g., https://suspicious-site.com)"
            className="w-full bg-transparent border-0 py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent-primary/50 rounded-xl text-lg outline-none transition-all placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          disabled={scanMutation.isPending || !url}
          className="bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {scanMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Scan URL'
          )}
        </button>
      </form>
    </div>
  );
};

export default URLScanner;
