'use babel';

import ExpandSelectionToIndentation from './expand-selection-to-indentation';
import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'expand-selection-to-indentation:select-up': () => {
          ExpandSelectionToIndentation.up_or_down(true);
        },
        'expand-selection-to-indentation:select-down': () => {
          ExpandSelectionToIndentation.up_or_down(false);
        },
        'expand-selection-to-indentation:select-both': () => {
          ExpandSelectionToIndentation.up_and_down();
        },
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },
};
