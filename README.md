# NHS Digital prevention services portfolio

## The DPSP website is a tool for working in the open

The website is public, but on the whole it is not _aimed at the public_. The content is written with an audience of NHS professionals in mind, but it's published on the open web because:

1. publishing on internal platforms often means that someone, somewhere, can't see what we're sharing by default - which forces them to ask for access, or abandon their attempt
2. publishing openly makes the website as a whole, and individual pages in particular, easier for people to find and share with others
3. openness makes it easier for others to scrutinise what we do, which in turn helps to keep us accountable; it’s one of our four principles after all

Being open doesn’t mean we have to open up about _everything_. There will always be aspects of our work that are confidential (for example, because of commercial arrangements we've agreed with partner organisations).

Our strategy is to make the website more helpful for NHS colleagues we work with, or seek to work with. Over time, we will iterate and improve it, to make the content more product-focused, and make our offer easier to grasp.

## The `/docs` section is a place for miscellaneous items that don't have an obvious home elsewhere

The `/docs` section is well suited to:

- policy and strategy plans
- reports and other one-off or occasional publications
- general guidance that isn't related to a specific service
- information that's likely to be shared outside DPSP, and would benefit from having a sharable URL that we can send to people
- sharing non-HTML items like PDFs, presentations, and spreadsheets (although we always aim to publish as HTML where possible, even if that means doing additional work to convert other document formats to HTML)

The `/docs` section is _not_ suitable for:

- anything that an end-user might be asked to read as part of using a service
- anything containing any confidential information
- pages that explain what our products are, or how they work (because pages like this are likely to be a core aspect of website content in due course)
- blog posts, think pieces, opinions, etc

## How to add /docs pages

Adding a page to `app/docs` will automatically include it in the
"Documents" left-hand nav menu that appears on `docs/` and pages beneath
it.

## Analytics

[The Umami redaction script](app/assets/umami-before-send.js) follows the
[Umami onboarding guide](https://github.com/NHSDigital/dpsp-umami#2-add-the-tracking-script).
It replaces email addresses and identifiers in URLs, referrers and page titles
before they are sent. Keep it as a classic deferred script before the Umami
tracking script so `window.umamiBeforeSend` is available when tracking starts.
The existing `script-src 'self'` policy allows this file without an inline hash.

After building with `npm run build`, run
`node --test .github/scripts/umami-before-send.test.mjs`
to check the generated script order and redaction behaviour.
