import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [NgIf, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  submitted = false;

  form = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 4000);
    this.form = { firstName: '', lastName: '', email: '', subject: '', message: '' };
  }
}