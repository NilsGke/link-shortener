import CreateLinkForm from "@/components/CreateLinkForm";
import { db } from "@/server/db";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Link Shortener</h1>
      <CreateLinkForm />
    </main>
  );
}
