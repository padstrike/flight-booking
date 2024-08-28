// components/HeaderSearch.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker, Select, Typography } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import { useFlightStore } from '../store/flightStore';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface HeaderSearchProps {
    onSearch: (values: any) => void;
    loading: boolean;
}

export default function HeaderSearch({ onSearch, loading }: HeaderSearchProps) {
    const [form] = Form.useForm();
    const [origins, setOrigins] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<string[]>([]);
    const { flights } = useFlightStore();

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const uniqueOrigins = Array.from(new Set(flights.map((flight: any) => flight.origin)));
                const uniqueDestinations = Array.from(new Set(flights.map((flight: any) => flight.destination)));

                setOrigins(uniqueOrigins);
                setDestinations(uniqueDestinations);
            } catch (error) {
                console.error('Error fetching airports:', error);
            }
        };

        fetchAirports();
    }, []);

    const onFinish = (values: any) => {
        onSearch(values);
    };

    return (
        <div className="header-search-container">
            <Form form={form} layout="inline" onFinish={onFinish} className="header-search-form">
                <Form.Item name="origin" rules={[{ required: true, message: 'Select origin' }]}>
                    <Select
                        placeholder="Origin"
                        style={{ minWidth: 150 }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        className="header-search-select"
                    >
                        {origins.map((origin) => (
                            <Option key={origin} value={origin}>
                                {origin}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <SwapRightOutlined className="swap-icon" />
                <Form.Item name="destination" rules={[{ required: true, message: 'Select destination' }]}>
                    <Select
                        placeholder="Destination"
                        style={{ minWidth: 150 }}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        className="header-search-select"
                    >
                        {destinations.map((destination) => (
                            <Option key={destination} value={destination}>
                                {destination}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="dates" rules={[{ required: true, message: 'Select dates' }]}>
                    <RangePicker style={{ minWidth: 250 }} className="header-search-range-picker" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="header-search-button">
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
