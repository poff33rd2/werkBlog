module.exports = function(eleventyConfig) {
  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "js/bootstrap.js",
    "node_modules/bootstrap/dist/css/bootstrap.min.css": "assets/bootstrap.css"
  });
  
  return {
    passthroughFileCopy: true,
    mardownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "json"],
    dir: {
      input: "src",
      output: "_site",
      includes: "includes" 
    }
  };
};
