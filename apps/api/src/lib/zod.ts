import { type Request } from 'express';
import { z, ZodArray, ZodEffects, ZodUndefined, type AnyZodObject } from 'zod';

export const generateRequestSchema = <
  Params extends AnyZodObject | ZodUndefined,
  Body extends
    | AnyZodObject
    | ZodEffects<AnyZodObject>
    | ZodArray<AnyZodObject>
    | ZodUndefined,
  Query extends AnyZodObject | ZodUndefined,
>({
  req,
  paramsSchema,
  bodySchema,
  querySchema,
}: {
  req: Request;
  paramsSchema?: Params;
  bodySchema?: Body;
  querySchema?: Query;
}) => {
  return z
    .object({
      params: paramsSchema || z.any(),
      body: bodySchema || z.any(),
      query: querySchema || z.any(),
    })
    .parse(req) as {
    params: z.infer<Params>;
    body: z.infer<Body>;
    query: z.infer<Query>;
  };
};
