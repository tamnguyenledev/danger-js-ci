import { message, danger, warn, fail } from 'danger'
import fs from 'fs'

// // Setup
// const github = danger.github
// const pr = github.pr
// const modifiedFiles = danger.git.modified_files
// const newFiles = danger.git.created_files
// const changedFiles = [...modifiedFiles, ...newFiles]

// const numberOfReviewer = github.requested_reviewers.users.length
// if (numberOfReviewer) {
//   message('👏 Great work having someone review your code')
// } else {
//   warn('😔 No reviewer - Please add some teammates to review your PR')
// }

// const BIG_PR_THRESHOLD = 30
// const numberOfChangedFiles = pr.changed_files
// if (numberOfChangedFiles >= BIG_PR_THRESHOLD) {
//   warn('‼️ Your PR changed too many files, I know you can make it simpler 💪')
// }

// // Having commited a new feature
// const prTitle = pr.title
// const jiraTicketRegex = /\[GE-\d*]/
// const commitsMessage = github.commits.map(
//   (commitMeta) => commitMeta.commit.message
// )
// for (const index in commitsMessage) {
//   if (commitsMessage[index].toLowerCase().match(/feature/)) {
//     if (!jiraTicketRegex.test(prTitle)) {
//       warn(
//         `🔍 You are adding a new feature but I don't see any Jira ticket. Did you miss it?`
//       )
//     }
//     break
//   }
// }

// const consolelogRegex = /console\.log\(.*\)/
// const emptyFiles: string[] = []
// const filesWithConsoleLog: string[] = []

// for (const index in changedFiles) {
//   const filePath = changedFiles[index]
//   const fileContent = fs.readFileSync(filePath).toString()
//   if (!fileContent) {
//     emptyFiles.push(filePath)
//   } else if (fileContent.match(consolelogRegex)) {
//     filesWithConsoleLog.push(filePath)
//   }
// }

// emptyFiles.length &&
//   warn(
//     `Are you sure you want to leave these files empty: ${emptyFiles.join(
//       ', '
//     )} ?`
//   )

// filesWithConsoleLog.length &&
//   warn(
//     `🗑️ Did you forget to remove console.log in these files:
//   ${filesWithConsoleLog.join(', ')}?`
//   )

// const encourageDeletionMessage =
//   pr.deletions > pr.additions
//     ? '\n🎉 Great work keeping our codebase simple 🎉'
//     : ''
// message(
//   `ℹ️ You added ${pr.additions} lines and deleted ${pr.deletions} lines.${encourageDeletionMessage}`
// )

/**
 * Tslint your code with Danger
 */
import { ILinterOptions, Linter, Configuration } from 'tslint'

const BASE_OPTIONS: ILinterOptions = {
  fix: false,
  formatter: 'stylish',
}

const RULE_SEVERITY = {
  error: 'ERROR',
  warning: 'WARNING',
}

const tslint = (options: ILinterOptions = BASE_OPTIONS) => {
  // const filesToLint = danger.git.created_files.concat(danger.git.modified_files)
  const cli = new Linter(options)
  const fileNames = ['./components/input.tsx', './components/test.ts']
  const config = Configuration.findConfiguration('tslint.json').results

  fileNames.map((fileName, index) => {
    const fileContent = fs.readFileSync(fileName, 'utf8')
    cli.lint(fileName, fileContent, config)
  })
  const failures = cli.getResult().failures

  failures.map((failure) => {
    const failureObj = failure.toJson()
    let method
    if (failureObj.ruleSeverity === RULE_SEVERITY.error) {
      method = fail
    } else if (failureObj.ruleSeverity === RULE_SEVERITY.warning) {
      method = warn
    }

    method(
      failureObj.failure,
      failure.getFileName(),
      failureObj.startPosition.line
    )
  })
}

tslint()

// async function lintFile(linter, config, path) {
//   const contents = await danger.github.utils.fileContents(path)
//   const report = linter.executeOnText(contents, path)

//   report.results[0].messages.map((msg) => {
//     if (msg.fatal) {
//       fail(`Fatal error linting ${path} with eslint.`)
//       return
//     }

//     const fn = { 1: warn, 2: fail }[msg.severity]

//     fn(`${path} line ${msg.line} – ${msg.message} (${msg.ruleId})`)
//   })
// }
