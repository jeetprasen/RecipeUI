import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { LoadingSpinnerComponent } from './loading-spinner';
storiesOf('Card', module)
  .add('empty', () => ({
    component: LoadingSpinnerComponent,
    props: {}
  }))
  .add('with title', () => ({
    component: LoadingSpinnerComponent,
    props: {
      title: 'Hello card!'
    }
  }))
  .add('with title and subtitle', () => ({
    component: LoadingSpinnerComponent,
    props: {
      title: 'Hello card!',
      subtitle: 'Well hello there 👋'
    }
  }))
  .add('with action', () => ({
    component: LoadingSpinnerComponent,
    props: {
      title: 'A card...',
      subtitle: 'Waiting to be clicked-on',
      btnClicked: action('👊 Button was clicked')
    }
  }))
;