import * as core from '@actions/core'
import {getOctokit} from '@actions/github'
import * as PR from './pull_request'

const octokit = getOctokit(core.getInput('github_token'))

async function run(): Promise<void> {
  try {
    const branchPrefix = core.getInput('branch_prefix')
    const baseBranch = core.getInput('base_branch')
    const assignees = getInputArray('assignees')
    const labels = getInputArray('labels')
    const reviewers = getInputArray('reviewers')

    const prNumber = PR.getPrNumber()
    if (!prNumber) {
      throw new Error('Can not get current PR number')
    }

    const pr = await PR.get(octokit, prNumber)

    if (branchPrefix !== '*' && !pr.head.ref.startsWith(branchPrefix)) {
      core.info(`Ignore action from branch ${baseBranch}`)
      return
    }

    if (pr.head.ref === baseBranch) {
      core.info(`Skip to create PR to branch ${baseBranch}`)
      return
    }

    await PR.create(octokit, {
      title: pr.title,
      body: pr.body,
      head: pr.head.ref,
      base: baseBranch,
      assignees,
      labels,
      reviewers
    })
  } catch (error) {
    core.setFailed(String(error))
  }
}

function getInputArray(name: string): string[] {
  const value = core.getInput(name)
  if (!value) return []

  return value.split(',')
}

run()
