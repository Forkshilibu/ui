#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import { join } from "node:path"

const root = process.cwd()

const requiredFiles = [
  "apps/v4/app/globals.css",
  "apps/v4/app/style-registry.css",
  "apps/v4/registry/styles/style-weibo.css",
  "apps/v4/public/r/styles/base-weibo/index.json",
  "apps/v4/public/r/styles/base-weibo/button.json",
  "apps/v4/public/r/styles/base-weibo/button-example.json",
  "apps/v4/public/r/styles/radix-weibo/index.json",
  "apps/v4/public/r/styles/radix-weibo/button.json",
  "apps/v4/public/r/styles/radix-weibo/button-example.json",
  "apps/v4/registry/bases/base/examples/button-example.tsx",
  "apps/v4/registry/bases/radix/examples/button-example.tsx",
  "apps/v4/styles/base-weibo/ui/button.tsx",
  "apps/v4/styles/radix-weibo/ui/button.tsx",
]

const appWiringTokens = {
  "apps/v4/app/globals.css": [
    "@custom-variant style-weibo (&:where(.style-weibo *));",
  ],
  "apps/v4/app/style-registry.css": [
    '@import "../registry/styles/style-weibo.css" layer(base);',
  ],
}

const buttonTokenClasses = [
  "text-c-content",
  "focus-visible:border-c-focus",
  "focus-visible:shadow-orange-glow",
  "from-btn-orange-a",
  "to-btn-orange-b",
  "active:from-btn-orange-pressed-a",
  "active:to-btn-orange-pressed-b",
  "bg-btn-gray",
  "border-btn-gray-stroke",
  "text-label-lg",
  "min-h-11",
]

const buttonExampleTokens = [
  "<ButtonThemes />",
  "<ButtonMobileAndDesktop />",
  "function ButtonThemes()",
  "function ButtonMobileAndDesktop()",
  'Example title="Light & Dark"',
  'Example title="Mobile & Desktop"',
  "Mobile actions",
  "Desktop toolbar",
  'aria-label="Open composer settings"',
  'aria-label="More actions"',
  'className="dark style-weibo',
  'aria-label="Default icon button"',
  'aria-busy="true"',
]

const styleTokens = [
  "--color-c-content: var(--w-c-content);",
  "--color-btn-orange-a: var(--w-btn-orange-a);",
  "--shadow-orange-glow: var(--w-shadow-orange-glow);",
  "--w-c-brand: #ff8200;",
  "&.dark,",
]

function includesAll(content, tokens, label, file) {
  const missing = tokens.filter((token) => !content.includes(token))

  if (missing.length > 0) {
    throw new Error(`${label} missing in ${file}: ${missing.join(", ")}`)
  }
}

async function readRequired(file) {
  return readFile(join(root, file), "utf8")
}

function toRegistryExampleContent(content, kind) {
  return content.replaceAll(
    `@/registry/bases/${kind}/`,
    `@/registry/${kind}-weibo/`
  )
}

async function main() {
  const fileContents = new Map()

  for (const file of requiredFiles) {
    fileContents.set(file, await readRequired(file))
  }

  for (const [file, tokens] of Object.entries(appWiringTokens)) {
    includesAll(
      fileContents.get(file),
      tokens,
      "weibo app stylesheet wiring",
      file
    )
  }

  includesAll(
    fileContents.get("apps/v4/registry/styles/style-weibo.css"),
    styleTokens,
    "style token",
    "apps/v4/registry/styles/style-weibo.css"
  )

  const registryTargets = [
    "apps/v4/public/r/styles/base-weibo/button.json",
    "apps/v4/public/r/styles/radix-weibo/button.json",
    "apps/v4/styles/base-weibo/ui/button.tsx",
    "apps/v4/styles/radix-weibo/ui/button.tsx",
  ]

  for (const file of registryTargets) {
    includesAll(
      fileContents.get(file),
      buttonTokenClasses,
      "button token class",
      file
    )
  }

  const baseButtonRegistry = JSON.parse(
    fileContents.get("apps/v4/public/r/styles/base-weibo/button.json")
  )
  const radixButtonRegistry = JSON.parse(
    fileContents.get("apps/v4/public/r/styles/radix-weibo/button.json")
  )

  includesAll(
    JSON.stringify(baseButtonRegistry.dependencies ?? []),
    ["class-variance-authority"],
    "base button dependency",
    "apps/v4/public/r/styles/base-weibo/button.json"
  )

  includesAll(
    JSON.stringify(radixButtonRegistry.dependencies ?? []),
    ["class-variance-authority", "radix-ui"],
    "radix button dependency",
    "apps/v4/public/r/styles/radix-weibo/button.json"
  )

  const buttonExampleFiles = [
    "apps/v4/registry/bases/base/examples/button-example.tsx",
    "apps/v4/registry/bases/radix/examples/button-example.tsx",
  ]

  for (const file of buttonExampleFiles) {
    includesAll(
      fileContents.get(file),
      buttonExampleTokens,
      "button example coverage",
      file
    )
  }

  const buttonExampleRegistries = [
    {
      kind: "base",
      registryFile: "apps/v4/public/r/styles/base-weibo/button-example.json",
      sourceFile: "apps/v4/registry/bases/base/examples/button-example.tsx",
    },
    {
      kind: "radix",
      registryFile: "apps/v4/public/r/styles/radix-weibo/button-example.json",
      sourceFile: "apps/v4/registry/bases/radix/examples/button-example.tsx",
    },
  ]

  for (const { kind, registryFile, sourceFile } of buttonExampleRegistries) {
    const item = JSON.parse(fileContents.get(registryFile))
    const exampleFile = item.files?.find((entry) =>
      entry.path?.endsWith("examples/button-example.tsx")
    )

    if (!exampleFile?.content) {
      throw new Error(
        `${registryFile} must include the button example source content`
      )
    }

    const expectedContent = toRegistryExampleContent(
      fileContents.get(sourceFile),
      kind
    )

    if (exampleFile.content !== expectedContent) {
      throw new Error(
        `${registryFile} embedded button example content is out of sync with ${sourceFile}`
      )
    }

    includesAll(
      exampleFile.content,
      buttonExampleTokens,
      "button example registry coverage",
      registryFile
    )
  }

  const radixIndex = JSON.parse(
    fileContents.get("apps/v4/public/r/styles/radix-weibo/index.json")
  )
  const baseIndex = JSON.parse(
    fileContents.get("apps/v4/public/r/styles/base-weibo/index.json")
  )

  if (radixIndex.name !== "index" || baseIndex.name !== "index") {
    throw new Error(
      "weibo registry indexes must expose registry index metadata"
    )
  }

  const registryStyleTokens = [
    "@theme inline",
    ".style-weibo",
    "--color-btn-orange-a",
    "--w-btn-orange-a",
    "&.dark, .dark &",
  ]

  for (const [label, item] of [
    ["radix-weibo", radixIndex],
    ["base-weibo", baseIndex],
  ]) {
    includesAll(
      JSON.stringify(item.css ?? {}),
      registryStyleTokens,
      `${label} registry style token`,
      `apps/v4/public/r/styles/${label}/index.json`
    )
  }

  console.log(
    "weiboUI registry artifacts and Button examples are ready for Next and Vite validation."
  )
}

await main()
