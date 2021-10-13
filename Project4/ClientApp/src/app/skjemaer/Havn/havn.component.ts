import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-havn",
  templateUrl: "havn.component.html"
})
export class HavnComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      havnId: ["", Validators.required],
      navn: ["", Validators.required]


    });
  }

  onSubmit() {

  }
}
