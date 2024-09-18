import type { NextFunction, Request, Response } from 'express';

// import { removeRequestFile } from './remove-request-file';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const tryCatch =
  (controller: AsyncController): AsyncController =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err: any) {
      console.log('❌global err =>', err);
      /*
       * when error thrown,
       * if there is a file inserted,
       * please, remove the file
       */
      // removeRequestFile(req);
      next(err);
    }
  };
