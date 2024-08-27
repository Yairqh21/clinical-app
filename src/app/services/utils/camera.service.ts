
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class CameraService {


  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Elegir de la galería',
      promptLabelPicture: 'Tomar una foto',
      promptLabelCancel: 'Cancelar'
    });
  }


}
