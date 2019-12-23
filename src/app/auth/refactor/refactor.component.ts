import { Component, OnInit } from '@angular/core';
import { getrefactormodel } from './refactormodel';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
@Component({
  selector: 'app-refactor',
  templateUrl: './refactor.component.html',
  styleUrls: ['./refactor.component.scss']
})
export class RefactorComponent implements OnInit {
  refactorForm: FormGroup;
  isLoadingResults = false;
  refactormodel: getrefactormodel[] = [];
  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }
  getvalues(){
    let contador : number;
 contador=0;
    for(let refac of this.refactormodel){
             this.rellenar(refac,contador);
             contador++;
         }
    }
    rellenar(refac: getrefactormodel, contador:number){
      let datos= this.fb.group({
           word_to_rename: [refac.word_to_rename, Validators.required],
           renowned_word: [refac.renowned_word, Validators.required],
           name:[refac.name, Validators.required],
           id:[refac.id, Validators.required],
           activecheck:[refac.activecheck == 'A' ? true : false , Validators.required]
         });
       this.refactorFormGroupItemsArray.insert(contador,datos);
   }
ngOnInit() {
   this.refactorForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    this.authService.getrefactor().subscribe((res : getrefactormodel[])=>{
      this.refactormodel = res;
      this.getvalues();
    });
  }
  // ngDoCheck(){
  // }
createItem() {
    return this.fb.group({
      word_to_rename: ['', Validators.required],
      renowned_word: ['', Validators.required],
      name:['', Validators.required],
      id:[, Validators.required],
      activecheck:['', Validators.required]
    });
  }
get refactorFormGroupItemsArray(): FormArray {
    return this.refactorForm.get('items') as FormArray;
  }
  removeItem(index) {
    this.refactorFormGroupItemsArray.removeAt(index);
  }
addFila(){
  let arrayControl = this.refactorFormGroupItemsArray;
  let valuesform = arrayControl.getRawValue();
  let ulti=valuesform.length-1;
  let valuesfila= valuesform[ulti];
  if((valuesfila.word_to_rename)&&(valuesfila.renowned_word)&&(valuesfila.name)){
    this.refactorFormGroupItemsArray.push(this.createItem());
  }else{
    alert("Introduzca valores en los campos");
  }
}
onFormSubmit() {
  let arrayControl = this.refactorFormGroupItemsArray;
  let valuesform = arrayControl.getRawValue();
  let ulti=valuesform.length-1;
  let valuesfila= valuesform[ulti];
if(!((valuesfila.word_to_rename)&&(valuesfila.renowned_word)&&(valuesfila.name))){
      this.refactorFormGroupItemsArray.removeAt(ulti);
    }
    this.authService.refactor(this.refactorForm.value.items)
       .subscribe(res => {
         this.router.navigate(['refactor']);
         location.reload();
       }, (err) => {
         console.log(err);
         alert(err.error);
       });
   }
  }

