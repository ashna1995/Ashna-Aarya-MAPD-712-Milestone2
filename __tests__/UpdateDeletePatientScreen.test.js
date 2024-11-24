import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import UpdateDeletePatientScreen from '../screens/UpdateDeletePatientScreen';

// Mock axios
jest.mock('axios');

// Mock the navigation prop
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

// Mock route params
const mockRoute = {
  params: { patientId: '123' },
};

describe('UpdateDeletePatientScreen', () => {
  it('renders correctly and fetches patient details', async () => {
    // Mock the API response for fetching patient details
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'John Doe',
        age: 30,
        gender: 'male',
        address: '123 Main St',
        phoneNumber: '555-1234',
        medicalHistory: ['Allergy', 'Hypertension'],
      },
    });

    const { getByText, getByDisplayValue } = render(
      <UpdateDeletePatientScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Wait for the component to fetch and render data
    await waitFor(() => {
      expect(getByText('Name *')).toBeTruthy();
      expect(getByText('Age *')).toBeTruthy();
      expect(getByText('Gender *')).toBeTruthy();
      expect(getByText('Address')).toBeTruthy();
      expect(getByText('Phone Number')).toBeTruthy();
      expect(getByText('Medical History')).toBeTruthy();
      expect(getByText('Update Patient')).toBeTruthy();
      expect(getByText('Delete Patient')).toBeTruthy();

      // Check if the fetched data is displayed
      expect(getByDisplayValue('John Doe')).toBeTruthy();
      expect(getByDisplayValue('30')).toBeTruthy();
      expect(getByDisplayValue('123 Main St')).toBeTruthy();
      expect(getByDisplayValue('555-1234')).toBeTruthy();
      expect(getByDisplayValue('Allergy, Hypertension')).toBeTruthy();
    });

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'http://10.0.2.2:5000/api/patients/123'
    );
  });
});