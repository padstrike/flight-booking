// components/FlightResults.tsx

'use client';

import React from 'react';
import { Row, Col, Typography, Empty } from 'antd';
import FlightCard from './FlightCard';

const { Title } = Typography;

interface FlightResultsProps {
    flights: any[];
}

export default function FlightResults({ flights }: FlightResultsProps) {
    return (
        <div style={{ padding: '15px' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '25px' }}>
                Flights You Can Book
            </Title>
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
                        <span>No flights available. Please try a different search.</span>
                    }
                    style={{ marginTop: '50px' }}
                />
            )}
        </div>
    );
}
