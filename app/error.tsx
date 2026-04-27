'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md">{error.message}</p>
      {error.digest && (
        <p className="text-xs text-muted-foreground font-mono">Digest: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="px-6 py-3 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
