export default function LogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagon */}
      <path
        d="M12 2 L20.66 7 L20.66 17 L12 22 L3.34 17 L3.34 7 Z"
        stroke="var(--primary)"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Three radial lines from center to alternate vertices */}
      <line x1="12" y1="12" x2="12" y2="2"       stroke="var(--primary)" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="12" y1="12" x2="20.66" y2="17"   stroke="var(--primary)" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="12" y1="12" x2="3.34" y2="17"    stroke="var(--primary)" strokeWidth="1.25" strokeLinecap="round" />
      {/* Center node */}
      <circle cx="12" cy="12" r="2" fill="var(--primary)" />
      {/* Vertex nodes */}
      <circle cx="12"    cy="2"  r="1.25" fill="var(--primary)" />
      <circle cx="20.66" cy="17" r="1.25" fill="var(--primary)" />
      <circle cx="3.34"  cy="17" r="1.25" fill="var(--primary)" />
    </svg>
  )
}
