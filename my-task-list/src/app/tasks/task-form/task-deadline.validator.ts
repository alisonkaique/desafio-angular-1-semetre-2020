import { ValidatorFn, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

export const taskDeadLineValidator: ValidatorFn = (formGroup: FormGroup) => {
    const deadline = formGroup.get('deadLine').value;

    if (deadline) {
        const localDate = new Date(deadline);
        const localTime = localDate.getTime();
        const localOffset = localDate.getTimezoneOffset() * 60000;
        const newDeadline = new Date(localTime + localOffset);
        const actualDate = new Date();

        if (newDeadline && actualDate) {
            return formatDate(actualDate, 'yyyy-MM-dd', 'en-US') <= formatDate(newDeadline, 'yyyy-MM-dd', 'en-US')
            ? null
            : { taskDeadLineValidator: true};
        } else {
            return null;
        }
    } else {
        return null;
    }
}
