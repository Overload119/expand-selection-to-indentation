'use babel';

const DEBUG = false;
const LOG_PREFIX = "[expand-selection-to-indentation]"

/**
 * Use log(...) with the specified parameters and prefix.
 */
function log(){
  if (!DEBUG) return;
  var args = Array.prototype.slice.call(arguments);
  args.unshift(LOG_PREFIX + ' ');
  console.log.apply(console, args);
}

class ExpandSelectionToIndentation {
  getCurrentLineText() {
    const editor = atom.workspace.getActiveTextEditor();
    const cursorPosition = editor.getCursorBufferPosition();
    return editor.lineTextForBufferRow(cursorPosition.row);
  }

  numberOfLeadingSpacesInText(text) {
    if (!text) {
      return null;
    }

    let leadingSpacesCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        leadingSpacesCount++;
      } else {
        break;
      }
    }
    return leadingSpacesCount;
  }

  /**
   * Select lines with the same indentation in the given direction
   *
   * @param  {boolean}  upwards the direction in which to select.
   */
  up_or_down(upwards) {
    // false => 1, true => -1
    const direction = (1 - 2 * new Boolean(upwards))
    const editor = atom.workspace.getActiveTextEditor();

    const currentRow = editor.getCursorBufferPosition().row;
    const leadingSpacesCount = this.numberOfLeadingSpacesInText(
      editor.lineTextForBufferRow(currentRow),
    );

    log('Start at ', currentRow);

    let numberOfRowsToSelect = 0;
    // Continue scanning rows of text until we meet the same leading space count.
    while (1) {
      let lineIndex = currentRow + direction * (numberOfRowsToSelect + 1);
      let line = editor.lineTextForBufferRow(lineIndex);
      let spacesOnLine = this.numberOfLeadingSpacesInText(line);
      if (spacesOnLine < leadingSpacesCount || lineIndex === -1 || lineIndex === 0) {
        log('Done adding rows, lineIndex: %d', lineIndex);
        break;
      }
      numberOfRowsToSelect++;
      log('Add %s at %s', line, lineIndex);
    }

    if (upwards) editor.moveUp(numberOfRowsToSelect);

    editor.selectDown(numberOfRowsToSelect);
  }

  up_and_down() {
    this.up_or_down(true);
    this.up_or_down(false);
  }
}

export default new ExpandSelectionToIndentation();
