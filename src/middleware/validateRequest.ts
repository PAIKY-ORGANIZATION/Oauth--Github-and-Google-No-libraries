import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError, InternalException, UnprocessableEntity } from 'custom-exceptions-express';

//prettier-ignore
type ControllerFunction = (req: Request<any>, res: Response,next: NextFunction) => Promise<void>;


//prettier-ignore
export const validate = (controller: ControllerFunction, schema?: AnyZodObject,  ) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {

			if (schema) {
				schema.parse(req);
			}

			await controller(req, _res, next);

			next();
		} catch (e) {
			
			console.log(e);
			

			let exception;
			if (e instanceof AppError) {
				exception = e;
			} else if (e instanceof ZodError) {
				//* Old version
				// const messages = Object.values(e.flatten().fieldErrors).flat();

				//* Jul-15-2025 - New, simpler, and apparently better one. Gives the same result, less code.
				const errorMessages = e.issues.map((issue) => issue.message);
				
				//* Jul-15-2025 - Here I send it in an array. But as long as you know it is a 422, you'll know how to parse it. 
				exception = new UnprocessableEntity(errorMessages);
				//* Jul-15-2025 - Here I just join by a comma for the message to be only a string.
				// exception = new UnprocessableEntity(errorMessages.join(', '));
			} 

            else {
				exception = new InternalException('Internal server error', (e as any).message);
			}

			next(exception);
		}
	};
};


