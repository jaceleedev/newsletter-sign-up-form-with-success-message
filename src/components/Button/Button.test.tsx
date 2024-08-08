import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';
import { FormStatus, useFormStatus } from 'react-dom';

expect.extend(toHaveNoViolations);

vi.mock('react-dom', async () => {
  return {
    useFormStatus: vi.fn().mockReturnValue({ pending: false }),
  };
});

describe('Button', () => {
  // 1. Rendering test
  it('renders correctly', () => {
    render(<Button type="submit" label="Render test" />);
    const button = screen.getByRole('button', { name: 'Render test' });
    expect(button).toBeDefined();
  });

  // 2. Props test
  it('applies correct type attribute', () => {
    render(<Button type="submit" label="Props test" />);
    const button = screen.getByRole('button', { name: 'Props test' });
    expect(button).toHaveProperty('type');
  });

  // 3. Styles test
  it('applies the correct styles', () => {
    render(<Button type="submit" label="Style test" />);
    const button = screen.getByRole('button', { name: 'Style test' });
    expect(button.className).toContain('text-body-bold');
    expect(button.className).toContain('text-white');
    expect(button.className).toContain('bg-dark-navy');
    expect(button.className).toContain('rounded-lg');
  });

  // 4. State change test
  it('changes label when pending', () => {
    vi.mocked(useFormStatus).mockReturnValueOnce({
      pending: true,
    } as FormStatus);
    render(<Button type="button" label="State change test" />);
    const button = screen.getByRole('button', { name: 'Processing...' });
    expect(button).toBeDefined();
  });

  // 5. Behavior test
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Button type="submit" label="Behavior test" onClick={handleClick} />
    );
    const button = screen.getByRole('button', { name: 'Behavior test' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  // 6. Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Button type="button" label="Accessibility test" />
    );
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });

  // 7. Snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Button type="submit" label="Snapshot test" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
