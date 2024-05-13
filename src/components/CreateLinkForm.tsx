"use client";

import createLinkAction from "@/server/createLinkAction";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function CreateLinkForm() {
  const [state, formAction] = useActionState(createLinkAction, null);

  return (
    <form action={formAction}>
      <label>
        Your URL
        <input type="url" required />
      </label>

      <label>
        Optional short text
        <input type="text" />
      </label>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending, method } = useFormStatus();

  return (
    <>
      <button type="submit">submit</button>
      {pending && "pending..."}
    </>
  );
}
