import MotivationNote from "@/model/MotivationNote";
import { axiosInstance } from "@/main";
import { AxiosResponse } from "axios";

export class MotivationNoteService {
  private static notes: Map<number, MotivationNote> = new Map();

  static getNotes(): MotivationNote[] {
    const result: MotivationNote[] = [];
    this.notes.forEach(function(value) {
      result.push(value);
    });
    return result;
  }

  static addNote(motivationNote: MotivationNote) {
    MotivationNoteService.notes.set(motivationNote.id, motivationNote);
  }

  static async getRandomMotivationNote() {
    const response: AxiosResponse<MotivationNote> = await axiosInstance.get(
      `/random`
    );
    const responseData = response.data;
    MotivationNoteService.notes.set(responseData.id, responseData);
  }

  static async findMotivationNotes(substring: string) {
    const response: AxiosResponse<MotivationNote[]> = await axiosInstance.post(
      "/find",
      substring
    );
    const responseData = response.data;
    for (const note of responseData) {
      MotivationNoteService.notes.set(note.id, note);
    }
  }

  static async findMotivationNoteById(id: number) {
    const response: AxiosResponse<MotivationNote | null> = await axiosInstance.post(
      "/id",
      id
    );
    const note: MotivationNote | null = response.data;
    if (note) {
      MotivationNoteService.notes.set(note.id, note);
    }
  }

  static getMotivationNoteById(motivationNoteId: number): MotivationNote {
    return MotivationNoteService.notes.get(motivationNoteId)!!;
  }
}
