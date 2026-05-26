"use client";

import { useRouter } from "next/navigation";
import { formatEuro } from "@/lib/format";
import {
  pricePerPortion,
  recipeToShoppingListText,
  type Recipe,
} from "@/lib/recipes";
import { setShoppingListPrefill } from "@/lib/shoppingListPrefill";
import { Card } from "./ui/Card";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const perPortion = pricePerPortion(recipe);

  function handleAddToList() {
    setShoppingListPrefill(recipeToShoppingListText(recipe));
    router.push("/app");
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-5">
        <h2 className="text-lg font-bold text-slate-900">{recipe.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          {recipe.description}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3 text-center">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Portsjonid
            </dt>
            <dd className="mt-0.5 text-base font-bold text-slate-900">
              {recipe.portions}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Kokku
            </dt>
            <dd className="mt-0.5 text-base font-bold text-emerald-700">
              {formatEuro(recipe.estimatedTotalEuro)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              / portsjon
            </dt>
            <dd className="mt-0.5 text-base font-bold text-slate-900">
              {formatEuro(perPortion)}
            </dd>
          </div>
        </dl>

        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Koostisosad
        </h3>
        <ul className="mt-2 space-y-1.5">
          {recipe.ingredients.map((item) => (
            <li
              key={item.name}
              className="flex justify-between gap-3 text-sm text-slate-700"
            >
              <span>{item.name}</span>
              <span className="shrink-0 text-slate-500">{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 bg-emerald-50/40 p-4">
        <button
          type="button"
          onClick={handleAddToList}
          className="btn-primary w-full"
        >
          Lisa ostunimekirja
        </button>
      </div>
    </Card>
  );
}
