export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Skeleton Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[var(--foreground-muted)] text-sm font-medium animate-pulse">
          Yükleniyor...
        </p>
      </div>
    </div>
  );
}
