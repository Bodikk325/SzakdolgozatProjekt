import { Component } from '@angular/core';
import { BoardField } from '../models/BoardField';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RobotComponent } from "../robot/robot.component";
import { FieldService } from '../services/field.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RobotComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  completedLevel = 0

  fields: BoardField[] = [
    {
      label: 1, link: '/first', position: { x: 782, y: 700 },
      id: 0,
      color: 'green',
      completed: false
    },
    {
      label: 2, link: '/second', position: { x: 796, y: 500 },
      id: 0,
      color: 'blue',
      completed: false
    },
    {
      label: 3, link: '/third', position: { x: 901, y: 435 },
      id: 0,
      color: 'red',
      completed: false
    },
    {
      label: 4, link: '/fourth', position: { x: 755, y: 360 },
      id: 0,
      color: 'red',
      completed: false
    },
    {
      label: 5, link: '/fifth', position: { x: 630, y: 285 },
      id: 0,
      color: 'red',
      completed: false
    },
    {
      label: 6, link: '/sixth', position: { x: 530, y: 230 },
      id: 0,
      color: 'red',
      completed: false
    },
    {
      label: 7, link: '/seventh', position: { x: 678, y: 142 },
      id: 0,
      color: 'red',
      completed: false
    },
    {
      label: 8, link: '/eight', position: { x: 572, y: 88 },
      id: 0,
      color: 'red',
      completed: false
    },
    // További mezők...
  ];

  fieldService : FieldService


  /**
   *
   */
  constructor() {
    
    this.fieldService = new FieldService()
    
    if(this.fieldService.loadMissions().length == 0)
    {
      this.fieldService.saveMissions(this.fields)
    }
    else this.fields = this.fieldService.loadMissions()
    console.log(this.fields)


    if(localStorage.getItem('completedLevel') != null)
    {
      this.completedLevel = Number(localStorage.getItem('completedLevel'))
    }
    else
    {
      this.fieldService.completeLevel("0")
    }
    

  }

}
