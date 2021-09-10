import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: File) {
    return new Promise<string>(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const storage = getStorage();
        const storageRef = ref(storage, `images/${almostUniqueFileName}${file.name}`);
        const upload = uploadBytesResumable(storageRef, file);

        upload.on('state_changed',
          () => {
            console.log('Loading...');
          },
          (error) => {
            console.log(`Loading Error: ${error}`);
            reject();
          },
          () => {
            resolve(getDownloadURL(upload.snapshot.ref));
            console.log('Downloaded !!')
          }
        );
      }
    );
  }
}
