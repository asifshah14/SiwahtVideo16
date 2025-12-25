import { Video, UserCircle, Mic, Play } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="pt-28 md:pt-36 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 min-h-screen flex items-center relative overflow-hidden hero-section"
      aria-label="Hero section"
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="container-custom relative z-10 hero-content">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            Your Vision, Our{" "}
            <span className="gradient-text block sm:inline">
              AI Expertise
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Professional AI agency specializing in custom video ads, realistic avatars, and premium audio content. We bring your brand to life with cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <button
              onClick={scrollToContact}
              className="btn-primary w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 min-w-[200px] shadow-xl hover:shadow-2xl transition-all duration-300"
              data-testid="hero-start-creating"
              aria-label="Start your project with Siwaht"
            >
              Start Project
            </button>
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto glass-card border-2 border-white/40 text-slate-700 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] hover-lift"
              data-testid="hero-watch-demo"
              aria-label="Explore our AI services"
            >
              <Play className="h-5 w-5" />
              Explore Services
            </button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 animate-slide-up">
          <article className="feature-card hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="feature-icon bg-gradient-to-br from-blue-100 to-blue-200 icon-gradient mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Video className="text-blue-600 h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 text-shadow group-hover:text-blue-600 transition-colors duration-300 leading-tight">Cinematic AI Video</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Broadcast-quality video production generated in minutes, not months. Visual storytelling redefined.</p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
            </div>
          </article>

          <article className="feature-card hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="feature-icon bg-gradient-to-br from-cyan-100 to-cyan-200 icon-gradient mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <UserCircle className="text-cyan-600 h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 text-shadow group-hover:text-cyan-600 transition-colors duration-300 leading-tight">Hyper-Real Avatars</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Indistinguishable from reality. Create digital brand ambassadors that speak any language fluently.</p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
            </div>
          </article>

          <article className="feature-card hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="feature-icon bg-gradient-to-br from-emerald-100 to-emerald-200 icon-gradient mb-6 rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Mic className="text-emerald-600 h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 text-shadow group-hover:text-emerald-600 transition-colors duration-300 leading-tight">AI Audio Editing</h3>
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed">Complete audio post-production. Dubbing, voice isolation, and Generative SFX for cinematic soundscapes.</p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
