import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      "@typescript-eslint/ban-types": [
        "warn",
        {
          extendDefaults: true,
          types: {
            object: {
              message: "Usa Record<string, unknown> en lugar de object",
              fixWith: "Record<string, unknown>",
            },
          },
        },
      ],
    },
  },
];

export default eslintConfig;
