import { Injectable } from '@angular/core';
import { ImageFile } from '@udonarium/core/file-storage/image-file';

const skeletonImage: ImageFile = ImageFile.create('./assets/images/skeleton.png');

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


  getSkeletonOrTrick(trick: string, image: ImageFile): ImageFile {

    let imgUrl = "";
    switch (trick){
      case 'shadow':
        imgUrl = './assets/images/shadow.png';
        // const trickImage = ImageFile.create('./assets/images/shadow.png');
        // return shadowImage;
        break;

      case 'slip':
        imgUrl = './assets/images/slip.png';
        // return ImageFile.create('./assets/images/slip.png');;
        // return slipImage;
        break;
    
      case 'thunder':
        imgUrl = './assets/images/thunder.png';
        // return ImageFile.create('./assets/images/thunder.png');
        // return thunderImage;
        break;
  
      case 'web':
        imgUrl = './assets/images/web.png';
        // return ImageFile.create('./assets/images/web.png');
        // return webImage;
        break;
  
      case 'bomb':
        imgUrl = './assets/images/bomb.png';
        // return ImageFile.create('./assets/images/bomb.png');
        // return bombImage;
        break;

      case 'prize':
        imgUrl = './assets/images/prize.png';
        // return ImageFile.create('./assets/images/prize.png');
        // return prizeImage;
        break;

      default :
        return skeletonImage;
        break;
    }

    return ImageFile.create(imgUrl);
  }

  getSkeltonOrUrl(imageUrl: string) :ImageFile {

    if(imageUrl !== ''){
      return ImageFile.create(imageUrl);
    }else{
      return skeletonImage;
    }
  }
}
