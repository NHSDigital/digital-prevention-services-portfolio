import fs from 'node:fs'
import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'
import yaml from 'js-yaml'

const serviceName = 'Digital prevention services'
const umami = JSON.parse(
  fs
    .readFileSync(new URL('./config/umami.jsonc', import.meta.url), 'utf8')
    .replace(/^\s*\/\/.*$/gm, '')
)

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    titleSuffix: `NHS ${serviceName}`,
    stylesheets: ['/assets/application.css'],
    markdown: {
      headingsStartWith: 'l'
    },
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
            text: 'Vaccinations',
            href: '/vaccinations'
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
    },
    footer: {
      meta: {
        items: [
          {
            text: 'About us',
            href: '/about'
          },
          {
            text: 'Privacy policy',
            href: '/privacy-policy'
          }
        ]
      }
    }
  })

  // The NHS plugin provides base.njk as a virtual template, so avoid copying it just to add this site-wide script.
  eleventyConfig.addTransform('analytics-script', (content) => {
    if (!content.includes('<head>')) return content

    return content.replace(
      '<head>',
      `<head>\n<script defer src="/assets/umami.js" data-website-id="046780c9-3684-4ded-a9d2-bdf361faf561" data-host-url="${umami.hostUrl}"></script>`
    )
  })

  // Allow YAML to be used for data
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents))

  // Passthrough
  eleventyConfig.addPassthroughCopy('./app/assets/images')
  eleventyConfig.addPassthroughCopy('./app/assets/pdfs')
  eleventyConfig.addPassthroughCopy('./app/assets/umami.js')

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
}
