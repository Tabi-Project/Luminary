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
import {
  FIELD_OPTIONS,
  IDLE_STATUS,
  INITIAL_STATE,
  TABS,
} from "@/data/nomination";
import { NominationService } from "@/services/nomination.service";
import {
  FormStatus,
  NominationFormState,
  NominationTab,
  NomineeDetails,
  NominatorDetails,
} from "@/types/nomination.type";
import { getApiErrorMessage } from "@/utils/error";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export function NominationForm() {
  const [tab, setTab] = useState<NominationTab>("nomination");
  const [state, setState] = useState<NominationFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<FormStatus>(IDLE_STATUS);

  const isSelfSubmission = tab === "self-submission";

  const mutation = useMutation({
    mutationFn: () => NominationService.create(state, tab),
    onSuccess: () => {
      setStatus({
        type: "success",
        message: "Submission received. We will reach out shortly.",
      });
      setState(INITIAL_STATE);
    },
    onError: (error) => {
      setStatus({ type: "error", message: getApiErrorMessage(error) });
    },
  });

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(IDLE_STATUS);

    if (!state.photo) {
      setStatus({
        type: "error",
        message: "Please upload a profile photo before submitting.",
      });
      return;
    }

    mutation.mutate();
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
            <Button
              key={id}
              type="button"
              role="tab"
              text={label}
              aria-selected={isActive}
              onClick={() => switchTab(id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-text-main shadow-sm"
                  : "bg-transparent text-muted shadow-none hover:text-text-main",
              )}
            />
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
            onChange={(value) => updateNominee("field", value)}
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
          loading={mutation.isPending}
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
