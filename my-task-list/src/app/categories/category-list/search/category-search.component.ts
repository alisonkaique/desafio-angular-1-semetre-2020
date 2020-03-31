import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PoSelectOption } from '@portinari/portinari-ui';

@Component({
    selector: 'app-category-search',
    templateUrl: './category-search.component.html'
})
export class CategorySearchComponent implements OnInit, OnDestroy {

    @Output() onTyping = new EventEmitter<string>();
    @Input() value = '';
    debounce: Subject<string> = new Subject<string>();

    option: PoSelectOption;
    options: Array<PoSelectOption>;
    event: string;
    searchBy: string;

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
      this.options = [];
      this.option = { label: undefined, value: undefined };
      this.option.label = 'Título';
      this.option.value = 1;

      this.options.push(this.option);

      this.option = { label: undefined, value: undefined };
      this.option.label = 'Categoria';
      this.option.value = 2;

      this.options.push(this.option);

      this.option = { label: undefined, value: undefined };
      this.option.label = 'Data Limite';
      this.option.value = 3;

      this.options.push(this.option);
    }

    changeEvent(event: string) {
      this.event = event;
    }
}