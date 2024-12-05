import { Component, ViewChild } from '@angular/core';
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
import { NumberService } from '../services/number.service';
import { MicroBitService } from '../services/micro-bit.service';
import { VideoModalComponent } from '../video-modal/video-modal.component';


@Component({
  selector: 'app-second',
  standalone: true,
  imports: [RobotComponent, VideoModalComponent],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {


  /**
   *
   */
  constructor(private router : Router, private fieldService : FieldService, private httpClient : HttpClient, private numberServices : NumberService, private microBitService : MicroBitService) {
    
  }
messages = ['És itt is lennénk az első komolyabb kódolos feladatnál!', 'A feladatod a következő:', '1.Nyisd meg az égők menüt! 2.Kattints a szám megjelenítésre és húzd be azt a fehér felületre! Amint látod a szám megjelenítése melett ott van egy kis kirakos hiányzó része, ide kell megadni, hogy milyen számot szeretnénk megadni.', '3.Nyisd le a változók menüt és ott fogsz látni egy kettest! Azt húzd meg és mintha egy kirakós lenne, passzold hozzá a szám megjelenítése jobb oldalára!', '4. Kattints a kód futtatása gombra!']

  mainWorkSpace = Blockly.getMainWorkspace();

  Initialize()
  {
    var toolbox = {
      "kind": "categoryToolbox",
      "contents": [
        {
          "kind": "category",
          "name": "Konstansok",
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
          "name": "Égők",
          "contents": [
            {
              "kind": "block",
              "type": "microbit_display_number"
            },
          ]
        }
      ]
    };



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
 
  this.mainWorkSpace = Blockly.getMainWorkspace();
  
  this.JavascriptGenerators();
  

  var mainWS = Blockly.inject('blocklyDiv', {
    toolbox: toolbox
  });

  }

  JavascriptGenerators()
  {
    var numberService = this.numberServices
    javascriptGenerator.forBlock['microbit_display_number'] = function(block, generator) {
      var number = generator.valueToCode(block, 'NUMBER', Order.ATOMIC) || '0';
      var code = numberService.getCodeForNumber(Number.parseInt(number))
      return `show(${code});`;
    };

  }

  ngAfterViewInit() {
  
this.Initialize()
  }

  runCode() {
    this.mainWorkSpace = Blockly.getMainWorkspace();
    var code = javascriptGenerator.workspaceToCode(this.mainWorkSpace)

    this.microBitService.doAnything(code)

    
    if (code.indexOf("2") == -1 && code.indexOf("show") !== -1) {
      this.messages = ['Majdnem jó, de nem felejtetted el véletlenül a kettest hozzákapcsolni a megjelenítés fülhöz?'];
      
    }
    else if (code.trim() === "show(32645678);") {
      this.messages = ['Nagyszerű, látod megjelenni a kettest a MicroBiten? Haladjunk is tovább!'];
      
      setTimeout(() => {
        this.clear()
        this.fieldService.completeLevel("2")
        this.router.navigateByUrl("main")
      }, 3000);
    }
    else {
      this.messages = ['Hmmm, valami nem stimmel.. Biztos mindent jól írtál be?'];
    }

  }

  clear()
  {
    this.mainWorkSpace.clear()
    this.microBitService.reset()
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
