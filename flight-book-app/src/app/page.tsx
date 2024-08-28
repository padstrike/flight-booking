"use client";

import React from "react";
import { Button, Typography, Layout, Row, Col, Card } from "antd";
import { useRouter } from "next/navigation";
import { DollarOutlined, ThunderboltOutlined, CustomerServiceOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
  const router = useRouter();

  const navigateToFlight = () => {
    router.push("/flights");
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Hero Section */}
      <Content
        style={{
          padding: "80px 20px",
          backgroundImage: "linear-gradient(120deg, #1F2937 0%, #4B5563 100%)",
          color: "#fff",
        }}
      >
        <Row justify="center" align="middle" style={{ textAlign: "center", marginBottom: "50px" }}>
          <Col span={24}>
            <Title level={1} style={{ color: "#fff", fontSize: "48px", fontWeight: "bold" }}>
              Book Your Next Adventure
            </Title>
            <Text type="secondary" style={{ fontSize: "18px", color: "#E5E7EB" }}>
              Discover the best deals on flights to your favorite destinations. Let us help you plan your perfect trip.
            </Text>
            <div style={{ margin: "40px 0" }}>
              <Button
                type="primary"
                size="large"
                onClick={navigateToFlight}
                style={{
                  backgroundColor: "#3B82F6",
                  borderColor: "#3B82F6",
                  borderRadius: "8px",
                  fontSize: "16px",
                  padding: "10px 20px",
                }}
              >
                Explore Flights
              </Button>
            </div>
          </Col>
        </Row>
      </Content>

      {/* Features Section */}
      <Content style={{ padding: "60px 20px", backgroundColor: "#F9FAFB" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px", color: "#1F2937" }}>
          Why Choose Us?
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <DollarOutlined style={{ fontSize: "36px", color: "#3B82F6" }} />
              <Title level={3} style={{ marginTop: "20px" }}>
                Best Prices
              </Title>
              <Text>We compare prices across hundreds of airlines to find the best deals for you.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <ThunderboltOutlined style={{ fontSize: "36px", color: "#3B82F6" }} />
              <Title level={3} style={{ marginTop: "20px" }}>
                Fast Booking
              </Title>
              <Text>Book your flights quickly and securely with our easy-to-use platform.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <CustomerServiceOutlined style={{ fontSize: "36px", color: "#3B82F6" }} />
              <Title level={3} style={{ marginTop: "20px" }}>
                Customer Support
              </Title>
              <Text>Our 24/7 customer support team is here to assist you with any queries.</Text>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Testimonials Section */}
      <Content style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px", color: "#1F2937" }}>
          What Our Customers Say
        </Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <Text style={{ fontStyle: "italic" }}>
                "Flight Booker made planning my vacation so easy! I found great deals in minutes."
              </Text>
              <br />
              <Text strong>- Sarah W.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <Text style={{ fontStyle: "italic" }}>
                "The customer service was outstanding. They helped me every step of the way."
              </Text>
              <br />
              <Text strong>- John D.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              bordered={false}
              style={{ textAlign: "center", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              hoverable
            >
              <Text style={{ fontStyle: "italic" }}>
                "I'll definitely be using Flight Booker again. Highly recommend!"
              </Text>
              <br />
              <Text strong>- Emily R.</Text>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: "center", backgroundColor: "#1F2937", color: "#fff", padding: "40px 20px" }}>
        <Row justify="center">
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#fff" }}>Flight Booker</Title>
            <Text type="secondary" style={{ color: "#E5E7EB" }}>©2024 All Rights Reserved.</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>Quick Links</Title>
            <Text type="secondary">
              <a href="/about" style={{ color: "#E5E7EB" }}>About Us</a> |{" "}
              <a href="/contact" style={{ color: "#E5E7EB", marginLeft: "10px" }}>Contact</a> |{" "}
              <a href="/terms" style={{ color: "#E5E7EB", marginLeft: "10px" }}>Terms of Service</a>
            </Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
