'use babel';

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

  up() {
    const editor = atom.workspace.getActiveTextEditor();

    const currentRow = editor.getCursorBufferPosition().row;
    const leadingSpacesCount = this.numberOfLeadingSpacesInText(
      editor.lineTextForBufferRow(currentRow),
    );

    console.log('going up until we find: %s', leadingSpacesCount);

    let numberOfRowsToSelect = 0;
    // Continue scanning rows of text upwards until we meet the same leading space count.
    while (1) {
      let lineIndex = currentRow - numberOfRowsToSelect - 1;
      let line = editor.lineTextForBufferRow(lineIndex);
      let spacesOnLine = this.numberOfLeadingSpacesInText(line);
      if (spacesOnLine !== leadingSpacesCount || lineIndex === 0) {
        break;
      }
      numberOfRowsToSelect++;
      console.log('%s | %s', line, spacesOnLine);
    }

    editor.selectUp(numberOfRowsToSelect);
  }

  down() {
    const editor = atom.workspace.getActiveTextEditor();

    const currentRow = editor.getCursorBufferPosition().row;
    const leadingSpacesCount = this.numberOfLeadingSpacesInText(
      editor.lineTextForBufferRow(currentRow),
    );

    console.log('going down until we find: %s', leadingSpacesCount);

    let numberOfRowsToSelect = 0;
    // Continue scanning rows of text upwards until we meet the same leading space count.
    while (1) {
      let lineIndex = currentRow + numberOfRowsToSelect + 1;
      let line = editor.lineTextForBufferRow(lineIndex);
      let spacesOnLine = this.numberOfLeadingSpacesInText(line);
      if (spacesOnLine !== leadingSpacesCount || lineIndex === 0) {
        break;
      }
      numberOfRowsToSelect++;
      console.log('%s | %s', line, spacesOnLine);
    }

    editor.selectDown(numberOfRowsToSelect);
  }
}

export default new ExpandSelectionToIndentation();
