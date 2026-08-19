import xGovukConfig from '@x-govuk/eslint-config'

export default [
  ...xGovukConfig,
  {
    ignores: ['_site', 'app/assets/umami.js']
  }
]
