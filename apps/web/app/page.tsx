import Footer from '@/components/common/Footer';
import Bento from '@/components/home/Bento';
import Hero from '@/components/home/Hero';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <Bento />
      <Footer />
    </main>
  );
};

export default Home;
