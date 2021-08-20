import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() deleteUser = new EventEmitter<String>();
  @Input() user!: User;
  @Input() selectedLanguage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  goToDelete() {
    this.deleteUser.emit(this.user._id);
  }

  /**
   * Method for close a modal
   */
  closeModal() {
    this.close.emit(true);
  }

}
