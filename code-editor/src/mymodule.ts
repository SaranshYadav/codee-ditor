// myModule.ts

import { getCodeMirrorInstance as jsCodeMirrorInstance,jsCodeMirrorLintingConfig} from './javascript';
import { getCodeMirrorInstance as htmlCodeMirrorInstance,htmlCodeMirrorLintingConfig} from './html';
import { getCodeMirrorInstance as cssCodeMirrorInstance, cssCodeMirrorLintingConfig } from './css';

export function getCodeMirrorInstance(type: string, selector:string,stylelintlint:Function): any {
  switch (type) {
    case 'js':
      return jsCodeMirrorInstance(selector);
    case 'html':
      return htmlCodeMirrorInstance(selector);
    case 'css':
      return cssCodeMirrorInstance(selector,stylelintlint);
    default:
      throw new Error(`Unsupported mode: ${type}`);
  }
}

export function getCodeMirrorLintingConfig(mode: string): any {
  switch (mode) {
    case 'js':
      return jsCodeMirrorLintingConfig;
    case 'html':
      return htmlCodeMirrorLintingConfig;
    case 'css':
      return cssCodeMirrorLintingConfig;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
}

// export function getPureCodeMirrorInstance(type: string, selector:string): any {
//   switch (type) {
//     case 'js':
//       return jsPureCodeMirrorInstance(selector);
//     case 'html':
//       return htmlPureCodeMirrorInstance(selector);
//     case 'css':
//       return cssPureCodeMirrorInstance(selector);
//     default:
//       throw new Error(`Unsupported mode: ${type}`);
//   }
// }
