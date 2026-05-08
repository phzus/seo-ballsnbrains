import footerLogo from '../../assets/utils/footer-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-bb-light border-t border-[#e6e6e6] py-10 md:py-14 px-6">
      <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={footerLogo} alt="Balls & Brains" className="h-10 object-contain" />

        <p className="text-[#888] text-[13px] md:text-[14px] text-center">
          Still have questions? Email us at{' '}
          <a href="mailto:support@ballsnbrains.com" className="text-bb-text-dark underline hover:text-bb-gold transition-colors">
            support@ballsnbrains.com
          </a>
        </p>

        <p className="text-[#aaa] text-[12px] md:text-[13px] text-center md:text-right">
          © 2026 Balls and Brains. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
