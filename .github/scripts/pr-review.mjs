/**
 * GitHub Actions script: posts inline PR review comments for any markdown
 * mistakes found by check-markdown.mjs.
 *
 * Posts a REQUEST_CHANGES review with one inline comment per mistake and
 * exits with code 1 so the CI check fails and blocks merging.
 *
 * Required environment variables (set automatically by the workflow):
 *   GITHUB_TOKEN, REPO, PR_NUMBER, HEAD_SHA, BASE_REF
 */

import { getMistakes } from './check-markdown.mjs'

const { GITHUB_TOKEN, REPO, BASE_REF, PR_NUMBER, HEAD_SHA } = process.env

const mistakes = getMistakes(`origin/${BASE_REF}`)

if (mistakes.length === 0) {
  console.log('No markdown issues found.')
  process.exit(0)
}

// Fetch existing review comments to avoid posting duplicates
const existingResponse = await fetch(
  `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/comments?per_page=100`,
  {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }
)

if (!existingResponse.ok) {
  console.error('Failed to fetch existing comments:', await existingResponse.text())
  process.exit(1)
}

const existingComments = await existingResponse.json()

const newComments = mistakes
  .filter(({ path, line, message }) =>
    !existingComments.some(
      (c) => c.path === path && c.line === line && c.body === message
    )
  )
  .map(({ path, line, message }) => ({
    path,
    line,
    side: 'RIGHT',
    body: message,
  }))

if (newComments.length === 0) {
  console.log('All issues already have review comments. Nothing new to post.')
  process.exit(1)
}

console.log(`Posting ${newComments.length} new comment(s)...`)

const response = await fetch(
  `https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}/reviews`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commit_id: HEAD_SHA,
      event: 'REQUEST_CHANGES',
      body:
        `Found ${newComments.length} issue(s) in markdown file(s). ` +
        'Please address the inline comments below.',
      comments: newComments
    })
  }
)

if (!response.ok) {
  console.error('Failed to post review:', await response.text())
  process.exit(1)
}

console.log('Review posted successfully.')
process.exit(1)
