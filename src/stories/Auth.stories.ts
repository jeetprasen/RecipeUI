import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner';
import { ServiceConstants } from 'src/app/shared/service-constants';

export default {
    title: 'Example/Auth Component',
    component: AuthComponent,
    decorators: [
        moduleMetadata({
            declarations: [AlertComponent, LoadingSpinnerComponent],
            imports: [
                HttpClientModule,
                RouterModule.forRoot([], { useHash: true }),
                FormsModule
            ],
            providers: [{provide: APP_BASE_HREF, useValue : '/' }, ServiceConstants],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
        })
    ]
} as Meta;

const Template: Story<AuthComponent> = (args: AuthComponent) => ({
    component: AuthComponent,
    props: args,
});

export const defaultLogin = Template.bind({});
defaultLogin.args = {
    error: ''
};

export const withErrorMessage = Template.bind({});
withErrorMessage.args = {
    error: 'User Not found'
};

export const withLoadingEnabled = Template.bind({});
withLoadingEnabled.args = {
    error: '',
    isLoading: true,
    isLoginMode: true
};

export const nonLoginMode = Template.bind({});
nonLoginMode.args = {
    error: '',
    isLoading: false,
    isLoginMode: false
};