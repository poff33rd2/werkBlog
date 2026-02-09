const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  // ALSO make sure images are copied
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
