import React from "react";
import { notFound } from "next/navigation";
import { MOCK_EVENTS } from "@/lib/data/mockData";
import { EventDetailClient } from "./EventDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = MOCK_EVENTS.find((e) => e.slug === slug);
  if (!event) {
    return { title: "Event Not Found | CESSPA" };
  }
  return {
    title: `${event.title} | CESSPA Events`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = MOCK_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
