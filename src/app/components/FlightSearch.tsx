'use client';

import { useState } from 'react';
import styles from './FlightSearch.module.css';

interface Flight {
    flightNumber: string;
    origin: string;
    destination: string;
    startTime: string;
    endTime: string;
    timeZoneOrigin: string;
    timeZoneDestination: string;
}

export default function FlightSearch() {
    const [flightNumber, setFlightNumber] = useState('');
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flightNumber.trim()) return;

        setLoading(true);
        setError('');
        setFlight(null);

        try {
            const response = await fetch(`/api/flights?flightNumber=${encodeURIComponent(flightNumber)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch flight data');
            }

            setFlight(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateString: string, timeZone: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone,
            timeZoneName: 'short',
        });
    };

    const formatDate = (dateString: string, timeZone: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone,
        });
    };

    const getCityCode = (location: string) => location.split(' - ')[0];
    const getCityName = (location: string) => location.split(' - ')[1];

    return (
        <div className={styles.container}>
            <div className={styles.searchCard}>
                <h1 className={styles.title}>Flight Lookup</h1>
                <form onSubmit={handleSearch} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            placeholder="Enter Flight Number (e.g., AA123)"
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Searching...' : 'Search Flight'}
                    </button>
                </form>

                {error && <div className={styles.error}>{error}</div>}
            </div>

            {flight && (
                <div className={styles.resultCard}>
                    <div className={styles.flightHeader}>
                        <span className={styles.flightNumber}>{flight.flightNumber}</span>
                        <span className={styles.subValue}>Non-stop</span>
                    </div>

                    <div className={styles.route}>
                        <div className={styles.location}>
                            <span className={styles.code}>{getCityCode(flight.origin)}</span>
                            <span className={styles.city}>{getCityName(flight.origin)}</span>
                        </div>
                        <div className={styles.planeIcon}>✈</div>
                        <div className={styles.location}>
                            <span className={styles.code}>{getCityCode(flight.destination)}</span>
                            <span className={styles.city}>{getCityName(flight.destination)}</span>
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Departure</span>
                            <span className={styles.value}>
                                {formatTime(flight.startTime, flight.timeZoneOrigin)}
                            </span>
                            <span className={styles.subValue}>
                                {formatDate(flight.startTime, flight.timeZoneOrigin)}
                            </span>
                        </div>
                        <div className={styles.detailItem} style={{ textAlign: 'right' }}>
                            <span className={styles.label}>Arrival</span>
                            <span className={styles.value}>
                                {formatTime(flight.endTime, flight.timeZoneDestination)}
                            </span>
                            <span className={styles.subValue}>
                                {formatDate(flight.endTime, flight.timeZoneDestination)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
