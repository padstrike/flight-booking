// components/FlightResults.tsx

'use client';

import React from 'react';
import { Row, Col, Typography, Empty, Button } from 'antd-v5';
import FlightCard from './FlightCard';
import { useRouter } from 'next/navigation';
const { Title } = Typography;

interface FlightResultsProps {
    flights: any[];
}

export default function FlightResults({ flights }: FlightResultsProps) {
    const router = useRouter();

    const handleViewFlight = () => {
        router.push('/api/auth/login');
    };

    return (
        <div
            style={{
                padding: '20px',
                background: 'linear-gradient(to right, #ece9e6, #ffffff)',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Title
                level={3}
                style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#333',
                }}
            >
                Flights You Can Book
            </Title>

            <Row justify="center" style={{ marginBottom: '30px' }}>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleViewFlight}
                    style={{
                        fontSize: '1rem',
                        padding: '0 30px',
                        borderRadius: '30px',
                        background: '#1890ff',
                        borderColor: '#1890ff',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget.style.background = '#40a9ff');
                        (e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)');
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget.style.background = '#1890ff');
                        (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)');
                    }}
                >
                    View Your Booking
                </Button>
            </Row>

            {flights.length > 0 ? (
                <Row gutter={[16, 16]} justify="center">
                    {flights.map((flight) => (
                        <Col xs={24} key={flight.id}>
                            <FlightCard flight={flight} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    description={
                        <span style={{ color: '#777' }}>
                            No flights available. Please try a different search.
                        </span>
                    }
                    style={{ marginTop: '50px', color: '#777' }}
                />
            )}
        </div>
    );
}
