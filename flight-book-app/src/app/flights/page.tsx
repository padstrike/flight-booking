'use client';

import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { Spin, Alert } from 'antd-v5';
import { useFlightStore } from '../store/flightStore';
import { useFlights } from '../hooks/useFlights';
import api from '../utils/api';

// Lazy load components
const HeaderSearch = lazy(() => import('../components/HeaderSearch'));
const SearchForm = lazy(() => import('../components/SearchForm'));
const FlightResults = lazy(() => import('../components/FlightResults'));

export default function FlightSearchPage() {
  const { flights, loading, error, setFlights, setLoading, setError } = useFlightStore();
  const [isMobile, setIsMobile] = useState(false);

  useFlights(); // Custom hook for fetching flights

  // Handle resize event to set isMobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768); // Set initial value
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Handle search function using useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback(async (values: { origin: string; destination: string }) => {
    try {
      setLoading(true);
      const response = await api.get(`/flights/search?origin=${values.origin}&destination=${values.destination}`);
      setFlights(response.data);
      setError(null);
    } catch (error) {
      console.error('Error searching flights:', error);
      setError('Failed to fetch flight data');
    } finally {
      setLoading(false);
    }
  }, [setFlights, setLoading, setError]);

  // Render loading spinner or error message
  const renderLoadingOrError = () => (
    <>
      {loading && <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert message="Error" description={error} type="error" showIcon style={{ margin: '20px' }} />}
    </>
  );

  return (
    <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}>
      <div className={isMobile ? 'mobile-container' : 'desktop-container'}>
        {isMobile ? (
          <>
            <HeaderSearch onSearch={handleSearch} loading={loading} />
            {renderLoadingOrError()}
            <FlightResults flights={flights} />
          </>
        ) : (
          <div className="desktop-layout">
            <div className="search-form">
              <SearchForm onSearch={handleSearch} loading={loading} />
            </div>
            <div className="flight-results">
              {renderLoadingOrError()}
              <FlightResults flights={flights} />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
