import footerLogo from '../../assets/utils/footer-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-bb-dark border-t border-white/25 py-10 md:py-14 px-4">
      <div className="max-w-[71.25rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={footerLogo} alt="Balls & Brains" className="h-10 object-contain" />

        <p className="text-bb-text-dim text-[0.8125rem] md:text-[0.875rem] text-center">
          Still have questions? Email us at{' '}
          <a href="mailto:support@ballsnbrains.com" className="text-white underline hover:text-bb-gold transition-colors">
            support@ballsnbrains.com
          </a>
        </p>

        <p className="text-white/40 text-[0.75rem] md:text-[0.8125rem] text-center md:text-right">
          © 2026 Balls and Brains. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
