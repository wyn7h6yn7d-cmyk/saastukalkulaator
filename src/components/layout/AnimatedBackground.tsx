/** Futuristic grocery atmosphere — animated mesh + floating produce glows */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-mesh absolute inset-0" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="scanline absolute inset-0" />
      <div className="produce-float absolute left-[8%] top-[18%] text-4xl opacity-[0.07]">
        🥬
      </div>
      <div className="produce-float absolute right-[12%] top-[28%] text-3xl opacity-[0.06] [animation-delay:-4s]">
        🍎
      </div>
      <div className="produce-float absolute bottom-[25%] left-[15%] text-3xl opacity-[0.06] [animation-delay:-8s]">
        🥛
      </div>
      <div className="produce-float absolute bottom-[30%] right-[8%] text-4xl opacity-[0.07] [animation-delay:-12s]">
        🛒
      </div>
    </div>
  );
}
