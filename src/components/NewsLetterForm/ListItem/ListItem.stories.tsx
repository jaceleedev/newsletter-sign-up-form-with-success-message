import type { Meta, StoryObj } from '@storybook/react';

import ListItem from './ListItem';

const meta = {
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'Text to be displayed in the ListItem',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '327px',
        }}
      >
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Product discovery and building what matters',
  },
};

export const MultipleListItems: Story = {
  render: () => (
    <>
      <ListItem content="Product discovery and building what matters" />
      <ListItem content="Measuring to ensure updates are a success" />
      <ListItem content="And much more!" />
    </>
  ),
  args: {
    content: '',
  },
};
