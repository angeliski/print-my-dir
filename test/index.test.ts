import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('print-my-dir', () => {
  test
    .stdout()
    .do(async () => await cmd.run(['./test/dir']))
    .it('runs printer', ctx => {
      expect(ctx.stdout).to.contain('Print for the directory')
      expect(ctx.stdout).to.contain('/dir')

      expect(ctx.stdout).to.contain('dir')
      expect(ctx.stdout).to.contain('└─┬ dir1')
      expect(ctx.stdout).to.contain('  ├── file.js')
      expect(ctx.stdout).to.contain('  └── file2.js')

    })
})
