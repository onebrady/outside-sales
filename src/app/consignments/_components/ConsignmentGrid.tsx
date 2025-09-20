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
    return <div className="text-sm text-slate-500">Loading consignments…</div>;
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  if (records.length === 0) {
    return <div className="text-sm text-slate-500">No consignment trailers found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="-mx-1 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-1 py-1">
        <Badge
          asChild
          variant={!activeCategory ? "default" : "outline"}
          className="snap-start cursor-pointer"
        >
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={!activeCategory}
            className="outline-none focus-visible:ring-offset-0"
          >
            View all
          </button>
        </Badge>
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <Badge
              asChild
              key={category}
              variant={isActive ? "default" : "outline"}
              className="snap-start cursor-pointer"
            >
              <button
                type="button"
                onClick={() => setActiveCategory(isActive ? null : category)}
                aria-pressed={isActive}
                className="outline-none focus-visible:ring-offset-0"
              >
                {category}
              </button>
            </Badge>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredRecords.map((record) => {
          const imageUrl = extractImageUrl(record);
          const vin = extractVin(record);
          const manufacturer = extractTextField(record, MANUFACTURER_FIELD_KEY);
          const model = extractTextField(record, MODEL_FIELD_KEY);
          const advPrice = extractPrice(record);
          const daysFloored = extractTextField(record, DAYS_FLOORED_FIELD_KEY);
          const { alt, display, show: shouldShowTitle } = getDisplayTitle(record, vin);

          return (
            <Card
              key={record.id}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${manufacturer ?? "this trailer"}`}
              className="overflow-hidden cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-400/60 focus-visible:ring-offset-2 hover:shadow-lg"
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
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={imageUrl ?? placeholderImage}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 24vw, (min-width: 640px) 48vw, 90vw"
                  unoptimized={Boolean(imageUrl)}
                />
              </div>
              <CardContent className="space-y-2 p-4">
                {shouldShowTitle && <p className="text-sm font-semibold text-slate-900">{display}</p>}
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">VIN</p>
                  <p className="text-sm text-slate-500">{vin ?? "Not available"}</p>
                </div>
                {(manufacturer || model) && (
                  <div className="space-y-1">
                    {manufacturer && <p className="text-sm font-semibold text-slate-700">{manufacturer}</p>}
                    {model && <p className="text-sm text-slate-500">{model}</p>}
                  </div>
                )}
                {advPrice !== null && (
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Adv. Price</p>
                    <p className="text-sm text-slate-500">
                      {currencyFormatter.format(advPrice)}
                    </p>
                  </div>
                )}
                {daysFloored && (
                  <div className="space-y-1">
                    <p className="text-xs uppercase font-semibold tracking-wide text-slate-700">Days Floored</p>
                    <p className="text-sm text-slate-500">{daysFloored}</p>
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
        <DialogContent className="max-w-2xl">
          {selectedRecord && (
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="text-left">
                  {[
                    extractTextField(selectedRecord, MANUFACTURER_FIELD_KEY),
                    extractTextField(selectedRecord, MODEL_FIELD_KEY),
                  ]
                    .filter(Boolean)
                    .join(" ") ||
                    extractVin(selectedRecord) ||
                    "Consignment trailer details"}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close"
                  onClick={() => setDialogOpen(false)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  ✕
                </Button>
              </div>
            </DialogHeader>
          )}
          {selectedRecord && (
            <div className="space-y-4 pt-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Location</p>
                <p className="text-sm text-slate-900">
                  {extractTextField(selectedRecord, LOCATION_FIELD_KEY) ?? "Not available"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Unit Cost</p>
                <p className="text-sm text-slate-900">
                  {(() => {
                    const unitCostText = findFirstTextValue(selectedRecord[UNIT_COST_FIELD_KEY]);
                    if (!unitCostText) return "Not available";
                    const parsed = Number.parseFloat(unitCostText.replace(/[^0-9.\-]/g, ""));
                    return Number.isFinite(parsed) ? currencyFormatter.format(parsed) : "Not available";
                  })()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Minimum Sale Price</p>
                <p className="text-sm text-slate-900">
                  {(() => {
                    const minSalePriceText = findFirstTextValue(selectedRecord[MINIMUM_SALE_PRICE_FIELD_KEY]);
                    if (!minSalePriceText) return "Not available";
                    const parsed = Number.parseFloat(minSalePriceText.replace(/[^0-9.\-]/g, ""));
                    return Number.isFinite(parsed) ? currencyFormatter.format(parsed) : "Not available";
                  })()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Advertised Price</p>
                <p className="text-sm text-slate-900">
                  {(() => {
                    const advPriceText = findFirstTextValue(selectedRecord[PRICE_FIELD_KEY]);
                    if (!advPriceText) return "Not available";
                    const parsed = Number.parseFloat(advPriceText.replace(/[^0-9.\-]/g, ""));
                    return Number.isFinite(parsed) ? currencyFormatter.format(parsed) : "Not available";
                  })()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-700">Website Link</p>
                <div className="text-sm">
                  {(() => {
                    const websiteUrl = extractTextField(selectedRecord, WEBSITE_LINK_FIELD_KEY);
                    if (!websiteUrl) return <span className="text-slate-900">Not available</span>;
                    return (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Website Link
                      </a>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}