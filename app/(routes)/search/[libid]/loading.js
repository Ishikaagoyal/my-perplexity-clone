export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground text-sm">Fetching results...</p>
      </div>
    </div>
  );
}
