export function AnimatedCartIcon({ count, revision }: { count: number; revision: number }) {
  return (
    <span className="relative flex size-9 items-center justify-center" aria-hidden="true">
      <svg key={revision} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`size-9! ${revision > 0 ? "cart-basket-animate" : ""}`}>
        <path d="M3 9h7l5 20h19l4-18 3-2" transform="translate(-1 0)" />
        <circle cx="18" cy="35" r="2.5" /><circle cx="31" cy="35" r="2.5" />
      </svg>
      {count > 0 && <span key={`count-${revision}`} className={`cart-count absolute left-[15px] top-[12px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-semibold leading-none text-primary-foreground ${revision > 0 ? "cart-count-animate" : ""}`}>{count > 99 ? "99+" : count}</span>}
    </span>
  );
}