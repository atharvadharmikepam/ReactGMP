import SearchForm from './SearchForm';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  argTypes: {
    initialQuery: {
      control: 'text',
      description: 'Initial search query value'
    },
    onSearch: {
      action: 'searchExecuted',
      description: 'Callback when search is performed'
    }
  },
  args: {
    initialQuery: '',
    onSearch: () => {}
  }
};

const Template = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});

export const WithInitialQuery = Template.bind({});
WithInitialQuery.args = {
  initialQuery: 'Initial search'
};

export const InteractiveExample = Template.bind({});
InteractiveExample.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  const button = canvas.getByRole('button');

  await expect(input).toHaveValue(args.initialQuery);

  await userEvent.type(input, 'test query');
  await userEvent.click(button);
  await expect(args.onSearch).toHaveBeenCalledWith('test query');

  await userEvent.clear(input);
  await userEvent.click(button);
  await expect(args.onSearch).toHaveBeenCalledTimes(1);

  await userEvent.type(input, 'new query{enter}');
  await expect(args.onSearch).toHaveBeenCalledWith('new query');
  await expect(args.onSearch).toHaveBeenCalledTimes(2);
};

export const EdgeCases = Template.bind({});
EdgeCases.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');

  await userEvent.type(input, '   {enter}');
  await expect(args.onSearch).not.toHaveBeenCalled();

  const longQuery = 'a'.repeat(100);
  await userEvent.type(input, `${longQuery}{enter}`);
  await expect(args.onSearch).toHaveBeenCalledWith(longQuery);
};