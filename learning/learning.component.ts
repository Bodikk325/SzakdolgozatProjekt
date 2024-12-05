import { Component } from '@angular/core';
import Hu from 'blockly/msg/hu';
// Import Blockly core.
// Import the default blocks.
import 'blockly/blocks'; 
// Import a generator.
import * as Blockly from 'blockly';
import 'blockly/javascript';  // Biztosítsuk, hogy a JavaScript kódgenerátor elérhető legyen
import { javascriptGenerator, Order } from 'blockly/javascript';


@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css'
})
export class LearningComponent {
  mainWorkSpace = Blockly.getMainWorkspace();

  ngAfterViewInit() {
    // Kódgenerátor a micro:bit szöveg blokkhoz

    // Ezt követően használható a blokk a Blockly felületén a toolbox-ban:
    var toolbox = {
      "kind": "categoryToolbox",
      "contents": [
        {
          "kind": "category",
          "name": "Control",
          "contents": [
            {
              "kind": "block",
              "type": "controls_if",
              "colour": "210"
            },
            {
              "kind": "block",
              "type": "math_number",
              "fields": {
                "NUM": 42
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
              "type": "string_length"
            },
            {
              "kind": "block",
              "type": "string_length_with_field"
            }
          ]
        }
      ]
    };

    // Blockly injektálása a HTML elembe
    Blockly.inject('blocklyDiv', {
      toolbox: toolbox
    });

    Blockly.Blocks['string_length'] = {
      init: function() {
        this.jsonInit({
          "message0": 'Futtatás of %1',
          "args0": [
            {
              "type": "input_value",
              "name": "VALUE",
              "check": "String"
            }
          ],
          "output": "Number",
          "colour": 160,
          "tooltip": "Returns number of letters in the provided text.",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
      }
    };

    Blockly.Blocks['string_length_with_field'] = {
      init: function() {
        this.jsonInit({
          "message0": 'Hossz of szöveg %1',
          "args0": [
            {
              "type": "field_input",
              "name": "TEXT",
              "text": "Alapértelmezett szöveg"
            }
          ],
          "output": "Number",
          "colour": 160,
          "tooltip": "Returns the length of the text in the field.",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
      }
    };

    this.mainWorkSpace = Blockly.getMainWorkspace();

    javascriptGenerator.forBlock['string_length'] = function(block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '';
      return [argument0 + '.length', Order.MEMBER];
    };

    javascriptGenerator.forBlock['string_length_with_field'] = function(block, generator) {
      // Get the length of the input text field.
      var textValue = block.getFieldValue('TEXT') || ''; 
      return ['"' + textValue + '".length', Order.MEMBER];
    };
  }

  runCode() {
    let code = javascriptGenerator.workspaceToCode(this.mainWorkSpace);
    
    var lofasz = eval(code)

    console.log(lofasz)

  }
}
