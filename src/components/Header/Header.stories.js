import React from 'react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#232323' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  argTypes: {
    onSearch: { action: 'search' },
    onAddMovie: { action: 'addMovie' },
  },
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  backgrounds: { default: 'dark' },
};

export const WithoutAddButton = Template.bind({});
WithoutAddButton.args = {
  onAddMovie: undefined,
};

export const WithLongSearch = Template.bind({});
WithLongSearch.args = {
  ...Default.args,
};
WithLongSearch.decorators = [
  (Story) => (
    <div style={{ minHeight: '400px' }}>
      <Story />
    </div>
  ),
];