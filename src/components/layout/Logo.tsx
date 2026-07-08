/** .Base/Header/Top/Logo — from the Instrument Design System Header component (Figma). */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 24H0V0H23.9654V16.5994H22.1326V1.83285H1.83285V22.1671H24V24ZM24 20.35H22.2V18.55H24V20.35Z"
        fill="currentColor"
      />
    </svg>
  );
}
