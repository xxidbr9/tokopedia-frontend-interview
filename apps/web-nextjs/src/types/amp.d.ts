import * as React from 'react';

declare global {
  namespace JSX {
    interface AmpImg {
      alt?: string;
      src?: string;
      width?: string | number;
      height?: string | number;
      layout?: string;
      objectFit?: string;
      objectPosition?: string;
      ["data-testid"]?: string;
    }
    interface IntrinsicElements {
      'amp-img': AmpImg;
    }
  }
}