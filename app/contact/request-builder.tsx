"use client";

import { FormEvent, useMemo, useState } from "react";
import { business } from "../site-data";

type RequestState = {
  name: string;
  suburb: string;
  roofType: string;
  urgency: string;
  issue: string;
  contact: string;
};

const initialState: RequestState = {
  name: "",
  suburb: "",
  roofType: "",
  urgency: "",
  issue: "",
  contact: "",
};

export default function RequestBuilder() {
  const [form, setForm] = useState<RequestState>(initialState);
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () =>
      [
        "Brisbane roof or gutter service request",
        `Name: ${form.name || "Not provided"}`,
        `Suburb: ${form.suburb || "Not provided"}`,
        `Roof type: ${form.roofType || "Not sure"}`,
        `Urgency: ${form.urgency || "Not provided"}`,
        `What is happening: ${form.issue || "Not provided"}`,
        `Preferred contact: ${form.contact || "Not provided"}`,
      ].join("\n"),
    [form],
  );
  const emailHref = useMemo(
    () =>
      `mailto:${business.email}?subject=${encodeURIComponent(
        "Greater Brisbane roof or gutter enquiry",
      )}&body=${encodeURIComponent(summary)}`,
    [summary],
  );

  function updateField(field: keyof RequestState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setPrepared(false);
    setCopied(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
    setCopied(false);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="request-builder">
      <form onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            <span>Name</span>
            <input
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Brisbane suburb *</span>
            <input
              required
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
            value={form.issue}
            onChange={(event) => updateField("issue", event.target.value)}
            placeholder="Where can you see the problem? When did it start? Does wind or heavy rain change it?"
          />
        </label>

        <label>
          <span>Preferred phone or email</span>
          <input
            value={form.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="Stored only in the summary on your device"
          />
        </label>

        <div className="form-note">
          This website does not automatically send or store these details. It
          prepares a summary you can copy or open in your email app.
        </div>

        <button className="button button-yellow" type="submit">
          Review request details
        </button>
      </form>

      {prepared ? (
        <section className="prepared-summary" aria-live="polite">
          <p className="eyebrow eyebrow-dark">YOUR PREPARED REQUEST</p>
          <h2>Ready to contact Mel One</h2>
          <pre>{summary}</pre>
          <a className="button button-yellow" href={emailHref}>
            Open email to send
          </a>
          <button className="button button-navy" onClick={copySummary} type="button">
            {copied ? "Copied" : "Copy request instead"}
          </button>
          <a className="text-link" href={`tel:${business.phoneHref}`}>
            Call {business.phone}
          </a>
          <p>
            Photos are not attached automatically. Add safe ground-level or
            interior photos manually in your email app.
          </p>
        </section>
      ) : null}
    </div>
  );
}
