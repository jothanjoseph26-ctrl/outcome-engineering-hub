export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: '#fafafa'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: 'bold', color: '#d4a574' }}>404</h1>
        <p style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#a1a1aa' }}>Page not found</p>
        <a href="/" style={{ color: '#d4a574', textDecoration: 'underline' }}>
          Return to Home
        </a>
      </div>
    </div>
  );
}