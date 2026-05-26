# Säästukorv

**Responsiivne veebiäpp** Eesti ostukorvi võrdluseks. Kasutaja sisestab ostunimekirja brauseris; rakendus võrdleb näidishindu (Rimi, Selver, Maxima, Prisma, Lidl), soovitab toote kaupa, kus osta, näitab kogumaksumust, säästu ja poe jaotust.

Töötab hästi **lauaarvutis, sülearvutis, tahvlis ja telefoni brauseris** — installimist pole vaja.

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

Ava brauseris: **[http://localhost:3000](http://localhost:3000)**

Tootmisbuild:

```bash
npm run build
npm run start
```

## Lehed

| Tee | Kirjeldus |
|-----|-----------|
| `/` | Avaleht |
| `/app` | Ostunimekirja võrdlus ja ostuplaan |
| `/stores` | Poed |
| `/hinnad` | Tootehinnad |
| `/recipes` | Retseptid → ostunimekiri |
| `/alerts` | Pakkumise alarmid (MVP placeholder) |
| `/pricing` | Paketid |
| `/poed` | Suunab → `/stores` |

## Projekti struktuur

```
src/
  app/              # App Router lehed
  components/       # UI (layout, landing, tulemused)
  lib/              # mock andmed, optimizer, retseptid
```

## Deploy Vercelisse

1. Pushi projekt GitHubi.
2. [vercel.com](https://vercel.com) → **Add New Project** → impordi repo.
3. Vaike seaded: `npm run build`, Next.js output.
4. **Deploy**.

```bash
npm i -g vercel
vercel
```
