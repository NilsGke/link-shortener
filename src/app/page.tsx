import CreateLinkForm from "@/components/CreateLinkForm";
import { db } from "@/server/db";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-3xl">Link Shortener</h1>
      <CreateLinkForm />

      <a href="/l" className="text-zinc-500 underline hover:text-blue-700">
        Link List
      </a>
    </main>
  );
}
