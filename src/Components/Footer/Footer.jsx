import React from 'react';

function Footer() {
  const footerLinks = [
    ['FAQ', 'Help Center', 'Account', 'Media Center'],
    ['Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use'],
    ['Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
    ['Speed Test', 'Legal Notices', 'Only on Netflix']
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <p className="text-base">Questions? Contact us.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((link, linkIndex) => (
                <div key={linkIndex}>
                  <a 
                    href="#" 
                    className="hover:underline cursor-pointer"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-8">
          <select className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="text-sm">
          <p>Netflix Clone</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;