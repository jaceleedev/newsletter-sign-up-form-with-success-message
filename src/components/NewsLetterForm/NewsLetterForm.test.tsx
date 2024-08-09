import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import NewsLetterForm from './NewsLetterForm';
import { FormStatus, useFormState, useFormStatus } from 'react-dom';

expect.extend(toHaveNoViolations);

vi.mock('react-dom', async () => {
  return {
    useFormState: vi.fn(),
    useFormStatus: vi.fn().mockReturnValue({ pending: false }),
  };
});

const mockOnAction = vi.fn();
const mockUseFormState = vi.mocked(useFormState);

describe('NewsLetterForm', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // 1. Rendering test
  it('renders correctly with all expected elements', () => {
    mockUseFormState.mockReturnValueOnce([
      { success: false, error: false, message: '' },
      vi.fn(),
      false,
    ]);
    render(<NewsLetterForm onAction={mockOnAction} />);
    expect(screen.getByText('Stay updated!')).toBeDefined();
    expect(screen.getByLabelText('Email address')).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Subscribe to monthly newsletter' })
    ).toBeDefined();
  });

  // 2. Form submission test
  it('submits the form with valid email', async () => {
    mockUseFormState.mockReturnValue([
      {
        success: true,
        error: false,
        message: 'Mock subscription successful',
      },
      vi.fn(),
      false,
    ]);
    render(<NewsLetterForm onAction={mockOnAction} />);
    const emailInput = screen.getByLabelText('Email address');
    const submitButton = screen.getByRole('button', {
      name: 'Subscribe to monthly newsletter',
    });
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(useFormState).toHaveBeenCalledOnce();
    });
  });

  // 3. Error handling test
  it('shows error message for invalid email', async () => {
    mockUseFormState.mockReturnValue([
      { success: false, error: true, message: 'Valid email required' },
      vi.fn(),
      false,
    ]);
    render(<NewsLetterForm onAction={mockOnAction} />);
    const emailInput = screen.getByLabelText('Email address');
    const submitButton = screen.getByRole('button', {
      name: 'Subscribe to monthly newsletter',
    });
    await userEvent.type(emailInput, 'invalid-test@example.com');
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Valid email required')).toBeDefined();
    });
  });

  // 4. State change test
  it('disables submit button while form is submitting', () => {
    mockUseFormState.mockReturnValueOnce([
      { success: false, error: true, message: 'Valid email required' },
      vi.fn(),
      false,
    ]);
    vi.mocked(useFormStatus).mockReturnValueOnce({
      pending: true,
    } as FormStatus);
    render(<NewsLetterForm onAction={mockOnAction} />);
    const submitButton = screen.getByRole('button', { name: 'Processing...' });
    expect(submitButton).toHaveProperty('disabled', true);
    expect(submitButton.getAttribute('aria-busy')).toBe('true');
  });

  // 5. Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(<NewsLetterForm onAction={mockOnAction} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('Responsive Design Tests', () => {
    const originalInnerWidth = window.innerWidth;
    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
      window.dispatchEvent(new Event('resize'));
    });

    // 6. Mobile view test
    it('renders correctly in mobile view', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      window.dispatchEvent(new Event('resize'));
      render(<NewsLetterForm onAction={mockOnAction} />);
      const mobileImage = screen.getAllByAltText('')[0];
      expect(mobileImage.className).contain('lg:hidden');
    });

    // 7. Desktop view test
    it('renders correctly in desktop view', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      window.dispatchEvent(new Event('resize'));
      render(<NewsLetterForm onAction={mockOnAction} />);
      const desktopImage = screen.getAllByAltText('')[4];
      expect(desktopImage.className).contain('rounded-2xl');
    });
  });
});
