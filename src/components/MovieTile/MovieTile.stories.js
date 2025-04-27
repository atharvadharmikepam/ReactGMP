import MovieTile from './MovieTile';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

export default {
  title: 'Components/MovieTile',
  component: MovieTile,
  tags: ['autodocs'],
  argTypes: {
    movie: {
      control: {
        type: 'object',
        fields: {
          imageUrl: { control: 'text' },
          title: { control: 'text' },
          year: { control: 'text' },
          genres: { control: 'object' }
        }
      },
      description: 'Movie data object'
    },
    onClick: {
      action: 'tileClicked',
      description: 'Callback when tile is clicked'
    }
  },
  args: {
    movie: {
      imageUrl: 'https://via.placeholder.com/300x450',
      title: 'The Shawshank Redemption',
      year: '1994',
      genres: ['Drama']
    },
    onClick: () => {}
  }
};

const Template = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});

export const MultipleGenres = Template.bind({});
MultipleGenres.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/300x450',
    title: 'Inception',
    year: '2010',
    genres: ['Action', 'Sci-Fi', 'Thriller']
  }
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/300x450',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001',
    genres: ['Adventure', 'Fantasy']
  }
};

export const InteractiveExample = Template.bind({});
InteractiveExample.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const tile = canvas.getByRole('article');
  const menuButton = canvas.getByRole('button', { name: '⋮' });

  await userEvent.click(tile);
  await expect(args.onClick).toHaveBeenCalled();

  await userEvent.click(menuButton);
  const editButton = canvas.getByRole('button', { name: 'Edit' });
  await expect(editButton).toBeVisible();

  await userEvent.click(document.body);
  await expect(editButton).not.toBeVisible();

  await userEvent.click(menuButton);
  const deleteButton = canvas.getByRole('button', { name: 'Delete' });
  await userEvent.click(deleteButton);
  await expect(editButton).not.toBeVisible();
};

export const MissingImage = Template.bind({});
MissingImage.args = {
  movie: {
    imageUrl: '',
    title: 'No Image Movie',
    year: '2023',
    genres: ['Mystery']
  }
};
MissingImage.parameters = {
  docs: {
    description: {
      story: 'Shows fallback behavior when image is missing'
    }
  }
};

export const EmptyGenres = Template.bind({});
EmptyGenres.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/300x450',
    title: 'Untitled Movie',
    year: '2023',
    genres: []
  }
};