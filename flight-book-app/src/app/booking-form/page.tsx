'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Typography, message, Divider, Spin, List, Card } from 'antd-v5';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useFlightStore } from '../store/flightStore';
import Image from 'next/image';
import api from '../utils/api';

const { Title, Text } = Typography;

// Define the types
interface Flight {
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
}

interface Passenger {
    _id: string;
    name: string;
    age: number;
}

interface BookingHistoryItem {
    bookingId: string;
    flightId: string;
    totalPrice: number;
    bookingDate: string;
    paymentStatus: string;
    paymentDate: string;
    passengerDetails: Passenger[];
    paymentDetails: {
        cardHolder: string;
        cardNumber: string;
        expiryDate: string;
    };
}

interface BookingFormValues {
    passengers: { name: string; age: number }[];
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export default function BookingDetails() {
    const { user, isLoading } = useUser();
    const [flight, setFlight] = useState<Flight | null>(null);
    const [loadingFlight, setLoadingFlight] = useState(false);
    const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { flightId, setFlightsId, setError } = useFlightStore();

    // useEffect(() => {
    //     const storedFlightId = localStorage.getItem('selectedFlightId');

    //     const fetchFlightDetails = async () => {
    //         try {
    //             setLoadingFlight(true);
    //             console.log("Fetching flight details for ID:", storedFlightId);
    //             const response = await api.get(`/flights/${storedFlightId}`);
    //             setFlight(response.data);
    //             setFlightsId(Number(storedFlightId));
    //             localStorage.removeItem('selectedFlightId');
    //         } catch (err) {
    //             console.error("Failed to fetch flight details:", err);
    //             setError(err as string);
    //             // message.error("Failed to load flight details.");
    //         } finally {
    //             setLoadingFlight(false);
    //         }
    //     };

    //     if (Number(storedFlightId) > 0) {
    //         if (!storedFlightId) {
    //             console.error("No flight ID found in local storage.");
    //             message.error("No flight selected. Please select a flight.");
    //             router.push('/flights');
    //             return;
    //         }
    //         fetchFlightDetails();
    //     }
    // }, [setError, setFlightsId, router]);

    // useEffect(() => {
    //     const fetchBookingHistory = async (userId: string) => {
    //         try {
    //             const response = await api.get(`/payments/${userId}`);
    //             setBookingHistory(response.data);
    //         } catch (error) {
    //             message.error("Failed to load booking history.");
    //         }
    //     };

    //     if (user) {
    //         console.log("Fetching booking history for user:", user);
    //         fetchBookingHistory(user.sub || ''); // Pass the userId as an argument with a default value of an empty string
    //     }
    // }, [user]);

    const onFinish = async (values: BookingFormValues) => {
        setLoading(true);

        try {
            if (!flightId) {
                throw new Error('Flight ID is not available.');
            }

            const bookingDetails = {
                userId: user?.sub ?? '', // Get the user ID from Auth0, provide an empty string as default value
                flightId,
                totalPrice: flight?.price ?? 0,
                passengerDetails: values.passengers,
            };

            console.log("Booking details:", bookingDetails, values);

            const bookingResponse = await api.post('/bookings', bookingDetails);

            if (bookingResponse) {
                const bookingId = bookingResponse.data._id;

                const paymentDetails = {
                    userId: user?.sub ?? '',
                    bookingId,
                    paymentDetails: {
                        cardNumber: values.cardNumber,
                        cardHolder: user?.name ?? '', // Assuming card holder name is the user's name
                        expiryDate: values.expiry,
                        cvv: values.cvv,
                    }
                };

                const paymentResponse = await api.post('/payments/create', paymentDetails);

                if (paymentResponse) {
                    message.success('Booking and payment were successful!');
                    localStorage.removeItem('selectedFlightId');
                    router.push(`/flights`);
                } else {
                    throw new Error('Payment processing failed.');
                }
            } else {
                throw new Error('Booking failed.');
            }
        } catch (err) {
            console.error("Booking or payment error:", err);
            message.error((err as Error).message || 'Failed to complete booking and payment.');
        } finally {
            setLoading(false);
        }
    };

    if (loadingFlight || isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!flight && flightId !== 0) {
        return <div>No flight details available.</div>;
    }

    return (
        <>
            {user && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Image
                        src={user.picture || ''}
                        alt={user.name || ''}
                        width={100}
                        height={100}
                        style={{ borderRadius: '50%', marginBottom: '1rem' }}
                    />
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user.name}</h2>
                    <p style={{ fontSize: '1rem', color: '#888' }}>{user.email}</p>
                    <a href="/api/auth/logout" style={{ color: '#1890ff', fontWeight: 'bold' }}>Logout</a>
                </div>
            )}

            {false ? (
                <>
                    <Card
                        style={{
                            maxWidth: '100%',
                            margin: '5% auto',
                            padding: '2rem',
                            borderRadius: '16px',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                            width: '90%',
                            backgroundColor: '#fff',
                            transition: 'transform 0.3s ease',
                        }}
                        bodyStyle={{ padding: '1.5rem' }}
                    >
                        <Title level={2} style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem', color: '#333', fontWeight: '600' }}>
                            Booking History
                        </Title>
                        {bookingHistory.length === 0 ? (
                            <p style={{ color: '#999', textAlign: 'center' }}>No booking history available.</p>
                        ) : (
                            <List
                                grid={{ gutter: 16, column: 1 }}
                                dataSource={bookingHistory}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card
                                            title={`Booking ID: ${item.bookingId}`}
                                            extra={<Text style={{ color: '#888' }}>{new Date(item.bookingDate).toLocaleDateString()}</Text>}
                                            style={{
                                                width: '100%',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                                                backgroundColor: '#f8f8f8',
                                                padding: '1rem',
                                            }}
                                        >
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Flight ID:</strong> {item.flightId}</p>
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Total Price:</strong> ${item.totalPrice}</p>
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Passenger Details:</strong></p>
                                            <ul style={{ paddingLeft: '1.2rem', color: '#555', marginBottom: '1rem' }}>
                                                {item.passengerDetails.map((passenger) => (
                                                    <li key={passenger._id} style={{ marginBottom: '0.5rem' }}>
                                                        {passenger.name} (Age: {passenger.age})
                                                    </li>
                                                ))}
                                            </ul>
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Payment Status:</strong> {item.paymentStatus}</p>
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Payment Date:</strong> {new Date(item.paymentDate).toLocaleDateString()}</p>
                                            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}><strong>Payment Details:</strong></p>
                                            <ul style={{ paddingLeft: '1.2rem', color: '#555' }}>
                                                <li><strong>Card Holder:</strong> {item.paymentDetails.cardHolder}</li>
                                                <li><strong>Card Number:</strong> **** **** **** {item.paymentDetails.cardNumber.slice(-4)}</li>
                                                <li><strong>Expiry Date:</strong> {item.paymentDetails.expiryDate}</li>
                                            </ul>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <Button
                            type="primary"
                            onClick={() => router.push('/flights')}
                            block
                            style={{
                                borderColor: '#d9d9d9',
                                height: '3rem',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '500',
                                maxWidth: '100%',
                                width: '90%',
                            }}
                        >
                            Back to Flights
                        </Button>
                    </div>
                </>
            ) : (
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
                    <Title level={2} style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
                        Booking Details
                    </Title>

                    <Title level={3} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        Flight Information
                    </Title>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <Text strong style={{ display: 'block', fontSize: '1.2rem' }}>Flight: {flight?.airline}</Text>
                        <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                            Origin: {flight?.origin} | Destination: {flight?.destination}
                        </Text>
                        <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                            Departure: {flight?.departureTime} | Arrival: {flight?.arrivalTime}
                        </Text>
                        <Text style={{ display: 'block', marginTop: '0.5rem', fontSize: '1rem' }}>
                            Price: <strong>${flight?.price}</strong>
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
                                        style={{
                                            marginTop: '0.85rem',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            lineHeight: '1.5rem', // Adjusts the height of the text line
                                            height: '3rem', // Ensures the button has a consistent height
                                            display: 'flex',
                                            alignItems: 'center', // Vertically centers the text
                                            justifyContent: 'center' // Horizontally centers the text
                                        }}
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
                </Card>
            )}
        </>
    );
}
