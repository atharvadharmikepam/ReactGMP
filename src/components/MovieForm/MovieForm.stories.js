import React from 'react';
import MovieForm from './MovieForm';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
    initialData: {
      control: {
        type: 'object',
        fields: {
          title: { control: 'text' },
          releaseDate: { control: 'date' },
          url: { control: 'text' },
          genre: { 
            control: 'select',
            options: ['', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror']
          },
          rating: { control: 'text' },
          runtime: { control: 'text' },
          overview: { control: 'text' }
        }
      }
    }
  }
};

const Template = (args) => <MovieForm {...args} />;

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  initialData: {},
};

export const PrefilledForm = Template.bind({});
PrefilledForm.args = {
  initialData: {
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
    url: 'https://www.imdb.com/title/tt0111161/',
    genre: 'Drama',
    rating: '9.3',
    runtime: '142',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  }
};

export const PartialData = Template.bind({});
PartialData.args = {
  initialData: {
    title: 'Inception',
    genre: 'Action',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  }
};

export const WithValidationErrors = Template.bind({});
WithValidationErrors.decorators = [
  (Story) => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Story />
      <div style={{ marginTop: '20px', color: 'red' }}>
        Note: This story demonstrates how the form might look with validation errors (would require additional validation logic in the component)
      </div>
    </div>
  )
];
WithValidationErrors.args = {
  initialData: {
    title: '',
    releaseDate: 'invalid-date',
    url: 'not-a-url',
    rating: '11'
  }
};