import { Orbitron, Jura } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });
const jura = Jura({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

const categories = [
  'OPERATING SYSTEMS',
  'OSINT',
  'WEB EXPLOITATION',
  'BINARY EXPLOITATION',
  'AND SO MUCH MORE!',
];

const Categories = () => {
  return (
    <section className={`flex flex-col items-center py-16 px-6 text-white ${orbitron.className}`}>
      <h2 className={`mb-10 text-lg text-gray-300 tracking-widest ${jura.className}`} style={{ fontSize: 26, fontWeight: 900 }}>
        LEARN
      </h2>

      <div className="w-full max-w-5xl grid gap-4" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <div
          className="bg-[#141414cc] border border-[#333] rounded-lg p-6 text-center transition-colors duration-500 transform hover:-translate-y-1 hover:border-[#00e1ff] cursor-pointer"
          style={{ gridColumn: 'span 3/5', fontSize: 19, fontWeight: 400 }}>
          OPERATING SYSTEMS
        </div>

        <div
          className="bg-[#141414cc] border border-[#333] rounded-lg p-6 text-center transition-colors duration-500 transform hover:-translate-y-1 hover:border-[#00e1ff] cursor-pointer"
          style={{ gridColumn: 'span 1', fontSize: 19, fontWeight: 400 }}>
          OSINT
        </div>

        <div
          className="bg-[#141414cc] border border-[#333] rounded-lg p-6 text-center transition-colors duration-500 transform hover:-translate-y-1 hover:border-[#00e1ff] cursor-pointer"
          style={{ gridColumn: 'span 3', fontSize: 19, fontWeight: 400 }}>
          WEB EXPLOITATION
        </div>

        <div
          className="bg-[#141414cc] border border-[#333] rounded-lg p-6 text-center transition-colors duration-500 transform hover:-translate-y-1 hover:border-[#00e1ff] cursor-pointer"
          style={{ gridColumn: 'span 3', fontSize: 19, fontWeight: 400 }}>
          BINARY EXPLOITATION
        </div>

        <div
          className="bg-[#141414cc] border border-[#333] rounded-lg p-7 text-center mx-auto transition-colors duration-500 transform hover:-translate-y-1 hover:border-[#00e1ff] cursor-pointer"
          style={{ gridColumn: 'span 6', fontSize: 18, fontWeight: 400, maxWidth: '70%' }}>
          AND SO MUCH MORE!
        </div>
      </div>
    </section>
  );
};

export default Categories;
