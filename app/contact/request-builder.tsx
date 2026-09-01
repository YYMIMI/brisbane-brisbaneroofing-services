"use client";

import { FormEvent, useRef, useState } from "react";
import { business } from "../site-data";
import { getLeadAttribution } from "../google-analytics";

type RequestState = {
  name: string;
  suburb: string;
  roofType: string;
  urgency: string;
  issue: string;
  contact: string;
  howFound: string;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

type LeadEventName =
  | "lead_form_start"
  | "lead_submit_attempt"
  | "lead_validation_error"
  | "lead_api_error"
  | "generate_lead";

function trackLeadEvent(
  eventName: LeadEventName,
  parameters: Record<string, string | number | boolean> = {},
) {
  window.gtag?.("event", eventName, {
    form_id: "roofing_enquiry",
    page_path: window.location.pathname,
    ...getLeadAttribution(),
    transport_type: "beacon",
    ...parameters,
  });
}

const initialState: RequestState = {
  name: "",
  suburb: "",
  roofType: "",
  urgency: "",
  issue: "",
  contact: "",
  howFound: "",
};

export default function RequestBuilder() {
  const [form, setForm] = useState<RequestState>(initialState);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const formStarted = useRef(false);
  const leadIdRef = useRef("");

  function updateField(field: keyof RequestState, value: string) {
    if (!formStarted.current) {
      formStarted.current = true;
      trackLeadEvent("lead_form_start");
    }
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    leadIdRef.current ||= crypto.randomUUID();
    const leadId = leadIdRef.current;
    const attribution = getLeadAttribution();
    trackLeadEvent("lead_submit_attempt", { lead_id: leadId });
    setStatus("submitting");
    setMessage("");
    let failureTracked = false;

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          website: String(data.get("website") ?? ""),
          leadId,
          hostname: attribution.hostname,
          landingPage: attribution.landing_page,
          source: attribution.source,
          medium: attribution.medium,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { delivered?: boolean; ok?: boolean; message?: string }
        | null;

      if (!response.ok || result?.ok !== true) {
        trackLeadEvent(
          response.status === 400 || response.status === 422
            ? "lead_validation_error"
            : "lead_api_error",
          { http_status: response.status },
        );
        failureTracked = true;
        throw new Error(
          result?.message ||
            `We couldn't send the enquiry. Please call ${business.phone} or email ${business.email}.`,
        );
      }

      if (result.delivered === true) {
        trackLeadEvent("generate_lead", { lead_id: leadId });
      }

      setForm(initialState);
      formElement.reset();
      leadIdRef.current = "";
      window.location.assign("/thank-you");
      setMessage(
        result.message ||
          "Thanks — your roofing enquiry has been sent. The team will reply within 24 hours.",
      );
    } catch (error) {
      if (!failureTracked) {
        trackLeadEvent("lead_api_error", { error_type: "network_or_client" });
      }
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : `We couldn't send the enquiry. Please call ${business.phone} or email ${business.email}.`,
      );
    }
  }

  return (
    <div className="request-builder">
      <form onSubmit={handleSubmit} aria-busy={status === "submitting"}>
        <div className="field-grid">
          <label>
            <span>Name *</span>
            <input
              required
              autoComplete="name"
              maxLength={100}
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Brisbane suburb *</span>
            <input
              required
              autoComplete="address-level2"
              maxLength={100}
              value={form.suburb}
              onChange={(event) => updateField("suburb", event.target.value)}
              placeholder="e.g. Carindale"
            />
          </label>
        </div>

        <div className="field-grid">
          <label>
            <span>Roof type</span>
            <select
              value={form.roofType}
              onChange={(event) => updateField("roofType", event.target.value)}
            >
              <option value="">Select or choose not sure</option>
              <option>Tile roof</option>
              <option>Metal roof</option>
              <option>Flat or low-pitch roof</option>
              <option>Gutter or roof drainage</option>
              <option>Not sure</option>
            </select>
          </label>
          <label>
            <span>How urgent is it? *</span>
            <select
              required
              value={form.urgency}
              onChange={(event) => updateField("urgency", event.target.value)}
            >
              <option value="">Choose one</option>
              <option>Water is entering now</option>
              <option>Recent storm damage</option>
              <option>Leak appears when it rains</option>
              <option>Blocked or overflowing gutter</option>
              <option>Visible damage, no active leak</option>
              <option>Planned inspection</option>
            </select>
          </label>
        </div>

        <label>
          <span>What is happening? *</span>
          <textarea
            required
            rows={6}
            minLength={10}
            maxLength={2500}
            value={form.issue}
            onChange={(event) => updateField("issue", event.target.value)}
            placeholder="Where can you see the problem? When did it start? Does wind or heavy rain change it?"
          />
        </label>

        <label>
          <span>Preferred phone or email *</span>
          <input
            required
            maxLength={200}
            value={form.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="How should the team contact you?"
          />
        </label>

        <label>
          <span>How did you hear about us? (optional)</span>
          <select
            value={form.howFound}
            onChange={(event) => updateField("howFound", event.target.value)}
          >
            <option value="">Select an option</option>
            <option>Google Search</option>
            <option>Facebook</option>
            <option>Friend or family referral</option>
            <option>Other</option>
          </select>
        </label>

        <label
          aria-hidden="true"
          style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
        >
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="form-note">
          Your enquiry is sent securely to the Mel One team. We reply within 24 hours. Do not include sensitive information.
        </div>

        <button
          className="button button-yellow"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send roofing enquiry"}
        </button>

        {message ? (
          <p
            className="form-note"
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="form-note">
            Or call <a href={`tel:${business.phoneHref}`}>{business.phone}</a> or email{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        ) : null}
      </form>
    </div>
  );
}

