export type GetPullRequestResponse = {
  number: number
  url: string
  title: string
  body: string | null
  head: {
    label: string
    ref: string
  }
}

export type CreatePullRequestRequest = {
  title: string
  head: string
  base: string
  body: string | null
  assignees: string[]
  labels: string[]
}

export type CreatePullRequestResponse = {
  number: number
  url: string
}
