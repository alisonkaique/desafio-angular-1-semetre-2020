import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PoDialogService } from '@portinari/portinari-ui';
import { TaskService } from 'src/app/tasks/task/task.service';

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html'
})
export class CategoryDetailsComponent implements OnInit {

    category$: Observable<Category>;
    categoryId: number;
    categoryColor: string;
    foundColor = {label: undefined, value: undefined};

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private taskService: TaskService,
        private router: Router,
        private alertService: AlertService,
        private poDialog: PoDialogService
    ) {

    }

    ngOnInit(): void {
        const categoryColorList = [
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

        this.route.params.subscribe(params => {
            this.categoryId = this.route.snapshot.params.categoryId;
            this.category$ = this.categoryService.findById(this.categoryId);

            this.category$
                .subscribe((category) => {
                    this.foundColor = categoryColorList.find(x => x.value == category.color);
                },
                err => {
                    this.router.navigate(['not-found']);
                });
          });
    }

    remove() {
        this.taskService
            .listFromCategoryPaginated(this.categoryId, 1)
                .subscribe(
                    (tasks) => {
                        if (tasks.length > 0) {
                            this.poDialog
                                .alert({
                                    title: 'Impossível Excluir',
                                    message: 'Foram encontradas Tarefas vinculadas a esta Categoria, portanto a exclusão será abortada.'
                                });
                        } else {
                            this.poDialog.confirm({
                                title: 'Exclusão de Categoria',
                                message: 'Confirma a Exclusão?',
                                confirm: () => (this.removeCategory()),
                                cancel: () => (console.log('clicou em cancelar'))
                            });
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
    }

    removeCategory() {
        this.categoryService
            .removeCategory(this.categoryId)
            .subscribe(
                () => {
                    this.alertService.success('Categoria Excluida com Sucesso', true);
                    this.router.navigate(['', 'categories'], { replaceUrl: true });
                },
                err => {
                    console.log(err);
                    this.alertService.warning('Não foi possível excluir a Categoria');
                }
            );
    }
}
