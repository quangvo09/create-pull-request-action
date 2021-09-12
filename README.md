<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Create Pull Request Action

Help you auto create PR from hotfix branch to other branches, such as: `develop`, `staging`

# Usage

1. Create github action file `.github/workflows/hotfix-action.yml`

2. Save file with content:

```yaml
name: Hotfix Action
on:
  pull_request:
    branches:
      - master
jobs:
  Create-Pull-Request-Action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: quangvo09/pull-request-action@v1
        name: Create PR to develop
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          base_branch: develop
          labels: hotfix,develop
          assignees: quangvo09
      - uses: quangvo09/pull-request-action@v1
        name: Create PR to integration
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          base_branch: integration
          labels: hotfix,integration
          assignees: quangvo09
```
