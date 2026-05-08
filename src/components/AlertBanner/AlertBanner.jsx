export default function AlertBanner() {
  return (
    <div
      className="w-full flex items-center justify-center text-center px-4"
      style={{
        background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)',
        height: '40px',
      }}
    >
      <p
        className="text-[#0a0908] text-[14px] font-bold leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
      >
        MOTHER'S DAY SALE 🌷 35% OFF STARTER KIT + 5 FREE GIFTS + FREE U.S. SHIPPING
      </p>
    </div>
  );
}
