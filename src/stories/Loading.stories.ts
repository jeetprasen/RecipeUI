import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner';

export default {
    title: 'Example/Loading Spinner Component',
    component: LoadingSpinnerComponent,
    decorators: [
        moduleMetadata({
            declarations: [LoadingSpinnerComponent],
            imports: [],
            providers: []
        })
    ]
} as Meta;

const Template: Story<LoadingSpinnerComponent> = (args: LoadingSpinnerComponent) => ({
    template: `<div style="text-align: center;"><app-loading-spinner></app-loading-spinner></div>`,
    props: args,
});

export const simple = Template.bind({});
simple.args = {
    error: ''
};
