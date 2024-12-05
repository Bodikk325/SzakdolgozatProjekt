import { Component, createPlatform, ViewChild } from '@angular/core';
import Hu from 'blockly/msg/hu';
// Import Blockly core.
// Import the default blocks.
import 'blockly/blocks'; 
// Import a generator.
import * as Blockly from 'blockly';
import 'blockly/javascript';  // Biztosítsuk, hogy a JavaScript kódgenerátor elérhető legyen
import { javascriptGenerator, Order } from 'blockly/javascript';
import { RobotComponent } from "../robot/robot.component";
import { Router } from '@angular/router';
import { FieldService } from '../services/field.service';
import { HttpClient } from '@angular/common/http';
import { MicroBitService } from '../services/micro-bit.service';
import { NumberService } from '../services/number.service';
import { VideoModalComponent } from "../video-modal/video-modal.component";

@Component({
  selector: 'app-fifth',
  standalone: true,
  imports: [RobotComponent, VideoModalComponent],
  templateUrl: './fifth.component.html',
  styleUrl: './fifth.component.css'
})
export class FifthComponent {
  messages = ['Itt az ideje komolyabb fogalmakkal is megismerkedni, ilyenek például a változók! Egy változó azért változó mert változik az értéke, cseles mi?',  'Például, hogyha én be akarom rakni az 5-öst a microbit-be hogy világítson nekem és utána a 6-ost is be akarom rakni, akkor ki kell vennem az 5-öst majd berakni a 6-ost.', 'De ha elnevezem ezt az 5-öst mondjuk változónak, akkor utána megmondom neki, hogy hé változó, te legyél 6-os, és ő lecseréli magát!', 'Nézzünk rá egy példát! Hozzunk létre egy változót, adjunk neki egy értéket, majd utána irassuk ki a microbittel!', 'Először a microbit irjon ki egy ötöst, majd egy egyest végül pedig egy 3-ast. Igy olyan mintha folyamatosan irogatnánk a képernyőre számokat, menő igaz? A változo-t mindenképpen "valtozo"-nak nevezd el, így tudjuk leelenőrizni a munkád!']
  /**
   *
   */
  constructor(private numberService : NumberService, private microBitService : MicroBitService, private router : Router, private fieldService : FieldService) {
   
  }
 
  Initalize()
  {


    // Változó blokkok fordítása
    Blockly.Msg["VARIABLES_DEFAULT_NAME"] = "változó";
    Blockly.Msg["VARIABLES_SET"] = "%1 beállítása erre: %2";
    Blockly.Msg["MATH_CHANGE_TITLE"] = 'Változó növelése %1 ennyivel: %2';
    Blockly.Msg["NEW_VARIABLE"] = "Új változó";
    Blockly.Msg["NEW_VARIABLE_TITLE"] = "Az új változó neve:";
    Blockly.Msg["RENAME_VARIABLE"] = "A változó átnevezése:";
    Blockly.Msg["DELETE_VARIABLE"] = 'A "%1" változó törlése';
    
    // Alapvető blokkok fordítása
    Blockly.Msg["LOGIC_HUE"] = "Érvelés";
    Blockly.Msg["LOGIC_COMPARE_HELPURL"] = "https://hu.wikipedia.org/wiki/Egyenlőség";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_EQ"] = "Igaz, ha a két bemenet egyenlő.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_NEQ"] = "Igaz, ha a két bemenet nem egyenlő.";
    
    // Műveleti blokkok fordítása
    Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";
    Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";
    Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "*";
    Blockly.Msg["MATH_DIVISION_SYMBOL"] = "/";
    Blockly.Msg["MATH_NUMBER_TOOLTIP"] = "Egy szám.";
    Blockly.Msg["MATH_ARITHMETIC_HELPURL"] = "https://hu.wikipedia.org/wiki/Algebra";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_ADD"] = "Adja vissza a két szám összegét.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_SUB"] = "Adja vissza a két szám különbségét.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MUL"] = "Adja vissza a két szám szorzatát.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_DIV"] = "Adja vissza a két szám hányadosát.";

    Blockly.setLocale(Blockly.Msg);

   var toolbox = {
     "kind": "categoryToolbox",
     "contents": [
      {
        
        "kind": "category",
        "name": "Megadott értékek",
        "contents": [
          {
            "kind": "block",
            "type": "math_number",
            "fields": {
              "NUM": 0
            }
          }
        ]
      },
       
       {
        "kind": "category",
        "name": "Változók",
        "custom": "VARIABLE" // Ez automatikusan hozzáadja a változó blokkokat
      },
      {
        "kind": "category",
        "name": "Egők",
        "contents": [
          {
            "kind": "block",
            "type": "microbit_display_number"
          }
        ]
      },
      
      
      
     ]
   };
 
   this.mainWorkSpace = Blockly.getMainWorkspace();

   
 
  Blockly.Blocks['microbit_display_number'] = {
    init: function() {
      this.jsonInit({
        "message0": 'Szám megjelenítése %1',
        "args0": [
          {
            "type": "input_value",
            "name": "NUMBER",
            "check": "Number"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Szám megjelenítése a micro:bit képernyőjén.",
        "helpUrl": "https://microbit.org/"
      });
    }
  };


    javascriptGenerator.forBlock['microbit_display_number'] = function(block, generator) {
      var number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || '0';
      return `
  function getCodeForNumber(number) {

    const numbers = {
      0: 0b1111110001100011000111111,
      1: 0b1111100100001000010000100,
      2: 0b1111100100010001000101110,
      3: 0b0111010001011001000101110,
      4: 0b0100001000111110100101001,
      5: 0b0111110000100000000111111,
      6: 0b0111010001011110000101110,
      7: 0b0001000100010001000011111,
      8: 0b0111010001011101000101110,
      9: 0b0111010000111101000101110,
    };
    if (number in numbers) {
      return numbers[number];
    }
  }
      show(getCodeForNumber(${number}));

      `;
    };
     
   var mainWS = Blockly.inject('blocklyDiv', {
     toolbox: toolbox
   });
  }
 
  mainWorkSpace = Blockly.getMainWorkspace();
   ngAfterViewInit() {
     this.Initalize()
     this.showVideo("OtosBemutato.mp4")
   }
 
   runCode() {
     this.mainWorkSpace = Blockly.getMainWorkspace();
     var code = javascriptGenerator.workspaceToCode(this.mainWorkSpace)
 
     console.log(code)
    
      this.microBitService.doAnything(code)

      var expected = `
var valtozo;

valtozo = 5;

  function getCodeForNumber(number) {

    const numbers = {
      0: 0b1111110001100011000111111,
      1: 0b1111100100001000010000100,
      2: 0b1111100100010001000101110,
      3: 0b0111010001011001000101110,
      4: 0b0100001000111110100101001,
      5: 0b0111110000100000000111111,
      6: 0b0111010001011110000101110,
      7: 0b0001000100010001000011111,
      8: 0b0111010001011101000101110,
      9: 0b0111010000111101000101110,
    };
    if (number in numbers) {
      return numbers[number];
    }
  }
      show(getCodeForNumber(valtozo));

      valtozo = 3;

  function getCodeForNumber(number) {

    const numbers = {
      0: 0b1111110001100011000111111,
      1: 0b1111100100001000010000100,
      2: 0b1111100100010001000101110,
      3: 0b0111010001011001000101110,
      4: 0b0100001000111110100101001,
      5: 0b0111110000100000000111111,
      6: 0b0111010001011110000101110,
      7: 0b0001000100010001000011111,
      8: 0b0111010001011101000101110,
      9: 0b0111010000111101000101110,
    };
    if (number in numbers) {
      return numbers[number];
    }
  }
      show(getCodeForNumber(valtozo));
`

  if (code.replace(/\s+/g, "") == expected.replace(/\s+/g, ""))
    {
      this.messages = ['Nagyon ügyes vagy, haladjunk tovább!']
      setTimeout(() => {
        this.reset()
        this.router.navigateByUrl("main")
        this.fieldService.completeLevel("5")
      }, 3000);
    }
     
   }
 
   reset()
   {
    this.mainWorkSpace = Blockly.getMainWorkspace();
     this.microBitService.reset()
     this.mainWorkSpace.clear()
   }

   @ViewChild('videoModal') videoModal!: VideoModalComponent;
  @ViewChild('videoModal2') videoModal2!: VideoModalComponent;

  showVideo(url: string): void {
    this.videoModal.openModal(url);
  }

  showVideo2(url: string): void {
    this.videoModal2.openModal(url);
  }
 
}
