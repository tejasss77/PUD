import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Shield, LayoutDashboard, Search, BookOpen } from 'lucide-react';

// Pages
import Scanner from './pages/Scanner';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';

const queryClient = new QueryClient();

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Scanner', path: '/', icon: Search },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documentation', path: '/docs', icon: BookOpen },
  ];

  return (
    <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-accent-primary/10 rounded-lg group-hover:bg-accent-primary/20 transition-all">
            <Shield className="w-6 h-6 text-accent-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Phish<span className="text-accent-primary">Guard</span></h1>
        </Link>
        
        <nav className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-white/5 text-accent-primary' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-slate-200">
          <Navbar />
          
          <main className="max-w-7xl mx-auto px-4 py-12">
            <Routes>
              <Route path="/" element={<Scanner />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-white/5 mt-12 text-center">
            <p className="text-slate-600 text-sm">
              &copy; 2026 PhishGuard AI. Advanced Threat Detection Research Project.
            </p>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
