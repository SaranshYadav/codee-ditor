import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
  snippet,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { esLint, javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import * as eslint from "eslint-linter-browserify";
import * as esprima from 'esprima';

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
const javascriptEditor = document.querySelector("#js-Editor")!;
import {CompletionContext} from "@codemirror/autocomplete"

function myCompletions(context: CompletionContext) {
  let word = context.matchBefore(/\w*/)
  if (word?.from == word?.to && !context.explicit)
    return null
  return {
    from: word?.from,
    options: [
      {
        label: "some_key",
        apply: '"some_key":"value",',
        info: "key value pair auto complete",
      },
      {
        label: "somekey",
        apply: '"some_key":"value",',
        info: "yet another key value pair auto complete",
      },
    ],
  }
}

const jsConfig = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  globals:{
    vwo_$: "readonly",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: "eslint:recommended",
  rules: {
    // enable additional rules
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    "no-debugger": ["error"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-undef": ["error"],
    "no-cond-assign": ["error", "always"],
    // disable rules from base configurations
    "for-direction": "off",
    
  },
};
const gqueryFunctions= [
  'jquery',
  'gQVersion',
  'toArray',
  'constructor',
  'hasClass',
  'ready',
  'scrollTop',
  'scrollLeft',
  'getComputedDimensionOuter',
  'getComputedDimension',
  'height',
  'width',
  'is',
  'attr',
  'removeAttr',
  'outerWidth',
  'outerHeight',
  'offset',
  'index',
  'each',
  'delegate',
  'on',
  'off',
  'isChecked',
  'isFocussed',
  'closest',
  'parent',
  'val',
  'prop',
  'data',
  'eq',
  'get',
  'appendTo',
  'find',
  'toggleClass',
  'addClass',
  'removeClass',
  'remove',
  'children',
  'map',
  'clone',
  'filter',
  'parents',
  'append',
  'prepend',
  'html',
  'css',
  'hashchange',
  'replaceWith',
  'before',
  'after',
  'insertBefore',
  'insertAfter',
  'trigger',
  'contents',
  'not',
  'live',
  'bind',
  'blur',
  'focus',
  'focusin',
  'focusout',
  'load',
  'resize',
  'scroll',
  'unload',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'change',
  'select',
  'submit',
  'keydown',
  'keypress',
  'keyup',
  'error',
  'init',
  'splice',
  'slice',
  'length',
  'nonEmptyContents',
  'vwoCss',
  'vwoAttr',
  'vwoElement',
  'performOp'
];
const jqueryFunctions=[
  'constructor',
  'init',
  'selector',
  'jquery',
  'length',
  'size',
  'toArray',
  'get',
  'pushStack',
  'each',
  'ready',
  'eq',
  'first',
  'last',
  'slice',
  'map',
  'end',
  'push',
  'sort',
  'splice',
  'extend',
  'data',
  'removeData',
  'queue',
  'dequeue',
  'delay',
  'clearQueue',
  'attr',
  'removeAttr',
  'addClass',
  'removeClass',
  'toggleClass',
  'hasClass',
  'val',
  'bind',
  'one',
  'unbind',
  'delegate',
  'undelegate',
  'trigger',
  'triggerHandler',
  'toggle',
  'hover',
  'live',
  'die',
  'blur',
  'focus',
  'focusin',
  'focusout',
  'load',
  'resize',
  'scroll',
  'unload',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'change',
  'select',
  'submit',
  'keydown',
  'keypress',
  'keyup',
  'error',
  'find',
  'has',
  'not',
  'filter',
  'is',
  'closest',
  'index',
  'add',
  'andSelf',
  'parent',
  'parents',
  'parentsUntil',
  'next',
  'prev',
  'nextAll',
  'prevAll',
  'nextUntil',
  'prevUntil',
  'siblings',
  'children',
  'contents',
  'text',
  'wrapAll',
  'wrapInner',
  'wrap',
  'unwrap',
  'append',
  'prepend',
  'before',
  'after',
  'remove',
  'empty',
  'clone',
  'html',
  'replaceWith',
  'detach',
  'domManip',
  'appendTo',
  'prependTo',
  'insertBefore',
  'insertAfter',
  'replaceAll',
  'css',
  'serialize',
  'serializeArray',
  'ajaxStart',
  'ajaxStop',
  'ajaxComplete',
  'ajaxError',
  'ajaxSuccess',
  'ajaxSend',
  'show',
  'hide',
  '_toggle',
  'fadeTo',
  'animate',
  'stop',
  'slideDown',
  'slideUp',
  'slideToggle',
  'fadeIn',
  'fadeOut',
  'fadeToggle',
  'offset',
  'position',
  'offsetParent',
  'scrollLeft',
  'scrollTop',
  'innerHeight',
  'outerHeight',
  'height',
  'innerWidth',
  'outerWidth',
  'width',
  'propAttr',
  '_focus',
  'scrollParent',
  'zIndex',
  'disableSelection',
  'enableSelection',
  'mouse',
  'sortable',
  'drag',
  'drop',
  'magicScroll',
  'dragAlong',
  'isOnPage',
  'getStyle',
  'getStyleValues',
  'showInWindow',
  'renameAttribute',
  'borderify',
  'unshimmy',
  'shimmy',
  'unborderify',
  'prevNextAppend',
  'outerHTML',
  'getBoundingCoordinates',
  'XPath',
  'selectorPath',
  'shortSelectorPath',
  'showAddElementPlaceholder',
  'cleanContent',
  'getEditGroupClass',
  'cleanAndReapplyClass',
  'didDOMChange',
  'addVWOClass',
  'getVWOClass',
  'hasVWOClass',
  'metadata',
  'computedStyleTree',
  'showRearrangePlaceholder',
  'nonEmptyContents',
  'getLength',
  'highlight',
  'replaceTag',
  'attributesString',
  'openingTagHTML',
  'closingTagHTML',
  'vwoCss',
  'vwoAttr',
  'performOp',
  'vwoElement',
  'scrollIntoView',
  'getAttrList'
];
const GqueryAccount=true;
// Custom lint function
const customLintFunction = (view: any) => {
  const code = view.state.doc.toString();

  // Your custom linting logic here
  let syntaxTree;
  try {
    syntaxTree = (esprima as any).parse(code, {
      range: true,
      attachComment: true,
      tolerant: true, 
    });
  } catch (e) {
    return [];
  };

  function getCalleeName(snippet:any): string | null {
    try {
      if (snippet.expression.callee.object.callee.type === 'MemberExpression') {
        return getCalleeName({ expression: { callee: snippet.expression.callee.object.callee } });
      }
      return snippet.expression.callee.object.callee.name;
    } catch (ex) {
      return null;
    }
  };

  function isFunctionCall(snippet:any){
    try {
      return snippet.type === 'ExpressionStatement' && snippet.expression && snippet.expression.type === 'CallExpression';
    } catch (e) {}
  };

  const found = [];

  for (let i = 0; i < syntaxTree.body.length; i++) {

    let snippet = syntaxTree.body[i];
    let initialsnippet=snippet;
    if (isFunctionCall(snippet)) {
      const calleeName = getCalleeName(snippet);

      // Check for vwo_$ statement
      if (calleeName === 'vwo_$' && snippet.expression.callee.object.arguments.length) {
        do {
          let propertyname = snippet.expression.callee.property.name;
          // Assuming $scope is accessible in your context
          if (GqueryAccount) {
            
            if (!gqueryFunctions.includes(propertyname)) {
              // Do something with the found error
              found.push({
                from: initialsnippet.range[0],
                to: initialsnippet.range[1],
                message: propertyname+' is NOTAGQUERYFUNCTION',
                severity: 'error',
              });
            } 
          }
          else{
            if (!jqueryFunctions.includes(propertyname)) {
              
              found.push({
                from: snippet.range[0],
                to: snippet.range[1],
                message: 'NOTAJQUERYFUNCTION',
                severity: 'error',
              });
            }
          }
          snippet = { expression: { callee: snippet.expression.callee.object.callee } };
        } while (snippet.expression.callee.type === 'MemberExpression');
      }
    }
  }
  // Return linting results
  return found;
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
        javascript(),
        javascriptLanguage.data.of({
          autocomplete: myCompletions,
        }),
        lintGutter(),
        linter(esLint(new eslint.Linter(), jsConfig)),
        linter(customLintFunction as any),
      ],
    }),
  });
  
}

export {jsConfig as jsCodeMirrorLintingConfig};