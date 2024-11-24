import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import PatientHistoryScreen from '../screens/PatientHistoryScreen';

// Mock axios
jest.mock('axios');

describe('PatientHistoryScreen', () => {
  const mockRoute = {
    params: { patientId: '123' }
  };

  it('renders patient history after loading', async () => {
    const mockHistory = {
      patient: {
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        address: '123 Main St',
        phoneNumber: '555-1234'
      },
      tests: [
        { _id: '1', type: 'Blood Pressure', value: '120/80', date: '2024-11-23T00:00:00.000Z' }
      ]
    };

    axios.get.mockResolvedValueOnce({ data: mockHistory });

    const { getByText, queryByTestId } = render(<PatientHistoryScreen route={mockRoute} />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('30 years old • Male')).toBeTruthy();
      expect(getByText('123 Main St')).toBeTruthy();
      expect(getByText('555-1234')).toBeTruthy();
      expect(getByText('Blood Pressure')).toBeTruthy();
      expect(getByText('120/80')).toBeTruthy();
    });
  });
});