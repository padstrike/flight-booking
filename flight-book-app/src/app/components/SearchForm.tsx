// components/SearchForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker, Select, Typography } from 'antd-v5';
import { useFlightStore } from '../store/flightStore';
import api from '../utils/api';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

interface SearchProps {
  onSearch: (values: any) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchProps) {
  const [form] = Form.useForm();
  const [origins, setOrigins] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const { flights, setFlights } = useFlightStore();

  useEffect(() => {
    const uniqueOrigins = Array.from(
      new Set(flights.map((flight: any) => JSON.stringify({
        code: flight.origin,
        fullName: flight.originFullName,
      })))
    ).map((origin: any) => JSON.parse(origin));

    const uniqueDestinations = Array.from(
      new Set(flights.map((flight: any) => JSON.stringify({
        code: flight.destination,
        fullName: flight.destinationFullName,
      })))
    ).map((destination: any) => JSON.parse(destination));

    setOrigins(uniqueOrigins);
    setDestinations(uniqueDestinations);
  }, [flights]);

  const onFinish = (values: any) => {
    onSearch(values);
  };

  const handleClearFilters = async () => {
    form.resetFields(); // Reset form fields to initial values
    setOrigins([]); // Clear origins
    setDestinations([]); // Clear destinations
    const response = await api.get(`/flights`);
    setFlights(response.data);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px 20px', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
              (option?.value?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {origins.map((origin) => (
              <Option key={origin.code} value={origin.code}>
                {origin.code} - {origin.fullName}
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
              (option?.value?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {destinations.map((destination) => (
              <Option key={destination.code} value={destination.code}>
                {destination.code} - {destination.fullName}
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

        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            style={{
              width: '100%',
              borderRadius: '8px',
              background: '#1890ff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px',
            }}
          >
            Search Flights
          </Button>

          <Button
            type="default"
            size="large"
            onClick={handleClearFilters}
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            Clear Filters
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
