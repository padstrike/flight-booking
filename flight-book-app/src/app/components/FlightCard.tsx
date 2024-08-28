'use client';

import React from 'react';
import { Card, Row, Col, Typography, Space, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Text } = Typography;

interface FlightCardProps {
    flight: any;
}

export default function FlightCard({ flight }: FlightCardProps) {
    const router = useRouter();

    const handleBooking = () => {
        router.push('/api/auth/login');
    };

    return (
        <>
            <Card
                hoverable
                bordered={false}
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '0px',
                    backgroundColor: '#fff',
                }}
            >
                <Row align="middle" justify="space-between" gutter={[20, 20]}>
                    {/* Airline Logo and Name */}
                    <Col style={{ textAlign: 'left' }}>
                        <Space direction="horizontal" size="small">
                            <Image
                                src={flight.airlineLogo}
                                alt={flight.airline}
                                width={30}
                                height={30}
                                layout="fixed"
                                objectFit="contain"
                                quality={80}
                            />
                            <Text strong style={{ fontSize: '0.85rem' }}>{flight.airline}</Text>
                        </Space>
                    </Col>

                    {/* Flight Date */}
                    <Col xs={6} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                        <Text type="secondary" style={{ fontSize: '0.875rem' }}>{flight.date}</Text>
                    </Col>
                </Row>

                <Row align="middle" justify="center" style={{ marginTop: '10px' }}>
                    {/* Departure and Arrival Times */}
                    <Col xs={6} sm={4} md={4} lg={4} style={{ textAlign: 'left' }}>
                        <Text strong style={{ fontSize: '1.125rem' }}>
                            {flight.departureTime}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '1.2rem', display: 'block' }}>{flight.origin}</Text>
                    </Col>

                    <Col xs={6} sm={4} md={4} lg={4} style={{ textAlign: 'center' }}>
                        <ArrowRightOutlined style={{ fontSize: '2.5rem', color: '#888' }} />
                        <Text type="secondary" style={{ fontSize: '0.875rem', display: 'block' }}>
                            {flight.duration}
                        </Text>
                    </Col>

                    <Col xs={6} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                        <Text strong style={{ fontSize: '1.125rem' }}>
                            {flight.arrivalTime}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '1.2rem', display: 'block' }}>{flight.destination}</Text>
                    </Col>

                    {/* Price */}
                    <Col xs={6} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
                        <Text strong style={{ fontSize: '1.375rem', color: '#ff4d4f' }}>
                            ฿{flight.price}
                        </Text>
                    </Col>
                </Row>

                {/* Booking Button */}
                <Row justify="end" style={{ marginTop: '20px' }}>
                    <Button type="primary" size="large" onClick={handleBooking} style={{ fontSize: '1rem' }}>
                        Book Now
                    </Button>
                </Row>
            </Card>
        </>
    );
}
