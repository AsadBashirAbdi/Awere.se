import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { workItems } from "@/content/work";
import { processSteps } from "@/content/process";

export function getSiteConfig() {
  return siteConfig;
}

export function getServices() {
  return services;
}

export function getWorkItems() {
  return workItems;
}

export function getWorkItemBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getProcess() {
  return processSteps;
}

