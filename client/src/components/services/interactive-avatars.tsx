import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Globe, Brain, Clock, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { InteractiveAvatar } from "@shared/schema";

export default function InteractiveAvatars() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: interactiveAvatars, isLoading } = useQuery<InteractiveAvatar[]>({
    queryKey: ["/api/samples/interactive-avatars"],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const publishedAvatars = interactiveAvatars
    ?.filter(avatar => avatar.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex) || [];

  const featuredAvatar = publishedAvatars[0];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !featuredAvatar?.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            video.play().catch((error) => {
              console.log('Auto-play prevented:', error);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [featuredAvatar?.videoUrl]);

  const features = [
    {
      icon: MessageSquare,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Real-Time Conversation",
      description: "Natural voice interaction with sub-second latency. Context-aware responses with memory retention across multi-turn dialogues."
    },
    {
      icon: Globe,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      title: "Multi-Language Intelligence",
      description: "Speak in 100+ languages with native accents. Automatic language detection and seamless switching mid-conversation."
    },
    {
      icon: Brain,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      title: "Emotion Recognition",
      description: "Adapts tone and demeanor based on user sentiment. Micro-expressions automatically match conversation mood and context."
    },
    {
      icon: Clock,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
      title: "24/7 Availability",
      description: "Never sleeps, always professional. Consistent brand voice across all interactions with unlimited scalability."
    }
  ];


  const useCases = [
    "Customer Service Representatives",
    "Virtual Sales Assistants",
    "Training & Onboarding Hosts",
    "Product Demo Presenters",
    "Brand Ambassadors",
    "Educational Tutors"
  ];

  return (
    <section
      id="interactive-avatars"
      className="py-12 xs:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30"
      aria-labelledby="interactive-avatars-heading"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <header className="text-center mb-12 xs:mb-16">
          <h2
            id="interactive-avatars-heading"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 xs:mb-8 text-shadow"
          >
            <span className="gradient-text">Interactive AI Avatars</span>
          </h2>
          <p className="text-xl xs:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed px-2 font-light">
            Conversational digital humans that engage in real-time. Natural voice interaction with context-aware intelligence and adaptive personalities.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 xl:gap-16 items-start">
          <div className="space-y-6 xs:space-y-8 order-2 lg:order-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className="flex items-start space-x-3 xs:space-x-4 p-3 xs:p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Icon className={`${feature.iconColor} h-5 w-5 xs:h-6 xs:w-6`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg xs:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm xs:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </article>
              );
            })}

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 xs:p-6 border border-blue-100">
              <h4 className="text-base xs:text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Perfect For
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm xs:text-base text-slate-700">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 xs:pt-6">
              <button
                onClick={scrollToContact}
                className="w-full xs:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
                data-testid="interactive-avatars-cta"
                aria-label="Experience interactive demo"
              >
                Experience Interactive Demo
              </button>
            </div>
          </div>

          <aside className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl p-4 xs:p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4 xs:mb-6">
                <h4 className="font-semibold text-slate-900 text-sm xs:text-base flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Interactive Demo
                </h4>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
              ) : featuredAvatar ? (
                <>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-[3/4] relative overflow-hidden shadow-2xl mb-4">
                    {featuredAvatar.videoUrl ? (
                      <div className="video-player-wrapper relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={featuredAvatar.videoUrl}
                          poster={featuredAvatar.thumbnailUrl || undefined}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted={isMuted}
                          loop
                          playsInline
                        />

                        <div className="absolute top-3 right-3 opacity-80 hover:opacity-100 transition-opacity z-10">
                          <Button
                            onClick={toggleMute}
                            size="sm"
                            variant="ghost"
                            className="rounded-full w-10 h-10 bg-black/40 hover:bg-black/60 text-white border-0 p-0"
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h5 className="text-white font-semibold text-lg">{featuredAvatar.name}</h5>
                          {featuredAvatar.description && (
                            <p className="text-white/90 text-sm mt-1">{featuredAvatar.description}</p>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {featuredAvatar.supportedLanguages.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/50">
                      <p className="text-xs text-slate-600 mb-2">
                        <Globe className="h-3 w-3 inline mr-1" />
                        Speaks {featuredAvatar.supportedLanguages.length}+ languages
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {featuredAvatar.supportedLanguages.slice(0, 8).map((lang, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                        {featuredAvatar.supportedLanguages.length > 8 && (
                          <Badge variant="secondary" className="text-xs">
                            +{featuredAvatar.supportedLanguages.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl aspect-[3/4] relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl mb-4">
                      <MessageSquare className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-slate-600 text-sm">Interactive avatar demo coming soon</p>
                    <Button
                      onClick={scrollToContact}
                      className="mt-4"
                      size="sm"
                    >
                      Request Demo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
