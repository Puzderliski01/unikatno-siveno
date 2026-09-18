import React, { useState, useEffect, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      event.preventDefault();
      setError(event.error || new Error(event.message));
    };
    const unhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      setError(new Error(String(event.reason)));
    };
    window.addEventListener('error', handler);
    window.addEventListener('unhandledrejection', unhandledRejection as any);
    return () => {
      window.removeEventListener('error', handler);
      window.removeEventListener('unhandledrejection', unhandledRejection as any);
    };
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] p-8">
        <div className="max-w-lg text-center">
          <p className="text-red-400 text-sm font-mono mb-4">Došlo je do greške:</p>
          <p className="text-[#e8e0d4] text-sm font-mono whitespace-pre-wrap break-words mb-4">
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="px-4 py-2 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider"
          >
            Pokušaj ponovo
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
