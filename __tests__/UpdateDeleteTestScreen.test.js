import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import UpdateDeleteTestScreen from '../screens/UpdateDeleteTestScreen';

// Mock axios
jest.mock('axios');

// Mock the navigation prop
const mockNavigation = {
  goBack: jest.fn(),
};

// Mock route params
const mockRoute = {
  params: { patientId: '123', testId: '456' },
};

describe('UpdateDeleteTestScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly and fetches test details', async () => {
    // Mock the API response for fetching test details
    axios.get.mockResolvedValueOnce({
      data: { type: 'Blood Pressure', value: '120/80' },
    });

    const { getByText, getByPlaceholderText } = render(
      <UpdateDeleteTestScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Wait for the component to fetch and render data
    await waitFor(() => {
      expect(getByText('Test Type *')).toBeTruthy();
      expect(getByText('Test Value *')).toBeTruthy();
      expect(getByPlaceholderText('Enter test value')).toBeTruthy();
      expect(getByText('Update Test')).toBeTruthy();
      expect(getByText('Delete Test')).toBeTruthy();
    });

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'http://10.0.2.2:5000/api/patients/123/tests/456'
    );
  });
});