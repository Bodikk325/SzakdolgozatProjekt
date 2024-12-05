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
  selector: 'app-seventh',
  standalone: true,
  imports: [RobotComponent, VideoModalComponent],
  templateUrl: './seventh.component.html',
  styleUrl: './seventh.component.css'
})
export class SeventhComponent {
  messages = ['Az életben vannak nehéz döntések, pont úgy mint a programozásban is!', 'A MicroBit egy olyan okos eszköz, hogy simán megmondja mennyi a hőmérséklete a szobának amiben most vagy.', 'Kérd le ezt a hőmérsékletet, rakd bele egy változóba. Ezután használd az új elágazást, a "ha" elágazást.', 'Ha kevesebb a hőmérséklet mint 20 akkor rajzolj ki egy hópehelyt.', 'Ha több akkor meg rajzolj ki egy napocskát! A változódat "valtozo"-nak nevezd el, hogy le tudjuk tesztelni a kódodat!']
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
    Blockly.Msg["CONTROLS_IF_MSG_IF"] = 'ha';
    Blockly.Msg["CONTROLS_IF_MSG_THEN"] = 'csináld ezt';
    Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"] = 'ha esetleg';
    Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = 'más különben';
    Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = 'ha';
    Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = 'ha esetleg';
    Blockly.Msg["CONTROLS_IF_ELSEIF_TOOLTIP"] = 'ha esetleg'; 
    Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = 'más különben'; 
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
            },
            
          },
          {
            "kind": "block",
            "type": "random_number"
            
          },
          {
            "kind": "block",
            "type": "get_temperature"
            
          },
          {
            "kind": "block",
            "type": "logic_compare"
            
          },
          
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
          },
          {
            "kind": "block",
            "type": "button_field_block"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Elágazás",
        "contents": [
          {
            "kind": "block",
            "type": "controls_if"
          }
        ]
      }
      
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

  Blockly.Blocks['random_number'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Véletlenszerű szám");
      this.appendValueInput("MIN")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField("és");
      this.appendValueInput("MAX")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField("között");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Generates a random number between two values.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['get_temperature'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Hőmérséklet lekérése");
      this.setOutput(true, "Number"); // A blokk visszaad egy számot
      this.setColour(230); // Világos szín, hogy jól kiemelkedjen
      this.setTooltip("Lekéri a hőmérsékletet az Espruino eszközről.");
      this.setHelpUrl(""); // Opcionálisan megadható dokumentáció URL-je
    }
  };
  

  Blockly.Blocks['button_click'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Amikor a/az")
          .appendField(new Blockly.FieldDropdown([["BTN1","BTN1"], ["BTN2","BTN2"]]), "BUTTON")
          .appendField("gombot megnyomják");
      this.appendStatementInput("DO")
          .setCheck(null)
          .appendField("csináld:");
      this.setColour(230); // Szín kiválasztása
      this.setTooltip("Végrehajt egy dolgot amikor megnyomjuk a gombot");
      this.setHelpUrl("");
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

  
  javascriptGenerator.forBlock['get_temperature'] = function(block, generator) {
    // A generált kód az Espruino hőmérséklet-lekérési parancsát adja vissza
    var code = 'E.getTemperature()';
    return [code, Order.FUNCTION_CALL];
  };

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


  javascriptGenerator.forBlock['button_click'] = function(block) {
    var dropdown_button = block.getFieldValue('BUTTON');
    var statements_do = javascriptGenerator.statementToCode(block, 'DO');
    var code = `
    setWatch(function() {
      ${statements_do}
    }, ${dropdown_button}, {repeat:true, debounce:20, edge:"falling"});
    `;
    return code;
  };
  
  javascriptGenerator.forBlock['random_number'] = function(block, generator) {
    var value_min = generator.valueToCode(block, 'MIN', Order.ATOMIC) || '0';
    var value_max = generator.valueToCode(block, 'MAX', Order.ATOMIC) || '100';
  
    var code = `Math.floor(Math.random() * (${value_max} - ${value_min} + 1)) + ${value_min}`;
    return [code, Order.NONE];
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
     this.showVideo("HetedikBemutato.mp4")
   }
 
   runCode() {
     this.mainWorkSpace = Blockly.getMainWorkspace();
     var code = javascriptGenerator.workspaceToCode(this.mainWorkSpace)
 
     console.log(code)
    
    this.microBitService.doAnything(code)


    var expected = `
     var valtozo;


valtozo = E.getTemperature();

if (valtozo < 20) {
  show(22511061);} else {
  show(18299345);}
    `
    
      if (code.replace(/\s+/g, "") == expected.replace(/\s+/g, ""))
        {
          this.messages = ['Nagyon ügyes vagy, haladjunk tovább!']
          setTimeout(() => {
            this.reset()
            this.router.navigateByUrl("main")
            this.fieldService.completeLevel("7")
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
