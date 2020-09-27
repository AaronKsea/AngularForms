import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  restrictedUsernames = ['Anju','Ranju'];

  signupForm: FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup(
      {
        'formUserData' : new FormGroup({
          'username': new FormControl(null, [Validators.required, this.UserNameRestriction.bind(this)]) ,
          'email': new FormControl(null, [Validators.required, Validators.email],this.EmailRestriction.bind(this))
        }),
        'gender': new FormControl('female'),
        'hobbies': new FormArray([])
      })
      // this.signupForm.valueChanges.subscribe(

      //   (value) => {
      //     console.log(value);
      //   }
      // )

      this.signupForm.statusChanges.subscribe(
        (status) => {
          console.log(status);
        }
      )

    // this.signupForm.setValue(
    //   {
    //     'formUserData': {
    //       'username': 'Purur',
    //       'email': 'kscae20@gmail.com'
    //     },
    //     'gender': 'male',
    //     'hobbies': []
    //   }
    // );

    this.signupForm.patchValue(
      {
        'formUserData': {
          'username': 'Purur'
        }
      }
    );
  }

  OnSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset(
      {'gender':'male'}
    );
  }

  OnAddHobby(){
    const hobbyControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobbyControl);
  }


  UserNameRestriction(controls: FormControl): { [s: string]: boolean } {
    if(this.restrictedUsernames.indexOf(controls.value) !== -1){
      return {'name_restricted': true} //if return object then treated as error,error will be logged in form control
    }
    return null;//null is treated as valid entry
  }

  EmailRestriction(control: FormControl): Promise<any>| Observable<any>{
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if(control.value === 'test@gmail.com'){
              resolve({'email_restricted': true})
            }
            else{
              resolve(null);
            }
          },1500
        )

      }
    )
    return promise;

  }

}
