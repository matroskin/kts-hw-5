declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare const __IS_DEV__: boolean;
