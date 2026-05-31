import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
import { resolve } from "./sanity/presentation/resolve";

export default defineConfig({
  name: "desk-manager",
  title: "Desk Manager CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Landing Page Principal")
              .id("landingPage")
              .child(
                S.document()
                  .schemaType("landingPage")
                  .documentId("landing-page-singleton")
              ),
          ]),
    }),

    // Preview em tempo real — abre o site ao lado do editor
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      name: "presentation",
      title: "Preview ao Vivo",
    }),

    visionTool({ defaultApiVersion: "2026-05-20" }),
  ],

  schema,
});
