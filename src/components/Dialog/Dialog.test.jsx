import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dialog from './Dialog';

describe('Dialog Component', () => {
  const mockTitle = 'Test Dialog';
  const mockChildren = <div>Test Content</div>;
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders dialog with title and children', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('calls onClose when clicking the overlay', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    fireEvent.click(screen.getByTestId('dialog-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the dialog container', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    fireEvent.click(screen.getByTestId('dialog-container'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('calls onClose when clicking the close button', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    fireEvent.click(screen.getByRole('button', { name: /×/ }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('has proper accessibility attributes', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(mockTitle)).toBeInTheDocument();
  });
});