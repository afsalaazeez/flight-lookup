import { NextResponse } from 'next/server';

interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  startTime: string;
  endTime: string;
  timeZoneOrigin: string;
  timeZoneDestination: string;
}

const MOCK_FLIGHTS: Flight[] = [
  {
    flightNumber: 'AA123',
    origin: 'JFK - New York',
    destination: 'LHR - London',
    startTime: '2023-11-21T18:00:00',
    endTime: '2023-11-22T06:00:00',
    timeZoneOrigin: 'America/New_York',
    timeZoneDestination: 'Europe/London',
  },
  {
    flightNumber: 'BA456',
    origin: 'LHR - London',
    destination: 'DXB - Dubai',
    startTime: '2023-11-22T09:00:00',
    endTime: '2023-11-22T19:00:00',
    timeZoneOrigin: 'Europe/London',
    timeZoneDestination: 'Asia/Dubai',
  },
  {
    flightNumber: 'EK789',
    origin: 'DXB - Dubai',
    destination: 'SYD - Sydney',
    startTime: '2023-11-23T02:00:00',
    endTime: '2023-11-23T22:00:00',
    timeZoneOrigin: 'Asia/Dubai',
    timeZoneDestination: 'Australia/Sydney',
  },
  {
    flightNumber: 'JL001',
    origin: 'HND - Tokyo',
    destination: 'SFO - San Francisco',
    startTime: '2023-11-24T17:00:00',
    endTime: '2023-11-24T10:30:00',
    timeZoneOrigin: 'Asia/Tokyo',
    timeZoneDestination: 'America/Los_Angeles',
  }
];

async function fetchFromAviationStack(flightNumber: string, apiKey: string): Promise<Flight | null> {
  try {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('AviationStack API error:', response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    // Use the most recent or upcoming flight
    const flightData = data.data[0];

    return {
      flightNumber: flightData.flight.iata,
      origin: `${flightData.departure.iata} - ${flightData.departure.airport}`,
      destination: `${flightData.arrival.iata} - ${flightData.arrival.airport}`,
      startTime: flightData.departure.scheduled,
      endTime: flightData.arrival.scheduled,
      timeZoneOrigin: flightData.departure.timezone,
      timeZoneDestination: flightData.arrival.timezone,
    };
  } catch (error) {
    console.error('Error fetching from AviationStack:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');

  if (!flightNumber) {
    return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  // Try Real API if key exists
  if (apiKey) {
    const realFlight = await fetchFromAviationStack(flightNumber, apiKey);
    if (realFlight) {
      return NextResponse.json(realFlight);
    }
    // If real API fails or returns no data, fall through to mock?
    // Or should we return 404?
    // Let's fall back to mock for demonstration purposes if the real API doesn't find it,
    // but usually you'd want to be explicit.
    // For this task, let's return 404 if API is configured but finds nothing,
    // to prove it's working.
    // However, to keep the "demo" feel if the user searches for "AA123" (mock data)
    // but the real API doesn't have it (old flight), we might want to check mock.
    // Let's stick to: Real API > Mock Data Fallback.
  }

  // Fallback to Mock Data
  const flight = MOCK_FLIGHTS.find(
    (f) => f.flightNumber.toLowerCase() === flightNumber.toLowerCase()
  );

  if (flight) {
    return NextResponse.json(flight);
  } else {
    return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
  }
}
