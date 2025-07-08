import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { FaArrowRight } from "react-icons/fa"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { motion } from "motion/react"

const slides = [
    {
        id: 1,
        title: "Secure Your Tomorrow Today",
        subtitle: "Comprehensive Life Insurance Solutions",
        description:
            "Protect your family's future with our trusted life insurance plans tailored to your needs and budget.",
        image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1751921164/banner01_h6utig.jpg",
    },
    {
        id: 2,
        title: "Your Family's Financial Guardian",
        subtitle: "Tailored Protection Plans",
        description: "Choose from our range of flexible life insurance policies designed to meet your unique requirements.",
        image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1751916653/banner02_qmpulx.jpg",
    },
    {
        id: 3,
        title: "Building Legacies Together",
        subtitle: "Expert Insurance Guidance",
        description:
            "Our experienced advisors help you navigate life insurance options to build lasting financial security.",
        image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1751916657/banner03_sbykjw.jpg",
    },
]

const BannerSlider = () => {

    return (
        <div className="relative h-screen overflow-hidden bg-white">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet-custom",
                    bulletActiveClass: "swiper-pagination-bullet-active-custom",
                    el: ".swiper-pagination-custom",
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full flex items-center">
                            {/* Main Container */}
                            <div className="w-full h-full flex flex-col lg:flex-row">
                                {/* Left Side - Content */}
                                <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[60vh] lg:min-h-full">
                                    {/* Blue Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-500"></div>

                                    {/* Curved Bottom Edge - Hidden on mobile */}
                                    <div className="absolute bottom-0 left-0 w-full h-32 hidden lg:block">
                                        <svg viewBox="0 0 1200 120" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
                                            <path d="M0,120 C300,60 600,60 1200,120 L1200,120 L0,120 Z" fill="white" />
                                        </svg>
                                    </div>

                                    {/* Animated Decorative Elements */}
                                    <motion.div
                                        className="absolute top-70 md:top-60 lg:top-30 right-8 lg:right-20"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    >
                                        <div className="grid grid-cols-5 gap-1 lg:gap-2">
                                            {[...Array(25)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white/40 rounded-full"
                                                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        delay: i * 0.1,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Animated Navigation Arrows */}
                                    <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-2 lg:space-y-4">
                                        {[...Array(4)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-0 h-0 border-l-[6px] lg:border-l-[8px] border-l-white/50 border-t-[4px] lg:border-t-[6px] border-t-transparent border-b-[4px] lg:border-b-[6px] border-b-transparent"
                                                animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    delay: i * 0.2,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex items-center px-6 lg:px-16 py-8 lg:py-0">
                                        <div className="lg:max-w-lg w-full pt-20 md:pt-10 lg:pt-0 text-center lg:text-start lg:items-start items-center flex flex-col">
                                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 lg:mb-6">
                                                {slide.title}
                                            </h1>
                                            <p className="text-base lg:text-lg text-white/90 mb-6 lg:mb-8 leading-relaxed">
                                                {slide.description}
                                            </p>

                                            {/* Buttons */}
                                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                                <button className="group bg-accent hover:bg-accent/90 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105 w-full sm:w-auto cursor-pointer">
                                                    <span>Get a Free Qoute</span>
                                                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Image */}
                                <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-full">
                                    <img
                                        src={slide.image || "/placeholder.svg"}
                                        alt={slide.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-800/10"></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;