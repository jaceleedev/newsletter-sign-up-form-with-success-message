import type { Meta, StoryObj } from '@storybook/react';
import ConfirmationModal from './ConfirmationModal';

const meta = {
  component: ConfirmationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    email: {
      description: 'Email address to be displayed in the confirmation message',
      control: 'text',
    },
  },
} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'ash@loremcompany.com',
  },
};
