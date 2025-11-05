import Nunjucks from "nunjucks";
import * as sass from "sass-embedded"
import path from "path";
import prototypeFilters from '@x-govuk/govuk-prototype-filters';
import yaml from "js-yaml";
import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'


export default function(eleventyConfig) {

  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    stylesheets: ['/assets/application.css'],
    header: {
      service: {
        text: 'Digital prevention services portfolio',
        href: '/'
      },
      navigation: {
        items: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Screening',
            href: '/screening'
          },
          {
            text: 'Roadmap',
            href: '/roadmap'
          },
          {
            text: 'Notes',
            href: '/notes'
          }
        ]
      }
    }
  })

  // Allow YAML to be used for data
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Passthrough
  eleventyConfig.addPassthroughCopy('./app/assets/images')

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'app',
      includes: '_components',
      layouts: '_layouts'
    }
  }
};
