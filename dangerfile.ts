import labels from 'danger-plugin-labels'
import { schedule } from 'danger'

schedule(
  labels({
    rules: [
      {
        match: /WIP/i,
        label: 'Work In Progress',
      },
    ],
  })
)
