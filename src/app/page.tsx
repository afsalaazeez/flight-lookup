import FlightSearch from './components/FlightSearch';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <FlightSearch />
    </main>
  );
}
