import MotivationNote from "../model/MotivationNote";
import { Request, Response } from "express";

export default class MotivationNoteController {
  private notes: MotivationNote[] = [];

  constructor() {
    this.parseNotes();
  }

  async getRandom(_: Request, response: Response) {
    const random = Math.floor(Math.random() * this.notes.length);
    const note: MotivationNote = this.notes[random];
    console.log(note);
    response.send(note);
  }

  async getBySubstring(request: Request, response: Response) {
    const substring: string = Object.keys(request.body)[0];
    let result: MotivationNote[] = [];
    console.log(substring);
    this.notes.forEach(function (value) {
      if (value.text !== undefined) {
        if (value.text.includes(substring)) {
          console.log(value.text);
          console.log(value.text.indexOf(substring));
          result.push(value);
        }
      }
    });
    console.log(result);
    response.send(result);
  }

    async getById(request: Request, response: Response) {
        const id: number = parseInt(Object.keys(request.body)[0]);
        let result: MotivationNote | null = null;
        console.log(id);
        if (id >= 1 && id < this.notes.length) {
            result = this.notes[id];
        }
        console.log(result);
        response.send(result);
    }

  parseNotes() {
    const filename: string = '../../notes.json';
    let json = require(filename);
    const keys = Object.keys(json);
    for (const key in keys) {
      this.notes.push(new MotivationNote(Number.parseInt(key), json[key]));
    }
  }
}
