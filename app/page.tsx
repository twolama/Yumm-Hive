import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f2a316] selection:bg-[#714b00] selection:text-white flex flex-col font-sans">
      <Navbar variant="landing" />

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col pt-10 md:pt-16 pb-16">
        <div className="max-w-[900px] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <h1 className="text-[48px] sm:text-[60px] md:text-[72px] lg:text-[86px] leading-[1.0] font-[950] text-[#141414] tracking-tight mb-6">
            The <span className="text-white drop-shadow-sm">Intelligence</span>{" "}
            <br className="hidden sm:block" />
            Behind the Hive.
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed text-[#141414]/80 font-semibold max-w-[600px] mb-12 md:mb-16">
            Harmonizing high-tech precision with the organic wisdom of nature.
            We don&apos;t just monitor data; we nurture ecosystems.
          </p>
        </div>

        {/* CTA CARD SECTION - CENTERED CONTAINER, LEFT ALIGNED TEXT */}
        <section className="relative w-full max-w-[1100px] self-center rounded-[32px] md:rounded-[48px] bg-[#141818] p-8 md:p-12 lg:p-14 overflow-hidden shadow-2xl group transition-all duration-700">
          {/* Decorative SVG Pattern */}
          <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none transition-all duration-1000 group-hover:opacity-[0.08] hidden lg:block">
            <svg
              width="291"
              height="440"
              viewBox="0 0 291 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[360px] w-auto"
            >
              <path
                d="M338.359 237.045L296.064 162.189L338.359 87.3323H421.705L464 162.189L421.705 237.045H338.359ZM190.327 324.377L148.032 249.521L190.327 174.665H273.673L315.968 249.521L273.673 324.377H190.327ZM190.327 149.712L148.032 74.8562L190.327 0H273.673L315.968 74.8562L273.673 149.712H190.327ZM42.2949 237.045L0 162.189L42.2949 87.3323H125.641L166.07 162.189L125.641 237.045H42.2949ZM42.2949 411.709L0 336.853L42.2949 261.997H125.641L166.07 336.853L125.641 411.709H42.2949ZM192.815 499.042L148.032 424.185L190.327 349.329H273.673L315.968 424.185L273.673 499.042H192.815ZM338.359 411.709L296.064 336.853L338.359 261.997H421.705L464 336.853L421.705 411.709H338.359Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-[600px]">
            <h2 className="text-[30px] sm:text-[38px] md:text-[46px] font-[950] text-white leading-[1.0] tracking-tight mb-5">
              Ready to evolve <br className="hidden sm:block" /> your apiary?
            </h2>

            <p className="text-sm sm:text-base md:text-lg font-medium text-white/50 mb-10 leading-relaxed max-w-[400px]">
              Join thousands of professional beekeepers leveraging the power of
              The Digital Apiary.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d98a12] text-white px-8 py-3.5 rounded-xl text-[15px] font-bold tracking-tight hover:brightness-110 transition-all shadow-lg active:scale-95"
              >
                Get Started Now
              </Link>
              <button className="w-full sm:w-auto inline-flex items-center justify-center border border-white/20 hover:bg-white/5 text-white px-8 py-3.5 rounded-xl text-[15px] font-bold tracking-tight transition-all active:scale-95">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
