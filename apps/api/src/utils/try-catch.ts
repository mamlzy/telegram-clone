import { NextFunction, Request, Response } from 'express';

// import { removeRequestFile } from './remove-request-file';

export const tryCatch =
  (controller: any) =>
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
