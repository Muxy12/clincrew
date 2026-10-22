/**
 * SERVICES CONFIGURATION
 * -------------------------------------------------------------------------
 * Configurable service categories. Only services with `enabled: true` are
 * published. Descriptions live in the i18n message files (see `messages`
 * key below) so they are fully translated.
 *
 * IMPORTANT: Only keep enabled the services Mohamed confirms he offers.
 * Wording deliberately avoids implying regulatory authority or
 * responsibilities that have not been confirmed.
 */

import type { LucideIcon } from "lucide-react";
import {
  Target,
  ShieldCheck,
  Workflow,
  FileText,
  Users,
  Rocket,
} from "lucide-react";

export interface ServiceConfig {
  readonly id: string;
  readonly enabled: boolean;
  readonly icon: LucideIcon;
  /** Key under `services.items.<messages>` in the i18n JSON files. */
  readonly messages: string;
}

export const services: ReadonlyArray<ServiceConfig> = [
  { id: "monitoring", enabled: true, icon: Target, messages: "monitoring" },
  {
    id: "site-management",
    enabled: true,
    icon: Users,
    messages: "siteManagement",
  },
  {
    id: "documentation",
    enabled: true,
    icon: FileText,
    messages: "documentation",
  },
  { id: "quality", enabled: true, icon: ShieldCheck, messages: "quality" },
  {
    id: "coordination",
    enabled: true,
    icon: Workflow,
    messages: "coordination",
  },
  { id: "startup", enabled: true, icon: Rocket, messages: "startup" },
];

export const enabledServices = services.filter((s) => s.enabled);
