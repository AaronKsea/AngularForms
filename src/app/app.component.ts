import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') formElement : NgForm
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male','female'];
  submitted = false;
  userInfo = {
    username: '',
    email: '',
    gender: '',
    question: '',
    answer: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.formElement.setValue(
    //   {
    //     UserAndEmail:{
    //       username : suggestedName,
    //       email: ''
    //     },
    //     answer: 'dummy',
    //     secret: 'pet',
    //     gender: 'female'
    //   }
    // )
    this.formElement.form.patchValue({
        UserAndEmail:{
          username: suggestedName,
          email: 'kseapuru@20.com'
        }
    })
  }

  // OnSubmit(formElement: NgForm) {
  //   console.log(formElement);
    
  // }

  OnSubmit(){
    console.log(this.formElement);
    this.submitted = true;
    this.userInfo.username = this.formElement.value.UserAndEmail.username;
    this.userInfo.email = this.formElement.value.UserAndEmail.email;
    this.userInfo.answer = this.formElement.value.answer;
    this.userInfo.question = this.formElement.value.secret;
    this.userInfo.gender = this.formElement.value.gender;
    this.formElement.reset();
  }
}
