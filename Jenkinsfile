@Library('linkurious-shared')_

nodeJob {
  // General
  projectName = "linkurious/ogma"
  runBenchTests = true
  runPreReleaseOnUpload = false
  npmPackPath = './dist'

  //documentation
  binaries = ['./dist/ogma.tgz']
  groupId = 'com.linkurious.documentation'
  createGitTag = true

  //Deployement
  runDeploy = true
  playbookAppName = "documentation"
  ansibleTags = "playbook::infra::docker::up"
}
