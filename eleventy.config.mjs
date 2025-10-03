import Nunjucks from "nunjucks";
import sass from "sass-embedded";
import path from "path";
import prototypeFilters from '@x-govuk/govuk-prototype-filters';
import yaml from "js-yaml";


export default function(eleventyConfig) {

  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      './node_modules/nhsuk-frontend/dist/nhsuk/components',
      './node_modules/nhsuk-frontend/dist/nhsuk/macros',
      './node_modules/nhsuk-frontend/dist/nhsuk',
      './node_modules/nhsuk-frontend/dist',
      'app/_layouts'
    ])
  );

  nunjucksEnvironment.addFilter("govukDate", prototypeFilters.govukDate)

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  // Allow YAML to be used for data
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "node_modules/nhsuk-frontend/packages/assets": "assets",
    "node_modules/nhsuk-frontend/dist/nhsuk.min.js": "javascripts/nhsuk.min.js",
    "app/images": "images"
  });

  // Set up SASS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
    
      let result = await sass.compileAsync(inputPath, {
        importers: [new sass.NodePackageImporter()],
        loadPaths: ['node_modules', parsed.dir]
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
