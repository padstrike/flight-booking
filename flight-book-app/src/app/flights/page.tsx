'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Space, Tag } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import { DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import LoginRegisterModal from '../components/LoginRegisterModal'; // Adjust the path as necessary

const { Title, Text } = Typography;

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Mock flight data based on search parameters (you can replace with actual API call)
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const travelDate = searchParams.get('date');

    const mockFlights = [
      { id: 1, airline: 'Airline A', price: 200, departure: '10:00 AM', arrival: '12:00 PM' },
      { id: 2, airline: 'Airline B', price: 250, departure: '1:00 PM', arrival: '3:00 PM' },
      { id: 3, airline: 'Airline C', price: 300, departure: '4:00 PM', arrival: '6:00 PM' }
    ];

    // Simulate fetching flight data
    setFlights(mockFlights);
  }, [searchParams]);

  const handleBooking = (flightId) => {
    // if (isAuthenticated) {
      // Redirect to booking details page if authenticated
      router.push(`/booking-detail`);
    // } else {
      // Show login modal if not authenticated
    //   setIsModalVisible(true);
    // }
  };

  const handleLogin = (values) => {
    // Mock login process (replace with actual authentication logic)
    console.log('Login details:', values);
    setIsAuthenticated(true);
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Available Flights
      </Title>

      <Row gutter={[16, 16]} justify="center">
        {flights.map((flight) => (
          <Col xs={24} sm={12} md={8} lg={6} key={flight.id}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
              title={<Title level={4}>{flight.airline}</Title>}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Text type="secondary">
                  <ClockCircleOutlined /> Departure: {flight.departure}
                </Text>
                <Text type="secondary">
                  <ClockCircleOutlined /> Arrival: {flight.arrival}
                </Text>
                <Tag icon={<DollarOutlined />} color="gold" style={{ fontSize: '16px', padding: '4px 8px' }}>
                  ${flight.price}
                </Tag>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100%',
                  }}
                  onClick={() => handleBooking(flight.id)}
                >
                  Book Now
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Login/Register Modal */}
      <LoginRegisterModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
