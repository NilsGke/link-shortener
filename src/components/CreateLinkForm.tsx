"use client";

import createLinkAction from "@/server/createLinkAction";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
import CopyButton from "./CopyButton";

export default function CreateLinkForm() {
  const [state, formAction] = useActionState(createLinkAction, {
    long: "",
    short: "",
  });
  const [ref] = useAutoAnimate();

  if (state.link !== undefined)
    return (
      <div className="flex flex-row flex-wrap items-center justify-center gap-6">
        <h2 className="text-2xl">Your Link:</h2>
        <pre className="px-4 py-4 rounded-lg border border-zinc-600 bg-zinc-900 text-white flex justify-center items-center gap-4">
          {state.link}
          <CopyButton text={state.link} />
        </pre>
      </div>
    );

  return (
    <form action={formAction} ref={ref} className="flex flex-col gap-4 ">
      <label className="flex gap-6 justify-between items-center flex-wrap">
        Your URL
        <input
          defaultValue={state.long}
          name="long"
          type="url"
          className="bg-black text-white p-1 rounded border border-1 border-zinc-500 placeholder:text-zinc-600 w-[410px]"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          required
        />
      </label>
      {state?.error?.long && (
        <p className="text-red-400 text-sm">{state.error.long}</p>
      )}

      <label className="flex gap-6 justify-between items-center flex-wrap">
        Desired URL (optional)
        <input
          defaultValue={state.short}
          name="short"
          type="text"
          className="bg-black text-white p-1 rounded border border-1 border-zinc-500 placeholder:text-zinc-600"
          placeholder="rckrl"
        />
      </label>
      {state?.error?.short && (
        <p className="text-red-400 text-sm">{state.error.short}</p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(
        "bg-black text-white p-1 rounded border  border-zinc-500 hover:bg-zinc-800 transition-colors",
        pending &&
          "bg-zinc-700 animate-pulse cursor-default hover:bg-zinc-700 text-zin-400"
      )}
    >
      submit
    </button>
  );
}
