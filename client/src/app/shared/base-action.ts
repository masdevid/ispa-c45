import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { HelpersService } from "../services/helpers.service";
import { BaseCrudService } from "../services/base-crud.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-base-action',
  template: ``,
})

export class BaseActionComponent<T> implements OnInit, OnDestroy {
  get f(){
    return this.form.controls
  }
  public unsubs = new Subject();
  public form: FormGroup;
  dataSource!: T;
  query: any;
  redirectTo!: string;
  subject!: string;
  errors: string[] = []
  sourceImage: any;
  isLoading = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public helpers: HelpersService,
    public service: BaseCrudService<T>,
    public fb: FormBuilder,
    public sb: MatSnackBar
    ) {
      this.checkQueryParam();
    }
    createForm(): void {
      this.form = this.fb.group(this.defaultForm());
      this.setForm();
    }
    defaultForm(){
      return {}
    }
    ngOnInit(): void {

    }
    setForm(){
      if (this.dataSource) {
        this.form.patchValue(this.dataSource)
      }
      setTimeout(() => {
        this.afterSetForm()
      });
    }
    afterSetForm(): void {

    }
    checkQueryParam(): void {
      this.activatedRoute.queryParams.subscribe(query => {
        this.query = query;
      });
      this.service.getById(this.query.id)
      .subscribe(data => {
        this.dataSource = data;
        this.setForm()
      })
    }

    onSubmit(): void {
      if (this.form.valid) {
        if (this.query.m === 'add') {
          this.insert();
        } else {
          this.update();
        }
      }
    }

    onBack(isBack = true): void {
      if (isBack) {
        this.router.navigate([`../../${this.redirectTo}`], {
          relativeTo: this.activatedRoute
        });
      }
    }

    beforeSave(): T {
      return this.form.value;
    }

    insert(): void {
      this.isLoading = true;
      const data = this.beforeSave();
      this.service.create(data).subscribe(() => {
        this.onSuccess()
      }, err => this.onError(err))
    }
    update(): void {
      this.isLoading = true;
      const data = this.beforeSave();
      this.service.updateById(this.query.id, data).subscribe(() => {
        this.onSuccess()
      }, err => {
        this.onError(err)
      })
    }
    onSuccess(): void {
      this.isLoading = false;
      this.sb.open(`saved!`,'', {duration:5000});
      this.onBack();
    }

    onError(err: any): void {
      this.isLoading = false
      this.sb.open(err.error.message, '', {duration: 5000});
    }

    handleImageChange(event: any, imageFormName: string): void {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => this.sourceImage = reader.result;
        reader.readAsDataURL(file);
        this.form.get(imageFormName)?.setValue(file);
      }
    }

    convertToFormDataFormat(data: any): FormData {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        let value;
        if (typeof data[key] == 'boolean') {
          value = data[key] ? 1 : 0;
        } else {
          value = data[key] ? data[key] : '';
        }
        formData.append(key, value);
      });
      return formData;
    }

    ngOnDestroy(): void {
      this.unsubs.next('');
      this.unsubs.complete();
    }
  }
