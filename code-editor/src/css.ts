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
import { LintSource, lintGutter, lintKeymap, linter,Diagnostic } from "@codemirror/lint";

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
  console.log("Dj");
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

const CONFIG = {
  rules: {
    // https://github.com/stylelint/stylelint-config-recommended/blob/main/index.js
    'annotation-no-unknown': true,
    'at-rule-no-unknown': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'custom-property-no-missing-var-function': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-no-unknown': true,
    'keyframe-block-no-duplicate-selectors': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'named-grid-areas-no-invalid': true,
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'no-invalid-position-at-import-rule': true,
    'no-irregular-whitespace': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    'string-no-newline': true,
    'unit-no-unknown': true,
    "selector-id-pattern": null,
    // "no-duplicate-selectors":null,
    "comment-empty-line-before":null,
    "declaration-empty-line-before":null,
     "color-function-notation":null,
     "keyframes-name-pattern":null,
     "selector-class-pattern":null,
     "rule-empty-line-before":[
       true,
       {
         "ignore": ["after-comment", "first-nested", "inside-block"]
       }
     ],
    //  "no-descending-specificity":null
  }
  // "extends": [
  //   "stylelint-config-standard"
  // ],
  // "rules":{
  //    "selector-id-pattern": null,
  //    "no-duplicate-selectors":null,
  //    "comment-empty-line-before":null,
  //    "declaration-empty-line-before":null,
  //     "color-function-notation":null,
  //     "keyframes-name-pattern":null,
  //     "selector-class-pattern":null,
  //     "rule-empty-line-before":[
  //       true,
  //       {
  //         "ignore": ["after-comment", "first-nested", "inside-block"]
  //       }
  //     ],
  //     "no-descending-specificity":null
  // }
};


export function getCodeMirrorInstance(selector: string,stylelintlint:Function): any {
  const stylelintAdapter: (view: EditorView) => Promise<readonly Diagnostic[]> = async (view) => {
    const code = view.state.doc.toString();
  
    try {
      // Use stylelint to lint the code
      console.log("dj1");
      const result = await stylelintlint({
        config: {
          ...CONFIG,
          customSyntax: code.includes("{") ? null : "sugarss"
        },
        code,
        formatter: () => {}// Specify the formatter (e.g., 'json', 'string')
      });
  
      console.log("dj2");
      // Extract linting messages from the result
      console.log(result);
      const found: Diagnostic[] = result.results[0].warnings.map((message:any) => ({
        from: view.state.doc.line(message.line ).from,
        to: view.state.doc.line(message.line ).to,
        message: message.text,
        severity: message.severity === 'error' ? 'error' : 'warning',
        // Add any additional properties needed for the Diagnostic type
      }));
      console.log(found);
      return found;
    } catch (error) {
      console.error('Stylelint error:', error);
      return [];
    }
  };


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
        linter(stylelintAdapter),
        // linter(cssLinter),
      ],
    }),
  });
}
const config={};
export {config as cssCodeMirrorLintingConfig};