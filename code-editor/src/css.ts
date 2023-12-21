import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { CSSLint } from "csslint";

import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintGutter, lintKeymap, linter } from "@codemirror/lint";

import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";

const initialText = 'console.log("hello, world")';
const cssEditor = document.querySelector("#css-Editor");

const cssLinter = (view: any) => {
  const code = view.state.doc.toString();

  var found = [];
  var results = CSSLint.verify(code, {}),
    messages = results.messages,
    message = null;
  for (var i = 0; i < messages.length; i++) {
    message = messages[i];
    var startLine = message.line - 1,
      endLine = message.line,
      startCol = message.col,
      endCol = message.col;
    console.log(
      messages,
      startLine,
      endLine,
      startCol,
      endCol,
      view.posAtCoords({ x: startLine, y: endLine })
    );

    found.push({
      from: startCol,
      to: endCol,
      message: message.message,
      severity: message.type,
    });
  }
  return found;
};

export function getCodeMirrorInstance(selector: string): any {
  new EditorView({
    parent: document.querySelector(selector)!,
    state: EditorState.create({
      doc: initialText,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLineGutter(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
          ...lintKeymap,
          ...searchKeymap,
        ]),
        css(),
        lintGutter(),
        linter(cssLinter),
      ],
    }),
  });
}
const config={};
export {config as cssCodeMirrorLintingConfig};