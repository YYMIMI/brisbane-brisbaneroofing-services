"use client";

import { FormEvent, useState } from "react";
import { business } from "../site-data";

type RequestState = {
  name: string;
  suburb: string;
  roofType: string;
  urgency: string;
  issue: string;
  contact: string;
};

type SubmissionStatus = "idle" | "sending" | "sent" | "error";

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
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  function updateField(field: keyof RequestState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "sending") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const browserForm = new FormData(formElement);
    const website = String(browserForm.get("website") ?? "");

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website,
          startedAt,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "We could not send your request right now. Please call Mel One instead.",
        );
      }

      setForm(initialState);
      formElement.reset();
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your request right now. Please call Mel One instead.",
      );
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
          <span>Preferred phone or email *</span>
          <input
            required
            value={form.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="Your phone number or email"
          />
        </label>

        <label
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <span>Website</span>
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="form-note">
          Your enquiry is sent securely to Mel One Maintenance and is used only
          to respond to your service request.
        </div>

        <button
          className="button button-yellow"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending request…" : "Send service request"}
        </button>
      </form>

      {status === "sent" ? (
        <section className="prepared-summary" aria-live="polite">
          <p className="eyebrow eyebrow-dark">REQUEST SENT</p>
          <h2>Your request has been sent to Mel One</h2>
          <p>
            The team can now review your Brisbane roof or gutter enquiry and
            contact you using the details provided.
          </p>
          <a className="text-link" href={"tel:" + business.phoneHref}>
            Call {business.phone} if the situation is urgent
          </a>
        </section>
      ) : null}

      {status === "error" ? (
        <section className="prepared-summary" aria-live="assertive">
          <p className="eyebrow eyebrow-dark">DELIVERY PROBLEM</p>
          <h2>Your request was not sent</h2>
          <p>{errorMessage}</p>
          <a className="text-link" href={"tel:" + business.phoneHref}>
            Call {business.phone}
          </a>
        </section>
      ) : null}
    </div>
  );
}
