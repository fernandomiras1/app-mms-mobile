import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/ingresos/ingresos.component';
import { ingresosType } from 'src/app/shared/model/ingresos.model';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss']
})
export class ListSelectComponent implements OnInit {

  filteredOptions: Observable<any[]>;
  form: FormGroup;
  type = ingresosType;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ListSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        search: ['']
      });

      this.filteredOptions = this.form.get('search').valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.data.options.slice())
      );
    }

    private _filter(name: string): any[] {
      const filterValue = name.toLowerCase();

      return this.data.options.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
    }

}
