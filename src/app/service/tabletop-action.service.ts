import { Injectable } from '@angular/core';
import { Card } from '@udonarium/card';
import { CardStack } from '@udonarium/card-stack';
import { ImageContext, ImageFile } from '@udonarium/core/file-storage/image-file';
import { ImageStorage } from '@udonarium/core/file-storage/image-storage';
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store';
import { EventSystem } from '@udonarium/core/system';
import { DiceSymbol, DiceType } from '@udonarium/dice-symbol';
import { GameCharacter } from '@udonarium/game-character';
import { GameTable } from '@udonarium/game-table';
import { GameTableMask } from '@udonarium/game-table-mask';
import { PresetSound, SoundEffect } from '@udonarium/sound-effect';
import { TableSelecter } from '@udonarium/table-selecter';
import { Terrain } from '@udonarium/terrain';
import { TextNote } from '@udonarium/text-note';

import { ContextMenuAction } from './context-menu.service';
import { PointerCoordinate } from './pointer-device.service';

@Injectable({
  providedIn: 'root'
})
export class TabletopActionService {

  constructor() { }

  createGameCharacter(position: PointerCoordinate): GameCharacter {
    let character = GameCharacter.create('新しいキャラクター', 1, '');
    character.location.x = position.x - 25;
    character.location.y = position.y - 25;
    character.posZ = position.z;
    return character;
  }

  createGameTableMask(position: PointerCoordinate): GameTableMask {
    let viewTable = this.getViewTable();
    if (!viewTable) return;

    let tableMask = GameTableMask.create('マップマスク', 5, 5, 100);
    tableMask.location.x = position.x - 25;
    tableMask.location.y = position.y - 25;
    tableMask.posZ = position.z;

    viewTable.appendChild(tableMask);
    return tableMask;
  }

  createTerrain(position: PointerCoordinate): Terrain {
    let url: string = './assets/images/tex.jpg';
    let image: ImageFile = ImageStorage.instance.get(url)
    if (!image) image = ImageStorage.instance.add(url);

    let viewTable = this.getViewTable();
    if (!viewTable) return;

    let terrain = Terrain.create('地形', 2, 2, 2, image.identifier, image.identifier);
    terrain.location.x = position.x - 50;
    terrain.location.y = position.y - 50;
    terrain.posZ = position.z;

    viewTable.appendChild(terrain);
    return terrain;
  }

  createTextNote(position: PointerCoordinate): TextNote {
    let textNote = TextNote.create('共有メモ', 'テキストを入力してください', 5, 4, 3);
    textNote.location.x = position.x;
    textNote.location.y = position.y;
    textNote.posZ = position.z;
    return textNote;
  }

  createDiceSymbol(position: PointerCoordinate, name: string, diceType: DiceType, imagePathPrefix: string): DiceSymbol {
    let diceSymbol = DiceSymbol.create(name, diceType, 1);
    let image: ImageFile = null;

    diceSymbol.faces.forEach(face => {
      let url: string = `./assets/images/dice/${imagePathPrefix}/${imagePathPrefix}[${face}].png`;
      image = ImageStorage.instance.get(url);
      if (!image) { image = ImageStorage.instance.add(url); }
      diceSymbol.imageDataElement.getFirstElementByName(face).value = image.identifier;
    });

    diceSymbol.location.x = position.x - 25;
    diceSymbol.location.y = position.y - 25;
    diceSymbol.posZ = position.z;
    return diceSymbol;
  }

  createTrump(position: PointerCoordinate): CardStack {
    let cardStack = CardStack.create('トランプ山札');
    cardStack.location.x = position.x - 25;
    cardStack.location.y = position.y - 25;
    cardStack.posZ = position.z;

    let back: string = './assets/images/trump/z02.gif';
    if (!ImageStorage.instance.get(back)) {
      ImageStorage.instance.add(back);
    }

    let suits: string[] = ['c', 'd', 'h', 's'];
    let trumps: string[] = [];

    for (let suit of suits) {
      for (let i = 1; i <= 13; i++) {
        trumps.push(suit + (('00' + i).slice(-2)));
      }
    }

    trumps.push('x01');
    trumps.push('x02');

    for (let trump of trumps) {
      let url: string = './assets/images/trump/' + trump + '.gif';
      if (!ImageStorage.instance.get(url)) {
        ImageStorage.instance.add(url);
      }
      let card = Card.create('カード', url, back);
      cardStack.putOnBottom(card);
    }
    return cardStack;
  }



  createTrickMask(position: PointerCoordinate, name: string, imagePathPrefix: string): GameTableMask {
    let viewTable = this.getViewTable();
    if (!viewTable) return;

//    './assets/images/slip.png';
    let trapUrl: string = './assets/images/' + imagePathPrefix;
    if (!ImageStorage.instance.get(trapUrl)) {
      ImageStorage.instance.add(trapUrl);
    }


    let tableMask = GameTableMask.createTrickMask(name, 2, 2, 100, trapUrl);
    tableMask.location.x = position.x - 25;
    tableMask.location.y = position.y - 25;
    tableMask.posZ = position.z;

    viewTable.appendChild(tableMask);
    return tableMask;
  }

  createGameMasterMask(position: PointerCoordinate, maskWidth: number, maskHight:number): GameTableMask {
    let viewTable = this.getViewTable();
    if (!viewTable) return;

    let tableMask = GameTableMask.create('マップマスク', maskWidth, maskHight, 100);
    tableMask.location.x = position.x - 25;
    tableMask.location.y = position.y - 25;
    tableMask.posZ = position.z;

    viewTable.appendChild(tableMask);
    return tableMask;
  }


  makeDefaultTable() {
    let tableSelecter = new TableSelecter('tableSelecter');
    tableSelecter.initialize();

    let gameTable = new GameTable('gameTable');
    let testBgFile: ImageFile = null;
    let bgFileBlack = ImageFile.createEmpty('bg_black').toContext();
    bgFileBlack.url = './assets/images/sheet_black.png';
    ImageStorage.instance.add(bgFileBlack);


    let bgFileChess = ImageFile.createEmpty('bg_chess').toContext();
    bgFileChess.url = './assets/images/chesstempre.png';
    ImageStorage.instance.add(bgFileChess);

    

    let bgFileContext = ImageFile.createEmpty('bg_white').toContext();
    bgFileContext.url = './assets/images/sheet_white.png';


    testBgFile = ImageStorage.instance.add(bgFileContext);
    gameTable.name = '最初のテーブル';
    gameTable.imageIdentifier = testBgFile.identifier;
    gameTable.width = 28;
    gameTable.height = 24;
    gameTable.initialize();

    tableSelecter.viewTableIdentifier = gameTable.identifier;
  }

  makeDefaultTabletopObjects() {
    let testCharacter: GameCharacter = null;
    let testFile: ImageFile = null;
    let fileContext: ImageContext = null;

    testCharacter = new GameCharacter('testCharacter_1');
    fileContext = ImageFile.createEmpty('none_icon').toContext();
    fileContext.url = './assets/images/ic_account_circle_black_24dp_2x.png';
    testFile = ImageStorage.instance.add(fileContext);
    testCharacter.location.x = 8 * 50;
    testCharacter.location.y = 17 * 50;
    
    testCharacter.initialize();
    testCharacter.createTestGameDataElement('コマ見本', 2, testFile.identifier);

    fileContext = ImageFile.createEmpty('image_shadow').toContext();
    fileContext.url = './assets/images/shadow.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_slip').toContext();
    fileContext.url = './assets/images/slip.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_tex').toContext();
    fileContext.url = './assets/images/tex.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_thunder').toContext();
    fileContext.url = './assets/images/thunder.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_web').toContext();
    fileContext.url = './assets/images/web.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_prize').toContext();
    fileContext.url = './assets/images/prize.png';
    testFile = ImageStorage.instance.add(fileContext);

    fileContext = ImageFile.createEmpty('image_logo').toContext();
    fileContext.url = './assets/images/logo.png';
    testFile = ImageStorage.instance.add(fileContext);
  }

  makeDefaultContextMenuActions(position: PointerCoordinate): ContextMenuAction[] {
    return [
      this.getCreateTrickMenu(position),
      this.getCreateGmMenu(position),
      this.getCreateCharacterMenu(position),
      this.getCreateTableMaskMenu(position),
      this.getCreateTerrainMenu(position),
      this.getCreateTextNoteMenu(position),
      // this.getCreateTrumpMenu(position),
      this.getCreateDiceSymbolMenu(position),
    ];
  }

  private getCreateCharacterMenu(position: PointerCoordinate): ContextMenuAction {
    return {
      name: 'キャラクターを作成', action: () => {
        let character = this.createGameCharacter(position);
        EventSystem.trigger('SELECT_TABLETOP_OBJECT', { identifier: character.identifier, className: character.aliasName });
        SoundEffect.play(PresetSound.piecePut);
      }
    }
  }

  private getCreateTableMaskMenu(position: PointerCoordinate): ContextMenuAction {
    return {
      name: 'マップマスクを作成', action: () => {
        this.createGameTableMask(position);
        SoundEffect.play(PresetSound.cardPut);
      }
    }
  }

  private getCreateTerrainMenu(position: PointerCoordinate): ContextMenuAction {
    return {
      name: '地形を作成', action: () => {
        this.createTerrain(position);
        SoundEffect.play(PresetSound.blockPut);
      }
    }
  }

  private getCreateTextNoteMenu(position: PointerCoordinate): ContextMenuAction {
    return {
      name: '共有メモを作成', action: () => {
        this.createTextNote(position);
        SoundEffect.play(PresetSound.cardPut);
      }
    }
  }

  private getCreateTrumpMenu(position: PointerCoordinate): ContextMenuAction {
    return {
      name: 'トランプの山札を作成', action: () => {
        this.createTrump(position);
        SoundEffect.play(PresetSound.cardPut);
      }
    }
  }

  private getCreateDiceSymbolMenu(position: PointerCoordinate): ContextMenuAction {
    let dices: { menuName: string, diceName: string, type: DiceType, imagePathPrefix: string }[] = [
      { menuName: 'D4', diceName: 'D4', type: DiceType.D4, imagePathPrefix: '4_dice' },
      { menuName: 'D6', diceName: 'D6', type: DiceType.D6, imagePathPrefix: '6_dice' },
      { menuName: 'D8', diceName: 'D8', type: DiceType.D8, imagePathPrefix: '8_dice' },
      { menuName: 'D10', diceName: 'D10', type: DiceType.D10, imagePathPrefix: '10_dice' },
      { menuName: 'D10 (00-90)', diceName: 'D10', type: DiceType.D10_10TIMES, imagePathPrefix: '100_dice' },
      { menuName: 'D12', diceName: 'D12', type: DiceType.D12, imagePathPrefix: '12_dice' },
      { menuName: 'D20', diceName: 'D20', type: DiceType.D20, imagePathPrefix: '20_dice' },
    ];
    let subMenus: ContextMenuAction[] = [];

    dices.forEach(item => {
      subMenus.push({
        name: item.menuName, action: () => {
          this.createDiceSymbol(position, item.diceName, item.type, item.imagePathPrefix);
          SoundEffect.play(PresetSound.dicePut);
        }
      });
    });
    return { name: 'ダイスを作成', action: null, subActions: subMenus };
  }



  
  private getCreateTrickMenu(position: PointerCoordinate): ContextMenuAction {
    let tricks: { menuName: string, trickName: string, imagePathPrefix: string }[] = [
      { menuName: 'スリップトラップ', trickName: 'スリップトラップ',  imagePathPrefix: 'slip.png' },
      { menuName: 'キャプチャーウェブ', trickName: 'キャプチャーウェブ', imagePathPrefix: 'web.png' },
      { menuName: 'サンダーボルト', trickName: 'サンダーボルト', imagePathPrefix: 'thunder.png' },
      { menuName: 'シャドウ', trickName: 'シャドウ', imagePathPrefix: 'shadow.png' },
      { menuName: 'タイムボム', trickName: 'タイムボム', imagePathPrefix: 'bomb.png' },
    ];
    let subMenus: ContextMenuAction[] = [];

    tricks.forEach(item => {
      subMenus.push({
        name: item.menuName, action: () => {
          this.createTrickMask(position, item.trickName, item.imagePathPrefix);
          SoundEffect.play(PresetSound.cardPut);
        }
      });
    });

    return { name: 'トリックを設置', action: null, subActions: subMenus };
  }


  private getCreateGmMenu(position: PointerCoordinate): ContextMenuAction {
    let masks: { menuName: string, maskType:string, maskName: string, widthSize: number,hightSize: number, imagePathPrefix: string }[] = [
      { menuName: 'メインパネルベース', maskType:'mapMask' ,maskName: 'メインパネルベース', widthSize: 20,hightSize: 20,  imagePathPrefix: '' },
      { menuName: 'サブパネルベース', maskType:'mapMask' ,maskName: 'サブパネルベース',widthSize: 10,hightSize: 10, imagePathPrefix: '' },
      { menuName: '視界ベース', maskType:'mapMask' ,maskName: '視界ベース',widthSize: 6,hightSize: 6, imagePathPrefix: '' },
      { menuName: 'プライズ', maskType:'elementMask' ,maskName: 'プライズ',widthSize: 2,hightSize: 2,  imagePathPrefix: 'prize.png' },
      // { menuName: 'D10', trapName: 'D10', type: DiceType.D10, imagePathPrefix: '10_dice' },
      // { menuName: 'D10 (00-90)', trapName: 'D10', type: DiceType.D10_10TIMES, imagePathPrefix: '100_dice' },
      // { menuName: 'D12', trapName: 'D12', type: DiceType.D12, imagePathPrefix: '12_dice' },
      // { menuName: 'D20', trapName: 'D20', type: DiceType.D20, imagePathPrefix: '20_dice' },
    ];
    let subMenus: ContextMenuAction[] = [];

    masks.forEach(item => {
      subMenus.push({
        name: item.menuName, action: () => {
          if(item.maskType == "mapMask"){
            this.createGameMasterMask(position, item.widthSize, item.hightSize);
          }else{
            this.createTrickMask(position, item.maskName, item.imagePathPrefix);
          }
          SoundEffect.play(PresetSound.cardPut);
        }
      });
    });

    return { name: 'マスターパネル', action: null, subActions: subMenus };
  }

  private getViewTable(): GameTable {
    let tableSelecter = ObjectStore.instance.get<TableSelecter>('tableSelecter');
    return tableSelecter ? tableSelecter.viewTable : null;
  }
}
