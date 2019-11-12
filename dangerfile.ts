import { message, danger, warn } from 'danger'

const modifiedMD = danger.git.modified_files.join('- ')
message('Changed Files in this PR: \n - ' + modifiedMD)

const numberOfReviewers = danger.github.requested_reviewers.users.length
if (numberOfReviewers) {
  message('Great work having someone review your code.')
} else {
  warn('You should include at least 1 reviewer.')
}

const numberOfChangedFiles = danger.github.pr.changed_files
if (numberOfChangedFiles >= 30) {
  warn('Your PR changed too many files, try to make it simpler.')
}

const prTitle = danger.github.pr.title
const jiraTicketRegex = /\[GE-\d*]/
if (!jiraTicketRegex.test(prTitle)) {
  warn('You should include Jira ticket number for this PR.')
}
