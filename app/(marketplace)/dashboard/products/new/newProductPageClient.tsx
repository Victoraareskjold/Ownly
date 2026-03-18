"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

type Option = { id: string; name: string };

interface Props {
  categories: Option[];
  stacks: Option[];
  hostings: Option[];
  sellerId: string;
}

export default function NewProductPageClient({
  categories,
  stacks,
  hostings,
  sellerId,
}: Props) {
  const supabase = createClient();
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 — Core
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Step 2 — Technical
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedHostings, setSelectedHostings] = useState<string[]>([]);
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [readmeUrl, setReadmeUrl] = useState("");

  // Step 3 — Included
  const [updatesIncluded, setUpdatesIncluded] = useState(false);
  const [setupIncluded, setSetupIncluded] = useState(false);

  const toggle = (
    id: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !tagline ||
      !description ||
      !price ||
      Number(price) < 300 ||
      selectedCategories.length === 0 ||
      selectedStacks.length === 0 ||
      selectedHostings.length === 0 ||
      selectedCategories.length > 3 ||
      selectedStacks.length > 5 ||
      selectedHostings.length > 5 ||
      !readmeUrl ||
      !repoUrl
    ) {
      toast.warn("Please fill out all required fields.");
      return;
    }
    setLoading(true);

    try {
      const { data: product, error } = await supabase
        .from("products")
        .insert({
          name,
          tagline,
          description,
          price: parseFloat(price),
          updates_included: updatesIncluded,
          setup_included: setupIncluded,
          seller_id: sellerId,
          demo_url: demoUrl || null,
          /*repo_url: repoUrl || null,
          readme_url: readmeUrl || null, */
        })
        .select("id")
        .single();

      if (error) throw error;

      // Insert junction records
      if (selectedCategories.length) {
        await supabase.from("product_to_categories").insert(
          selectedCategories.map((id) => ({
            product_id: product.id,
            category_id: id,
          })),
        );
      }
      if (selectedStacks.length) {
        await supabase.from("product_to_stacks").insert(
          selectedStacks.map((id) => ({
            product_id: product.id,
            stack_id: id,
          })),
        );
      }
      if (selectedHostings.length) {
        await supabase.from("product_to_hostings").insert(
          selectedHostings.map((id) => ({
            product_id: product.id,
            hosting_id: id,
          })),
        );
      }

      router.push(`/products/${product.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const inputClass =
    "w-full border border-[#1A1A1A]/[0.12] rounded-lg px-4 py-2.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#2D5BE3]/50 placeholder:text-[#1A1A1A]/25 bg-[#F7F5F0] transition-colors";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-2";

  const steps = ["Core info", "Technical", "What's included"];

  return (
    <div className="max-w-3xl flex flex-col h-full mx-auto px-6 py-12">
      <div ref={topRef} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#1A1A1A]/35 mb-8 font-medium">
        <Link
          href="/dashboard"
          className="hover:text-[#2D5BE3] transition-colors"
        >
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A]/55">New product</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-[#1A1A1A]">
          List a product
        </h1>
        <p className="text-[#1A1A1A]/50 text-lg leading-relaxed mt-2">
          Fill in the details below. Your product will be reviewed before going
          live.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          const active = step === n;
          const done = step > n;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 text-xs font-medium transition-colors ${active ? "text-[#1A1A1A]" : done ? "text-[#2D5BE3]" : "text-[#1A1A1A]/30"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${active ? "bg-[#1A1A1A] text-white" : done ? "bg-[#2D5BE3] text-white" : "bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] text-[#1A1A1A]/30"}`}
                >
                  {done ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    n
                  )}
                </div>
                <span className="hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-px transition-colors ${done ? "bg-[#2D5BE3]" : "bg-[#1A1A1A]/[0.08]"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className="rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm p-8 space-y-6">
        {/* ── Step 1: Core info ── */}
        {step === 1 && (
          <>
            <div>
              <label className={labelClass}>Product name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. OpenCRM"
                className={inputClass}
              />
              <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                Clear, descriptive name. Not &quot;My App&quot;.
              </p>
            </div>

            <div>
              <label className={labelClass}>Tagline</label>
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. A self-hosted CRM that replaces HubSpot — forever."
                className={inputClass}
              />
              <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                One sentence. What it does and why it&apos;s better.
              </p>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  "Describe what the product does, who it's for, and what problems it solves.\n\nSeparate sections with a blank line."
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>Price (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min="300"
                  max="100000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2500"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                Minimum $300. Recommended: 500 - 15 000 $ for complete business
                systems.{" "}
                <span className="italic">Ownie will take a 3% fee.</span>
              </p>
            </div>

            <div>
              <label className="flex flex-row gap-1 items-center mb-1.5">
                <p className={`${labelClass} !m-0`}>Category</p>
                <span className="!text-xs !text-[#1A1A1A]/30">
                  (You can select multiple)
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    disabled={
                      selectedCategories.length >= 3 &&
                      !selectedCategories.includes(c.id)
                    }
                    onClick={() =>
                      toggle(c.id, selectedCategories, setSelectedCategories)
                    }
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      selectedCategories.includes(c.id)
                        ? "bg-[#2D5BE3] text-white border-[#2D5BE3]"
                        : selectedCategories.length >= 3
                          ? "opacity-30 cursor-not-allowed bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07]"
                          : "bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07] hover:border-[#2D5BE3]/30"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#1A1A1A]/30 mt-2">
                {selectedCategories.length}/3 selected
              </p>
            </div>
          </>
        )}

        {/* ── Step 2: Technical ── */}
        {step === 2 && (
          <>
            <div>
              <label className="flex flex-row gap-1 items-center mb-1.5">
                <p className={`${labelClass} !m-0`}>Tech stack</p>
                <span className="!text-xs !text-[#1A1A1A]/30">
                  (You can select multiple)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {stacks.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    disabled={
                      selectedStacks.length >= 5 &&
                      !selectedStacks.includes(s.id)
                    }
                    onClick={() =>
                      toggle(s.id, selectedStacks, setSelectedStacks)
                    }
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      selectedStacks.includes(s.id)
                        ? "bg-[#2D5BE3] text-white border-[#2D5BE3]"
                        : selectedStacks.length >= 5
                          ? "opacity-30 cursor-not-allowed bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07]"
                          : "bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07] hover:border-[#2D5BE3]/30"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#1A1A1A]/30 mt-2">
                {selectedStacks.length}/5 selected
              </p>
            </div>

            <div>
              <label className="flex flex-row gap-1 items-center mb-1.5">
                <p className={`${labelClass} !m-0`}>Hosting options</p>
                <span className="!text-xs !text-[#1A1A1A]/30">
                  (You can select multiple)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {hostings.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    disabled={
                      selectedHostings.length >= 5 &&
                      !selectedHostings.includes(h.id)
                    }
                    onClick={() =>
                      toggle(h.id, selectedHostings, setSelectedHostings)
                    }
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      selectedHostings.includes(h.id)
                        ? "bg-[#2D5BE3] text-white border-[#2D5BE3]"
                        : selectedHostings.length >= 5
                          ? "opacity-30 cursor-not-allowed bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07]"
                          : "bg-[#F7F5F0] text-[#1A1A1A]/50 border-[#1A1A1A]/[0.07] hover:border-[#2D5BE3]/30"
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#1A1A1A]/30 mt-2">
                {selectedHostings.length}/5 selected
              </p>
            </div>

            <div className="border-t border-[#1A1A1A]/[0.05] pt-6 space-y-4">
              <div>
                <label className="flex flex-row gap-1 items-center mb-1.5">
                  <p className={`${labelClass} !m-0`}>Demo URL</p>
                  <span className="!text-xs !text-[#1A1A1A]/30">
                    (Optional, but we highly recommend)
                  </span>
                </label>
                <input
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://demo.yourproduct.com"
                  className={inputClass}
                />
                <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                  Live demo or video walkthrough. Youtube, loom etc.
                </p>
              </div>

              <div>
                <label className={labelClass}>README / Documentation URL</label>
                <input
                  value={readmeUrl}
                  onChange={(e) => setReadmeUrl(e.target.value)}
                  placeholder="https://github.com/you/repo/blob/main/README.md"
                  className={inputClass}
                />
                <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                  Setup guide, requirements, and technical docs.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Repository / Code delivery URL
                </label>
                <input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/you/repo (private OK)"
                  className={inputClass}
                />
                <p className="text-xs text-[#1A1A1A]/30 mt-1.5">
                  Buyers get access after purchase. Can be private GitHub repo,
                  zip, etc.
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── Step 3: What's included ── */}
        {step === 3 && (
          <>
            <p className="text-sm text-[#1A1A1A]/70">
              Every product on Ownie includes full source code, documentation,
              and no subscription. Tell buyers what else is included.
            </p>

            {[
              {
                key: "updates",
                value: updatesIncluded,
                set: setUpdatesIncluded,
                label: "Updates included",
                desc: "You commit to delivering all future updates and bug fixes to buyers free, forever.",
              },
              {
                key: "setup",
                value: setupIncluded,
                set: setSetupIncluded,
                label: "Setup assistance included",
                desc: "You personally help the buyer deploy and go live (Vercel, Docker, VPS, etc.).",
              },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => item.set(!item.value)}
                className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                  item.value
                    ? "border-[#2D5BE3]/30 bg-[#2D5BE3]/[0.03] shadow-sm"
                    : "border-[#1A1A1A]/[0.07] hover:border-[#2D5BE3]/20"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    item.value
                      ? "bg-[#2D5BE3] border-[#2D5BE3]"
                      : "border-[#1A1A1A]/20"
                  }`}
                >
                  {item.value && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/40 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}

            {/* Summary */}
            <div className="border border-[#1A1A1A]/[0.07] rounded-xl p-5 bg-[#F7F5F0] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
                Summary
              </p>
              {[
                { label: "Product", value: name || "—" },
                {
                  label: "Price",
                  value: price
                    ? `$ ${parseInt(price).toLocaleString("en-US")}`
                    : "—",
                },
                {
                  label: "Categories",
                  value: selectedCategories.length
                    ? `${selectedCategories.length} selected`
                    : "—",
                },
                {
                  label: "Stack",
                  value: selectedStacks.length
                    ? `${selectedStacks.length} selected`
                    : "—",
                },
                { label: "Demo", value: demoUrl ? "✓ Provided" : "—" },
                {
                  label: "Updates",
                  value: updatesIncluded ? "✓ Included" : "Not included",
                },
                {
                  label: "Setup help",
                  value: setupIncluded ? "✓ Included" : "Not included",
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A]/40">{row.label}</span>
                  <span className="text-[#1A1A1A]/70 font-medium">
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-xs">
                <span className="text-[#1A1A1A]/40">Ownie fee 3%</span>
                <span className="text-[#1A1A1A]/70 font-medium">
                  $
                  {price
                    ? (parseFloat(price) * 0.03).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })
                    : "—"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
            className="px-6 py-3 rounded-full border border-[#1A1A1A]/[0.12] text-[#1A1A1A] font-medium text-sm hover:border-[#1A1A1A]/30 transition-colors"
          >
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
            disabled={
              (step === 1 &&
                (!name ||
                  !tagline ||
                  !description ||
                  !price ||
                  Number(price) < 300 ||
                  selectedCategories.length === 0)) ||
              (step === 2 &&
                (selectedStacks.length === 0 ||
                  selectedHostings.length === 0 ||
                  !readmeUrl ||
                  !repoUrl))
            }
            className="ml-auto px-6 py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-40"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="ml-auto px-6 py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200 disabled:opacity-40"
          >
            {loading ? "Submitting..." : "Submit for review →"}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-[#1A1A1A]/25 pt-4 pb-12">
        Your product will be reviewed by the Ownie team before going live.
      </p>
    </div>
  );
}
