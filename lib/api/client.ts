import {
  enquirySchema,
  documentRequestSchema,
  type EnquiryInput,
  type DocumentRequestInput,
} from "@/lib/schema";

/* ---------------------------------------------------------------
   The one interface the frontend uses to submit anything.

   Phase 1 runs the `mock` adapter: it validates against the same Zod
   schema the server will use, simulates latency, and resolves. Phase 3
   flips NEXT_PUBLIC_API_MODE to "http" and the same call hits the real
   route handler. No component changes.

   Components must never call fetch() directly — that is what makes
   the backend a drop-in rather than a refactor.
   --------------------------------------------------------------- */

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

type Adapter = {
  submitEnquiry(input: EnquiryInput): Promise<SubmitResult>;
  requestDocument(input: DocumentRequestInput): Promise<SubmitResult>;
};

const MODE = process.env.NEXT_PUBLIC_API_MODE ?? "mock";

/** Human-readable reference the buyer can quote back at us. */
function reference(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${stamp}${rand}`;
}

function flattenZod(error: {
  issues: readonly { readonly path: readonly PropertyKey[]; readonly message: string }[];
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/* -- Phase 1: mock ---------------------------------------------- */

const mockAdapter: Adapter = {
  async submitEnquiry(input) {
    const parsed = enquirySchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: flattenZod(parsed.error),
      };
    }
    await new Promise((r) => setTimeout(r, 650));

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[PAAF mock] enquiry captured:", parsed.data);
    }
    return { ok: true, reference: reference("ENQ") };
  },

  async requestDocument(input) {
    const parsed = documentRequestSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: flattenZod(parsed.error),
      };
    }
    await new Promise((r) => setTimeout(r, 450));

    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[PAAF mock] document request captured:", parsed.data);
    }
    return { ok: true, reference: reference("DOC") };
  },

};

/* -- Phase 3: http ----------------------------------------------
   Implemented now so the switch is genuinely one env var. The
   endpoints do not exist yet; nothing calls this path until
   NEXT_PUBLIC_API_MODE=http. */

async function post(url: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as SubmitResult;
    if (!res.ok) {
      return {
        ok: false,
        error: (data as { error?: string })?.error ?? "Something went wrong. Please try again.",
        fieldErrors: (data as { fieldErrors?: Record<string, string> })?.fieldErrors,
      };
    }
    return data;
  } catch {
    return {
      ok: false,
      error:
        "We could not reach the server. Please try again, or email us directly at sales@paaforigin.com.",
    };
  }
}

const httpAdapter: Adapter = {
  submitEnquiry: (input) => post("/api/enquiry", input),
  requestDocument: (input) => post("/api/document-request", input),
};

export const apiClient: Adapter = MODE === "http" ? httpAdapter : mockAdapter;

export const IS_MOCK_MODE = MODE !== "http";
