import { message, danger, warn } from 'danger'

// Setup
const github = danger.github
const pr = github.pr
const modifiedFiles = danger.git.modified_files
const newFiles = danger.git.created_files
const changedFiles = [...modifiedFiles, ...newFiles]

const numberOfReviewer = github.requested_reviewers.users.length
if (numberOfReviewer) {
  message('👏 Great work having someone review your code')
} else {
  warn('🕵 Remember to add at least 1 reviewer')
}

const BIG_PR_THRESHOLD = 30
const numberOfChangedFiles = pr.changed_files
if (numberOfChangedFiles >= BIG_PR_THRESHOLD) {
  warn('Your PR changed too many files, try to make it simpler 🙏')
}

const prTitle = pr.title
const jiraTicketRegex = /\[GE-\d*]/
if (!jiraTicketRegex.test(prTitle)) {
  warn(
    `🔍 I can't find the Jira ticket number in the PR title. You should include it for easy tracking`
  )
}
