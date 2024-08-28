// app/components/CookieConsent.js
'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Typography, Space } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('userConsent');
        if (!consent) {
            setIsVisible(true);  // Show the modal if no consent is stored
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('userConsent', 'accepted');
        setIsVisible(false);
        loadGoogleAnalytics();  // Load Google Analytics after accepting
    };

    const handleReject = () => {
        localStorage.setItem('userConsent', 'rejected');
        setIsVisible(false);
    };

    const loadGoogleAnalytics = () => {
        const script1 = document.createElement('script');
        script1.src = `https://www.googletagmanager.com/gtag/js?id=G-WDHE8EHYZ8`;
        script1.async = true;
        document.body.appendChild(script1);

        script1.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WDHE8EHYZ8', { 'anonymize_ip': true });
        };
    };

    return (
        <Modal
            visible={isVisible}
            title={<div><InfoCircleOutlined style={{ marginRight: 8 }} /> Cookie Consent</div>}
            onCancel={handleReject}
            centered
            footer={[
                <Button key="reject" onClick={handleReject} shape="round" style={{ backgroundColor: '#f5222d', color: '#fff', borderColor: '#f5222d' }}>
                    Reject
                </Button>,
                <Button key="accept" type="primary" shape="round" icon={<CheckCircleOutlined />} onClick={handleAccept}>
                    Accept
                </Button>,
            ]}
            bodyStyle={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}
        >
            <Space direction="vertical">
                <Text>This site uses cookies to improve your experience.</Text>
                <Text>By clicking "Accept", you agree to our use of cookies.</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    You can change your cookie preferences at any time in your browser settings.
                </Text>
            </Space>
        </Modal>
    );
}
