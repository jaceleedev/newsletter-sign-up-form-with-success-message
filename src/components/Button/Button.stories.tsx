import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Button type (button, submit, reset)',
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    label: {
      description: 'Text to be displayed on the button',
      control: 'text',
    },
  },
  args: {
    type: 'submit',
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '327px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Subscribe to monthly newsletter' },
};

export const Hovered: Story = {
  args: { label: 'Subscribe to monthly newsletter' },
  parameters: { pseudo: { hover: true } },
};

export const Pending: Story = {
  args: { label: 'Processing...', disabled: true },
};
