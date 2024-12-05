import { Component } from '@angular/core';
import Hu from 'blockly/msg/hu';
// Import Blockly core.
// Import the default blocks.
import 'blockly/blocks'; 
// Import a generator.
import * as Blockly from 'blockly';
import 'blockly/javascript';
import { RobotComponent } from "../robot/robot.component";
import { FieldService } from '../services/field.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MicroBitService } from '../services/micro-bit.service';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [RobotComponent],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {


  mainWorkSpace = Blockly.getMainWorkspace();

  ngAfterViewInit() {

    this.Initialize();
  }

  Initialize()
  {
    var mainWS = Blockly.inject('blocklyDiv', {
      
    });
  }

  constructor(private router : Router, private fieldService : FieldService, private httpClient : HttpClient, private microBitService : MicroBitService) {
    
  }

  runCode() {
    this.microBitService.checkFirst()
  }

  clean()
  {
    this.microBitService.reset()
  }

  next()
  {
    this.fieldService.completeLevel("1")
    this.clean()
    this.router.navigateByUrl("main")
  }
}
