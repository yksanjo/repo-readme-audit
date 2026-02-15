#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');

async function main() {
  console.log(chalk.cyan('\n📋 README Audit v1.0.0\n'));
  const repos = JSON.parse(execSync('gh repo list yksanjo --limit 100 --json name', { encoding: 'utf8' }));
  let missing = 0, hasReadme = 0;
  for (const repo of repos) {
    try { execSync(`gh repo view yksanjo/${repo.name} --json readme`, { encoding: 'utf8' }); hasReadme++; }
    catch { console.log(chalk.red(`✗ ${repo.name}: No README`)); missing++; }
  }
  console.log(chalk.green(`\n✓ ${hasReadme} repos have READMEs`));
  console.log(chalk.red(`✗ ${missing} repos missing READMEs`));
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
