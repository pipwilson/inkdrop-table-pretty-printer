'use babel';

const { prettyPrint } = require('md_table_prettyprint')

function _tablePrettyPrint() {
    const activeEditor = inkdrop.getActiveEditor();
    if (activeEditor) {
        var contentValue = activeEditor.cm.getValue();
        const tables = contentValue.match(new RegExp(/(\|.*|\n)+/, 'gm'));
        for (var i = tables.length - 1; i >= 0; i--) {
          console.log(tables[i]);
          contentValue = contentValue.replace(tables[i].trim(), prettyPrint(tables[i]))
        }
        activeEditor.cm.setValue(contentValue);
    }
}

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      "table-pretty-print": () => _tablePrettyPrint(),
    });
  },

  deactivate() {
    this.subscription.dispose();
  },
};