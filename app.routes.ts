import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LoginComponent } from './login/login.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import { FifthComponent } from './fifth/fifth.component';
import { SixthComponent } from './sixth/sixth.component';
import { SeventhComponent } from './seventh/seventh.component';
import { EightComponent } from './eight/eight.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
    {
        path : "", component : StarterComponent
    },
    {
        path : "main", component : MainMenuComponent
    },
    {
        path : "login", component : LoginComponent
    },
    {
        path : "first", component : FirstComponent
    },
    {
        path : "second", component : SecondComponent
    },
    {
        path : "third", component : ThirdComponent
    },
    {
        path : "fourth", component : FourthComponent
    },
    {
        path : "fifth", component : FifthComponent
    },
    {
        path : "sixth", component : SixthComponent
    },
    {
        path : "seventh", component : SeventhComponent
    },
    {
        path : "eight", component : EightComponent
    },
    {
        path : "success", component : SuccessComponent
    }
];
