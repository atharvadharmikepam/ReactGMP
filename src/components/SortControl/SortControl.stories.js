import SortControl from './SortControl';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

export default {
  title: 'Components/SortControl',
  component: SortControl,
  tags: ['autodocs'],
  argTypes: {
    selectedSort: {
      control: 'select',
      options: ['releaseDate', 'title'],
      description: 'Currently selected sort option'
    },
    onSortChange: {
      action: 'sortChanged',
      description: 'Callback when sort option changes'
    }
  },
  args: {
    selectedSort: 'releaseDate',
    onSortChange: () => {}
  }
};

const Template = (args) => <SortControl {...args} />;

export const Default = Template.bind({});

export const TitleSelected = Template.bind({});
TitleSelected.args = {
  selectedSort: 'title'
};

export const InteractiveExample = Template.bind({});
InteractiveExample.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const select = canvas.getByRole('combobox');

  await expect(select).toHaveValue(args.selectedSort);

  await userEvent.selectOptions(select, 'title');
  await expect(args.onSortChange).toHaveBeenCalledWith('title');
  await expect(select).toHaveValue('title');

  await userEvent.selectOptions(select, 'releaseDate');
  await expect(args.onSortChange).toHaveBeenCalledWith('releaseDate');
  await expect(select).toHaveValue('releaseDate');
};

export const AccessibilityTest = Template.bind({});
AccessibilityTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  const label = canvas.getByText('Sort by');
  const select = canvas.getByRole('combobox');
  await expect(label).toHaveAttribute('for', select.id);
};

export const EdgeCases = Template.bind({});
EdgeCases.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how the component handles various edge cases'
    }
  }
};
EdgeCases.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const select = canvas.getByRole('combobox');

  await userEvent.selectOptions(select, 'title');
  await userEvent.selectOptions(select, 'releaseDate');
  await userEvent.selectOptions(select, 'title');
  await expect(args.onSortChange).toHaveBeenCalledTimes(3);
};