import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    rules: {
      "no-case-declarations": "off",
    },
    languageOptions: { globals: globals.browser },
  },
];
