import Link from "next/link"

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <h3 className="text-xl font-bold mb-4">Dhwani</h3>
                        <p className="text-gray-400">
                            Empowering better healthcare management through innovative solutions.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 flex flex-col">
                            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>support@dhwani.com</li>
                            <li>1-800-HEALTH</li>
                            <li>123 Medical Center</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Dhwani. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
