import {Command, flags} from '@oclif/command'
import ora from 'ora'
import * as path from 'path'

const dirTree = require('dir-tree-creator')

class PrintMyDir extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    label: flags.string({char: 'l', description: 'A label to use in your print'}),
  }

  static args = [{name: 'directory', default: '.'}]

  async read(directory: string, label?: string) {
    return new Promise((resolve, reject) => {
      const spinner = ora('Browsing directories').start()
      dirTree(directory, {label}, (err: any, tr: any) => {
        if (err) {
          this.log(tr)
          spinner.fail()
          reject(new Error(err))
        }
        spinner.succeed()
        this.log(tr)
        resolve(tr)
      })
    })
  }

  async run() {
    const {args, flags} = this.parse(PrintMyDir)
    const directory = path.resolve(process.cwd(), args.directory)
    this.log(`Print for the directory ${directory}`)
    await this.read(directory, flags.label)
  }
}

export = PrintMyDir
