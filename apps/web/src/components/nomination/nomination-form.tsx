"use client";

import { Button } from "@/components/common/button";
import {
  FormField,
  SelectField,
  TextAreaField,
} from "@/components/common/form";
import { CollapsibleSection } from "@/components/nomination/collapsible-section";
import { LinkFields } from "@/components/nomination/link-fields";
import { PhotoUpload } from "@/components/nomination/photo-upload";
import { FIELDS_OF_WORK } from "@/data/nomination";
import { NominationService } from "@/services/nomination.service";
import {
  FormStatus,
  NominationFormState,
  NominationPayload,
  NominationTab,
  NomineeDetails,
  NominatorDetails,
} from "@/types/nomination.type";
import { getApiErrorMessage } from "@/utils/api";
import { cn } from "@/utils/cn";
import { splitName } from "@/utils/string";
import { FormEvent, useState } from "react";

const INITIAL_STATE: NominationFormState = {
  nominator: { fullName: "", email: "", relationship: "" },
  nominee: { fullName: "", email: "", field: "", region: "", description: "" },
  supportingLinks: [""],
  evidenceLinks: [""],
  photo: null,
};

const IDLE_STATUS: FormStatus = { type: "idle", message: "" };

const FIELD_OPTIONS = FIELDS_OF_WORK.map((field) => ({
  label: field,
  value: field,
}));

const TABS: { id: NominationTab; label: string }[] = [
  { id: "nomination", label: "Nomination" },
  { id: "self-submission", label: "Self Submission" },
];

function toPayload(
  state: NominationFormState,
  tab: NominationTab,
  imageUrl: string,
): NominationPayload {
  const isSelfSubmission = tab === "self-submission";
  const { firstName, lastName } = splitName(state.nominee.fullName);

  const payload: NominationPayload = {
    is_self_submission: isSelfSubmission,
    nominee_first_name: firstName,
    nominee_last_name: lastName,
    nominee_email: state.nominee.email.trim(),
    nominee_country: state.nominee.region.trim(),
    nominee_field: state.nominee.field,
    nominee_organization: "",
    nominee_profile_image_url: imageUrl,
    evidence_urls: state.evidenceLinks.map((link) => link.trim()).filter(Boolean),
    supporting_urls: state.supportingLinks
      .map((link) => link.trim())
      .filter(Boolean),
    description: state.nominee.description.trim(),
  };

  if (!isSelfSubmission) {
    const { firstName: nominatorFirst, lastName: nominatorLast } = splitName(
      state.nominator.fullName,
    );

    payload.nominator_first_name = nominatorFirst;
    payload.nominator_last_name = nominatorLast;
    payload.nominator_email = state.nominator.email.trim();
    payload.relationship_to_nominee = state.nominator.relationship.trim();
  }

  return payload;
}

export function NominationForm() {
  const [tab, setTab] = useState<NominationTab>("nomination");
  const [state, setState] = useState<NominationFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<FormStatus>(IDLE_STATUS);
  const [loading, setLoading] = useState(false);

  const isSelfSubmission = tab === "self-submission";

  const updateNominator = (field: keyof NominatorDetails, value: string) => {
    setState((prev) => ({
      ...prev,
      nominator: { ...prev.nominator, [field]: value },
    }));
  };

  const updateNominee = (field: keyof NomineeDetails, value: string) => {
    setState((prev) => ({
      ...prev,
      nominee: { ...prev.nominee, [field]: value },
    }));
  };

  const switchTab = (next: NominationTab) => {
    if (next === tab) return;
    setTab(next);
    setStatus(IDLE_STATUS);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(IDLE_STATUS);

    if (!state.photo) {
      setStatus({
        type: "error",
        message: "Please upload a profile photo before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const upload = await NominationService.uploadPhoto(state.photo);

      if ("error" in upload) throw upload;

      const result = await NominationService.create(
        toPayload(state, tab, upload.data.url),
      );

      if ("error" in result) throw result;

      setStatus({
        type: "success",
        message: "Submission received. We will reach out shortly.",
      });
      setState(INITIAL_STATE);
    } catch (error) {
      setStatus({ type: "error", message: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-6 rounded-xl border border-border bg-white p-5 shadow-sm md:p-6"
    >
      <div
        role="tablist"
        aria-label="Select form type"
        className="inline-flex w-fit gap-1 rounded-lg bg-bg-surface p-1"
      >
        {TABS.map(({ id, label }) => {
          const isActive = tab === id;

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => switchTab(id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-text-main shadow-sm"
                  : "text-muted hover:text-text-main",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {!isSelfSubmission && (
        <CollapsibleSection title="Your Details (Nominator)">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Full name"
              htmlFor="nominatorName"
              name="nominatorName"
              required
              placeholder="Full name"
              value={state.nominator.fullName}
              onChange={(event) =>
                updateNominator("fullName", event.target.value)
              }
            />
            <FormField
              label="Email address"
              htmlFor="nominatorEmail"
              name="nominatorEmail"
              type="email"
              required
              placeholder="name@company.com"
              value={state.nominator.email}
              onChange={(event) => updateNominator("email", event.target.value)}
            />
          </div>
          <FormField
            label="Relationship to nominee"
            htmlFor="relationship"
            name="relationship"
            required
            placeholder="e.g. Colleague"
            value={state.nominator.relationship}
            onChange={(event) =>
              updateNominator("relationship", event.target.value)
            }
          />
        </CollapsibleSection>
      )}

      <CollapsibleSection
        title={isSelfSubmission ? "Your Details" : "Nominee Details"}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label={isSelfSubmission ? "Your full name" : "Nominee full name"}
            htmlFor="nomineeName"
            name="nomineeName"
            required
            placeholder="Full name"
            value={state.nominee.fullName}
            onChange={(event) => updateNominee("fullName", event.target.value)}
          />
          <FormField
            label={
              isSelfSubmission ? "Your email address" : "Nominee email address"
            }
            htmlFor="nomineeEmail"
            name="nomineeEmail"
            type="email"
            required
            placeholder="name@company.com"
            value={state.nominee.email}
            onChange={(event) => updateNominee("email", event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label={isSelfSubmission ? "Your Field of Work" : "Field of Work"}
            htmlFor="fieldOfWork"
            name="fieldOfWork"
            required
            placeholder="Select a field"
            options={FIELD_OPTIONS}
            value={state.nominee.field}
            onChange={(event) => updateNominee("field", event.target.value)}
          />
          <FormField
            label="Region"
            htmlFor="region"
            name="region"
            required
            placeholder={isSelfSubmission ? "Where are you from?" : "Lagos, Nigeria"}
            value={state.nominee.region}
            onChange={(event) => updateNominee("region", event.target.value)}
          />
        </div>

        <TextAreaField
          label="Description of impact"
          htmlFor="impactDescription"
          name="impactDescription"
          required
          placeholder={
            isSelfSubmission
              ? "Describe your impact, contributions, and why you should be featured..."
              : "Describe the nominee's impact, contributions, and why they should be featured..."
          }
          value={state.nominee.description}
          onChange={(event) => updateNominee("description", event.target.value)}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Work & Media">
        <PhotoUpload
          id="profilePhoto"
          label="Profile Photo"
          required
          value={state.photo}
          onChange={(photo) => setState((prev) => ({ ...prev, photo }))}
        />

        <LinkFields
          label={
            isSelfSubmission
              ? "Supporting Links (Articles, Publications, Projects)"
              : "Links (Business website, projects, publications, social profiles)"
          }
          htmlFor="supportingLink1"
          name="supportingLink"
          required
          values={state.supportingLinks}
          onChange={(supportingLinks) =>
            setState((prev) => ({ ...prev, supportingLinks }))
          }
        />

        <LinkFields
          label={
            isSelfSubmission
              ? "Social Links"
              : "Evidence section (Links to press coverage or documents)"
          }
          htmlFor="socialLink1"
          name="socialLink"
          values={state.evidenceLinks}
          onChange={(evidenceLinks) =>
            setState((prev) => ({ ...prev, evidenceLinks }))
          }
        />
      </CollapsibleSection>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          text="Submit Nomination"
          loading={loading}
          className="rounded-full px-6"
        />
        {status.type !== "idle" && (
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "text-sm font-medium",
              status.type === "success" ? "text-success" : "text-danger",
            )}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
