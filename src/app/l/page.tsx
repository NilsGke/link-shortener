// table of all links

import { db } from "@/server/db";

export default async function Links() {
  const links = await db.link.findMany();

  return (
    <div className="w-full max-w-md mx-auto text-center  ">
      {/* back button */}
      <a href="/" className="text-blue-500 hover:text-blue-700">
        Back
      </a>

      <table className="w-full text-left border-collapse border border-zinc-600 rounded-md">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2 border border-zinc-700">Short URL</th>
            <th className="px-4 py-2 border border-zinc-700">Long URL</th>
            <th className="px-4 py-2 border border-zinc-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.short}>
              <td className="px-4 py-2 border border-zinc-700">{link.short}</td>
              <td className="px-4 py-2 border border-zinc-700">{link.long}</td>
              <td className="px-4 py-2 border border-zinc-700">
                <a
                  href={link.long}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
