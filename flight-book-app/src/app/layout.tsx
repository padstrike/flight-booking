'use client';

import React , {useEffect} from 'react';
import { Layout } from 'antd-v5';
import 'antd/dist/reset.css'; // Ant Design reset CSS
import './globals.css'; // Global styles
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ConsentBanner from './components/CookieConsent';

const { Header, Content, Footer } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
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
          <ConsentBanner />
        </body>
      </UserProvider>
    </html>
  );
}
