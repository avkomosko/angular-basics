import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

type Coutries = 'ru' | 'by' | 'ua' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  form!: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([]),
    });
  }

  submit() {
    console.log('form', this.form);
    const formData = {...this.form.value};
    console.log('form data', formData);
  }

  setCapital() {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    };
    const cityKey : Coutries = this.form
    .get('address')?.get('country')?.value
    const city: string = cityMap[cityKey];
    this.form.patchValue({
      address: {city}
    })
  }

  getControls() {
    return (this.form.get('skills') as FormArray).controls;
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(control);
  }

}
