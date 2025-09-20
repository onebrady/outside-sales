const SMARTSUITE_API_TOKEN = process.env.SMARTSUITE_API_TOKEN;
const SMARTSUITE_WORKSPACE_ID = process.env.SMARTSUITE_WORKSPACE_ID;
const SMARTSUITE_BASE_URL =
  process.env.SMARTSUITE_BASE_URL?.replace(/\/$/, "") ?? "https://app.smartsuite.com";
const SMARTSUITE_STATUS_IN_STOCK_VALUE = process.env.SMARTSUITE_STATUS_IN_STOCK_VALUE ?? "complete";

if (!SMARTSUITE_API_TOKEN) {
  throw new Error("Missing SMARTSUITE_API_TOKEN environment variable.");
}

if (!SMARTSUITE_WORKSPACE_ID) {
  throw new Error("Missing SMARTSUITE_WORKSPACE_ID environment variable.");
}

const TRAILERS_TABLE_ID = "67b5712e741daeee563c2092";
const CONSIGNMENTS_TABLE_ID = "679f9d2e4334632448afc286";

interface SmartSuiteListRequestBody {
  filter?: unknown;
  sort?: unknown;
  hydrated?: boolean;
}

interface SmartSuiteListResponse<TItem> {
  total: number;
  offset: number;
  limit: number;
  items: TItem[];
}

export interface SmartSuiteStatusField {
  value: string;
  label?: string;
}

export interface SmartSuiteTrailerRecord {
  id: string;
  title?: string;
  status?: SmartSuiteStatusField | string;
  [field: string]: unknown;
}

async function smartsuiteFetch<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const url = new URL(path, SMARTSUITE_BASE_URL);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Token ${SMARTSUITE_API_TOKEN}`,
      "Account-Id": SMARTSUITE_WORKSPACE_ID!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new Error(
      `SmartSuite request failed (${response.status} ${response.statusText}): ${errorPayload}`
    );
  }

  return (await response.json()) as TResponse;
}

export async function fetchInStockTrailers(options?: {
  offset?: number;
  limit?: number;
  hydrated?: boolean;
}): Promise<SmartSuiteListResponse<SmartSuiteTrailerRecord>> {
  const { offset = 0, limit, hydrated = true } = options ?? {};

  const body: SmartSuiteListRequestBody = {
    filter: {
      operator: "and",
      fields: [
        {
          field: "status",
          comparison: "is",
          value: SMARTSUITE_STATUS_IN_STOCK_VALUE,
        },
      ],
    },
    hydrated,
  };

  const params = new URLSearchParams();
  params.set("offset", String(offset));
  if (typeof limit === "number") {
    params.set("limit", String(limit));
  }

  const path = `/api/v1/applications/${TRAILERS_TABLE_ID}/records/list/?${params.toString()}`;

  return smartsuiteFetch<SmartSuiteListResponse<SmartSuiteTrailerRecord>>(path, body);
}

export async function fetchConsignmentTrailers(options?: {
  offset?: number;
  limit?: number;
  hydrated?: boolean;
}): Promise<SmartSuiteListResponse<SmartSuiteTrailerRecord>> {
  const { offset = 0, limit, hydrated = true } = options ?? {};

  const body: SmartSuiteListRequestBody = {
    filter: {
      operator: "and",
      fields: [
        {
          field: "s934963a2a",
          comparison: "is",
          value: "backlog",
        },
      ],
    },
    hydrated,
  };

  const params = new URLSearchParams();
  params.set("offset", String(offset));
  if (typeof limit === "number") {
    params.set("limit", String(limit));
  }

  const path = `/api/v1/applications/${CONSIGNMENTS_TABLE_ID}/records/list/?${params.toString()}`;

  return smartsuiteFetch<SmartSuiteListResponse<SmartSuiteTrailerRecord>>(path, body);
}

export type { SmartSuiteListResponse };
