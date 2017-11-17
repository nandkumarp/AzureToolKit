import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { CommonServiceModule } from './common/common.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        CommonServiceModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'search', component: SearchComponent },
            { path: 'gallery', component: GalleryComponent  },
            { path: '**', redirectTo: 'home' }
        ])
       ]
})
export class AppModuleShared {
}
