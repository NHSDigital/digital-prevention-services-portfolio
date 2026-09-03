import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'
import yaml from 'js-yaml'

const serviceName = 'Digital prevention services (DPSP)'

// The CloudFront origin hosting the Umami script and receiving analytics events.
const analyticsHost = 'https://d11vb7m97xecvc.cloudfront.net'

// The Umami website ID, available in the website's Umami settings.
const analyticsWebsiteId = '046780c9-3684-4ded-a9d2-bdf361faf561'

// Hash of the exact inline script emitted by the NHS plugin, used by the CSP.
// If that script changes, hash its contents with the command below,
// replacing '<script contents>' with the JavaScript between the <script> tags
// in the generated HTML body (currently: document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' nhsuk-frontend-supported' : '');).
// Do not use the external Umami <script defer src="..."> tag for this hash.
// That external script is allowed by the CSP separately by script-src via analyticsHost.
// printf '%s' "<script contents>" | openssl dgst -sha256 -binary | openssl base64 -A
// Prefix the result with 'sha256-' and update this value.
const cspInlineScriptHash =
  'sha256-tDOvXJi1PXbg0CWjLCCYSNHRXtps26K4JXkE3M6u/c0='

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
            text: 'Case studies',
            href: '/case-studies'
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

  // The NHS plugin does not provide a way to add a script to the <head>, so use this approach instead
  eleventyConfig.addTransform('analytics-script', (content) => {
    if (!content.includes('<head>')) return content

    return content.replace(
      '<head>',
      // GitHub Pages cannot set response headers, so enforce the basic CSP in the document head.
      // Keep the analytics host in both script-src and connect-src: Umami loads its script and sends events there.
      `<head>
<meta http-equiv="Content-Security-Policy" content="default-src 'self';
  script-src 'self' ${analyticsHost} '${cspInlineScriptHash}';
  connect-src 'self' ${analyticsHost};
  style-src 'self';
  img-src 'self' data:;
  font-src 'self' https://assets.nhs.uk;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'none';">
` +
        // Load Umami asynchronously for analytics.
        // The host and website ID are configured in the variables above.
        `<script defer src="${analyticsHost}/script.js"
  data-website-id="${analyticsWebsiteId}"
  data-host-url="${analyticsHost}"
  data-domains="www.digital-prevention-services.nhs.uk"></script>`
    )
  })

  // Allow YAML to be used for data
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents))

  // Passthrough
  eleventyConfig.addPassthroughCopy('./app/assets/images')
  eleventyConfig.addPassthroughCopy('./app/assets/pdfs')

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
