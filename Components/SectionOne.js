import Image from 'next/image';
import { FaWhatsapp, FaHeadset, FaBolt, FaShieldAlt, FaMoneyBillWave, FaDice, FaTrophy, FaCrown, FaGem } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

// Define static image paths
const IMAGES = {
    logo: '/assets/logo.png',
    players: '/assets/players.webp',
    seven: '/assets/seven.webp',
    crown: '/assets/crown.webp',
    cherry: '/assets/Chery.webp',
    wild: '/assets/wild.webp',
    watermelon: '/assets/waterme.webp',
    coin: '/assets/coin.webp',
    bonus: '/assets/bonus.webp',
    apple: '/assets/apple.webp',
    card1: '/assets/card1.jpg',
    card2: '/assets/card2.jpg',
    card3: '/assets/card3.jpg',
    card4: '/assets/card4.jpg'
};

export const SectionOne = () => {
    const cardImgList = [
        { img: IMAGES.card1 },
        { img: IMAGES.card2 },
        { img: IMAGES.card3 },
        { img: IMAGES.card4 },
        { img: IMAGES.card1 },
        { img: IMAGES.card2 },
        { img: IMAGES.card3 },
        { img: IMAGES.card4 },
        { img: IMAGES.card1 },
        { img: IMAGES.card2 },
        { img: IMAGES.card3 },
        { img: IMAGES.card4 },
    ];

    const [index, setIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(true);

    const spinImgList = [
        { img: IMAGES.seven },
        { img: IMAGES.crown },
        { img: IMAGES.cherry },
        { img: IMAGES.wild },
        { img: IMAGES.watermelon },
        { img: IMAGES.coin },
        { img: IMAGES.bonus },
        { img: IMAGES.apple },
    ];

    useEffect(() => {
        let interval;

        if (isScrolling) {
            interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % spinImgList.length);
            }, 100);
        }

        if (spinImgList[index].img === IMAGES.seven) {
            setIsScrolling(false);
            setTimeout(() => setIsScrolling(true), 2000);
        }

        return () => clearInterval(interval);
    }, [index, isScrolling]);

    const infiniteList = [...cardImgList, ...cardImgList, ...cardImgList];
    const scrollRef = useRef(null);
    const imageWidth = 273.25 + 30;

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += imageWidth;
                if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
                    scrollRef.current.scrollLeft = 0;
                }
            }
        }, 4000);
        return () => clearInterval(scrollInterval);
    }, []);

    return (
    <>
        <style jsx>{`
            .section-wrapper {
                background: linear-gradient(135deg, #1A1A1D 40%, #806040 70%, #B8860B 100%);
                min-height: 100vh;
                color: #fff;
                font-weight: normal;
            }
            
            .hero-section {
                position: relative;
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px 20px;
                margin: 20px 0;
                margin-top: 0px !important;
            }

            .card-container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(5px);
                border-radius: 15px;
                overflow: hidden;
                transition: transform 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }

            .card-container:hover {
                transform: translateY(-10px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }

            .link-btn {
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .link-btn:hover {
                background: #ff6d00;
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(255, 136, 0, 0.3);
            }

            @media screen and (max-width: 1279px) {
                .hero-section {
                    padding: 30px 15px;
                }
            }

            @media screen and (max-width: 1024px) {
                .hero-section {
                    padding: 25px 10px;
                }
            }

            @media screen and (max-width: 786px) {
                .hero-section {
                    padding: 20px 10px;
                    margin: 10px 0;
                    margin-top: 0px !important;
                }
            }
        `}</style>
        
        <div className="section-wrapper">
            <div className="w-full hero-section px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-blue-500/10 animate-gradient"></div>
                <div className="absolute -top-1/2 -right-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex items-center justify-between mb-5">
                        {/* <div className="flex flex-col items-start relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#B8860B]/20 to-[#DAA520]/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-lg"></div>
                            <h3 className="text-xl font-bold text-[#B8860B] mb-4 relative">
                                View Our Partners
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-[#DAA520] group-hover:w-full transition-all duration-500"></span>
                            </h3>
                            <button className="group relative px-8 py-3 bg-transparent border-2 border-[#B8860B] rounded-md overflow-hidden hover:scale-105 transition-transform duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] to-[#DAA520] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 text-[#B8860B] group-hover:text-black font-semibold transition-colors duration-300 flex items-center gap-2">
                                    <span>Click for websites</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </div> */}

                        {/* Center - Logo */}
                        {/* <div className="relative flex flex-col items-center">
                            <div className="relative w-[220px] h-[220px] group">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#B8860B]/30 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#B8860B]/20 via-[#DAA520]/20 to-[#B8860B]/20 rounded-full animate-pulse"></div>
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 border-2 border-[#B8860B]/20 rounded-full group-hover:border-[#B8860B]/40 transition-colors duration-300"></div>
                                <Image
                                    src={IMAGES.logo}
                                    alt="Mahakal Official"
                                    fill
                                    className="object-contain relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    priority
                                />
                                <div className="absolute -inset-1 border-2 border-transparent rounded-full before:content-[''] before:absolute before:inset-0 before:border-2 before:border-[#B8860B]/20 before:rounded-full before:animate-spin-slow"></div>
                            </div>
                        </div> */}

                        {/* Right Side - WhatsApp */}
                        {/* <div className="flex flex-col items-end relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#B8860B]/20 to-[#DAA520]/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-lg"></div>
                            <h3 className="text-xl font-bold text-[#B8860B] mb-4 relative">
                                For Any Queries WhatsApp Us On
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-r from-[#DAA520] to-[#B8860B] group-hover:w-full transition-all duration-500"></span>
                            </h3>
                            <button className="group relative px-8 py-3 bg-transparent border-2 border-[#B8860B] rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center gap-3">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] to-[#DAA520] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <FaWhatsapp className="text-2xl relative z-10 text-[#B8860B] group-hover:text-black transition-colors duration-300" />
                                <span className="relative z-10 text-[#B8860B] group-hover:text-black font-semibold transition-colors duration-300">+91 7690030405</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10 text-[#B8860B] group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                        <div className="banner-main flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
                                <span className="animate-pulse w-2 h-2 rounded-full bg-orange-500"></span>
                                <span className="text-orange-300 font-medium">Join Largest Company of Asia</span>
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    India's 
                                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text"> Biggest </span>
                                    & Most Trusted
                                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text"> Book</span>
                                </h1>
                                
                                <h5 className="text-2xl sm:text-3xl text-white/90 font-bold">
                                    Now directly take ID from 
                                    <span className="relative inline-block px-2">
                                        <span className="relative z-10 text-[#B8860B]">WhatsApp</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/20 to-[#DAA520]/10 blur-sm"></div>
                                    </span>
                                </h5>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                {['+91 7690030405', '+91 7691030405'].map((number, idx) => (
                                    <button
                                        key={idx}
                                        className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <FaWhatsapp className="text-2xl relative z-10" />
                                        <span className="relative z-10">{number}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-8">
                                {[
                                    { text: "24/7 Support", icon: "🎯" },
                                    { text: "Instant Access", icon: "⚡" },
                                    { text: "Secure Platform", icon: "🔒" },
                                    { text: "Fast Withdrawals", icon: "💰" }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <span className="text-white/90 font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block w-1/3 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: <FaDice />, color: "text-orange-400", gradient: "from-orange-500/20 to-orange-600/20" },
                                        { icon: <FaTrophy />, color: "text-yellow-400", gradient: "from-yellow-500/20 to-yellow-600/20" },
                                        { icon: <FaCrown />, color: "text-purple-400", gradient: "from-purple-500/20 to-purple-600/20" },
                                        { icon: <FaGem />, color: "text-blue-400", gradient: "from-blue-500/20 to-blue-600/20" }
                                    ].map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="aspect-square rounded-lg bg-gradient-to-br border border-white/10 hover:border-white/20 transition-all duration-300 group hover:transform hover:scale-105"
                                        >
                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${item.gradient}`}>
                                                <div className={`text-4xl ${item.color} transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-16 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-blue-500/5 animate-gradient"></div>
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Section Title */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
                        <span className="animate-pulse w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-orange-300 font-medium">Featured Games</span>
                    </div>
                </div>

                {/* Cards Scroll Container */}
                <div className="relative max-w-[100vw] overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1A1A1D] to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1A1A1D] to-transparent z-10"></div>
                    
                    <div className="overflow-x-auto scrollbar-hide py-4" ref={scrollRef}>
                        <div className="flex gap-6 w-max px-20">
                            {infiniteList.map((curData, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-[250px] h-[400px] group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/20">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                        <Image
                                            src={curData.img}
                                            alt={`Card ${index}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            priority={index < 4}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-white/90 font-medium">Live</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FaCrown className="text-yellow-400" />
                                                    <span className="text-white/90">Premium</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style jsx>{`
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 15s ease infinite;
            }

            /* Hide scrollbar for Chrome, Safari and Opera */
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            .scrollbar-hide {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }

            @keyframes spin-slow {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
            }
        `}</style>
    </>
    );
};