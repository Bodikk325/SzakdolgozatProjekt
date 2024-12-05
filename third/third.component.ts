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
import { VideoModalComponent } from "../video-modal/video-modal.component";


@Component({
  selector: 'app-third',
  standalone: true,
  imports: [RobotComponent, VideoModalComponent],
  templateUrl: './third.component.html',
  styleUrl: './third.component.css'
})
export class ThirdComponent {
  messages = ['Itt vagyunk a harmadik feladatnál, haladunk mint a karikacsapás!', 'Az szép és jó, hogy számokat írogatunk ki a microBitre, de mivan ha én rajzolni akarok rá egy saját formát?', 'Itt az ideje ennek! Nyisd le az Égők menüt, és ott találsz egy 5x5-s táblázat szerü mezőt! Rajzoljunk ki a MicroBitre egy szívecskét!', 'Ehhez pipáld ki a 2,4,6,7,8,9,10,11,12,13,14,15,17,18,19 és 24-es mezőket!']


  Initialize()
  {
    var toolbox = {
      "kind": "categoryToolbox",
      "contents": [
        {
          "kind": "category",
          "name": "Égők",
          "contents": [
            {
              "kind": "block",
              "type": "button_field_block",
            }
          ]
        }
      ]
    };


    

    this.InitializeBlocks()


    var mainWS = Blockly.inject('blocklyDiv', {
      toolbox: toolbox
    });

  }

  InitializeBlocks()
  {
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

    Blockly.Blocks['button_field_block'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("  1")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX1')
            .appendField("  2")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX2')
            .appendField("  3")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX3')
            .appendField("  4")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX4')
            .appendField("  5")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX5');
    
        this.appendDummyInput()
            .appendField("  6")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX6')
            .appendField("  7")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX7')
            .appendField("  8")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX8')
            .appendField("  9")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX9')
            .appendField("10")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX10');
    
        this.appendDummyInput()
            .appendField("11")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX11')
            .appendField("12")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX12')
            .appendField("13")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX13')
            .appendField("14")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX14')
            .appendField("15")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX15');
    
        this.appendDummyInput()
            .appendField("16")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX16')
            .appendField("17")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX17')
            .appendField("18")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX18')
            .appendField("19")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX19')
            .appendField("20")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX20');
    
        this.appendDummyInput()
            .appendField("21")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX21')
            .appendField("22")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX22')
            .appendField("23")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX23')
            .appendField("24")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX24')
            .appendField("25")
            .appendField(new Blockly.FieldCheckbox(false), 'CHECKBOX25');
    
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
      }
    };

    Blockly.Blocks['microbit_wait'] = {
      init: function() {
        this.jsonInit({
          "message0": 'Várakozás %1 másodperc',
          "args0": [
            {
              "type": "field_number",
              "name": "SECONDS",
              "value": 1,
              "min": 0,
              "precision": 0.1
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Várakozás a megadott ideig.",
          "helpUrl": "https://microbit.org/"
        });
      }
    };

    this.JavaScriptGenerator()

    
  }


  JavaScriptGenerator()
  {
    javascriptGenerator.forBlock['button_field_block'] = function(block) {
      // Mátrixot hoz létre az összes checkbox értékével (true/false).
      var matrix = [];
      for (var row = 0; row < 5; row++) {
        var rowArray = [];
        for (var col = 1; col <= 5; col++) {
          // Adott checkbox értékének lekérése.
          var checkboxValue = block.getFieldValue('CHECKBOX' + (row * 5 + col)) === 'TRUE';
          rowArray.push(checkboxValue);
        }
        matrix.push(rowArray);
      }

      

      function matrixToBinaryLiteral(matrix: boolean[][]): string {
    if (matrix.length !== 5 || matrix.some(row => row.length !== 5)) {
      throw new Error("The matrix must be 5x5.");
    }
  
    // Mátrix feldolgozása hátulról, összefűzve a biteket
    let binaryString = '';
    for (let y = 4; y >= 0; y--) {
      for (let x = 4; x >= 0; x--) {
        binaryString += matrix[y][x] ? '1' : '0';
      }
    }
  
    // A bináris string literállá alakítása
    return eval(`0b${binaryString}`);
  }
      return "show(" +matrixToBinaryLiteral(matrix) + ");"
    };
    
  }

  /**
   *
   */
  constructor(private router : Router, private fieldService : FieldService, private microBitService : MicroBitService) {
    
  }

  mainWorkSpace = Blockly.getMainWorkspace();

  ngAfterViewInit() {
    // Kódgenerátor a micro:bit szöveg blokkhoz
    // Ezt követően használható a blokk a Blockly felületén a toolbox-ban:
    


    this.Initialize()
    
    this.showVideo("HarmadikBemutato.mp4")

    // Blockly injektálása a HTML elembe
   



   

    this.mainWorkSpace = Blockly.getMainWorkspace();


  }

  runCode() {
    var code = javascriptGenerator.workspaceToCode(this.mainWorkSpace)

    this.microBitService.doAnything(code)

    if(code != "show(4685802);")
    {
      return
    }

    this.messages = ["Nagyszerű, most látnod kell a szívecskét a MicroBit-en. Haladjunk tovább!"]

    this.fieldService.completeLevel("3")

    

    setTimeout(() => {
      this.clear()
      this.router.navigateByUrl("main")
    }, 3000);

  }

  @ViewChild('videoModal') videoModal!: VideoModalComponent;
  @ViewChild('videoModal2') videoModal2!: VideoModalComponent;

  showVideo(url: string): void {
    this.videoModal.openModal(url);
  }

  showVideo2(url: string): void {
    this.videoModal2.openModal(url);
  }

  clear()
  {
    this.mainWorkSpace.clear()
    this.microBitService.reset()
  }
}
