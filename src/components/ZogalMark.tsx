/** The ribbon-Z mark. Copied asset — this repo does not depend on zogal.app. */
export function ZogalMark({ size = 28, style }: { size?: number; style?: React.CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo/zogal-mark-128.png" srcSet="/logo/zogal-mark-128.png 1x, /logo/zogal-mark-256.png 2x" alt="" width={size} height={size} aria-hidden style={{ width: size, height: size, objectFit: "contain", ...style }} />;
}
