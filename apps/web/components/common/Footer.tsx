import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <h3 className="mb-4 text-xl font-bold">Dhwani</h3>
            <p className="text-gray-400">
              Empowering better healthcare management through innovative solutions.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 transition-colors hover:text-white">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@dhwani.com</li>
              <li>1-800-HEALTH</li>
              <li>123 Medical Center</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dhwani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
