import * as core from '@actions/core'
import {getOctokit} from '@actions/github'
import * as PR from './pull_request'

const octokit = getOctokit(core.getInput('github_token'))

async function run(): Promise<void> {
  try {
    const prNumber = +core.getInput('pr_number')
    const branch = core.getInput('branch')
    const to = core.getInput('to')
    const assignees = (core.getInput('assignees') || '').split(',')
    const labels = (core.getInput('labels') || '').split(',')

    const pr = await PR.get(octokit, prNumber)

    await PR.create(octokit, {
      title: pr.title,
      body: pr.body,
      branch,
      to,
      assignees,
      labels
    })
  } catch (error: unknown) {
    core.setFailed(JSON.stringify(error))
  }
}

run()
