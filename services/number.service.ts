import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  
  
  // Függvény a kód kikereséséhez
   getCodeForNumber(number : number) {

    const numbers : { [key: number]: number } = {
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
    } else {
      throw new Error(`Invalid number: ${number}. Please provide a number between 1 and 9.`);
    }
  }
}
