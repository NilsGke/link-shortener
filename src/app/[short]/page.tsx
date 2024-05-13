import Spoiler from "@/components/Spoiler";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export default async function page({
  params: { short },
}: {
  params: { short: string };
}) {
  const link = await db.link.findFirst({ where: { short } });

  if (link === null)
    return (
      <div className="size-full flex justify-center items-center">
        <h1 className="text-2xl">404 - Link not found</h1>
      </div>
    );

  // prevent a link pointing to itself
  if (
    new URL(link.long).toString() ===
    new URL(process.env.NEXT_PUBLIC_APP_URL + "/" + link.short).toString()
  )
    return (
      <div className="flex  justify-center items-center size-full">
        <p className="text-center">
          Nope! I got this one. <br />
          But there is still a way to create an infinite loop. <br />
          Here is how: <Spoiler>Use two links that point to each other</Spoiler>
        </p>
      </div>
    );

  redirect(link.long);
}
