"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SmartSuiteListResponse, SmartSuiteTrailerRecord } from "@/lib/smartsuite";
import placeholderImage from "../../../../public/placeholder-image.svg";

// Consignment field keys from consignment-table.txt
const IMAGE_FIELD_KEY = "s8ba924997"; // Correct image field key for consignments
const CATEGORY_FIELD_KEY = "se69701513"; // Corrected category key
const VIN_FIELD_KEY = "s01296f69c";
const MANUFACTURER_FIELD_KEY = "s47d53952b";
const MODEL_FIELD_KEY = "s96205b0ac";
const PRICE_FIELD_KEY = "sbbb93f261";
const DAYS_FLOORED_FIELD_KEY = "s1b1cec23a"; // Using same as in-stock (may need updating)
const LOCATION_FIELD_KEY = "s3aa410cc9";
const UNIT_COST_FIELD_KEY = "s1997bcaae";
const MINIMUM_SALE_PRICE_FIELD_KEY = "sb81046a0c";
const WEBSITE_LINK_FIELD_KEY = "s22a3610bf";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function findFirstUrl(value: unknown): string | null {
  if (typeof value === "string") {
    return value.startsWith("http") ? value : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstUrl(item);
      if (found) {
        return found;
      }
    }
    return null;
  }

  if (typeof value === "object" && value !== null) {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      const found = findFirstUrl((value as Record<string, unknown>)[key]);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function extractImageUrl(record: SmartSuiteTrailerRecord): string | null {
  const rawValue = record[IMAGE_FIELD_KEY];

  if (!rawValue) {
    return null;
  }

  if (typeof rawValue === "string") {
    return rawValue;
  }

  if (Array.isArray(rawValue)) {
    const [first] = rawValue;
    if (typeof first === "string") {
      return first;
    }
    if (first && typeof first === "object" && "url" in first && typeof first.url === "string") {
      return first.url;
    }
  }

  if (typeof rawValue === "object" && rawValue !== null) {
    const value = rawValue as Record<string, unknown>;
    if (typeof value.url === "string") {
      return value.url;
    }
    if (typeof value.src === "string") {
      return value.src;
    }
    if (Array.isArray(value.value)) {
      const [first] = value.value as unknown[];
      if (first && typeof first === "object" && "url" in (first as Record<string, unknown>)) {
        const { url } = first as { url?: unknown };
        if (typeof url === "string") {
          return url;
        }
      }
      if (typeof first === "string") {
        return first;
      }
    }
    if (Array.isArray(value.files)) {
      const [first] = value.files as unknown[];
      if (first && typeof first === "object" && "url" in (first as Record<string, unknown>)) {
        const { url } = first as { url?: unknown };
        if (typeof url === "string") {
          return url;
        }
      }
    }
  }

  return findFirstUrl(rawValue);
}

function findFirstTextValue(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstTextValue(item);
      if (found) {
        return found;
      }
    }
    return null;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of ["value", "label", "title", "name"]) {
      const potential = record[key];
      if (typeof potential === "string") {
        const trimmed = potential.trim();
        if (trimmed) {
          return trimmed;
        }
      }
    }

    for (const child of Object.values(record)) {
      const found = findFirstTextValue(child);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function extractTextField(record: SmartSuiteTrailerRecord, fieldKey: string): string | null {
  return findFirstTextValue(record[fieldKey]);
}

function extractPrice(record: SmartSuiteTrailerRecord): number | null {
  const rawValue = record[PRICE_FIELD_KEY];
  const text = findFirstTextValue(rawValue);

  if (!text) {
    return null;
  }

  const parsed = Number.parseFloat(text.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function extractVin(record: SmartSuiteTrailerRecord): string | null {
  return extractTextField(record, VIN_FIELD_KEY);
}

function getDisplayTitle(record: SmartSuiteTrailerRecord, vin: string | null): {
  alt: string;
  display: string;
  show: boolean;
} {
  const rawTitle = typeof record.title === "string" ? record.title.trim() : "";
  const alt = rawTitle || vin || "Consignment trailer";
  const show = Boolean(rawTitle) && (!vin || rawTitle.toLowerCase() !== vin.toLowerCase());

  return {
    alt,
    display: rawTitle,
    show,
  };
}

const CATEGORY_KEYS = ["title", "label", "name"];

function collectCategoryTitles(value: unknown, results: Set<string>, keyHint?: string) {
  if (!value) {
    return;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const normalizedKey = keyHint?.toLowerCase();
    const looksLikeId = /^[0-9a-f]{20,}$/i.test(trimmed);

    if (
      trimmed &&
      !trimmed.startsWith("http") &&
      !looksLikeId &&
      (!keyHint || CATEGORY_KEYS.includes(normalizedKey ?? ""))
    ) {
      results.add(trimmed);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectCategoryTitles(item, results, keyHint);
    }
    return;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const [childKey, childValue] of Object.entries(record)) {
      const normalizedKey = childKey.toLowerCase();

      if (CATEGORY_KEYS.includes(normalizedKey)) {
        collectCategoryTitles(childValue, results, normalizedKey);
      } else {
        collectCategoryTitles(childValue, results, normalizedKey);
      }
    }
  }
}

function extractCategories(record: SmartSuiteTrailerRecord): string[] {
  const rawValue = record[CATEGORY_FIELD_KEY];
  if (!rawValue) {
    return [];
  }

  const results = new Set<string>();
  collectCategoryTitles(rawValue, results);
  return Array.from(results);
}

export function ConsignmentGrid() {
  const [records, setRecords] = useState<SmartSuiteTrailerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SmartSuiteTrailerRecord | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadConsignments() {
      try {
        setLoading(true);
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        const response = await fetch(`${basePath}/api/inventory/consignments`);

        if (!response.ok) {
          const message = await response
            .json()
            .then((payload) => {
              if (payload && typeof payload === "object") {
                const errorPayload = payload as { error?: unknown; details?: unknown };
                if (typeof errorPayload.error === "string") {
                  if (typeof errorPayload.details === "string") {
                    return `${errorPayload.error}: ${errorPayload.details}`;
                  }

                  return errorPayload.error;
                }

                if (typeof errorPayload.details === "string") {
                  return errorPayload.details;
                }
              }

              return null;
            })
            .catch(() => null);

          throw new Error(message ?? `Failed to load consignments (status ${response.status})`);
        }

        const payload = (await response.json()) as SmartSuiteListResponse<SmartSuiteTrailerRecord>;

        if (process.env.NODE_ENV === "development") {
          const sampleItems = payload.items?.slice(0, 3) ?? [];
          console.debug("Fetched consignment payload", sampleItems);
          console.debug(
            "Sample image field",
            sampleItems.map((item) => item?.[IMAGE_FIELD_KEY])
          );
          console.debug(
            "Sample category field",
            sampleItems.map((item) => item?.[CATEGORY_FIELD_KEY])
          );
          console.debug(
            "Sample status field",
            sampleItems.map((item) => item?.status)
          );
        }

        if (!isMounted) {
          return;
        }

        setRecords(payload.items ?? []);
        setSelectedRecord((prev) => {
          if (!prev) {
            return null;
          }

          const stillExists = payload.items?.find((item) => item.id === prev.id);
          return stillExists ?? null;
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadConsignments();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const lookup = new Map<string, string>();

    for (const record of records) {
      const recordCategories = extractCategories(record);
      for (const category of recordCategories) {
        const key = category.toLowerCase();
        if (!lookup.has(key)) {
          lookup.set(key, category);
        }
      }
    }

    const list = Array.from(lookup.values()).sort((a, b) => a.localeCompare(b));

    if (process.env.NODE_ENV === "development") {
      console.debug("Extracted categories", list);
    }

    return list;
  }, [records]);

  const filteredRecords = useMemo(() => {
    if (!activeCategory) {
      return records;
    }

    const activeKey = activeCategory.toLowerCase();
    return records.filter((record) => {
      const recordCategories = extractCategories(record);
      return recordCategories.some((category) => category.toLowerCase() === activeKey);
    });
  }, [records, activeCategory]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-slate-200 rounded-t-lg"></div>
            <div className="p-4 bg-white rounded-b-lg border border-slate-200">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">No consignment trailers found</p>
        <p className="text-sm text-slate-500 mt-1">Check back later for new inventory</p>
      </div>
    );
  }

  const totalCount = records.length;
  const filteredCount = filteredRecords.length;

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filteredCount}</span> of {totalCount} consignments
          {activeCategory && (
            <span className="ml-2 text-slate-500">
              in <span className="font-medium">{activeCategory}</span>
            </span>
          )}
        </p>
      </div>

      {/* Category filters with improved styling */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="-mx-2 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-2 py-2 scrollbar-hide">
          <Badge
            asChild
            variant={!activeCategory ? "default" : "outline"}
            className="snap-start cursor-pointer shrink-0 transition-all hover:scale-105"
          >
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={!activeCategory}
            className="outline-none focus-visible:ring-2 focus-visible:ring-slate-400 px-4 py-1.5"
          >
            View all ({totalCount})
          </button>
        </Badge>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const categoryCount = records.filter((r) => {
            const cats = extractCategories(r);
            return cats.some((c) => c.toLowerCase() === category.toLowerCase());
          }).length;

          return (
            <Badge
              asChild
              key={category}
              variant={isActive ? "default" : "outline"}
              className="snap-start cursor-pointer shrink-0 transition-all hover:scale-105"
            >
              <button
                type="button"
                onClick={() => setActiveCategory(isActive ? null : category)}
                aria-pressed={isActive}
                className="outline-none focus-visible:ring-2 focus-visible:ring-slate-400 px-4 py-1.5"
              >
                {category} ({categoryCount})
              </button>
            </Badge>
          );
        })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredRecords.map((record) => {
          const imageUrl = extractImageUrl(record);
          const vin = extractVin(record);
          const manufacturer = extractTextField(record, MANUFACTURER_FIELD_KEY);
          const model = extractTextField(record, MODEL_FIELD_KEY);
          const advPrice = extractPrice(record);
          const daysFloored = extractTextField(record, DAYS_FLOORED_FIELD_KEY);
          const { alt } = getDisplayTitle(record, vin);

          return (
            <Card
              key={record.id}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${manufacturer ?? "this trailer"}`}
              className="group overflow-hidden cursor-pointer border border-slate-200 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              onClick={() => {
                setSelectedRecord(record);
                setDialogOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedRecord(record);
                  setDialogOpen(true);
                }
              }}
            >
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                <Image
                  src={imageUrl ?? placeholderImage}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 24vw, (min-width: 640px) 48vw, 90vw"
                  unoptimized={Boolean(imageUrl)}
                />
                {daysFloored && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                    parseInt(daysFloored) > 90 ? 'bg-red-500 text-white' :
                    parseInt(daysFloored) > 60 ? 'bg-yellow-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {daysFloored} days
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white rounded text-xs font-semibold">
                  Consignment
                </div>
              </div>
              <CardContent className="p-3 space-y-2">
                {manufacturer && (
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">
                    {manufacturer}
                  </h3>
                )}
                {model && (
                  <p className="text-xs text-slate-600 -mt-1">{model}</p>
                )}

                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">VIN</span>
                  </div>
                  <p className="text-xs font-mono text-slate-700 truncate" title={vin ?? "Not available"}>
                    {vin ?? "N/A"}
                  </p>
                </div>

                {advPrice !== null && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-lg font-bold text-green-600">
                      {currencyFormatter.format(advPrice)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog
        open={dialogOpen && Boolean(selectedRecord)}
        onOpenChange={(nextOpen) => {
          setDialogOpen(nextOpen);
          if (!nextOpen) {
            setSelectedRecord(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          {selectedRecord && (() => {
            const vin = extractVin(selectedRecord);
            const manufacturer = extractTextField(selectedRecord, MANUFACTURER_FIELD_KEY);
            const model = extractTextField(selectedRecord, MODEL_FIELD_KEY);
            const location = extractTextField(selectedRecord, LOCATION_FIELD_KEY);
            const daysFloored = extractTextField(selectedRecord, DAYS_FLOORED_FIELD_KEY);

            // Parse all prices
            const unitCostText = findFirstTextValue(selectedRecord[UNIT_COST_FIELD_KEY]);
            const unitCost = unitCostText ? Number.parseFloat(unitCostText.replace(/[^0-9.\-]/g, "")) : null;

            const minSalePriceText = findFirstTextValue(selectedRecord[MINIMUM_SALE_PRICE_FIELD_KEY]);
            const minSalePrice = minSalePriceText ? Number.parseFloat(minSalePriceText.replace(/[^0-9.\-]/g, "")) : null;

            const advPriceText = findFirstTextValue(selectedRecord[PRICE_FIELD_KEY]);
            const advPrice = advPriceText ? Number.parseFloat(advPriceText.replace(/[^0-9.\-]/g, "")) : null;

            const websiteUrl = extractTextField(selectedRecord, WEBSITE_LINK_FIELD_KEY);

            return (
              <>
                {/* Header */}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-900">
                    {manufacturer || "Unknown Manufacturer"}
                    {model && (
                      <span className="block text-lg font-normal text-slate-600 mt-1">{model}</span>
                    )}
                  </DialogTitle>
                </DialogHeader>

                {/* Status badges */}
                <div className="mb-4 flex gap-2">
                  <div className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    Consignment
                  </div>
                  {daysFloored && (
                    <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                      parseInt(daysFloored) > 90 ? 'bg-red-100 text-red-700' :
                      parseInt(daysFloored) > 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {daysFloored} days floored
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* VIN Section */}
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
                          <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-purple-600 font-semibold">VIN Number</p>
                          <p className="font-mono text-sm font-medium text-slate-900">{vin || "Not available"}</p>
                        </div>
                      </div>
                      {vin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(vin)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="ml-2">Copy</span>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Two column grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Location Card */}
                    <div className="bg-white border border-slate-200 rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Location</p>
                          <p className="text-base font-medium text-slate-900">
                            {location || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Website Link Card */}
                    <div className="bg-white border border-slate-200 rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Website</p>
                          {websiteUrl ? (
                            <a
                              href={websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                            >
                              View Listing
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <span className="text-slate-500">Not available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-slate-900">Pricing Information</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Unit Cost */}
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-1">Unit Cost</p>
                        <p className="text-lg font-bold text-slate-900">
                          {Number.isFinite(unitCost) && unitCost !== null ? currencyFormatter.format(unitCost) : "N/A"}
                        </p>
                      </div>

                      {/* Minimum Sale Price */}
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-1">Min Sale Price</p>
                        <p className="text-lg font-bold text-slate-900">
                          {Number.isFinite(minSalePrice) && minSalePrice !== null ? currencyFormatter.format(minSalePrice) : "N/A"}
                        </p>
                      </div>

                      {/* Advertised Price */}
                      <div className="text-center bg-white rounded-lg p-3">
                        <p className="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-1">Advertised Price</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {Number.isFinite(advPrice) && advPrice !== null ? currencyFormatter.format(advPrice) : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}