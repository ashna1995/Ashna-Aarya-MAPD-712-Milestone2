import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import CriticalPatientsScreen from '../screens/CriticalPatientsScreen';

// Mock the axios module
jest.mock('axios');

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

describe('CriticalPatientsScreen', () => {
  it('renders correctly and fetches critical patients', async () => {
    // Mock the API response
    const mockPatients = [
      { _id: '1', name: 'John Doe', age: 65, gender: 'Male' },
      { _id: '2', name: 'Jane Smith', age: 72, gender: 'Female' },
    ];
    axios.get.mockResolvedValue({ data: mockPatients });

    const { getByText, queryByText } = render(<CriticalPatientsScreen navigation={mockNavigation} />);

    // Initially, it should show a loading state or empty list
    expect(queryByText('No critical patients')).toBeTruthy();

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://10.0.2.2:5000/api/patients/critical');
    });

    // Check if patient names are rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();

    // Check if patient details are rendered
    expect(getByText('65 years old • Male')).toBeTruthy();
    expect(getByText('72 years old • Female')).toBeTruthy();
  });
});