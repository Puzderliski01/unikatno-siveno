import type { FC, ImgHTMLAttributes } from 'react';
import { hasWebp, webpSrc } from '../lib/image';

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

/**
 * `<img>` koji automatski služi WebP verziju kad postoji,
 * a JPG/PNG kao fallback za stare pregledače.
 * Koristi se svuda gde slika dolazi iz public/ foldera.
 */
export const Img: FC<Props> = ({ src, alt, ...rest }) => (
  <picture>
    {hasWebp(src) && <source srcSet={webpSrc(src)} type="image/webp" />}
    <img src={src} alt={alt} {...rest} />
  </picture>
);

export default Img;
