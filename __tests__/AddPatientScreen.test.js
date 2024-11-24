import React from 'react';
import { render } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatientScreen';

describe('AddPatientScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddPatientScreen navigation={{}} />);

    // Check if input fields and button are rendered
    expect(getByPlaceholderText("Enter patient's name")).toBeTruthy();
    expect(getByPlaceholderText("Enter patient's age")).toBeTruthy();
    expect(getByText('Add Patient')).toBeTruthy();
  });

  it('renders medical history input', () => {
    const { getByPlaceholderText } = render(<AddPatientScreen navigation={{}} />);

    // Check if medical history input is present
    expect(getByPlaceholderText('Enter medical history (comma-separated)')).toBeTruthy();
  });
});