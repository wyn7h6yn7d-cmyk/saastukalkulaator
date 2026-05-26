"use client";

import { useRouter } from "next/navigation";
import { formatEuro } from "@/lib/format";
import {
  pricePerPortion,
  recipeToShoppingListText,
  type Recipe,
} from "@/lib/recipes";
import { Card } from "./ui/Card";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const perPortion = pricePerPortion(recipe);

  function handleAddToList() {
    const list = recipeToShoppingListText(recipe);
    const params = new URLSearchParams({ from: "recipe", list });
    router.push(`/app?${params.toString()}`);
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-5">
        <h2 className="text-lg font-bold text-ink">{recipe.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {recipe.description}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-page p-3 text-center">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Portsjonid
            </dt>
            <dd className="mt-0.5 text-base font-bold text-ink">
              {recipe.portions}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Kokku
            </dt>
            <dd className="mt-0.5 text-base font-bold text-brand">
              {formatEuro(recipe.estimatedTotalEuro)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              / portsjon
            </dt>
            <dd className="mt-0.5 text-base font-bold text-ink">
              {formatEuro(perPortion)}
            </dd>
          </div>
        </dl>

        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
          Koostisosad
        </h3>
        <ul className="mt-2 space-y-1.5">
          {recipe.ingredients.map((item) => (
            <li
              key={item.name}
              className="flex justify-between gap-3 text-sm text-ink"
            >
              <span>{item.name}</span>
              <span className="shrink-0 text-muted">{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border bg-brand-light/50 p-4">
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
