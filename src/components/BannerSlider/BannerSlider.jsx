import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Secure Your Tomorrow Today",
        subtitle: "Comprehensive Life Insurance Solutions",
        description: "Protect your family's future with our trusted life insurance plans tailored to your needs and budget.",
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
        description: "Our experienced advisors help you navigate life insurance options to build lasting financial security.",
        image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1751916657/banner03_sbykjw.jpg",
    },
];

const BannerSlider = () => {
    return (
        <div className="relative h-[80vh] lg:h-screen w-full overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                effect="fade"
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* Background Image with Zoom */}
                            <motion.img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-center items-center lg:items-start h-full w-full px-6 lg:px-24 text-center lg:text-left">
                                <motion.h2
                                    className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {slide.subtitle}
                                </motion.h2>

                                <motion.h1
                                    className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    {slide.description}
                                </motion.p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-semibold transition"
                                >
                                    <span>Get a Free Quote</span>
                                    <FaArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
