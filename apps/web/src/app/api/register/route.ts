import { RegisterSchema } from '@/schemas/auth.schema';
import { db } from '@repo/db';

import { hash } from '@/lib/bcrypt';

export async function POST(req: Request) {
  const body = await req.json();

  const parsedBody = RegisterSchema.safeParse(body);
  if (!parsedBody.success)
    return Response.json(parsedBody.error, { status: 400 });

  const { email, password } = parsedBody.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser)
    return Response.json({ message: 'User already exists' }, { status: 400 });

  const hashedPassword = await hash(password);

  const createdUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return Response.json(createdUser, { status: 201 });
}
