"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="text-6xl font-bold text-accent font-(family-name:--font-geist-mono)">
          500
        </div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted leading-relaxed">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-lg bg-accent/10 border border-accent/30 text-accent font-(family-name:--font-geist-mono) text-sm hover:bg-accent/20 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
