import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../Modal/dialog-data';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl:"./dialog.component.html",
  styleUrl: './dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData 
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}