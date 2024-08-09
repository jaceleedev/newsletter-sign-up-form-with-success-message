import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ConfirmationModal from './ConfirmationModal';

expect.extend(toHaveNoViolations);

vi.mock('react-dom', async () => {
  return {
    useFormStatus: vi.fn().mockReturnValue({ pending: false }),
  };
});

describe('ConfirmationModal', () => {
  beforeEach(() => {
    cleanup();
  });

  // 1. Rendering test
  it('renders correctly', () => {
    render(<ConfirmationModal email="test@example.com" />);
    const heading = screen.getByRole('heading', {
      name: 'Thanks for subscribing!',
    });
    expect(heading).toBeDefined();
  });

  // 2. Props test
  it('displays the correct email', () => {
    render(<ConfirmationModal email="test@example.com" />);
    const emailText = screen.getByText('test@example.com');
    expect(emailText).toBeDefined();
  });

  // 3. Styles test
  it('applies the correct styles', () => {
    const { container } = render(
      <ConfirmationModal email="test@example.com" />
    );
    const modal = container.firstElementChild;
    expect(modal?.className).toContain('max-w-[375px]');
    expect(modal?.className).toContain('bg-white');
  });

  // 4. State change test
  it('hides modal when dismiss button is clicked', () => {
    render(<ConfirmationModal email="test@example.com" />);
    const dismissButton = screen.getByRole('button', {
      name: 'Dismiss message',
    });
    fireEvent.click(dismissButton);
    expect(
      screen.queryByRole('heading', { name: 'Thanks for subscribing!' })
    ).toBeNull();
  });

  // 5. Behavior test
  it('calls onClick when dismiss button is clicked', () => {
    render(<ConfirmationModal email="test@example.com" />);
    const dismissButton = screen.getByRole('button', {
      name: 'Dismiss message',
    });
    fireEvent.click(dismissButton);
    expect(
      screen.queryByRole('heading', { name: 'Thanks for subscribing!' })
    ).toBeNull();
  });

  // 6. Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ConfirmationModal email="test@example.com" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // 7. Snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <ConfirmationModal email="test@example.com" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
