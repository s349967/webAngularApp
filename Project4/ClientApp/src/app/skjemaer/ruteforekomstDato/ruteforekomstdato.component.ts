import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RuteforekomstDato } from "../../Models-typescript/ruteforekomstdato";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-ruteforekomstdato",
  templateUrl: "ruteforekomstdato.component.html"
})
export class RuteforekomstdatoComponent {

  Skjema: FormGroup;
  public ruteforekomstdatoer: Array<RuteforekomstDato>;
  submitState: string;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      forekomstDatoId: [""],
      avgangsDato: ["", Validators.required],
      ruteId: ["", Validators.required],
      erUtsolgt: ["", Validators.required]
    });
  }

  lagreForekomstDato() {

    const ruteforekomstdato = new RuteforekomstDato();
    ruteforekomstdato.forekomstDatoId = 1;
    ruteforekomstdato.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdato.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdato.erUtsolgt = this.Skjema.value.erUtsolgt;


    this._http.post("admin/lagreRuteforekomstdato", ruteforekomstdato).subscribe((res) => {
      this.hentAlleRuteforekomstdatoer();
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      forekomstDatoId: this.ruteforekomstdatoer[index].forekomstDatoId,
      avgangsDato: this.ruteforekomstdatoer[index].avgangsDato,
      ruteId: this.ruteforekomstdatoer[index].ruteId,
      erUtsolgt: this.ruteforekomstdatoer[index].erUtsolgt,

    });

  }

  reset() {

    this.Skjema.reset();
  }

  ngOnInit() {
    this.hentAlleRuteforekomstdatoer();
  }


  multipleSubmit(state: string, toSend) {

    if (state.localeCompare("endre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "endre", "Vil du endre?", null);
      }
    }
    else if (state.localeCompare("lagre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "lagre", "Vil du lagre?", null);
      }
    }
    else if (state.localeCompare("slett") == 0) {
      this.visModal("Ja", "Nei", "slett", "Vil du slette?", toSend);
    }


  }
  visModal(knapp1Tekst: string, knapp2Tekst: string, infoTitle: string, infoBody: string, toSend) {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });


    modalRef.componentInstance.knapp1 = knapp1Tekst;
    modalRef.componentInstance.knapp2 = knapp2Tekst
    modalRef.componentInstance.infoTitle = infoTitle;
    modalRef.componentInstance.infoBody = infoBody;

    modalRef.result.then(retur => {
      if (retur == 'ja') {
        if (infoTitle == "slett") {

        }
        else if (infoTitle == "lagre") {
          this.lagreForekomstDato();
        }
        else if (infoTitle == "endre") {
          this.endreForekomstDato();
        }
      }
      else {

      }
    });
  }
  endreForekomstDato() {

    const ruteforekomstdato = new RuteforekomstDato();
    ruteforekomstdato.forekomstDatoId = this.Skjema.value.forekomstDatoId;
    ruteforekomstdato.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdato.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdato.erUtsolgt = this.Skjema.value.erUtsolgt;


    this._http.post("admin/endreRuteforekomstdato", ruteforekomstdato).subscribe((res) => {
      this.hentAlleRuteforekomstdatoer();
    });
  }
  hentAlleRuteforekomstdatoer() {
    this.laster = "Laster inn...";
    this._http.get<RuteforekomstDato[]>("admin/hentRuteforekomstdatoer").subscribe((res) => {
      this.ruteforekomstdatoer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

