"use client"; // Add this if using Next.js App Router

import { useEffect, useState } from 'react';
import Image from 'next/image';

const CarouselComponent = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`/api/banner/bannerList`);
                const result = await response.json();
                setBanners(result.data);
            } catch (error) { } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && banners.length > 0) {
            const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
            const carousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
                interval: 3000,
                wrap: true
            });
        }
    }, [banners]);

    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (banners.length === 0) {
        return null;
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide mt-8" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={idx}
                        className={idx === 0 ? "active" : ""}
                        aria-current={idx === 0 ? "true" : "false"}
                        aria-label={`Slide ${idx + 1}`}
                    ></button>
                ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner rounded-xl overflow-hidden">
                {banners.map((banner, idx) => (
                    <div key={banner._id} className={`carousel-item cursor-pointer ${idx === 0 ? "active" : ""}`}                                             onClick={() => window.open(`https://wa.me/${banner.name}`, '_blank')}>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
                                <Image
                                    src={banner.image}
                                    alt={banner.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    priority={idx === 0}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Controls */}
            <button 
                className="carousel-control-prev bg-black/10 hover:bg-black/30 transition-all" 
                type="button" 
                data-bs-target="#carouselExampleIndicators" 
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button 
                className="carousel-control-next bg-black/10 hover:bg-black/30 transition-all" 
                type="button" 
                data-bs-target="#carouselExampleIndicators" 
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CarouselComponent;
