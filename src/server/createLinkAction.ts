"use server";

import { z } from "zod";
import { db } from "./db";

export default async function createLinkAction(
  initialState: any,
  formData: FormData
): Promise<{
  error?: {
    long?: string;
    short?: string;
  };
  long?: string;
  short?: string;

  link?: string;
}> {
  const long = z
    .string()
    .url("your url is invalid")
    .safeParse(formData.get("long"));

  const short = z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9-]*$/,
      "your short url can only contain a-z, A-Z, 0-9 and -"
    )
    .refine((str) => str.length === 0 || str.length >= 4, {
      message: "your short url should be at least 4 characters",
    })
    .safeParse(formData.get("short"));

  if (!long.success) {
    const recoveredLong = formData.get("long");
    console.log(long.error.flatten());
    return {
      error: {
        long:
          long.error.flatten().formErrors.at(0) ||
          "fieldError in long no success: " +
            JSON.stringify(long.error.flatten().fieldErrors),
      },
      long:
        typeof recoveredLong === "string"
          ? recoveredLong
          : undefined || undefined,
    };
  }

  if (!short.success)
    return {
      error: {
        short:
          short.error.flatten().formErrors.at(0) ||
          "fieldError in short no success: " +
            JSON.stringify(short.error.flatten().fieldErrors),
      },
      long: long.data,
    };

  const data = {
    long: long.data,
    short: short.data || undefined,
  };

  if (data.short !== undefined) {
    // check if short is taken
    const existingShortLink = await db.link.findFirst({
      where: { short: data.short },
    });
    if (existingShortLink !== null)
      return {
        error: { short: "This URL does already exist" },
        short: data.short,
        long: data.long,
      };
  } else {
    // check if link with same long already exists (save db space)
    const existingLongLink = await db.link.findFirst({
      where: {
        long: data.long,
      },
    });
    if (existingLongLink !== null)
      return {
        link: new URL(
          "/" + existingLongLink.short,
          process.env.NEXT_PUBLIC_APP_URL
        ).toString(),
        ...data,
      };
  }

  console.log("short:", data.short);
  const res = await db.link.create({ data });
  console.log(res);

  return {
    link: new URL("/" + res.short, process.env.NEXT_PUBLIC_APP_URL).toString(),
    ...data,
  };
}
