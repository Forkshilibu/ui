"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Button, buttonVariants } from "@/registry/bases/base/ui/button"
import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

export default function ButtonExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1 2xl:grid-cols-1">
      <ButtonVariantsAndSizes />
      <ButtonIconRight />
      <ButtonIconLeft />
      <ButtonIconOnly />
      <ButtonStates />
      <ButtonThemes />
      <ButtonMobileAndDesktop />
      <ButtonInvalidStates />
      <ButtonExamples />
    </ExampleWrapper>
  )
}

function ButtonVariantsAndSizes() {
  return (
    <Example title="Variants & Sizes">
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
        <Button size="sm">Default</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          Destructive
        </Button>
        <Button size="sm" variant="link">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">Default</Button>
        <Button size="lg" variant="secondary">
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          Destructive
        </Button>
        <Button size="lg" variant="link">
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconRight() {
  return (
    <Example title="Icon Right">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">
          Default
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="sm" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button>
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconLeft() {
  return (
    <Example title="Icon Left">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="xs" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="xs" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="xs" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="xs" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="xs" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="sm" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="sm" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button>
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="lg" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="lg" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconOnly() {
  return (
    <Example title="Icon Only">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-xs" aria-label="Default icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-xs"
          variant="secondary"
          aria-label="Secondary icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-xs"
          variant="outline"
          aria-label="Outline icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-xs" variant="ghost" aria-label="Ghost icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-xs"
          variant="destructive"
          aria-label="Destructive icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-xs" variant="link" aria-label="Link icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-sm" aria-label="Default icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-sm"
          variant="secondary"
          aria-label="Secondary icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-sm"
          variant="outline"
          aria-label="Outline icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="Ghost icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-sm"
          variant="destructive"
          aria-label="Destructive icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-sm" variant="link" aria-label="Link icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon" aria-label="Default icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          aria-label="Secondary icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon" variant="outline" aria-label="Outline icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Ghost icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          aria-label="Destructive icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon" variant="link" aria-label="Link icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-lg" aria-label="Default icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-lg"
          variant="secondary"
          aria-label="Secondary icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-lg"
          variant="outline"
          aria-label="Outline icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-lg" variant="ghost" aria-label="Ghost icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button
          size="icon-lg"
          variant="destructive"
          aria-label="Destructive icon button"
        >
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button size="icon-lg" variant="link" aria-label="Link icon button">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonExamples() {
  return (
    <Example title="Examples">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            Submit{" "}
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive">Delete</Button>
          <Button size="icon" aria-label="Default icon button">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            />
          </Button>
        </div>
        <a href="#" className={buttonVariants()}>
          Link
        </a>
      </div>
    </Example>
  )
}

function ButtonStates() {
  return (
    <Example title="States">
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="ghost" disabled>
          Disabled
        </Button>
        <Button variant="destructive" disabled>
          Disabled
        </Button>
        <Button variant="link" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled aria-busy="true">
          Loading…
        </Button>
        <Button variant="secondary" disabled aria-busy="true">
          Loading…
        </Button>
        <Button variant="outline" disabled aria-busy="true">
          Loading…
        </Button>
        <Button size="icon" disabled aria-busy="true" aria-label="Loading">
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="SpinnerIcon"
            remixicon="RiLoader2Line"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonThemes() {
  return (
    <Example title="Light & Dark">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-white p-4">
          <div className="text-label-md mb-3">Light</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Publish</Button>
            <Button variant="secondary">Followed</Button>
            <Button variant="outline">More</Button>
          </div>
        </div>
        <div className="dark style-weibo border-btn-gray-stroke text-c-content rounded-2xl border bg-[#151515] p-4">
          <div className="text-label-md mb-3">Dark</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Publish</Button>
            <Button variant="secondary">Followed</Button>
            <Button variant="outline">More</Button>
          </div>
        </div>
      </div>
    </Example>
  )
}

function ButtonMobileAndDesktop() {
  return (
    <Example title="Mobile & Desktop">
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
            <Button size="icon-sm" variant="ghost" aria-label="More actions">
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
    </Example>
  )
}

function ButtonInvalidStates() {
  return (
    <Example title="Invalid States">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs" aria-invalid="true">
          Default
        </Button>
        <Button size="xs" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="xs" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="xs" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="xs" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="xs" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" aria-invalid="true">
          Default
        </Button>
        <Button size="sm" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="sm" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="sm" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="sm" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="sm" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button aria-invalid="true">Default</Button>
        <Button variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg" aria-invalid="true">
          Default
        </Button>
        <Button size="lg" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="lg" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="lg" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="lg" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="lg" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
    </Example>
  )
}
