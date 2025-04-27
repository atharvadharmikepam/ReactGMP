import GenreSelect from './GenreSelect';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

export default {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  tags: ['autodocs'],
  argTypes: {
    genres: {
      control: { type: 'object' },
      description: 'Array of genre strings to display'
    },
    selectedGenre: {
      control: { type: 'text' },
      description: 'Currently selected genre'
    },
    onSelect: {
      action: 'genreSelected',
      description: 'Callback when a genre is selected'
    }
  },
  args: {
    genres: ['All', 'Documentary', 'Comedy', 'Horror', 'Sci-Fi'],
    selectedGenre: 'All'
  }
};

const Template = (args) => <GenreSelect {...args} />;

export const Default = Template.bind({});

export const WithComedySelected = Template.bind({});
WithComedySelected.args = {
  selectedGenre: 'Comedy'
};

export const CustomGenres = Template.bind({});
CustomGenres.args = {
  genres: ['Action', 'Drama', 'Romance', 'Thriller'],
  selectedGenre: 'Drama'
};

export const InteractiveExample = Template.bind({});
InteractiveExample.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const comedyButton = canvas.getByRole('button', { name: 'Comedy' });

  await expect(comedyButton).toHaveAttribute('aria-pressed', 'false');
  await userEvent.click(comedyButton);
  await expect(args.onSelect).toHaveBeenCalledWith('Comedy');
  await expect(comedyButton).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(comedyButton);
  await expect(args.onSelect).toHaveBeenCalledTimes(1);
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  genres: [],
  selectedGenre: ''
};
EmptyState.parameters = {
  docs: {
    description: {
      story: 'Shows how the component behaves with an empty genres array'
    }
  }
};