import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../task/task';
import { formatDate } from '@angular/common';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    transform(tasks: Task[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if (descriptionQuery) {
            if (descriptionQuery.includes('|title|')) {
                console.log('Pesquisa por titulo');
                descriptionQuery = descriptionQuery.substr(7);

                if (descriptionQuery) {
                    return tasks
                    .filter(task =>
                        task.description.toLowerCase().includes(descriptionQuery)
                    );
                }
            } else if (descriptionQuery.includes('|category|')) {
                console.log('Pesquisa por categoria');
                descriptionQuery = descriptionQuery.substr(10);

                if (descriptionQuery) {
                    return tasks
                        .filter(task =>
                            task.category.toLowerCase().includes(descriptionQuery)
                        );
                }
            } else if (descriptionQuery.includes('|deadline|')) {
                console.log('Pesquisa por data limite');
                descriptionQuery = descriptionQuery.substr(10);

                if (descriptionQuery) {
                    return tasks
                        .filter(task =>
                            task.deadLine.toString().substr(0, 10) <= descriptionQuery
                        );
                }
            } else if (descriptionQuery.includes('|status|')) {
                console.log('Pesquisa por status');

                const actualDate = new Date();

                descriptionQuery = descriptionQuery.substr(8);

                if (descriptionQuery) {
                    if (descriptionQuery == '1') { // Abertas
                        return tasks
                        .filter(task => {
                            return task.status.toString().includes(descriptionQuery) &&
                                formatDate(task.deadLine, 'yyyy-MM-dd', 'en-US') >= formatDate(actualDate, 'yyyy-MM-dd', 'en-US')
                        }
                        );
                    } else if (descriptionQuery == '2') { // Concluídas
                        return tasks
                        .filter(task =>
                            task.status.toString().includes(descriptionQuery)
                        );
                    } else { // Vencidas
                        return tasks
                        .filter(task => {
                            return formatDate(task.deadLine, 'yyyy-MM-dd', 'en-US') < formatDate(actualDate, 'yyyy-MM-dd', 'en-US')
                        }
                        );
                    }
                }
            } else {
                return tasks;
            }

            if (!descriptionQuery) {
                return tasks;
            }
        } else {
            return tasks;
        }
    }

}