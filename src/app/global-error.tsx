"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sistem Hatası</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Uygulamada kritik bir hata meydana geldi.</p>
          <button 
            onClick={() => reset()}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0f766e', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
