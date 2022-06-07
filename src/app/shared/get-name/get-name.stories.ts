import { Meta, Story, storiesOf } from '@storybook/angular';
import { GetNameComponent } from './get-name.component';


export default {
    title: 'Get Name Component',
    component: GetNameComponent,
    argTypes: {
        propertyA: {
            options: ['Item One', 'Item Two'],
            control: { type: 'select' }, // automatically inferred when 'options' is defined
        },
        // propertyB: {
        //     options: ['Another Item One', 'Another Item Two', 'Another Item Three'],
        //     control: { type: 'radio'}
        // },
    },
} as Meta;

//👇 Some function to demonstrate the behavior
const someFunction = (valuePropertyA: String, valuePropertyB: String) => {
    // Makes some computations and returns something
};

const Template: Story = (args) => {
    const { propertyA, propertyB } = args;

    //👇 Assigns the function result to a variable
    const someFunctionResult = someFunction(propertyA, propertyB);

    return {
        props: {
            ...args,
            someProperty: someFunctionResult,
        },
    };
};

export const ExampleStory = Template.bind({});
ExampleStory.args = {
    propertyA: 'Item One',
    //propertyB: 'Another Item One',
    name: 'HelloThere',
    myEvent: 'New Event'
};


// ====================================================================
// storiesOf('Component A', module)
//     .add('Chris', () => ({
//         component: GetNameComponent,
//         props: {
//             name: 'Chris',
//             myEvent: action('Hello Chris!')
//         },
//     }))
//     .add('Jane', () => ({
//         component: GetNameComponent,
//         props: {
//             name: 'Jane',
//             myEvent: action('Hello Jane!')
//         },
//     }))
//     .add('Joe', () => ({
//         component: GetNameComponent,
//         props: {
//             name: 'Joe',
//             myEvent: action('Hello Joe!')
//         },
//     }));
// ====================================================================