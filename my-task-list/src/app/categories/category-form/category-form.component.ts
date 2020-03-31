import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { finalize } from 'rxjs/operators';
import { PoSelectOption } from '@portinari/portinari-ui';
import { Category } from '../category/category';
import { CategoryNotTakenValidatorService } from './category-not-taken.validator.service';

const API_URL = 'http://localhost:3000'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  providers: [
    CategoryNotTakenValidatorService
  ]
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  @ViewChild('descriptionInput', null) descriptionInput: ElementRef<HTMLInputElement>;

  option: PoSelectOption;
  options: Array<PoSelectOption>;
  color: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryNotTakenService: CategoryNotTakenValidatorService,
    private categoryService: CategoryService,
    private router: Router,
    private alertService: AlertService
  ) { }

  private clickCancel() {
    this.router.navigate(['', 'categories']);
  };

  ngOnInit() {

    this.addOptions();

    this.categoryForm = this.formBuilder.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.categoryNotTakenService.checkCategoryToken() // validadores assíncronos
      ],
      color: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  addOptions() {

    const badgeColorList: Array<PoSelectOption> = [
      { label: 'Ciano'             , value: 'po-color-01' },
      { label: 'Azul Ciano'        , value: 'po-color-02' },
      { label: 'Azul'              , value: 'po-color-03' },
      { label: 'Azul Magenta'      , value: 'po-color-04' },
      { label: 'Magenta'           , value: 'po-color-05' },
      { label: 'Magenta Escuro'    , value: 'po-color-06' },
      { label: 'Vermelho'          , value: 'po-color-07' },
      { label: 'Castanho'          , value: 'po-color-08' },
      { label: 'Amarelo Esverdeado', value: 'po-color-09' },
      { label: 'Verde'             , value: 'po-color-10' },
      { label: 'Verde Ciano'       , value: 'po-color-11' },
      { label: 'Verde Persa'       , value: 'po-color-12' },
    ];

    this.options = badgeColorList;
  }

  changeColor() {

  }

  upload() {
    const newCategory = this.categoryForm.getRawValue() as Category;

    this.categoryService
      .upload(newCategory)
      .pipe(finalize(() => {
        this.router.navigate(['', 'categories']);
      }))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.Response) {
          this.alertService.success('Categoria Cadastrada com Sucesso ', true);
        }
      },
      err => {
        console.log(err);
        this.alertService.danger('Não foi possível cadastrar a Categoria', true);
      });
  }

}
