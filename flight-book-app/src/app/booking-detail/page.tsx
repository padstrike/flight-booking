'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Space, Typography, message, Divider, Spin, List } from 'antd';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useFlightStore } from '../store/flightStore';
import api from '../utils/api';

const { Title, Text } = Typography;

export default function BookingDetails() {
    const { user, isLoading } = useUser();
    const [flight, setFlight] = useState(null);
    const [loadingFlight, setLoadingFlight] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { flightId, setFlightsId, setError } = useFlightStore();

    useEffect(() => {
        const storedFlightId = localStorage.getItem('selectedFlightId');
        if (!storedFlightId) {
            console.error("No flight ID found in local storage.");
            message.error("No flight selected. Please select a flight.");
            router.push('/flights'); // Redirect to flight selection if no ID found
            return;
        }

        const fetchFlightDetails = async () => {
            try {
                setLoadingFlight(true);
                console.log("Fetching flight details for ID:", storedFlightId);
                const response = await api.get(`/flights/${storedFlightId}`);
                setFlight(response.data);
                setFlightsId(storedFlightId); // Set the flightId in the store
                localStorage.removeItem('selectedFlightId'); // Clear after use
            } catch (error) {
                console.error("Failed to fetch flight details:", error);
                setError(error.message);
                message.error("Failed to load flight details.");
            } finally {
                setLoadingFlight(false);
            }
        };

        fetchFlightDetails();
    }, [setError, setFlightsId, router]);

    useEffect(() => {
        if (user) {
            const mockBookingHistory = [
                {
                    id: '1',
                    airline: 'Airline A',
                    departure: '09:00 AM',
                    arrival: '11:00 AM',
                    price: 180,
                    date: '2024-08-20',
                },
                {
                    id: '2',
                    airline: 'Airline B',
                    departure: '10:00 AM',
                    arrival: '12:00 PM',
                    price: 200,
                    date: '2024-08-15',
                },
            ];

            setTimeout(() => {
                setBookingHistory(mockBookingHistory);
            }, 500);
        }
    }, [user]);

    const onFinish = async (values) => {
        setLoading(true);

        try {
            if (!flightId) {
                throw new Error('Flight ID is not available.');
            }

            // Step 1: Create the booking
            const bookingDetails = {
                userId: user.sub, // Get the user ID from Auth0
                flightId,
                totalPrice: flight.price,
                passengerDetails: values.passengers,
            };

            console.log("Booking details:", bookingDetails , values);

            const bookingResponse = await api.post('/bookings', bookingDetails);

            if (bookingResponse.status === 200) {
                const bookingId = bookingResponse.data._id;

                // Step 2: Submit the payment details
                const paymentDetails = {
                    userId: user.sub,
                    bookingId,
                    paymentDetails: {
                        cardNumber: values.cardNumber,
                        cardHolder: user.name,  // Assuming card holder name is the user's name
                        expiryDate: values.expiry,
                        cvv: values.cvv,
                    }
                };

                const paymentResponse = await api.post('/payments/create', paymentDetails);

                if (paymentResponse.status === 200) {
                    message.success('Booking and payment were successful!');
                    router.push(`/booking/confirmation/${bookingId}`);
                } else {
                    throw new Error('Payment processing failed.');
                }
            } else {
                throw new Error('Booking failed.');
            }
        } catch (error) {
            console.error("Booking or payment error:", error);
            message.error(error.message || 'Failed to complete booking and payment.');
        } finally {
            setLoading(false);
        }
    };

    if (loadingFlight || isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" />
        </div>;
    }

    if (!flight) {
        return <div>No flight details available.</div>;
    }

    return (
        <>
            {user && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src={user.picture} alt={user.name} style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '1rem' }} />
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user.name}</h2>
                    <p style={{ fontSize: '1rem', color: '#888' }}>{user.email}</p>
                    <a href="/api/auth/logout" style={{ color: '#1890ff', fontWeight: 'bold' }}>Logout</a>
                </div>
            )}

            <Card
                style={{
                    maxWidth: '100%',
                    margin: '5% auto',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '90%',
                    backgroundColor: '#f9f9f9',
                }}
                bodyStyle={{ padding: '1.5rem' }}
            >
                <Typography.Title level={2} style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
                    Booking Details
                </Typography.Title>

                <Title level={3} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Flight Information
                </Title>
                <div style={{ marginBottom: '1.5rem' }}>
                    <Text strong style={{ display: 'block', fontSize: '1.2rem' }}>Flight: {flight.airline}</Text>
                    <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                        Origin: {flight.origin} | Destination: {flight.destination}
                    </Text>
                    <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                        Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}
                    </Text>
                    <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                        Price: <strong>${flight.price}</strong>
                    </Text>
                </div>

                <Divider />

                <Title level={4} style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Passenger Information</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.List name="passengers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space
                                        key={field.key}
                                        align="baseline"
                                        wrap={true}
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-between',
                                            marginBottom: '1rem',
                                            gap: '1rem',
                                        }}
                                    >
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'name']}
                                            label="Passenger Name"
                                            rules={[{ required: true, message: 'Please enter the passenger name' }]}
                                            style={{ flex: '1', minWidth: 'auto' }}
                                        >
                                            <Input placeholder="Enter passenger name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'age']}
                                            label="Passenger Age"
                                            rules={[{ required: true, message: 'Please enter the passenger age' }]}
                                            style={{ minWidth: '120px' }}
                                        >
                                            <Input placeholder="Age" />
                                        </Form.Item>
                                        <Button type="link" onClick={() => remove(field.name)} style={{ color: '#ff4d4f' }}>Remove</Button>
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', fontSize: '1rem' }}
                                >
                                    Add Passenger
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Divider />

                    <Title level={4} style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Payment Information</Title>
                    <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[{ required: true, message: 'Please enter your card number' }]}
                    >
                        <Input placeholder="Enter card number" style={{ borderRadius: '8px', fontSize: '1rem' }} />
                    </Form.Item>
                    <Space direction="horizontal" size="large" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        <Form.Item
                            name="expiry"
                            label="Expiry Date"
                            rules={[{ required: true, message: 'Please enter expiry date' }]}
                            style={{ flex: '1' }}
                        >
                            <Input placeholder="MM/YY" style={{ borderRadius: '8px', fontSize: '1rem' }} />
                        </Form.Item>
                        <Form.Item
                            name="cvv"
                            label="CVV"
                            rules={[{ required: true, message: 'Please enter CVV' }]}
                            style={{ flex: '1' }}
                        >
                            <Input placeholder="Enter CVV" style={{ borderRadius: '8px', fontSize: '1rem' }} />
                        </Form.Item>
                    </Space>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        style={{
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            height: '3rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginTop: '1.5rem',
                        }}
                    >
                        Complete Booking
                    </Button>
                </Form>

                <Divider />

                <Button
                    type="link"
                    onClick={() => setShowHistory(!showHistory)}
                    style={{ fontWeight: 'bold', color: '#1890ff', marginTop: '1rem' }}
                >
                    {showHistory ? 'Hide Booking History' : 'Show Booking History'}
                </Button>

                {showHistory && (
                    <div style={{ marginTop: '2rem' }}>
                        <Typography.Title level={3} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            Booking History
                        </Typography.Title>
                        {bookingHistory.length === 0 ? (
                            <p>No booking history available.</p>
                        ) : (
                            <List
                                grid={{ gutter: 16, column: 1 }}
                                dataSource={bookingHistory}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card
                                            title={`Flight with ${item.airline}`}
                                            extra={<Text>{item.date}</Text>}
                                            style={{ width: '100%' }}
                                        >
                                            <p>Departure: {item.departure}</p>
                                            <p>Arrival: {item.arrival}</p>
                                            <p>Price: ${item.price}</p>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                )}
            </Card>
        </>
    );
}
