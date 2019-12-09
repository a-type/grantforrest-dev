declare module 'gatsby-source-sanity' {
  export function getFluidGatsbyImage(
    id: string,
    opts: { maxWidth: number },
    sanityConfig: any,
  ): any;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '@sanity/block-content-to-react' {
  const ex: any;
  export default ex;
}

declare module 'inteobs' {
  const d: typeof IntersectionObserver;
  export default d;
}
