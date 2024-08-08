import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Input from './Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  // 1. Rendering test
  it('renders correctly', () => {
    render(
      <Input
        id="rendering-test"
        label="Rendering test"
        isValid={true}
        errorMessage="Rendering message"
      />
    );
    const input = screen.getByLabelText('Rendering test');
    expect(input).toBeDefined();
  });

  // 2. Props test
  it('applies correct attributes', () => {
    render(
      <Input
        id="props-test"
        label="Props test"
        type="email"
        isValid={true}
        errorMessage="Props test"
        placeholder="Props message"
      />
    );
    const input = screen.getByLabelText('Props test');
    expect(input).toHaveProperty('id');
    expect(input).toHaveProperty('type');
    expect(input).toHaveProperty('placeholder');
  });

  // 3. Styles test
  it('applies the correct styles', () => {
    render(
      <Input
        id="styles-test"
        label="Styles test"
        isValid={true}
        errorMessage="Styles message"
      />
    );
    const input = screen.getByLabelText('Styles test');
    expect(input.className).toContain('text-body');
    expect(input.className).toContain('w-full');
    expect(input.className).toContain('h-14');
    expect(input.className).toContain('rounded-lg');
  });

  // 4. error styles test
  it('applies invalid styles when isValid prop is false', () => {
    render(
      <Input
        id="error-styles-test"
        label="Error styles test"
        isValid={false}
        errorMessage="Error styles message"
      />
    );
    const input = screen.getByLabelText('Error styles test');
    expect(input.className).toContain('focus:text-vermellion');
    expect(input.className).toContain('focus:border-vermellion');
    expect(input.className).toContain('bg-vermellion');
    expect(screen.getByText('Error styles message')).toBeDefined();
  });

  // 4. State change test
  it('shows error message when invalid', () => {
    render(
      <Input
        id="invalid-test"
        label="Invalid test"
        isValid={false}
        errorMessage="Invalid message"
      />
    );
    const errorMessage = screen.getByText('Invalid message');
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveProperty('role');
  });

  // 5. Behavior test
  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="behavior-test"
        label="Behavior test"
        isValid={true}
        errorMessage="Behavior message"
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText('Behavior test');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledOnce();
  });

  // 6. Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Input
        id="accessibility"
        label="Accessibility test"
        isValid={true}
        errorMessage="Accessibility message"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // 7. Snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Input
        id="snapshot"
        label="Snapshot test"
        isValid={true}
        errorMessage="Snapshot message"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
