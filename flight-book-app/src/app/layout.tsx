'use client';

import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/reset.css'; // Ant Design reset CSS
import './globals.css'; // Global styles

const { Header, Content, Footer } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Content
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  );
}
