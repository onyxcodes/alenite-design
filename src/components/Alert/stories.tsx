import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default {
  title: 'Commons/Alert',
  component: Alert,
  args: {
    visible: true,
    showClose: true
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
  cover: <Icon name='info'/>,
  children: <div className='message'>This is an info alert</div>
}
Info.argTypes = {

};

export const Prompt = Template.bind({});
Prompt.args = {
  cover: <Icon name='question'/>,
  children: <>
    <div className='message'>This is an prompt alert. Lorem ipsum dolor etcetera andiamo avnati consi finche mo non finisco lo spazio per farelo stare su una sola riga</div>
    <div className='buttons'>
      <Button>Yes</Button>
      <Button>No</Button>
    </div>
  </>
};

export const ImageCover = Template.bind({});
ImageCover.args = {
  cover: <img src='//upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg' />,
  children:<div className='message'>This is an warning alert</div>
};
