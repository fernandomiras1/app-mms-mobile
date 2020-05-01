import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/ingresos/ingresos.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss']
})
export class ListSelectComponent implements OnInit {

  filteredOptions: Observable<any[]>;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ListSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    form: FormGroup;
    ngOnInit(): void {
     console.log(this.data);
    this.form = this.fb.group({
      search: ['']
    });

    this.filteredOptions = this.form.get('search').valueChanges
    .pipe(
      startWith(''),
      tap(x => console.log(x)),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.data.options.slice())
    );
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    displayFn(user: any): string {
      return user && user.name ? user.name : '';
    }

    private _filter(name: string): any[] {
      const filterValue = name.toLowerCase();

      return this.data.options.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
    }

}
