import { useQuery } from "@tanstack/react-query";
import { Play, Target, Zap, Sparkles } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-player";
import { processVideoUrl, getPlatformName } from "@/lib/videoUtils";
import type { DemoVideo } from "@shared/schema";

export default function VideoAds() {
  // Fetch demo videos from API
  const { data: demoVideos = [], isLoading, error } = useQuery<DemoVideo[]>({
    queryKey: ['/api/samples/demo-videos'],
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get the first published demo video for preview, sorted by order index
  const publishedVideos = demoVideos
    .filter(video => video.isPublished)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const featuredVideo = publishedVideos[0];

  // Process video URL for embedding
  const processedVideo = featuredVideo?.videoUrl ? processVideoUrl(featuredVideo.videoUrl) : null;


  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Play,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Custom AI Video Production",
      description: "Bespoke video campaigns engineered for maximum engagement using our proprietary generative video models."
    },
    {
      icon: Target,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Precision Targeting",
      description: "Data-driven creative variations that dynamically adapt to your audience segments for higher ROAS."
    },
    {
      icon: Zap,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Lightning Execution",
      description: "From storyboard to final render in 72 hours. Capture market trends while they are still trending."
    },
    {
      icon: Sparkles,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
      title: "Cinematic Excellence",
      description: "4K resolution, professional color grading, and seamless transitions that rival traditional production houses."
    }
  ];

  return (
    <section
      id="video-ads"
      className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/50"
      aria-labelledby="video-ads-heading"
    >
      <div className="container-custom">
        <header className="text-center mb-16 sm:mb-20">
          <h2
            id="video-ads-heading"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 text-shadow"
          >
            <span className="gradient-text">Cinematic AI Video Ads</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-light">
            Stop the scroll with broadcast-quality video advertisements generated in minutes. High-conversion storytelling powered by next-gen neural rendering.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Video Ad Preview */}
          <aside className="relative order-1 lg:order-1 hover-lift">
            <div className="service-preview from-blue-100 via-cyan-100 to-sky-100 bg-gradient-to-br shadow-2xl">
              <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-white/20">
                <h4 className="font-bold text-slate-900 mb-4 sm:mb-6 text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AI Video Studio</h4>

                {featuredVideo ? (
                  <div className="relative">
                    {processedVideo && processedVideo.canEmbed ? (
                      <div className="video-container bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
                        {processedVideo.platform === 'direct' ? (
                          <div className="video-player-wrapper">
                            <VideoPlayer
                              src={processedVideo.embedUrl}
                              poster={featuredVideo.thumbnailUrl || undefined}
                              title={featuredVideo.title}
                              className="w-full h-full rounded-xl"
                              width="100%"
                              height="100%"
                              gifLike={true}
                              data-testid="direct-video-player"
                            />
                          </div>
                        ) : (
                          // Embedded video (YouTube, Vimeo, Gumlet, etc.)
                          <div className="relative w-full aspect-video">
                            <iframe
                              src={processedVideo.embedUrl}
                              className="w-full h-full border-0 rounded-xl"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={`${featuredVideo.title} - AI Video Ad Demo`}
                              loading="lazy"
                              data-testid={`${processedVideo.platform}-iframe`}
                            />
                            <div className="absolute top-2 right-2 z-10">
                              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {getPlatformName(processedVideo.platform)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Preview mode for videos without URLs or unsupported platforms
                      (<div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                        {featuredVideo.thumbnailUrl ? (
                          <img
                            src={featuredVideo.thumbnailUrl}
                            alt={`Thumbnail for ${featuredVideo.title} - AI generated video advertisement`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="relative z-10 h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                              <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-current" />
                            </div>
                            <p className="text-sm sm:text-base opacity-90 font-semibold">{featuredVideo.title}</p>
                            {featuredVideo.description && (
                              <p className="text-xs opacity-70 mt-2 line-clamp-2 max-w-xs mx-auto">{featuredVideo.description}</p>
                            )}
                          </div>
                        </div>
                        {/* Video Timeline */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-full w-1/3 rounded-full"></div>
                          </div>
                        </div>
                      </div>)
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl aspect-video relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 mx-auto shadow-2xl floating-animation">
                          <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-current" />
                        </div>
                        <p className="text-sm sm:text-base opacity-90 font-semibold">AI Video Preview</p>
                        <p className="text-xs opacity-70 mt-2">Professional video content showcases will appear here</p>
                      </div>
                    </div>

                    {/* Video Timeline */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-full w-1/3 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="glass-card p-3 sm:p-4 text-center hover-lift">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Duration</div>
                  <div className="text-sm sm:text-base font-bold text-blue-600">08-10s</div>
                </div>
                <div className="glass-card p-3 sm:p-4 text-center hover-lift">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Quality</div>
                  <div className="text-sm sm:text-base font-bold text-green-600">4K</div>
                </div>
                <div className="glass-card p-3 sm:p-4 text-center hover-lift">
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Delivery</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-600">72 Hours</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Features */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className="feature-card hover-lift"
                >
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className={`feature-icon ${feature.bgColor} icon-gradient`}>
                      <Icon className={`${feature.iconColor} h-6 w-6 sm:h-7 sm:w-7`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 text-shadow">{feature.title}</h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="pt-6 sm:pt-8">
              <button
                onClick={scrollToContact}
                className="btn-primary w-full sm:w-auto text-lg sm:text-xl px-10 py-5"
                data-testid="video-ads-cta"
                aria-label="Start creating AI video ads"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}