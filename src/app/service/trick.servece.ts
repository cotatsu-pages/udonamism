import { Injectable } from '@angular/core';
import { ImageFile } from '@udonarium/core/file-storage/image-file';

const skeletonImage: ImageFile = ImageFile.create('./assets/images/skeleton.png');

const shadowImage : ImageFile = ImageFile.create('./assets/images/shadow.png');
const slipImage : ImageFile = ImageFile.create('./assets/images/slip.png');
const thunderImage : ImageFile = ImageFile.create('./assets/images/thunder.png');
const webImage : ImageFile = ImageFile.create('./assets/images/web.png');
const prizeImage : ImageFile = ImageFile.create('./assets/images/prize.png');
const bombImage : ImageFile = ImageFile.create('./assets/images/bomb.png');


@Injectable({
  providedIn: 'root'
})
export class TrickService {

  constructor() { }

  getSkeletonOr(image: ImageFile): ImageFile {
    return image && !image.isEmpty ? image : skeletonImage;
  }


  getSkeletonOrTrick(trick: string): ImageFile {
    switch (trick){
      case 'shadow':
        return shadowImage;
        break;

      case 'slip':
        return slipImage;
        break;
    
      case 'thunder':
        return thunderImage;
        break;
  
      case 'web':
        return webImage;
        break;
  
      case 'bomb':
        return bombImage;
        break;

      case 'prize':
        return prizeImage;
        break;

      default :
        return skeletonImage;
    }
  }

  getSkeltonOrUrl(imageUrl: string) :ImageFile {

    if(imageUrl !== ''){
      return ImageFile.create(imageUrl);
    }else{
      return skeletonImage;
    }
  }
}
