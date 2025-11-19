import type { Prompt } from "./types"

// Claude-Optimized Frameworks (5)
export const claudeFrameworks: Omit<Prompt, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Claude XML Structure Pattern",
    template: `<context>
{context}
</context>

<task>
{task}
</task>

<format>
{format}
</format>

<constraints>
{constraints}
</constraints>

<examples>
{examples}
</examples>`,
    variables: [
      {
        id: "context",
        name: "context",
        type: "textarea",
        placeholder: "Background information and situation...",
      },
      {
        id: "task",
        name: "task",
        type: "textarea",
        placeholder: "What needs to be accomplished...",
      },
      {
        id: "format",
        name: "format",
        type: "text",
        placeholder: "Desired output format (JSON, markdown, etc.)",
      },
      {
        id: "constraints",
        name: "constraints",
        type: "textarea",
        placeholder: "Rules, limitations, and requirements...",
        defaultValue: "",
      },
      {
        id: "examples",
        name: "examples",
        type: "textarea",
        placeholder: "Optional: Provide examples...",
        defaultValue: "",
      },
    ],
    tags: ["claude", "xml", "structured", "advanced"],
    category: "frameworks",
  },
  {
    name: "Claude Response Prefilling",
    template: `{instruction}

{context}
