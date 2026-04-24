const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { escape } = require("html-escaper");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPairedNunjucksShortcode("codeblock", function (content, opts = {}) {
    const title = opts.title || "";
    const lang = opts.lang || "tsx";
    const framework = opts.framework || lang.toUpperCase();
    const code = escape(content.trim()).replace(/\n/g, "&#10;");

    return `<div class="code-card" data-lang="${lang}" data-slot="component-preview">
<div class="code-card__header" data-slot="code-header">
<div class="code-card__meta">
${title ? `<p class="code-card__title">${escape(title)}</p>` : ""}
<p class="code-card__framework">${escape(framework)}</p>
</div>
<div class="code-card__actions">
<button class="code-card__collapse" type="button" aria-label="Collapse code" hidden>Collapse</button>
<button class="code-card__copy" type="button" aria-label="Copy code" data-slot="copy-button">Copy</button>
</div>
</div>
<div class="code-card__code" data-slot="code">
<pre class="code-card__pre"><code class="language-${lang}">${code}</code></pre>
<div class="code-card__more" data-slot="expand-hint" aria-hidden="true">
<div class="code-card__fade"></div>
<button class="code-card__expand" type="button" aria-expanded="false">View</button>
</div>
</div>
</div>`;
  });

  eleventyConfig.addPairedNunjucksShortcode("getstarted", function (content, opts = {}) {
    const title = opts.title || "Get Started";

    return `<section class="get-started-card" data-slot="get-started">
<h2 class="get-started-card__title">${escape(title)}</h2>
<div class="get-started-card__body">
${content.trim()}
</div>
</section>`;
  });

  eleventyConfig.addPairedNunjucksShortcode("livepreview", function (content, opts = {}) {
    const title = opts.title || "Live Preview";

    return `<section class="live-preview-card" data-slot="live-preview">
<h2 class="live-preview-card__title">${escape(title)}</h2>
<div class="live-preview-card__body">
${content.trim()}
</div>
</section>`;
  });

  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");
  // Copy images folder
  eleventyConfig.addPassthroughCopy("src/werk/images");
  eleventyConfig.addPassthroughCopy("src/uiux/images");


  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "js/bootstrap.js",
    "node_modules/bootstrap/dist/css/bootstrap.min.css": "assets/bootstrap.css"
  });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "json"],
    dir: {
      input: "src",
      output: "_site",
      includes: "includes"
    }
  };
};
