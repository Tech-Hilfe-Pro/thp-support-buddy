type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  w: number; 
  h: number;
  srcWebp?: string; 
  srcAvif?: string;
  sizes?: string; // z.B. "(max-width: 768px) 100vw, 50vw"
};

export default function SmartImage({ w, h, src, srcWebp, srcAvif, alt, sizes, ...rest }: Props) {
  const style = { aspectRatio: `${w} / ${h}` } as React.CSSProperties;
  const srcSet = [
    srcAvif ? `${srcAvif} 1x` : null,
  ].filter(Boolean).join(", ");
  
  return (
    <picture style={style}>
      {srcAvif && <source type="image/avif" srcSet={srcAvif} sizes={sizes} />}
      {srcWebp && <source type="image/webp" srcSet={srcWebp} sizes={sizes} />}
      {/* decoding async, lazy loading */}
      <img
        src={src as string}
        width={w} 
        height={h}
        loading="lazy" 
        decoding="async" 
        alt={alt || ""}
        {...rest}
      />
    </picture>
  );
}