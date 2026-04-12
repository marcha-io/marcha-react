import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { renderWithAntd } from '../../../test-utils';
import CreateListingForm from '../createListing/CreateListingForm';

const categories = [
  { id: 'cat-1', name: 'Electronics' },
  { id: 'cat-2', name: 'Furniture' },
];

const defaultProps = {
  categories,
  fileList: [] as any[],
  onFileListChange: jest.fn(),
  onSubmit: jest.fn(),
  submitting: false,
  uploading: false,
};

describe('CreateListingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    renderWithAntd(<CreateListingForm {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('What are you selling?')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        'Describe your item, including any details buyers should know'
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByText('Select category')).toBeInTheDocument();
    expect(screen.getByText('Select condition')).toBeInTheDocument();
  });

  it('renders the submit button with "Create Listing" text', () => {
    renderWithAntd(<CreateListingForm {...defaultProps} />);
    // Use getByText since antd's Button with loading prop uses a complex
    // structure that can cause jsdom selector issues with getByRole
    const button = screen.getByText('Create Listing');
    expect(button).toBeInTheDocument();
    expect(button.closest('button')).toHaveAttribute('type', 'submit');
  });

  it('shows "Uploading images..." when uploading is true', () => {
    renderWithAntd(<CreateListingForm {...defaultProps} uploading={true} />);
    expect(screen.getByText('Uploading images...')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithAntd(<CreateListingForm {...defaultProps} />);
    const submitButton = screen.getByText('Create Listing').closest('button')!;
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please enter a title')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText('Please enter a description')
      ).toBeInTheDocument();
    });
  });

  it('renders the upload area', () => {
    renderWithAntd(<CreateListingForm {...defaultProps} />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });
});
