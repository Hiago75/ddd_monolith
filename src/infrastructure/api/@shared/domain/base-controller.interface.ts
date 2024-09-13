import { Request, Response } from "express";

export default interface BaseControllerInteface {
  handle(request: Request, response: Response): Promise<void>;
}