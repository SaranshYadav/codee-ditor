declare const jsConfig: {
    parserOptions: {
        ecmaVersion: number;
        sourceType: string;
    };
    globals: {
        vwo_$: string;
    };
    env: {
        browser: boolean;
        node: boolean;
    };
    extends: string;
    rules: {
        indent: (string | number)[];
        "linebreak-style": string[];
        "no-debugger": string[];
        quotes: string[];
        semi: string[];
        "no-empty": string;
        "no-undef": string[];
        "no-cond-assign": string[];
        "for-direction": string;
    };
};
export declare function getCodeMirrorInstance(selector: string): any;
export { jsConfig as jsCodeMirrorLintingConfig };
