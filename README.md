# Säästukorv

Veebirakendus Eesti ostukorvi optimeerimiseks. Lisa ostunimekiri brauseris ja võrdle näidishindu Rimi, Selveri, Maxima, Prisma ja Lidl vahel.

> **Märkus:** Praegu kasutatakse demo/mock andmeid. Reaalajas hindade laadimist ega andmebaasi pole veel lisatud.

## Tehnoloogiad

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Käivitamine kohalikult

```bash
npm install
npm run dev
```

Ava [http://localhost:3000](http://localhost:3000)

## Deploy Vercelisse

1. Pushi projekt GitHubi (või GitLab / Bitbucket).
2. Mine [vercel.com](https://vercel.com) → **Add New Project**.
3. Impordi repo — Vercel tuvastab Next.js automaatselt.
4. Jäta vaike seaded:
   - **Build Command:** `npm run build`
   - **Output:** Next.js default
5. Klõpsa **Deploy**.

Soovituslik CLI viis:

```bash
npm i -g vercel
vercel
```

Tootmisbuild enne deploy’d:

```bash
npm run build
npm run start
```

## Lehed

| Tee | Kirjeldus |
|-----|-----------|
| `/` | Avaleht |
| `/app` | Ostunimekirja võrdlus |
| `/stores` | Poed |
| `/hinnad` | Hinnakiri |
| `/pricing` | Paketid |

## Projekti struktuur

```
src/
  app/              # App Router lehed
  components/       # UI (layout, landing, tulemused)
  lib/              # mock andmed, optimizer
```
