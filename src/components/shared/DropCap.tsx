interface DropCapProps {
  children: string;
  className?: string;
}

export function DropCap({ children, className = '' }: DropCapProps) {
  return (
    <p className={`drop-cap max-w-[65ch] leading-[1.75] ${className}`}>
      {children}
    </p>
  );
}
