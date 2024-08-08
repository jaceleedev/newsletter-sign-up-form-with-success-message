import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Unique identifier to link the label',
      control: 'text',
    },
    label: {
      description: 'Text label to be displayed above the input field',
      control: 'text',
    },
    isValid: {
      description: 'Boolean indicating whether the input value is invalid',
      control: 'boolean',
    },
    errorMessage: {
      description: 'Message to be displayed when an error occurs',
      control: 'text',
    },
  },
  args: {
    type: 'email',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '327px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '327px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'email',
    label: 'Email address',
    errorMessage: 'Valid email required',
    isValid: true,
    placeholder: 'email@company.com',
  },
};

export const Focused: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '327px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'email',
    label: 'Email address',
    isValid: true,
    errorMessage: 'Valid email required',
    value: 'ash@loremcompany.com',
  },
  parameters: {
    pseudo: { focus: true },
  },
};

export const Invalid: Story = {
  args: {
    id: 'email',
    label: 'Email address',
    isValid: false,
    errorMessage: 'Valid email required',
    value: 'ash#loremcompany.com',
  },
};
