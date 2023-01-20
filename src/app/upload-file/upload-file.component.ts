import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  base64: string = "Choose a file and click on button below to show base64 here...";
  fileSelected?: Blob;
  imageUrl?: string = "../../assets/images/image.png";

  constructor(private _domSant: DomSanitizer) { }

  ngOnInit() {
  }

  onSelectNewFile(event: Event): void {
    if (!event.target) return;
    const target = event.target as HTMLInputElement;
    const files = target?.files as FileList;
    this.fileSelected = files[0];
    this.imageUrl = this._domSant.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.fileSelected)) as string;
  }

  convertFileToBase64(): void {
    let reader = new FileReader();
    if (this.fileSelected) {
      reader.readAsDataURL(this.fileSelected as Blob);
      reader.onloadend = () => { this.base64 = reader.result as string };
    }
  }
}
