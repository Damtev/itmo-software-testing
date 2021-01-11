import { Express, Response } from 'express';
import MotivationNoteController from "./controller/MotivationNoteController";

const motivationNoteController = new MotivationNoteController()

export function setupRoutes(app: Express): void {
  app.get("/random", (req, res) => motivationNoteController.getRandom(req, res));
  app.post("/find", (req, res) => motivationNoteController.getBySubstring(req, res));
  app.post("/id", (req, res) => motivationNoteController.getById(req, res));
  app.all('*',
    (_, res: Response) =>
      res.sendStatus(404)
  );
}
