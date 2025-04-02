import MovieDetails from './MovieDetails';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  tags: ['autodocs'],
  argTypes: {
    movie: {
      control: {
        type: 'object',
        fields: {
          imageUrl: { control: 'text' },
          title: { control: 'text' },
          year: { control: 'text' },
          rating: { control: 'text' },
          duration: { control: 'text' },
          description: { control: 'text' },
          genres: { control: 'object' }
        }
      },
      description: 'Complete movie details object'
    }
  },
  args: {
    movie: {
      imageUrl: 'https://via.placeholder.com/500x750',
      title: 'The Shawshank Redemption',
      year: '1994',
      rating: '9.3/10',
      duration: '2h 22min',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      genres: ['Drama']
    }
  }
};

const Template = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});

export const MultipleGenres = Template.bind({});
MultipleGenres.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/500x750',
    title: 'Inception',
    year: '2010',
    rating: '8.8/10',
    duration: '2h 28min',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genres: ['Action', 'Sci-Fi', 'Thriller']
  }
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/500x750',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001',
    rating: '8.8/10',
    duration: '2h 58min',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron. This epic tale follows their adventures through fantastical lands as they face numerous challenges and enemies while carrying the burden of the Ring that threatens to corrupt them all.',
    genres: ['Adventure', 'Fantasy']
  }
};

export const MissingImage = Template.bind({});
MissingImage.args = {
  movie: {
    imageUrl: '',
    title: 'No Image Available',
    year: '2023',
    rating: '7.5/10',
    duration: '1h 45min',
    description: 'This movie has no poster image available for display.',
    genres: ['Mystery']
  }
};

export const MinimalData = Template.bind({});
MinimalData.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/500x750',
    title: 'Minimal Data Movie',
    year: '',
    rating: '',
    duration: '',
    description: '',
    genres: []
  }
};

export const HighRating = Template.bind({});
HighRating.args = {
  movie: {
    imageUrl: 'https://via.placeholder.com/500x750',
    title: 'The Godfather',
    year: '1972',
    rating: '9.2/10',
    duration: '2h 55min',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genres: ['Crime', 'Drama']
  }
};