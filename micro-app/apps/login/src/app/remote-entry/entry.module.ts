import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { remoteRoutes } from './entry.routes';
import { RemoteEntryComponent } from './entry.component';
import { FormsModule } from '@angular/forms';
// import { NxWelcomeComponent } from './nx-welcome.component';


@NgModule({
    declarations: [RemoteEntryComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(remoteRoutes),
    ]
})
export class RemoteEntryModule {}
