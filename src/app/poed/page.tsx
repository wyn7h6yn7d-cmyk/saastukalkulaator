import { redirect } from "next/navigation";

/** Legacy route — use /stores */
export default function PoedRedirectPage() {
  redirect("/stores");
}
