import yaml from "js-yaml";
import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'

const serviceName = 'Digital prevention services portfolio'

export default function(eleventyConfig) {

  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    titleSuffix: `NHS ${serviceName}`,
    stylesheets: ['/assets/application.css'],
    header: {
      service: {
        text: serviceName,
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
          },
          {
            text: 'Documents',
            href: '/docs'
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
