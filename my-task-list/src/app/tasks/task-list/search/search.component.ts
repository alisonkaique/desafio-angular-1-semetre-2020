import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PoSelectOption } from '@portinari/portinari-ui';
import { UserService } from 'src/app/core/user/user.service';
import { CategoryService } from 'src/app/categories/category/category.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() onTyping = new EventEmitter<string>();
    @Input() value = '';
    debounce: Subject<string> = new Subject<string>();

    option: PoSelectOption;
    options: Array<PoSelectOption>;
    categoryOption: PoSelectOption;
    categories: Array<PoSelectOption>;
    searchCombo = 1;
    dateFilter = '';
    category = 0;
    status: 0;
    statusList: Array<PoSelectOption>;

    constructor(
      private userService: UserService,
      private categoryService: CategoryService
    ) {

    }

    ngOnInit(): void {

        this.addOptions();

        this.debounce
          .pipe(debounceTime(300))
          .subscribe(filter => this.onTyping.emit(filter));
      }

    ngOnDestroy(): void {
      this.debounce.unsubscribe();
    }

    addOptions() {
      const searchList: Array<PoSelectOption> = [
        { label: 'Título'     , value: 1 },
        { label: 'Categoria'  , value: 2 },
        { label: 'Data Limite', value: 3 },
        { label: 'Status'     , value: 4 }
      ];

      this.options = searchList;
    }

    changeSearch() {

      this.debounce.next('');

      if (this.searchCombo == 2) {

        const userName = this.userService.getUserName();

        this.categories = [];

        this.categoryService
          .listFromUser(userName)
            .subscribe(
              (categories) => {
                categories.map(category => {
                  this.categoryOption = {label: category.description, value: category.id};
                  this.categories.push(this.categoryOption);
                }
                );
              },
              (err) => {
                console.log(err);
              }
            );
      } else if (this.searchCombo == 4) {
        this.statusList = [
          { label: 'Aberta'   , value: 1 },
          { label: 'Concluída', value: 2 },
          { label: 'Vencida'  , value: 3 }
        ];
      }
    }

    changeDate() {
      this.debounce.next('|deadline|' + this.dateFilter);
    }

    changeCategory() {
      const foundCategory = this.categories.find(x => x.value == this.category);

      this.debounce.next('|category|' + foundCategory.label);
    }

    changeStatus() {
      const foundStatus = this.statusList.find(x => x.value == this.status);

      this.debounce.next('|status|' + foundStatus.value);
    }
}
