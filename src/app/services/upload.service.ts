import { Post } from './../models/Post.model';
import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

// Upload Files from Firebase
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

// Delete Post's Image
  deleteFile(post: Post) {
    if(post.image) {
      const storage = getStorage();
      const imageStorageRef = ref(storage, post.image);

      deleteObject(imageStorageRef).then(
        () => {
          console.log('Post Deleted !!');
        }
      ).catch(
        (error) => {
          console.log(`Failed To Delete File: ${error}`);
        }
      );
    }
  }
}
