import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { HTMLHint } from "htmlhint";

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

const initialText = '<div class="container"><h1>hello, world</h1></div>';

const htmlEditor = document.querySelector("#html-Editor")!;

const custom_linter = (view: EditorView) => {
  const code = view.state.doc.toString();

  let rulesets = {
    "doctype-first": false,
    "tag-pair": true,
    "tag-self-close": true,
    "tagname-lowercase": true,
    "tagname-specialchars": true,
    "empty-tag-not-self-closed": true,
    "src-not-empty": true,
    "href-abs-or-rel": "abs" as "abs" | "rel", // or "rel", based on your requirement
    "attr-no-duplication": true,
  };

  let found = [];
  let results = HTMLHint.verify(code, rulesets),
    message = null;

  for (let i = 0; i < results.length; i++) {
    message = results[i];
    let startLine = message.line - 1,
      endLine = message.line,
      startCol = message.col,
      endCol = message.col;
    console.log(startLine, endLine, startCol, endCol);

    let from = view.state.doc.line(startLine).from + startCol;
    let to = view.state.doc.line(endLine).from + endCol;

    found.push({
      from: from,
      to: to,
      message: message.message,
      severity: message.type,
    });
  }
  return found;
};

const config = {
  matchClosingTags: true,
  selfClosingTags: true,
  autoCloseTags: true,
};

export function getCodeMirrorInstance(selector:string): any {
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
      html(config),
      lintGutter(),
      linter(custom_linter),
    ],
  }),
});
}
export {config as htmlCodeMirrorLintingConfig};