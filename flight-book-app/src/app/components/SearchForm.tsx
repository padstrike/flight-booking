'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, Select, Typography, Row, Col, Card } from 'antd';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

export default function SearchForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [airports, setAirports] = useState<{ origin: string; destination: string }[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await api.get('/flights');
        const flights = response.data;

        // Extract unique origins and destinations
        const uniqueOrigins = Array.from(new Set(flights.map((flight: any) => flight.origin)));
        const uniqueDestinations = Array.from(new Set(flights.map((flight: any) => flight.destination)));

        setAirports(flights);
        setOrigins(uniqueOrigins);
        setDestinations(uniqueDestinations);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();
  }, []);

  const onFinish = async (values: any) => {
    const { origin, destination, dates } = values;
    const startDate = dates[0].format('YYYY-MM-DD');
    const endDate = dates[1].format('YYYY-MM-DD');

    try {
      const response = await api.get('/flights/search', {
        params: { origin, destination, startDate, endDate },
      });

    //   router.push(`/search?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}`);
    router.push(`/flights`)
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '50vh', backgroundColor: '#f0f2f5' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
          bodyStyle={{ padding: '40px' }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
            Search for Flights
          </Title>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="origin"
              label="Origin"
              rules={[{ required: true, message: 'Please select the origin airport' }]}
            >
              <Select
                placeholder="Select origin airport"
                showSearch
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
              >
                {origins.map((origin) => (
                  <Option key={origin} value={origin}>
                    {origin}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="destination"
              label="Destination"
              rules={[{ required: true, message: 'Please select the destination airport' }]}
            >
              <Select
                placeholder="Select destination airport"
                showSearch
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
              >
                {destinations.map((destination) => (
                  <Option key={destination} value={destination}>
                    {destination}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dates"
              label="Travel Dates"
              rules={[{ required: true, message: 'Please select travel dates' }]}
            >
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  background: '#1890ff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                Search Flights
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
