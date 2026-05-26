import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Kindla projektijuur — vältib ülemise kausta (nt ~/package-lock.json) valimist */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
