---
title: "Split accordion"
description: "A accordion and image section"
---

{% livepreview { title: "Live Preview" } %}
<div class="split-preview" data-split-preview>
  <div class="split-preview__left">
    <p class="split-preview__eyebrow">POINT OF SALE</p>
    <h3 class="split-preview__heading">See your whole business click into place</h3>
    <div class="split-preview__items">
      <button type="button" class="split-preview__trigger" data-split-trigger="0"><span>Take payments</span><span class="split-preview__icon" data-split-icon="0">+</span></button>
      <div class="split-preview__panel" data-split-panel="0">Sell anything in person and online.</div>
      <button type="button" class="split-preview__trigger" data-split-trigger="1"><span>Manage your team</span><span class="split-preview__icon" data-split-icon="1">+</span></button>
      <div class="split-preview__panel" data-split-panel="1">Organize permissions and shifts in one place.</div>
      <button type="button" class="split-preview__trigger" data-split-trigger="2"><span>Grow your customer base</span><span class="split-preview__icon" data-split-icon="2">+</span></button>
      <div class="split-preview__panel" data-split-panel="2">Capture repeat buyers and track customer insights.</div>
    </div>
  </div>
  <div class="split-preview__right">
    <img src="https://dummyimage.com/1400x900/e5e7eb/9ca3af.png" alt="Point of sale interface preview" />
  </div>
</div>
{% endlivepreview %}

{% getstarted { title: "Get Started" } %}
<p>Before placing this component on another site, confirm:</p>
<ul>
  <li>Choose the version below: Vanilla JS mount helper or Next.js client component.</li>
  <li>Provide your own content object (eyebrow, heading, image, and accordion items).</li>
  <li>Make sure your page allows custom CSS injection or include equivalent styles in your app stylesheet.</li>
  <li>Use your own link destinations and body copy for each accordion item.</li>
</ul>
<p>
  <a href="/uiux/how-to-add-project/">How to add to my project</a>
</p>
{% endgetstarted %}

<section class="props-card" aria-labelledby="split-props-title">
  <h2 class="props-card__title" id="split-props-title">Available Props</h2>
  <p class="props-card__intro">Use these props/content fields to customize the split accordion component:</p>
  <div class="props-card__table-wrap">
    <table class="props-card__table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Default</th>
          <th>What it controls</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>eyebrow</code></td>
          <td><code>string</code></td>
          <td><code>"POINT OF SALE"</code></td>
          <td>Small label above the heading</td>
        </tr>
        <tr>
          <td><code>heading</code></td>
          <td><code>string</code></td>
          <td>See your whole business click into place</td>
          <td>Main headline text</td>
        </tr>
        <tr>
          <td><code>rightImage</code></td>
          <td><code>string</code></td>
          <td><code>"https://dummyimage.com/1400x900/e5e7eb/9ca3af.png"</code></td>
          <td>Image shown on the right side</td>
        </tr>
        <tr>
          <td><code>imageAlt</code></td>
          <td><code>string</code></td>
          <td><code>"Point of sale interface preview"</code></td>
          <td>Accessible alt text for the image</td>
        </tr>
        <tr>
          <td><code>accordionItems</code></td>
          <td><code>Array&lt;{ title, body, linkLabel?, linkHref? }&gt;</code></td>
          <td>5 default items</td>
          <td>Accordion entries and optional learn-more links</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<div class="framework-switch" data-framework-switch hidden>
  <button type="button" class="framework-switch__btn is-active" data-framework-choice="vanilla">Vanilla JS</button>
  <button type="button" class="framework-switch__btn" data-framework-choice="next">Next.js</button>
</div>

<div data-framework-panel="vanilla">
{% codeblock { lang: "js", title: "split-feature-pos-section.js", framework: "Vanilla JS" } %}
const DEFAULT_CONTENT = {
  eyebrow: "POINT OF SALE",
  heading: "See your whole business click into place",
  imageAlt: "Point of sale interface preview",
  rightImage: "https://dummyimage.com/1400x900/e5e7eb/9ca3af.png",
  accordionItems: [
    {
      title: "Take payments",
      body: "Sell anything in person and online with a point of sale platform that works for whatever you sell.",
      linkLabel: "Learn more",
      linkHref: "#",
    },
    { title: "Manage your team", body: "" },
    { title: "Grow your customer base", body: "" },
    { title: "Control your cash flow", body: "" },
    { title: "Connect your favorite apps", body: "" },
  ],
};

export function mountSplitFeaturePosSection(target, content = {}) {
  const host = typeof target === "string" ? document.querySelector(target) : target;
  if (!host) throw new Error("mountSplitFeaturePosSection: target element not found.");

  const config = {
    ...DEFAULT_CONTENT,
    ...content,
    accordionItems: content.accordionItems || DEFAULT_CONTENT.accordionItems,
  };

  // render + wire accordion (same logic as your component file)
  // ...
}
{% endcodeblock %}
</div>

<div data-framework-panel="next" hidden>
{% codeblock { lang: "tsx", title: "split-feature-pos-section-client.tsx", framework: "Next.js + React" } %}
"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  body?: string;
  linkLabel?: string;
  linkHref?: string;
};

type SplitFeaturePosContent = {
  eyebrow?: string;
  heading?: string;
  imageAlt?: string;
  rightImage?: string;
  accordionItems?: AccordionItem[];
};

const DEFAULT_CONTENT: Required<SplitFeaturePosContent> = {
  eyebrow: "POINT OF SALE",
  heading: "See your whole business click into place",
  imageAlt: "Point of sale interface preview",
  rightImage: "https://dummyimage.com/1400x900/e5e7eb/9ca3af.png",
  accordionItems: [
    {
      title: "Take payments",
      body: "Sell anything in person and online with a point of sale platform that works for whatever you sell.",
      linkLabel: "Learn more",
      linkHref: "#",
    },
    { title: "Manage your team", body: "" },
    { title: "Grow your customer base", body: "" },
  ],
};

export function SplitFeaturePosSectionClient({ content = {} }: { content?: SplitFeaturePosContent }) {
  const config = {
    ...DEFAULT_CONTENT,
    ...content,
    accordionItems: content.accordionItems || DEFAULT_CONTENT.accordionItems,
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[45%_55%]">
      <div className="bg-white p-10 lg:p-16">
        <p className="mb-5 text-xs tracking-[0.18em] text-neutral-500">{config.eyebrow}</p>
        <h2 className="mb-10 max-w-[11ch] text-5xl leading-[0.95] text-neutral-900">{config.heading}</h2>

        <div className="border-t border-neutral-200">
          {config.accordionItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={`${item.title}-${index}`} className="border-b border-neutral-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left text-2xl"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.title}</span>
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="pb-5">
                    {item.body ? <p className="max-w-[42ch] text-neutral-600">{item.body}</p> : null}
                    {item.linkLabel && item.linkHref ? (
                      <a className="mt-3 inline-block underline" href={item.linkHref}>
                        {item.linkLabel}
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-neutral-100">
        <img src={config.rightImage} alt={config.imageAlt} className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
{% endcodeblock %}
</div>
<script src="/assets/flight-framework-toggle.js"></script>

{% codeblock { lang: "tsx", title: "Usage", framework: "Next.js + React" } %}
import { SplitFeaturePosSectionClient } from "@/components/split-feature-pos-section-client";

const splitFeatureContent = {
  eyebrow: "A website that turns visitors into paying guests.",
  heading: "Your whole menu in a click.",
  imageAlt: "Point of sale interface preview",
  rightImage: "https://dummyimage.com/1400x900/e5e7eb/9ca3af.png",
  accordionItems: [
    {
      title: "Smart menus & digital ordering",
      body: "Give guests a beautiful, branded menu they can browse and order from directly on your website.",
      linkLabel: "Learn more",
      linkHref: "#",
    },
    {
      title: "Accept payments, anywhere",
      body: "Let guests pay online when they order, reserve, or purchase gift cards through your website.",
      linkLabel: "Learn more",
      linkHref: "#",
    },
  ],
};

export default function Home() {
  return <SplitFeaturePosSectionClient content={splitFeatureContent} />;
}
{% endcodeblock %}

{% livepreview { title: "Accordion Section Preview" } %}
<div class="split-preview split-preview--accordion-only" data-split-preview>
  <div class="split-preview__left">
    <p class="split-preview__eyebrow">ACCORDION ONLY</p>
    <h3 class="split-preview__heading">Accordion section interaction</h3>
    <div class="split-preview__items">
      <button type="button" class="split-preview__trigger" data-split-trigger="0"><span>Take payments</span><span class="split-preview__icon" data-split-icon="0">+</span></button>
      <div class="split-preview__panel" data-split-panel="0">Sell anything in person and online with a unified checkout flow.</div>
      <button type="button" class="split-preview__trigger" data-split-trigger="1"><span>Manage your team</span><span class="split-preview__icon" data-split-icon="1">+</span></button>
      <div class="split-preview__panel" data-split-panel="1">Set roles, assign access, and keep operations organized.</div>
      <button type="button" class="split-preview__trigger" data-split-trigger="2"><span>Grow your customer base</span><span class="split-preview__icon" data-split-icon="2">+</span></button>
      <div class="split-preview__panel" data-split-panel="2">Build relationships with loyalty and repeat purchase data.</div>
    </div>
  </div>
</div>
<script src="/assets/split-accordion-preview.js"></script>
{% endlivepreview %}

{% codeblock { lang: "tsx", title: "Accordion Section Only", framework: "React / Next.js" } %}
import { useState } from "react";

type AccordionItem = {
  title: string;
  body?: string;
  linkLabel?: string;
  linkHref?: string;
};

export function SplitAccordionSection({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-neutral-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={`${item.title}-${index}`} className="border-b border-neutral-200">
            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left text-2xl"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span>{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="pb-5">
                {item.body ? <p className="max-w-[42ch] text-neutral-600">{item.body}</p> : null}
                {item.linkLabel && item.linkHref ? (
                  <a className="mt-3 inline-block underline" href={item.linkHref}>
                    {item.linkLabel}
                  </a>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
{% endcodeblock %}
