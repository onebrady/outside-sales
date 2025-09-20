
# SmartSuite API — LLM‑Ready Reference (Unofficial)

> Purpose: Give an LLM (Cursor, Context7, Claude Code, etc.) a **single, reliable spec** for integrating a Next.js app with SmartSuite, focused on **trailer inventory** use cases. Includes auth, metadata, records, files, webhooks, AI/Automation notes, examples, and gotchas.

---

## 1) Authentication

**Headers (required on every call):**
```
Authorization: Token <API_KEY>
Account-Id: <WORKSPACE_ID>
Content-Type: application/json
```
- **API key**: created in your SmartSuite account (treat like a password).
- **Workspace (Account) ID**: 8‑char ID visible in the app URL.
- All requests are HTTPS.

**Example (cURL):**
```bash
curl -X GET "https://app.smartsuite.com/api/v1/solutions/"   -H "Authorization: Token $SMARTSUITE_API_TOKEN"   -H "Account-Id: $SMARTSUITE_WORKSPACE_ID"   -H "Content-Type: application/json"
```

---

## 2) Metadata: Solutions / Tables / Fields / Members

### List Solutions
```
GET /api/v1/solutions/
```

**Response (abridged):**
```json
[
  {
    "id": "6480fce848b4ebb6f17a8fd1",
    "name": "Trailer Inventory System",
    "slug": "s4xfvqdr",
    "status": "in_development",
    "applications_count": 3,
    "created": "2023-06-07T21:55:52.928Z"
  }
]
```

### List Tables (Applications)
```
GET /api/v1/applications/?solution=<SOLUTION_ID>
```
**Response (abridged):**
```json
[
  {
    "id": "63a1f65623aaf6bcb564b00b",
    "name": "Trailers",
    "solution": "6480fce848b4ebb6f17a8fd1",
    "slug": "trailers",
    "structure": [
      { "slug": "title", "label": "Title", "field_type": "textfield", "params": { "primary": true, "required": true } },
      { "slug": "status", "label": "Status", "field_type": "statusfield", "params": { "choices": [{ "value": "in_stock", "label": "In Stock" }, { "value": "sold", "label": "Sold" }] } }
      // ...
    ]
  }
]
```

### Get Table (Fields for one table)
```
GET /api/v1/applications/{TABLE_ID}/
```
- Use `structure[]` to discover field **slugs** (stable identifiers you must use in Records API).

### List Members (workspace users) — for assignment fields, etc.
```
POST /api/v1/members/list/?offset=0&limit=100
Body: { "sort": [], "filter": {} }
```
**Response (abridged):**
```json
{
  "total": 2,
  "items": [
    { "id": "63a1...b1f0", "full_name": { "first_name": "Brady", "last_name": "..." }, "email": ["team@example.com"], "timezone": "America/Chicago" }
  ]
}
```

---

## 3) Records API (the workhorse)

### List / Search (filter, sort, pagination, hydration)
```
POST /api/v1/applications/{TABLE_ID}/records/list/?offset=0&limit=100
Body:
{
  "filter": {
    "operator": "and",
    "fields": [
      { "field": "status", "comparison": "is", "value": "in_stock" },
      { "field": "price", "comparison": "is_greater_than", "value": 10000 }
    ]
  },
  "sort": [{ "field": "price", "direction": "asc" }],
  "hydrated": true
}
```
**Notes**
- `offset/limit` paginate. Default limit often 100 (max ~1000).
- `hydrated: true` returns human‑readable labels for select/status/user fields.
- Empty fields are **omitted** from JSON (not returned at all).

**Response (abridged):**
```json
{
  "total": 245,
  "offset": 100,
  "limit": 100,
  "items": [
    {
      "id": "64b...e831b",
      "title": "2021 SmithCo Side Dump",
      "status": { "value": "in_stock", "label": "In Stock" },
      "price": 145000,
      "photos": [{ "handle": "gR3sd5PI...", "metadata": { "filename": "front.jpg", "mimetype": "image/jpeg" } }],
      "assigned_to": ["63a1...b1f0"]
    }
  ]
}
```

### Create
```
POST /api/v1/applications/{TABLE_ID}/records/
Body:
{
  "title": "2020 End Dump",
  "status": { "value": "in_stock" },
  "price": 89900,
  "description": { "data": {}, "html": "<div class=\"rendered\"><p>Clean unit</p></div>" },
  "assigned_to": ["<MEMBER_ID>"]
}
```
- Include **all required** fields or receive 422.
- You **cannot** set computed fields (Auto Number, Formula, Rollup, etc.).

### Update (partial vs full)
```
PATCH /api/v1/applications/{TABLE_ID}/records/{RECORD_ID}/   // partial
PUT   /api/v1/applications/{TABLE_ID}/records/{RECORD_ID}/   // full (omitted fields are cleared)
```
**Example (PATCH):**
```json
{ "status": { "value": "sold" }, "price": 0 }
```

### Delete
```
DELETE /api/v1/applications/{TABLE_ID}/records/{RECORD_ID}/
```

### Bulk Operations (up to 25 items)
- **Create:** `POST /api/v1/applications/{TABLE_ID}/records/bulk/`
```json
{ "items": [ { "title": "A" }, { "title": "B" } ] }
```
- **Update:** `PATCH /api/v1/applications/{TABLE_ID}/records/bulk/`
```json
{ "items": [ { "id": "64...", "status": { "value": "sold" } } ] }
```
- **Delete:** `PATCH /api/v1/applications/{TABLE_ID}/records/bulk_delete/?fields=id`
```json
{ "items": ["64...", "64..."] }
```

**Tips**
- Prefer `PATCH` to avoid accidental data loss.
- Use hydrated reads for UI; write raw values (e.g., `{ "value": "in_stock" }`).

---

## 4) Files (photos, PDFs)

### Attach by URL (simple)
```
PATCH /api/v1/applications/{TABLE_ID}/records/{RECORD_ID}/
Body: { "<FILE_FIELD_SLUG>": ["https://example.com/trailer.jpg"], "id": "<RECORD_ID>" }
```

### Direct Upload (multipart)
```
POST /api/v1/recordfiles/{TABLE_ID}/{RECORD_ID}/{FILE_FIELD_SLUG}/
Content-Type: multipart/form-data
Form parts:
  files=@./trailer.jpg
  filename=trailer.jpg
```

### Get public URL for a file
```
GET /api/v1/shared-files/{FILE_HANDLE}/url/
Response: { "url": "https://..." }     // long-lived, browser-usable
```

---

## 5) Webhooks & Automations

### Incoming webhook trigger (to start a SmartSuite Automation)
- In Automations: **Trigger → When a Webhook is Received** → copy the generated URL.
- Send `GET` with query params or `POST` with JSON. Map incoming fields in subsequent steps.

**Example (Next.js → SmartSuite Automation)**
```bash
curl -X POST "https://hooks.smartsuite.com/automation/abc123..."   -H "Content-Type: application/json"   --data '{ "trailer_id": "64...", "status": "Sold" }'
```

### Outgoing webhooks (Beta) — data‑change notifications
- Create subscriptions via Webhooks API. Example (conceptual body):
```json
{
  "webhook": {
    "filter": { "applications": { "application_ids": ["<TABLE_ID>"] } },
    "kinds": ["RECORD_CREATED","RECORD_UPDATED","RECORD_DELETED"],
    "locator": { "account_id": "<WORKSPACE_ID>", "solution_id": "<SOLUTION_ID>" },
    "notification_status": { "enabled": { "url": "https://yourapp.com/webhooks/suite" } }
  }
}
```
- SmartSuite will POST a **ping** (`{ "webhookId": "...", "locator": {...} }`).
- Your server **responds 200** fast, then calls the **List Events/Payloads** endpoint to pull actual changes.
- **Retry/idempotency:** Expect retries and possible duplicate notifications; de‑dupe by event/sequence id.

**Best practice**
- Poll the “list events” endpoint at least once every few days to keep the webhook enabled.
- Use idempotency keys and a dead‑letter queue for resilience.

---

## 6) AI Assist (Automation step, BETA)

- **AI Assist: Custom Prompt** action lets you call LLMs (e.g., OpenAI) inside SmartSuite automations.
- Bring your own API key, choose model, compose prompts with field variables, and map structured outputs to fields.
- Example use cases for inventory:
  - Generate marketing descriptions from specs.
  - Normalize condition/feature tags.
  - Translate listings.

**Caveats**
- Beta feature; treat results as best‑effort.
- Validate outputs (JSON mode when possible).

---

## 7) Errors, Limits, Gotchas

- **Rate limits**: ~5 req/sec at full speed; monthly quotas by plan. Backoff on **429**.
- **Common codes**: 200 OK; 401/403 auth/permission; 404 missing; **422** validation (field‑level errors in body); 5xx retry later.
- **Field slugs** are stable; do not use display labels.
- **Hydration**: only affects certain field types (status/select/user/…); keep off unless needed.
- **Empty fields**: omitted from responses; handle missing keys.
- **Dates**: send/receive ISO; include `include_time` flags where applicable.
- **PUT clears** unspecified fields; **PATCH** is safer.

---

## 8) Minimal Next.js client (server‑side)

```ts
// lib/smartsuite.ts
export const SS = {
  base: process.env.SMARTSUITE_API_BASE ?? "https://app.smartsuite.com",
  token: process.env.SMARTSUITE_API_TOKEN!,
  ws: process.env.SMARTSUITE_WORKSPACE_ID!,
};

export async function ssFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${SS.base}${path}`, {
    ...init,
    headers: {
      "Authorization": `Token ${SS.token}`,
      "Account-Id": SS.ws,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}
```

```ts
// app/api/inventory/list/route.ts
import { ssFetch } from "@/lib/smartsuite";

export async function POST(req: Request) {
  const { tableId, offset = 0, limit = 50 } = await req.json();
  const data = await ssFetch(`/api/v1/applications/${tableId}/records/list/?offset=${offset}&limit=${limit}`, {
    method: "POST",
    body: JSON.stringify({
      filter: { operator: "and", fields: [] },
      sort: [{ field: "title", direction: "asc" }],
      hydrated: true
    }),
  });
  return Response.json(data);
}
```

---

## 9) Field cookbook (common types)

- **Text**: `"title": "2021 SmithCo Side Dump"`
- **Number**: `"price": 145000`
- **Status**: `"status": { "value": "in_stock" }`
- **Single Select**: `"condition": { "value": "used" }`
- **Multi Select**: `"features": [{ "value": "liner" }, { "value": "tarp" }]`
- **User (Assignee)**: `"assigned_to": ["<MEMBER_ID>"]`
- **SmartDoc**: `"description": { "data": {}, "html": "<div class=\"rendered\"><p>...</p></div>" }`
- **Files**: see Files section (attach by URL or multipart).

> Always confirm exact shapes from your table’s `structure` and sample GET responses.

---

## 10) Implementation checklist (trailers)

- [ ] Capture env: `SMARTSUITE_API_TOKEN`, `SMARTSUITE_WORKSPACE_ID`.
- [ ] Resolve IDs: `SOLUTION_ID`, `TABLE_ID` (Trailers), key field slugs (status, price, photos, etc.).
- [ ] Build list endpoint (hydrated) + paginate.
- [ ] Detail endpoint (GET by id) if needed.
- [ ] File rendering: map file `handle` → public URL.
- [ ] Bulk import path (CSV → bulk create).
- [ ] Webhooks (optional) to push updates to the app.
- [ ] Error/backoff policy; input validation; logging.
- [ ] Avoid client‑side exposure of API key (use Next.js Route Handlers).

---

**Status**: Unofficial summary for developer use. Validate against your own workspace’s responses.
