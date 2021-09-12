export type GetPullRequestResponse = {
  number: number
  url: string
  title: string
  body: string | null
}

export type CreatePullRequestRequest = {
  title: string
  branch: string
  to: string
  body: string | null
  assignees: string[]
  labels: string[]
}

export type CreatePullRequestResponse = {
  number: number
  url: string
}
