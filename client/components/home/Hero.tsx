import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Streamline Your</span>
                        <span className="block text-blue-600">Healthcare Journey</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-500 md:text-xl">
                        Schedule sessions, track progress, and manage your healthcare experience all in one place. Join users who&apos;ve simplified their medical journey.
                    </p>
                    <div className="mt-8">
                        <Link href="/register" className="inline-block rounded-lg shadow-lg px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl">
                    <Image
                        src="/logo.png"
                        alt="Dhwani Hero"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </section>

    )
}

export default Hero;
