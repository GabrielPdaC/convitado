import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Line({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Line {...props} strokeWidth={2.4}>
      <path d="M20 6 9 17l-5-5" />
    </Line>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Line>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8" />
      <path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8" />
    </Line>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </Line>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </Line>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </Line>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="8" y="8" width="14" height="14" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </Line>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </Line>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m6 9 6 6 6-6" />
    </Line>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Line>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </Line>
  );
}

export function ShoeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4M4 13h4" />
    </Line>
  );
}

export function LipstickIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M9 3.5 13 2v6H9.5L9 3.5Z" />
      <rect x="9.5" y="8" width="5" height="13" rx="1.2" />
      <path d="M9.5 12h5" />
    </Line>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.67 0-.43-.18-.82-.55-1.12-.3-.3-.55-.7-.55-1.13 0-.92.75-1.67 1.67-1.67H16c3.31 0 6-2.69 6-6 0-4.42-4.03-8-10-8Z" />
      <circle cx="6.5" cy="12.5" r="1" />
      <circle cx="9.5" cy="7.5" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
      <circle cx="17.5" cy="12.5" r="1" />
    </Line>
  );
}

export function GemIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6M2 9h20" />
    </Line>
  );
}

export function DropletIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
    </Line>
  );
}

export function SparkleIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
    </svg>
  );
}
