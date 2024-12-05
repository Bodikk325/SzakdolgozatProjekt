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
  selector: 'app-fourth',
  standalone: true,
  imports: [RobotComponent, VideoModalComponent],
  templateUrl: './fourth.component.html',
  styleUrl: './fourth.component.css'
})
export class FourthComponent {
  messages = ['Negyedik feladat, tanuljuk meg hogyan működnek a gombok!', 'Hogyha megnézed a gomboknál ott van egy új elem, ez a gombvezérlés!', 'Amit beraksz a blokkba az akkor fog lefutni hogyha az első gombot (BTN1) vagy a másodikat (BTN2) nyomod meg.', 'A feladatod az, hogyha az első gombot nyomom meg akkor a legelső kis led vilagitson.', 'Ha a második gombot akkor pedig az utolsó led világítson!']
 /**
  *
  */
 constructor( private microBitService : MicroBitService, private router : Router, private fieldService : FieldService) {
  
 }

 Initalize()
 {
  var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Gombok",
        "contents": [
          {
            "kind": "block",
            "type": "button_click"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Egők",
        "contents": [
          {
            "kind": "block",
            "type": "button_field_block",
          }
        ]
      }
    ]
  };

  this.mainWorkSpace = Blockly.getMainWorkspace();

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

    return "show(" + matrixToBinaryLiteral(matrix) + ");"
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

  var mainWS = Blockly.inject('blocklyDiv', {
    toolbox: toolbox
  });
 }


  ngAfterViewInit() {
    this.Initalize()
    this.showVideo("NegyedikBemutato.mp4")
  }
  mainWorkSpace = Blockly.getMainWorkspace();

  runCode() {
    this.mainWorkSpace = Blockly.getMainWorkspace();
    var code = javascriptGenerator.workspaceToCode(this.mainWorkSpace)

    console.log(code)

    this.microBitService.doAnything(code)

    var expected = `setWatch(function() {
          show(1);
      }, BTN1, {repeat:true, debounce:20, edge:"falling"});


      setWatch(function() {
          show(16777216);
      }, BTN2, {repeat:true, debounce:20, edge:"falling"});`

    if (code.replace(/\s+/g, "") == expected.replace(/\s+/g, ""))
      {
        this.messages = ['Nagyon ügyes vagy, haladjunk tovább!']
        setTimeout(() => {
          this.reset()
          this.router.navigateByUrl("main")
          this.fieldService.completeLevel("4")
        }, 3000);
      }

    
  }


  @ViewChild('videoModal') videoModal!: VideoModalComponent;
  @ViewChild('videoModal2') videoModal2!: VideoModalComponent;

  showVideo(url: string): void {
    this.videoModal.openModal(url);
  }

  showVideo2(url: string): void {
    this.videoModal2.openModal(url);
  }


  reset()
  {
    this.mainWorkSpace = Blockly.getMainWorkspace();
    this.microBitService.reset()
    this.mainWorkSpace.clear()
  }

  
}
