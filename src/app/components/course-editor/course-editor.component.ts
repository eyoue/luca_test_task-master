import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data/data.service";
import {Course} from "../../models/course.model";
import {ContentsItemType} from "../../models/contents-item-type.enum";
import {DurationUnit} from "../../models/duration-unit.enum";
import {AbstractControl, FormArray, FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, switchMap, take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {DateRange} from "../../models/data-range.model";

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit, OnDestroy {
  form = this._fb.group({
    name: this._fb.control(""),
    author: this._fb.group({
      firstName: this._fb.control(""),
      lastName: this._fb.control("")
    }),
    contents: this._fb.array([]),
    plans: this._fb.array([]),
    duration: this._fb.group({ value: undefined, unit: undefined }),
    sales: this._fb.group({
      start: '',
      end: '',
    }),
  })
  duration = DurationUnit;
  contentsItemType = ContentsItemType;
  id: string = '';
  defaultContest = { name: "", type: ContentsItemType.lesson };
  defaultAdvantage = {
    available: false,
    title: ""
  }
  defaultPlan = {
    name: "",
    price: 0,
    advantages: [],
  }
  unsub$: Subject<any> = new Subject<any>()

  constructor(
    private dataService: DataService,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.dataService.courses$.pipe(take(1)).subscribe(
      courses => {
        const course = courses.find(el => el.id === this.id);
        if (course) {
          this.buildForm(course)
        } else {
            alert('Course not fined');
            this.router.navigate(['editor'])
        }
      }
    )
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete()
  }

  get contests(): FormArray {
    return (<FormArray>this.form.get('contents'))
  }

  get plans(): FormArray {
    return (<FormArray>this.form.get('plans'));
  }

  advantages(control: AbstractControl): FormArray {
    return (<FormArray>control.get('advantages'));
  }

  removeFromArray(array: FormArray, index: number): void {
    array.removeAt(index)
  }

  addIntoArray(array: FormArray, item: any): void {
    array.push(this._fb.group(item))
  }

  goBack(): void {
    history.back()
  }

  private buildForm(data: Course): void {
    this.form.patchValue({...data, sales: this.dateToStr(data.sales)})

    let contents = this.form.get('contents') as FormArray;
    let plans = this.form.get('plans') as FormArray;

    data.contents.forEach(el => contents.push(this._fb.group(el)))
    data.plans.forEach(el => {
      const control = this._fb.group({...el,
        advantages: this._fb.array(el.advantages?.map(el => this._fb.group(el)) || [])
      });
      plans.push(control)
    });
    this.form.valueChanges
      .pipe(
        switchMap(data => {
          return this.dataService.updateCourse(this.id, {...data, sales: this.strToDate(data.sales)})
        }),
        catchError(err => {
          alert(err)
          throw err
        }),
        takeUntil(this.unsub$)
      )
      .subscribe();
  }

  private dateToStr(date: DateRange | undefined): {start: string, end: string} {
    return  {
      start: date?.start?.toISOString().slice(0, -1) || '',
      end: date?.end?.toISOString().slice(0, -1) || '',
    }
  }

  private strToDate(date: {start: string, end: string}): DateRange {
    const dateParser = (date: string) => {
      return new Date(date + 'Z');
    }
    return {
      start: new Date(dateParser(date?.start)),
      end: new Date(dateParser(date?.end)),
    }
  }
}
