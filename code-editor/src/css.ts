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
import stylelint from 'stylelint';
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
const stylelintAdapter = async (view: any): Promise<readonly Diagnostic[]> => {
  const code = view.state.doc.toString();

  try {
    const result = await stylelint.lint({ code, formatter: 'json' });
    const messages = result.results[0].warnings;
    const found: Diagnostic[] = messages.map(message => ({
      from: view.state.doc.line(message.line).from + message.column,
      to: view.state.doc.line(message.line).to,
      message: message.text,
      severity: message.severity === 'error' ? 'error' : 'warning',
      // Include any other required properties for the Diagnostic type here
    }));

    return found;
  } catch (error) {
    console.error('Error in stylelint adapter:', error);
    return [];
  }
};

// Assuming Diagnostic is defined somewhere in your code or in the library's type definitions
interface Diagnostic {
  from: number;
  to: number;
  message: string;
  severity: string;
  // Include any other required properties for the Diagnostic type
}

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
        // linter(cssLinter),
        linter(stylelintAdapter),
      ],
    }),
  });
}
const config={};
export {config as cssCodeMirrorLintingConfig};
