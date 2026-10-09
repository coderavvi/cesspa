import React from "react";
import { notFound } from "next/navigation";
import { MOCK_NEWS } from "@/lib/data/mockData";
import { BlogDetailClient } from "./BlogDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_NEWS.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_NEWS.find((n) => n.slug === slug);
  if (!article) {
    return { title: "Article Not Found | CESSPA" };
  }
  return {
    title: `${article.title} | CESSPA Publications`,
    description: article.summary,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = MOCK_NEWS.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailClient article={article} />;
}
