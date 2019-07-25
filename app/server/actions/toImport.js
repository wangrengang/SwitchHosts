/**
 * toImport
 * @author: oldj
 * @homepage: https://oldj.net
 */

const path = require('path')
const {app, dialog} = require('electron')
const paths = require('../paths')

module.exports = async (svr) => {
  let download_path = app.getPath('downloads')
  let {lang} = global

  dialog.showOpenDialog({
    title: lang.import,
    defaultPath: path.join(global.last_path || download_path || paths.home_path, 'sh.json'),
    filters: [
      {name: 'JSON', extensions: ['json']},
      {name: 'All Files', extensions: ['*']}
    ]
  }, (fns) => {
    if (fns && fns.length > 0) {
      require('./importData')(svr, fns[0])
      global.last_path = path.dirname(fns[0])
    }
  })
}
