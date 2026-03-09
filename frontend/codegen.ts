import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", "!src/lib/graphql/generated/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/lib/graphql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "graphql",
      },
      config: {
        useTypeImports: true
      }
    },
  },
};

export default config;
