import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Find Flats' },
    { to: '/post-flat', label: 'Post a Flat' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ];

  const legalLinks = [
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/disclaimer', label: 'Disclaimer' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/flatsharenaija', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://instagram.com/flatsharenaija', label: 'Instagram' },  // ← Updated with your real link
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">Flatshare</span>
              <span className="text-2xl font-bold">Naija</span>
            </Link>
            <p className="mb-6 text-base-content/80 max-w-md">
              Connecting people with affordable shared accommodations across Nigeria. 
              Find your perfect flatmate or list your space today.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-circle btn-sm hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consolidated Contact + Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3 mb-8">
              {legalLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-medium mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-base-content/70">
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <a href="mailto:info@flatsharenaija.com" className="hover:text-primary">
                  info@flatsharenaija.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} />
                <a href="tel:+2347030176297" className="hover:text-primary">
                  +234 703 017 6297
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-base-200 text-center text-sm text-base-content/60">
          <p>
            © {currentYear} Flatshare Naija. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
