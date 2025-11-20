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
    endTime: '2023-11-24T10:30:00', // Arrives same day local time due to crossing IDL
    timeZoneOrigin: 'Asia/Tokyo',
    timeZoneDestination: 'America/Los_Angeles',
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flightNumber');

  if (!flightNumber) {
    return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
  }

  const flight = MOCK_FLIGHTS.find(
    (f) => f.flightNumber.toLowerCase() === flightNumber.toLowerCase()
  );

  if (flight) {
    return NextResponse.json(flight);
  } else {
    return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
  }
}
