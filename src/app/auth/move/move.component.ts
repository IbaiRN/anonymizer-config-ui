import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { getmovemodel } from './movemodel';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
  moveForm: FormGroup;
  isLoadingResults = false;
  //cont = 0;
  movemodel: getmovemodel[] = [];

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) {

  }

   getvalues(){
    let contador : number;
    contador=0;
    for(let refac of this.movemodel){
      this.rellenar(refac,contador);
      contador++;
    }
  }
   rellenar(mov: getmovemodel, contador:number){
    let datos = this.fb.group({
      originpath: [mov.originpath, Validators.required],
      targetpath: [mov.targetpath, Validators.required],
      name: [mov.name, Validators.required],
      id: [mov.id, Validators.required],
      activecheck:[mov.activecheck == 'A' ? true : false , Validators.required]

    });
    this.moveFormGroupItemsArray.insert(contador, datos);
}


  ngOnInit() {
    this.moveForm = this.fb.group({
          items: this.fb.array([this.createItem()])

        });
    this.authService.getmove().subscribe((res: getmovemodel[])=>{
        this.movemodel = res;
         this.getvalues();
    });

  }

    getget() {
        this.authService.getmove().subscribe((res: getmovemodel[]) => {
        this.movemodel = res;
        for(let refac of this.movemodel){
            $('#originpath').val(refac.originpath);
            $('#targetpath').val(refac.targetpath);
            $('#name').val(refac.name);
            $('#add').click();
        }
      });

    alert(this.movemodel[0]);
  }
  createItem() {
      return this.fb.group({
        originpath: ['', Validators.required],
        targetpath: ['', Validators.required],
        name:['', Validators.required],
        id:[, Validators.required]
      });
    }
  get moveFormGroupItemsArray(): FormArray {
      return this.moveForm.get('items') as FormArray;
    }

    removeItem(index) {
      this.moveFormGroupItemsArray.removeAt(index);
    }

  addFila(){

    let arrayControl = this.moveFormGroupItemsArray;
    let valuesform = arrayControl.getRawValue();
    let ulti = valuesform.length - 1;
    let valuesfila = valuesform[ulti];
    if((valuesfila.originpath) && (valuesfila.targetpath)){
      this.moveFormGroupItemsArray.push(this.createItem());

    }else{
      alert("Introduzca valores en los campos");
    }
}

  onFormSubmit() {
    let arrayControl = this.moveFormGroupItemsArray;
    let valuesform = arrayControl.getRawValue();
    let ulti = valuesform.length - 1;
    let valuesfila = valuesform[ulti];
    if(!((valuesfila.originpath) && (valuesfila.targetpath))){
      this.moveFormGroupItemsArray.removeAt(ulti);
    }

    this.authService.movePath(this.moveForm.value.items)
       .subscribe(res => {
         this.router.navigate(['move']);
         location.reload();
       }, (err) => {
         console.log(err);
         alert(err.error);
       });
       

   }

}