import { createHash } from 'node:crypto'

import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'
import yaml from 'js-yaml'

const serviceName = 'Digital prevention services (DPSP)'

// The host serving the Umami script and receiving analytics events.
const analyticsHost = 'https://analytics.digital-prevention-services.nhs.uk'

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

// Removes personal data before Umami sends it. Copied from the onboarding guide at
// https://github.com/NHSDigital/dpsp-umami#2-add-the-tracking-script
const umamiBeforeSendScript = String.raw`
  // Removes personal data from what is sent to Umami. Test it against your own URLs and titles.
  function umamiBeforeSend(type, payload) {
    const decode = (s) => {
      try { return decodeURIComponent(s); } catch { return s; }
    };
    // Email addresses, UUIDs, then any run of letters and digits that contains a digit.
    const redact = (s) => s
      .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
      .replace(/\b[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\b/gi, "[id]")
      .replace(/[a-z0-9]*\d[a-z0-9]*/gi, "[id]");
    const cleanUrl = (value) => {
      if (!value) return value;
      const url = new URL(value, location.origin);
      const rest = redact(decode(url.pathname + url.search));
      return /^https?:/i.test(value) ? url.origin + rest : rest;
    };
    payload.url = cleanUrl(payload.url);
    payload.referrer = cleanUrl(payload.referrer);
    if (payload.title) payload.title = redact(payload.title);
    return payload;
  }
`

// Calculated from the script above, so the CSP always matches it.
const umamiBeforeSendHash = `sha256-${createHash('sha256').update(umamiBeforeSendScript).digest('base64')}`

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
            text: 'Privacy notice',
            href: '/privacy-notice'
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
  script-src 'self' ${analyticsHost} '${cspInlineScriptHash}' '${umamiBeforeSendHash}';
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
        // The redaction function must come before the Umami script.
        `<script>${umamiBeforeSendScript}</script>
<script defer src="${analyticsHost}/script.js"
  data-website-id="${analyticsWebsiteId}"
  data-host-url="${analyticsHost}"
  data-domains="www.digital-prevention-services.nhs.uk"
  data-exclude-hash="true"
  data-before-send="umamiBeforeSend"></script>`
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
