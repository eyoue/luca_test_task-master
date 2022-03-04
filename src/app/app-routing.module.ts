import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseEditorComponent} from "./components/course-editor/course-editor.component";
import {CoursesListComponent} from "./components/courses-list/courses-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/editor", pathMatch: "full" },
  {
    path: "editor",
    component: CoursesListComponent
  },
  { path: "editor/:id", component: CourseEditorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
