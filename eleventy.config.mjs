import Nunjucks from "nunjucks";
import sass from "sass-embedded";
import path from "path";

export default function(eleventyConfig) {

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      './node_modules/nhsuk-frontend/packages/components',
      './node_modules/nhsuk-frontend/packages/macros',
      'app/_layouts'
    ])
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  eleventyConfig.addPassthroughCopy({
    "node_modules/nhsuk-frontend/packages/assets": "assets",
    "node_modules/nhsuk-frontend/dist/nhsuk.min.js": "javascripts/nhsuk.min.js",
  });

  // Set up SASS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    compile: function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir, this.config.dir.includes, './node_modules', './'],
        quietDeps: true
      });

      return () => {
        return result.css;
      };
    },
  });

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'app',
      layouts: '_layouts'
    }
  }
};
