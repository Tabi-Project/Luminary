"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { FormField, SelectField, TextAreaField } from "@/components/common/form";
import { getCategories } from "@/services/categories.service";
import { Check, ImageIcon, X } from "lucide-react";
import { submitArticleAction } from "@/actions/sanity";
import { SOURCE_TYPES, REGIONS } from "@/data/submit-story";
import Image from "next/image";


const cls = {
  trigger:
    "w-full flex items-center justify-between px-3 h-10 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
  popup:
    " rounded-md border w-[100%] border-slate-200 bg-white shadow-md py-1 text-sm z-50",
  item: "flex items-center justify-between px-3 py-2 cursor-pointer outline-none data-[highlighted]:bg-gray-50 data-[selected]:text-primary",
  input:
    "w-full px-3 h-10 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
  label: "text-[11px] font-semibold text-muted uppercase tracking-wide",
};


export default function SubmitStoryPage() {
  const [sourceType, setSourceType] = useState("External Link");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { categories, isLoadingCategories } = getCategories();

  useEffect(() => {
    if (!coverFile) { setCoverPreview(null); return; }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (coverFile) {
        formData.append("file", coverFile);
      }

      const result = await submitArticleAction(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      setSuccess(true);
      setCoverFile(null);
      setCoverPreview(null);
      setCategory("");
      setRegion("");
      setSourceType("External Link");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#E4EBF3] w-full flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-border/50 shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Story Submitted!</h2>
          <p className="text-sm text-muted">
            Your submission is under review. We&apos;ll notify you once it&apos;s published.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm text-primary underline"
            text="Submit another story"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E4EBF3] w-full px-5 pt-10 pb-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold">Submit A Story</h1>
          <p className="text-sm text-muted mt-1.5">
            Create an original post or link to an external news source. Your
            submission will be reviewed before publishing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <section className="bg-white rounded-xl  shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-bold">Basic Information</h3>

            <FormField
              name="headline"
              label="Headline / Title"
              required
              placeholder="Enter the article title"
              inputClassName={cls.input}
              labelClassName={cls.label}
              className="gap-1.5"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SelectField
                label="Source Type"
                name="source_type"
                value={sourceType}
                onChange={setSourceType}
                options={SOURCE_TYPES}
                className="gap-1.5"
                labelClassName={cls.label}
              />

              <SelectField
                label="Category"
                name="category"
                required
                value={category}
                onChange={setCategory}
                options={categories.map((c) => ({ label: c.name, value: c.id }))}
                placeholder={isLoadingCategories ? "Loading…" : "Select category"}
                className="gap-1.5"
                labelClassName={cls.label}
              />
            </div>

            <div className="grid grid-cols-2 gap-10 md:gap-4">
              <SelectField
                label="Region"
                name="region"
                required
                value={region}
                onChange={setRegion}
                options={REGIONS}
                placeholder="Select region"
                className="gap-1.5 w-40 md:w-full"
                labelClassName={cls.label}
              />

              <FormField
                name="source_name"
                label="Source Name"
                placeholder="E.g. The New York Times"
                inputClassName={cls.input}
                labelClassName={cls.label}
                className="gap-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                type="date"
                name="publication_date"
                label="Publication Date"
                inputClassName={cls.input}
                labelClassName={cls.label}
                className="gap-1.5"
              />
            </div>

            <FormField
              name="external_url"
              label="External URL (required for external sources)"
              placeholder="https://"
              inputClassName={cls.input}
              labelClassName="text-[11px] font-semibold text-primary uppercase tracking-wide"
              className="gap-1.5"
            />
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-bold">Media &amp; Summary</h3>

            <div className="flex flex-col gap-1.5">
              <label className={cls.label}>
                Cover Image <span className="text-warning">*</span>
              </label>
              {coverPreview ? (
                <div className="relative w-full">
                  <Image
                    src={coverPreview}
                    alt="Cover preview"
                    width={400}
                    height={400}
                    className="w-full max-h-48 object-cover rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setCoverFile(null)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 border-slate-200"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-primary/60 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <ImageIcon size={28} className="text-muted/40" />
                    <p className="text-xs text-muted">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-muted/60">PNG, JPG, GIF, WEBP — max 5 MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={cls.label}>Brief Summary</label>
              <textarea
                name="summary"
                rows={4}
                placeholder="A short summary that will appear on the news card."
                className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-bold">Article Content</h3>
              <p className="text-xs text-muted mt-0.5">
                Optional — paste excerpts or notes while the full article lives on an external site.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 border border-slate-200 rounded-t-md bg-gray-50 px-2 py-1">
                <Button type="button" className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded hover:bg-gray-200 hover:text-slate-800 font-bold text-sm" text="B" />
                <Button type="button" className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded hover:bg-gray-200 hover:text-slate-800 italic text-sm" text="I" />
                <Button type="button" className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded hover:bg-gray-200 hover:text-slate-800 underline text-sm" text="U" />
              </div>
              <TextAreaField
                name="content"
                label="Article"
                rows={6}
                placeholder="Start writing the article content here."
                textAreaClassName="w-full px-3 py-2 border border-slate-200 rounded-b-md bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              text={submitting ? "Submitting…" : "Submit Article"}
              disabled={submitting}
              className="bg-foreground text-bg-surface disabled:opacity-60 hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </main>
  );
}