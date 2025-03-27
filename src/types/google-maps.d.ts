
declare namespace JSX {
  interface IntrinsicElements {
    'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      center?: string;
      zoom?: string | number;
      'map-id'?: string;
      class?: string;
      className?: string;
      style?: React.CSSProperties;
    };
  }
}
