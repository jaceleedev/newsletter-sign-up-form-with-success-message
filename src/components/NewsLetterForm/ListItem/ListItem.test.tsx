import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ListItem from './ListItem';

expect.extend(toHaveNoViolations);

describe('ListItem', () => {
  // 1. Rendering test
  it('renders correctly', () => {
    render(<ListItem content="Render test" />);
    const listItem = screen.getByText('Render test').closest('li');
    expect(listItem).toBeDefined();
  });

  // 2. Image rendering test
  it('renders the icon image', () => {
    render(<ListItem content="Image test" />);
    const listItem = screen.getByText('Image test').closest('li');
    const image = listItem?.querySelector('img');
    expect(image).toHaveProperty(
      'src',
      'http://localhost:3000/images/icon-list.svg'
    );
  });

  // 3. Styles test
  it('applies the correct styles', () => {
    render(<ListItem content="Styles test" />);
    const listItem = screen.getByText('Styles test').closest('li')!;
    expect(listItem.className).toContain('grid');
    expect(listItem.className).toContain('grid-cols-[21px_1fr]');
    expect(listItem.className).toContain('gap-4');
    expect(listItem.className).toContain('w-full');
  });

  // 4. Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ul>
        <ListItem content="Accessibility test" />
      </ul>
    );
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });

  // 5. Snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<ListItem content="Snapshot test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
