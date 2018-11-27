import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '@app/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService) { }

 ngOnInit() {
   this.createForm();
  }

  private createForm() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required , Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required , Validators.minLength(6)]]
    }, {validator: this.checkPasswords});

    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', [Validators.required]],
    //   lastName: ['', [Validators.required]],      
    //   email: ['', [Validators.required, Validators.email ]],
    //   passwordFormGroup: this.passwordFormGroup
    // });

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],      
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required , Validators.minLength(6)]]
    }, {validator: this.checkPasswords});
    this.markFormGroupTouched(this.registerForm);
  }

  register() {
    const formErrors = this.validateForm(this.registerForm, '');
    if (!formErrors) {
      console.log("Registering user ...");

      // this.presentLoading();

      const newUser = this.registerForm.value;
      this.authService.registerUser(newUser);
    } else {
      console.log(formErrors);
      console.log('Form error');
      // console.log(this.registerForm.get('password').hasError('required'));
      // console.log(this.registerForm.get('password').errors);
      // console.log(this.registerForm.controls);
      this.alertService.presentErrorAlert(`${Object.values(formErrors)[0][0]}`);
    }
    
  }

  validateForm(formGroup: FormGroup, errorsparam) {

    let formErrors = null;
    if (!this.registerForm.valid) {
      formErrors = {};
      for (const formControlKey of Object.keys(formGroup.controls)) {
        const formControl = formGroup.controls[formControlKey];
        if ((formControl.dirty || formControl.touched) && !formControl.valid) {
          const error = formControl.errors
          formErrors[formControlKey] = this.mapErrors(formControl.errors)
        }
        
      }
    }
    return formErrors;
  }

  public mapErrors(formErrors) {
      const errors = {
        required: '{{field}} must not be blank',
        email: 'Invalid email',
        minlength: '{{field}} must be at least 6 characters',
        notSamePassword: 'not same password'
      }

    return Object.keys(formErrors).map((error)=>{
      return errors[error];
    })
  }
  
  public markFormGroupTouched(formGroup: FormGroup) {
    for (const formControlKey of Object.keys(formGroup.controls)) {
      const formControl = formGroup.controls[formControlKey];
      formControl.markAsTouched();
    }
  }

  checkPasswords(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      console.log(password);
      console.log(confirmPassword);
      control.get('confirmPassword').setErrors({notSamePassword: true});
      return { notSamePassword: true };
    }
    return null;
  }  
}
