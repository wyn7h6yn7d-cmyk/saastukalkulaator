import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import { PAGE_CONTAINER, WebLayout } from "@/components/layout/WebLayout";
import { RECIPES } from "@/lib/recipes";

export const metadata = {
  title: "Retseptid — Säästukorv",
  description: "Vali retsept ja lisa koostisosad ostunimekirja.",
};

export default function RecipesPage() {
  return (
    <WebLayout>
      <div className={PAGE_CONTAINER}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Retseptid</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Vali lihtne retsept ja lisa koostisosad otse võrdlusesse. Hinnad on
            näidishinnad (odavaim pood demoandmetes).
          </p>
        </header>

        <ul className="space-y-5">
          {RECIPES.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-slate-400">
          Juba oma nimekiri?{" "}
          <Link href="/app" className="font-medium text-emerald-700 underline">
            Mine võrdlema
          </Link>
        </p>
      </div>
    </WebLayout>
  );
}
