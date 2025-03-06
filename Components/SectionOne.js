import Image from 'next/image';
import { FaWhatsapp } from "react-icons/fa";
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
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px 20px;
                margin: 20px 0;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
                }
            }
        `}</style>

        <div className="section-wrapper">
            <div className="pt-[25px] pb-[25px]">
                <div className="pl-[15px] pr-[15px]">
                    <div className="flex flex-wrap w-[100%] justify-between items-center flex-col lg:flex-row">
                        <div className="w-[100%] lg:w-[33.33%]">
                            <span className="w-[100%] inline-block font-semibold text-[#fff] text-[21px] mb-[20px] text-center">View Our Partners</span>
                            <div className="w-[100%] inline-block text-center font-seminbold text-[#ff6d39] text-[21px] pt-[12px] pb-[12px] pl-[10px] pr-[10px] border border-[#ff6d39] rounded-[40px]">
                                Click for websites
                            </div>
                        </div>
                        <div className="w-[100%] lg:w-[33.33%] text-center">
                            <div className="relative w-[200px] h-[200px] inline-block">
                                <Image
                                    src={IMAGES.logo}
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="w-[100%] lg:w-[33.33%]">
                            <span className="w-[100%] inline-block font-semibold text-[#fff] text-[21px] mb-[20px] text-center">For Any Queries WhatsApp Us On</span>
                            <div
                                style={{ textShadow: "1px 1px 0px #fff" }}
                                className="w-[100%] inline-block text-center font-black text-[#000] text-[21px] pt-[7px] pb-[7px] pl-[10px] pr-[10px] bg-[#ff6d39] rounded-[40px] flex justify-center items-center"
                            >
                                <FaWhatsapp />+91 7690030405
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] hero-section pl-[15px] pr-[15px] max-w-[100%]">
                <div className="w-[100%] flex flex-col lg:flex-row">
                    <div className="banner-main">
                        <h2 className="w-[100%] font-semibold text-[30px] text-[#ffb159] leading-[40px] mb-[12px] text-center lg:text-start">Join Largest Company of Asia</h2>
                        <h1
                            style={{ textShadow: "0 0 0" }}
                            className="!text-[#fff] banner-heading w-[100%] text-center lg:text-start"
                        >
                            India's
                            <span className="text-[#fd8600]">Biggest</span>
                            & Most Trusted
                            <span className="text-[#fd8600]"> Book</span>
                        </h1>
                        <h5
                            style={{ fontWeight: "bold" }}
                            className="w-[100%] mb-[8px] text-[#fff] text-[30px] text-center"
                        >
                            Now directly take ID from WhatsApp
                        </h5>
                        <div className="flex w-[100%] justify-center lg:justify-start flex-col lg:flex-row">
                            <div className="link-btn flex justify-center items-center lg:text-nowrap">
                                <FaWhatsapp />+91 7690030405
                            </div>
                            <div className="link-btn flex justify-center items-center lg:text-nowrap">
                                <FaWhatsapp />+91 7691030405
                            </div>
                        </div>
                    </div>
                    <div className="banner-main flex justify-center items-center">
                        <div className="hero-img max-w-[550px] h-[450px] relative">
                            <div className="absolute bottom-20 left-[47%] transform -translate-x-1/2 w-[250px] flex justify-center">
                                {[100, 80, 50].map((height, idx) => (
                                    <div key={idx} className="relative w-[50px] h-[50px] overflow-hidden mx-[10px]">
                                        <div
                                            className="absolute transition-transform duration-200"
                                            style={{ transform: `translateY(-${index * height}px)` }}
                                        >
                                            {spinImgList.map((item, i) => (
                                                <div key={i} className="relative w-[50px] h-[50px]">
                                                    <Image
                                                        src={item.img}
                                                        alt={`Spin image ${i}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative w-full h-full">
                                <Image
                                    src={IMAGES.players}
                                    alt="Player"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-[70px] pb-[40px] pl-[20px] pr-[15px] overflow-auto scrollbar-hide" ref={scrollRef}>
                <div className="flex gap-[30px] w-max min-h-screen">
                    {infiniteList.map((curData, index) => (
                        <div key={index} className="relative w-[273.25px] h-[468px]">
                            <Image
                                src={curData.img}
                                alt={`Card ${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    );
};