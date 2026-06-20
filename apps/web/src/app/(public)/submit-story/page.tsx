"use client";

import { useEffect, useState } from "react";
import { Select } from "@base-ui/react";
import { Button } from "@/components/common/button";
import { FormField } from "@/components/common/form";
import { axiosGet } from "@/utils/api";
import { ChevronDown, Check, ImageIcon, X } from "lucide-react";
import { generateSlug, estimateReadTime } from "@/utils/sanity";
import { sanityMutate, sanityUploadImage } from "./actions";


const SOURCE_TYPES = [
  { value: "External Link", label: "External Link" },
  { value: "Original Content", label: "Original Content" },
];

const REGIONS = [
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Oceania", label: "Oceania" },
  { value: "Global", label: "Global" },
];

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

interface Category {
  id: string;
  name: string;
}

export default function SubmitStoryPage() {
  const [sourceType, setSourceType] = useState("External Link");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axiosGet<{ data: Category[] }>("/categories", {}).then((res) =>
      setCategories(res.data ?? []),
    ).catch(() => { });
  }, []);

  // Track cover image preview
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
      let coverImageRef: string | null = null;

      if (coverFile) {
        const fileFormData = new FormData();
        fileFormData.append("file", coverFile);
        coverImageRef = await sanityUploadImage(fileFormData);
      }

      const formData = new FormData(e.currentTarget);

      const title = formData.get("headline") as string;
      const slug = generateSlug(title);
      const categoryId = category;
      const regionVal = region;
      const sourceName = formData.get("source_name") as string;
      const sourceTypeVal = sourceType === "External Link" ? "external" : "original";
      const externalUrl = formData.get("external_url") as string;
      const summary = formData.get("summary") as string;
      const bodyHtml = formData.get("content") as string;
      const publicationDate = formData.get("publication_date") as string;

      await sanityMutate([
        {
          create: {
            _type: "article",
            title,
            slug: { _type: "slug", current: slug },
            field: categoryId,
            region: regionVal,
            source: sourceTypeVal === "external" ? sourceName : "Luminary",
            author: sourceName,
            sourceType: sourceTypeVal,
            externalUrl: externalUrl || null,
            excerpt: summary || null,
            body: bodyHtml || null,
            coverImage: coverImageRef ? { _type: "image", asset: { _type: "reference", _ref: coverImageRef } } : null,
            publicationDate: publicationDate || null,
            readTime: bodyHtml ? estimateReadTime(bodyHtml) : null,
            status: "pending_review",
            submittedByUser: true,
            submittedAt: new Date().toISOString(),
          },
        },
      ]);
      setSuccess(true);
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
      <main className="min-h-screen bg-[#E4EBF3] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-border/50 shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Story Submitted!</h2>
          <p className="text-sm text-muted">
            Your submission is under review. We&apos;ll notify you once it&apos;s published.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm text-primary underline"
          >
            Submit another story
          </button>
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

          {/* Basic Information */}
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
              <div className="flex flex-col gap-1.5">
                <label className={cls.label}>Source Type</label>
                <Select.Root value={sourceType} onValueChange={(val) => setSourceType(val ?? "External Link")} name="source_type">
                  <Select.Trigger className={cls.trigger}>
                    <Select.Value />
                    <Select.Icon><ChevronDown size={14} /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={4}>
                      <Select.Popup className={cls.popup}>
                        <Select.List>
                          {SOURCE_TYPES.map((s) => (
                            <Select.Item key={s.value} value={s.value} className={cls.item}>
                              <Select.ItemText>{s.label}</Select.ItemText>
                              <Select.ItemIndicator><Check size={12} /></Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={cls.label}>
                  Category <span className="text-warning">*</span>
                </label>
                <Select.Root value={category} onValueChange={(val) => setCategory(val ?? "")} name="category">
                  <Select.Trigger className={cls.trigger}>
                    <Select.Value placeholder={categories.length ? "Select category" : "Loading…"} />
                    <Select.Icon><ChevronDown size={14} /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={4}>
                      <Select.Popup className={cls.popup}>
                        <Select.List>
                          {categories.map((c) => (
                            <Select.Item key={c.id} value={c.id} className={cls.item}>
                              <Select.ItemText>{c.name}</Select.ItemText>
                              <Select.ItemIndicator><Check size={12} /></Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={cls.label}>
                  Region <span className="text-warning">*</span>
                </label>
                <Select.Root value={region} onValueChange={(val) => setRegion(val ?? "")} name="region">
                  <Select.Trigger className={cls.trigger}>
                    <Select.Value placeholder="Select region" />
                    <Select.Icon><ChevronDown size={14} /></Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={4}>
                      <Select.Popup className={cls.popup}>
                        <Select.List>
                          {REGIONS.map((r) => (
                            <Select.Item key={r.value} value={r.value} className={cls.item}>
                              <Select.ItemText>{r.label}</Select.ItemText>
                              <Select.ItemIndicator><Check size={12} /></Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>

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

          {/* Media & Summary */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-bold">Media &amp; Summary</h3>

            <div className="flex flex-col gap-1.5">
              <label className={cls.label}>
                Cover Image <span className="text-warning">*</span>
              </label>
              {coverPreview ? (
                <div className="relative w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverPreview}
                    alt="Cover preview"
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

          {/* Article Content */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-bold">Article Content</h3>
              <p className="text-xs text-muted mt-0.5">
                Optional — paste excerpts or notes while the full article lives on an external site.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 border border-slate-200 rounded-t-md bg-gray-50 px-2 py-1 border-b-0">
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 font-bold text-sm">B</button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 italic text-sm">I</button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 underline text-sm">U</button>
              </div>
              <textarea
                name="content"
                rows={6}
                placeholder="Start writing the article content here."
                className="w-full px-3 py-2 border border-slate-200 rounded-b-md bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </section>

          {/* Error + Submit */}
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