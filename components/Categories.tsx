export default function Categories() {
  return (
    <section
      className={`font-orbitron flex flex-col items-center px-6 py-16 text-white`}
    >
      <h2
        className={`font-jura mb-10 text-center text-2xl font-black tracking-widest`}
      >
        LEARN
      </h2>

      <div className="flex w-full max-w-2xs flex-col gap-4 md:grid md:max-w-3xl md:grid-cols-6">
        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-3 md:col-start-2">
          REVERSE ENGINEERING
        </div>

        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-1">
          OSINT
        </div>

        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-3">
          WEB EXPLOITATION
        </div>

        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-3">
          BINARY EXPLOITATION
        </div>

        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-3">
          CRYPTOGRAPHY
        </div>

        <div className="transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-6 text-center text-lg font-normal transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-3">
          ANDROID HACKING
        </div>

        <div className="mx-auto w-full transform cursor-pointer rounded-lg border border-[#333] bg-[#141414cc] p-7 text-center text-lg font-normal drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-colors duration-500 hover:-translate-y-1 hover:border-[#00e1ff] md:col-span-6 md:max-w-[50%]">
          AND SO MUCH MORE!
        </div>
      </div>

      <h2 className="font-orbitron mt-10 text-center font-medium tracking-wide md:text-2xl md:font-bold">
        FULLY HANDS ON, WITH LIVE DEMOS AND REAL CTFS TO PRACTICE ON
      </h2>
    </section>
  );
}
