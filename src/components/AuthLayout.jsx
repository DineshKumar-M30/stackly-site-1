import { useEffect, useState } from 'react';

const AuthLayout = ({ children, title = "Welcome", illustration = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTgwIiBmaWxsPSIjNDc0MEZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjOTFGQkZGIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iNDAiIGZpbGw9IiM3MkRDN0MiLz4KPHN2Zy8+Cjwvc3ZnPg==" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:block animate-pulse">
          <img src={illustration} alt="Auth" className="w-full h-96 object-contain filter brightness-150" />
        </div>
        
        <div className="glass-card max-w-md mx-auto w-full relative overflow-hidden">
          <div className="gradient-border" />
          <div className="relative p-8 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center fade-in-slide">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
