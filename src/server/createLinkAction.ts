"use server";

import { z } from "zod";

const schema = z.object({
  long: z.string().url("your url is invalid"),
  short: z
    .string()
    .min(4, "your short string must be at least 4 characters long")
    .optional(),
});

export default async function createLinkAction(
  initialState: any,
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    long: formData.get("long"),
    short: formData.get("short"),
  });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  return { message: "done" };
}
