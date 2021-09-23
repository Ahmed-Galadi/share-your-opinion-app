import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlPassword: string, matchingControlPassword: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[controlPassword];
    const matchingPassword = formGroup.controls[matchingControlPassword];
    if(matchingPassword.errors && !matchingPassword.errors.ConfirmedValidator) {
      return;
    }
    if(password.value !== matchingPassword.value) {
      matchingPassword.setErrors({ ConfirmedValidator: true });
    } else {
      matchingPassword.setErrors(null);
    }
  }
}
