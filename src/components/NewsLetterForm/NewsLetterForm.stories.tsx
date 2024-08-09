import type { Meta, StoryObj } from '@storybook/react';

import NewsLetterForm from './index';
import { expect, fn, userEvent, within } from '@storybook/test';

const meta = {
  component: NewsLetterForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onAction: fn(),
  },
} satisfies Meta<typeof NewsLetterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockAction = fn(async (prevState: any, formData: FormData) => {
  const email = formData.get('email') as string;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (email === 'test@example.com') {
    return {
      success: true,
      error: false,
      message: 'Mock Subscription successful',
    };
  } else {
    return {
      success: false,
      error: true,
      message: 'Mock Valid email required',
    };
  }
});

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByPlaceholderText('email@company.com');
    await expect(emailInput).toBeInTheDocument();
    await userEvent.type(emailInput, 'test@example.com', { delay: 100 });
    expect(emailInput).toHaveValue('test@example.com');
  },
};

export const SubmittedForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByPlaceholderText('email@company.com');
    await userEvent.type(emailInput, 'test@example.com', { delay: 100 });
    const submitButton = canvas.getByRole('button', {
      name: /Subscribe to monthly newsletter/i,
    });
    await userEvent.click(submitButton, { delay: 1000 });
    await expect(mockAction).toHaveBeenCalledOnce();
    const result = await mockAction.mock.results[0].value;
    expect(result.message).toBe('Mock Subscription successful');
  },
  args: {
    onAction: mockAction,
  },
};

export const InvalidSubmittedForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByPlaceholderText('email@company.com');
    await userEvent.type(emailInput, 'invalid@example.com', { delay: 100 });
    const submitButton = canvas.getByRole('button', {
      name: /Subscribe to monthly newsletter/i,
    });
    await userEvent.click(submitButton);
    const result = await mockAction.mock.results[0].value;
    expect(result.message).toBe('Mock Valid email required');
  },
  args: {
    onAction: mockAction,
  },
};
