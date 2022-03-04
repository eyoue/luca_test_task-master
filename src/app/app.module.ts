import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ContentWithLabelComponent} from './components/content-with-label/content-with-label.component';
import {CourseEditorComponent} from "./components/course-editor/course-editor.component";
import {CoursesListComponent} from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseEditorComponent,
    ContentWithLabelComponent,
    CoursesListComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
