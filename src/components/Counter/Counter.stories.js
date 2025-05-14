import Counter from './Counter';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: {
        type: 'number',
        min: -100,
        max: 100,
        step: 1
      },
      description: 'The starting value for the counter'
    },
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

const Template = (args) => <Counter {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialValue: 0
};

export const NegativeStart = Template.bind({});
NegativeStart.args = {
  initialValue: -5
};

export const PositiveStart = Template.bind({});
PositiveStart.args = {
  initialValue: 10
};

export const InteractiveExample = Template.bind({});
InteractiveExample.args = {
  initialValue: 3
};
InteractiveExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  const incrementButton = canvas.getByRole('button', { name: /increase count/i });
  const decrementButton = canvas.getByRole('button', { name: /decrease count/i });
  const countDisplay = canvas.getByText('Count: 3');
  
  await expect(countDisplay).toHaveTextContent('Count: 3');
  
  await userEvent.click(incrementButton);
  await expect(countDisplay).toHaveTextContent('Count: 4');
  
  await userEvent.click(decrementButton);
  await expect(countDisplay).toHaveTextContent('Count: 3');
  
  await userEvent.click(incrementButton);
  await userEvent.click(incrementButton);
  await userEvent.click(incrementButton);
  await expect(countDisplay).toHaveTextContent('Count: 6');
};

export const CustomStyled = Template.bind({});
CustomStyled.args = {
  initialValue: 0
};
CustomStyled.parameters = {
  docs: {
    description: {
      story: 'This example shows how the counter looks with custom styling applied through Storybook parameters.'
    }
  }
};