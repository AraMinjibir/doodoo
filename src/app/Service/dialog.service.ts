import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../Utility/dialog/dialog.component'; 
import { Observable } from 'rxjs';
import { DialogData } from '../Modal/dialog-data'; 

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  showDialog(
    message: string,
    title: string,
    confirmText?: string,
    cancelText?: string
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message, confirmText, cancelText } as DialogData, 
    });

    return dialogRef.afterClosed(); 
  }
}