import { Injectable } from '@angular/core';
import { BoardField } from '../models/BoardField';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private storageKey = 'missions';

  constructor() {
    this.loadMissions();
  }

  // Betölti az elmentett szinteket a localStorage-ből
  loadMissions(): BoardField[] {
    const storedMissions = localStorage.getItem(this.storageKey);
    return storedMissions ? JSON.parse(storedMissions) : [];
  }

  // Elmenti a szintek állapotát a localStorage-be
  saveMissions(missions: BoardField[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(missions));
  }

  // Beállítja egy szintet teljesítettként
  setMissionCompleted(missionId: number): void {
    const missions = this.loadMissions();
    const mission = missions.find(m => m.id === missionId);

    if (mission) {
      mission.completed = true;
      this.saveMissions(missions);
    }
  }

  // Ellenőrzi, hogy egy szint teljesítve van-e
  isMissionCompleted(missionId: number): boolean {
    const missions = this.loadMissions();
    const mission = missions.find(m => m.id === missionId);
    return mission ? mission.completed : false;
  }

  completeLevel(level : string
  )
  {
    localStorage.setItem("completedLevel", level)
  }
}
