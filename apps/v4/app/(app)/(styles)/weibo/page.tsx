import { type ReactNode } from "react"
import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/styles/radix-weibo/ui/button"
import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

const title = "Weibo Button Preview"
const description =
  "A focused preview for the Weibo Button style, including variants, states, light/dark tokens, and mobile/desktop layouts."

export const metadata: Metadata = {
  title,
  description,
}

export default function WeiboPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <main className="container-wrapper flex-1 px-0 pb-16">
        <div className="container flex flex-col gap-6 px-4 md:px-6">
          <section className="style-weibo grid gap-4 rounded-3xl border bg-white p-4 md:p-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Weibo Button
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The buttons below use the independent Weibo style tokens from
                <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                  style-weibo.css
                </code>
                and the generated radix-weibo Button component.
              </p>
            </div>

            <PreviewCard title="Variants & sizes">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Default</Button>
                <Button size="xs" variant="secondary">
                  Secondary
                </Button>
                <Button size="xs" variant="outline">
                  Outline
                </Button>
                <Button size="xs" variant="ghost">
                  Ghost
                </Button>
                <Button size="xs" variant="destructive">
                  Destructive
                </Button>
                <Button size="xs" variant="link">
                  Link
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button>Publish</Button>
                <Button variant="secondary">Followed</Button>
                <Button variant="outline">More</Button>
                <Button size="icon" aria-label="Open publish settings">
                  <IconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="Settings02Icon"
                    phosphor="GearSixIcon"
                    remixicon="RiSettings3Line"
                  />
                </Button>
              </div>
            </PreviewCard>

            <PreviewCard title="Light & dark">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-white p-4">
                  <div className="text-label-md mb-3">Light</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button>Publish</Button>
                    <Button variant="secondary">Followed</Button>
                    <Button variant="outline">More</Button>
                  </div>
                </div>
                <div className="dark style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-[#111] p-4">
                  <div className="text-label-md mb-3">Dark</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button>Publish</Button>
                    <Button variant="secondary">Followed</Button>
                    <Button variant="outline">More</Button>
                  </div>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard title="Mobile & desktop">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-white p-4">
                  <div className="text-label-md mb-3">Mobile actions</div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full">Post now</Button>
                    <Button className="w-full" variant="secondary">
                      Save draft
                    </Button>
                    <div className="flex gap-3">
                      <Button className="flex-1" variant="outline">
                        More
                      </Button>
                      <Button size="icon" aria-label="Open composer settings">
                        <IconPlaceholder
                          lucide="SettingsIcon"
                          tabler="IconSettings"
                          hugeicons="Settings02Icon"
                          phosphor="GearSixIcon"
                          remixicon="RiSettings3Line"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-white p-4">
                  <div className="text-label-md mb-3">Desktop toolbar</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Publish</Button>
                    <Button size="sm" variant="secondary">
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="More actions"
                    >
                      <IconPlaceholder
                        lucide="EllipsisIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalIcon"
                        phosphor="DotsThreeIcon"
                        remixicon="RiMoreLine"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </PreviewCard>
          </section>
        </div>
      </main>
    </>
  )
}

function PreviewCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-btn-gray-stroke rounded-2xl border bg-white p-4">
      <h3 className="text-label-lg mb-3 font-medium">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  )
}
