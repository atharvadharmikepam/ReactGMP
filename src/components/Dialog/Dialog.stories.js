import React from 'react';
import Dialog from './Dialog';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    title: { control: 'text' },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
};

const Template = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Dialog',
  children: 'This is the content of the default dialog. Click outside or the close button to dismiss.',
};

export const WithFormContent = Template.bind({});
WithFormContent.args = {
  title: 'Login Form',
  children: (
    <form>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username:</label>
        <input id="username" type="text" style={{ width: '100%', padding: '0.5rem' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
        <input id="password" type="password" style={{ width: '100%', padding: '0.5rem' }} />
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Login
      </button>
    </form>
  ),
};

export const LongContent = Template.bind({});
LongContent.args = {
  title: 'Terms and Conditions',
  children: (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <h3>1. Introduction</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
      
      <h3>2. User Obligations</h3>
      <p>Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
      
      <h3>3. Privacy Policy</h3>
      <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
      
      <h3>4. Limitation of Liability</h3>
      <p>Nunc vitae purus non augue scelerisque ultricies vitae vel velit. Sed vitae lectus id sem lobortis scelerisque. Praesent eget consequat libero.</p>
    </div>
  ),
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  title: '',
  children: 'This dialog has no title. The close button is still present in the top-right corner.',
};