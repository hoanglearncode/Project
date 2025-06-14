import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle, ExternalLink } from "lucide-react";

// ==================== DATA CONFIGURATION ====================
// Tách biệt các loại dữ liệu để dễ dàng tích hợp với backend

// 1. CONTACT DATA - Dữ liệu liên lạc
const CONTACT_DATA = {
    email: 'dohoang062005@gmail.com',
    phone: '0988416983',
    hotLine: '0988416983',
    address: '300 - phố Quan Nhân - Nhân Chính - Thanh Xuân - Hà Nội'
};

// 2. BRAND DATA - Dữ liệu thương hiệu
const BRAND_DATA = {
    name: 'Hóa Chất Nhật Minh',
    logo: 'logo.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut labore et dolore magna aliqua quised ipsum suspendisse.',
    websites: [
        'https://hoachatnhatminh.com/',
        'https://hoachatre.vn/'
    ],
    socialLinks: {
        facebook: 'https://www.facebook.com/profile.php?id=61570061594704'
    }
};

// 3. MAP DATA - Dữ liệu bản đồ
const MAP_DATA = {
    coordinates: {
        latitude: 20.9999266,
        longitude: 105.8106096,
        zoom: 15.94
    },
    displayName: 'Hóa Chất Nhật Minh'
};

// 4. UI CONFIG - Cấu hình giao diện
const UI_CONFIG = {
    footer: {
        backgroundColor: 'bg-gradient-to-br from-slate-800 to-slate-900',
        primaryColor: 'blue-400',
        hoverColor: 'yellow-200'
    },
    copyright: {
        year: new Date().getFullYear(),
        companyName: 'demoBrand',
        designedBy: 'demoBrand'
    }
};

// ==================== API SERVICE ====================
// Service để gọi API - dễ dàng thay thế khi có backend thực
class FooterDataService {
    static async fetchContactData() {
        // TODO: Thay thế bằng API call thực tế
        // return await fetch('/api/contact').then(res => res.json());
        return Promise.resolve(CONTACT_DATA);
    }

    static async fetchBrandData() {
        // TODO: Thay thế bằng API call thực tế
        // return await fetch('/api/brand').then(res => res.json());
        return Promise.resolve(BRAND_DATA);
    }

    static async fetchMapData() {
        // TODO: Thay thế bằng API call thực tế
        // return await fetch('/api/map').then(res => res.json());
        return Promise.resolve(MAP_DATA);
    }

    static async fetchAllData() {
        try {
            const [contactData, brandData, mapData] = await Promise.all([
                this.fetchContactData(),
                this.fetchBrandData(),
                this.fetchMapData()
            ]);
            
            return {
                contact: contactData,
                brand: brandData,
                map: mapData
            };
        } catch (error) {
            console.error('Error fetching footer data:', error);
            // Fallback to default data
            return {
                contact: CONTACT_DATA,
                brand: BRAND_DATA,
                map: MAP_DATA
            };
        }
    }
}

// ==================== UTILS ====================
class MapUtils {
    static generateGoogleMapsEmbedUrl(mapData, address) {
        if (!mapData?.coordinates) return '';
        
        const { latitude, longitude } = mapData.coordinates;
        const encodedAddress = encodeURIComponent(address);
        
        return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8080217416664!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac99e792dde1%3A0xe2d1bc2cdb9d3b99!2z${encodedAddress}!5e0!3m2!1svi!2s!4v${Date.now()}!5m2!1svi!2s`;
    }
}

// ==================== MAIN COMPONENT ====================
export default function Footer() {
    const [footerData, setFooterData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tạo Google Maps embed URL
    const googleMapsEmbedUrl = useMemo(() => {
        if (!footerData) return '';
        return MapUtils.generateGoogleMapsEmbedUrl(
            footerData.map, 
            footerData.contact.address
        );
    }, [footerData]);

    // Fetch data when component mounts
    useEffect(() => {
        const loadFooterData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const data = await FooterDataService.fetchAllData();
                setFooterData(data);
                
            } catch (err) {
                console.error('Failed to load footer data:', err);
                setError('Không thể tải dữ liệu footer');
                
                // Fallback to default data
                setFooterData({
                    contact: CONTACT_DATA,
                    brand: BRAND_DATA,
                    map: MAP_DATA
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadFooterData();
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading state
    if (isLoading) {
        return (
            <footer className={UI_CONFIG.footer.backgroundColor + " text-white"}>
                <div className="container mx-auto px-6 py-12">
                    <div className="animate-pulse">
                        <div className="h-32 bg-slate-700 rounded mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="h-48 bg-slate-700 rounded"></div>
                            <div className="h-48 bg-slate-700 rounded"></div>
                            <div className="h-48 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    // Error state
    if (error) {
        return (
            <footer className={UI_CONFIG.footer.backgroundColor + " text-white"}>
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </footer>
        );
    }

    const { contact, brand, map } = footerData;

    return (
        <footer className={UI_CONFIG.footer.backgroundColor + " text-white"}>
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                                    <img 
                                        src={brand.logo} 
                                        alt={brand.name} 
                                        className="rounded-full w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                            <h3 className={`text-2xl font-bold text-${UI_CONFIG.footer.primaryColor}`}>
                                {brand.name?.toUpperCase()}
                            </h3>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed">
                            {brand.description}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-3 pt-2 z-50 hover:animate-pulse">
                            {brand.socialLinks?.facebook && (
                                <a 
                                    href={brand.socialLinks.facebook} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={20} />
                                </a>
                            )}
                            <a 
                                href={`tel:${contact.hotLine || contact.phone}`} 
                                className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                                aria-label="Gọi điện"
                            >
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className={`text-xl font-semibold text-${UI_CONFIG.footer.primaryColor} mb-6`}>
                            Thông Tin Liên Hệ
                        </h4>
                        <div className="space-y-4">
                            {/* Address */}
                            <div className={`group flex text-white text-sm font-medium items-start cursor-pointer hover:text-${UI_CONFIG.footer.hoverColor} transition-all duration-300 hover:scale-105`}>
                                <div className="p-2.5 rounded-full bg-white/20 mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg flex-shrink-0 mt-1">
                                    <MapPin size={18} className="group-hover:scale-110 transition-transform duration-300"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-md">Địa chỉ</span>
                                    <span className="font-normal text-sm leading-relaxed">
                                        {contact.address}
                                    </span>
                                </div>
                            </div>

                            {/* Email */}
                            <a 
                                href={`mailto:${contact.email}`}
                                className={`group flex text-white text-sm font-medium items-center cursor-pointer hover:text-${UI_CONFIG.footer.hoverColor} transition-all duration-300 hover:scale-105`}
                            >
                                <div className="p-2.5 rounded-full bg-white/20 mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg">
                                    <Mail size={18} className="group-hover:scale-110 transition-transform duration-300"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-md">Email</span>
                                    <span className="font-normal text-sm break-all">
                                        {contact.email}
                                    </span>
                                </div>
                            </a>

                            {/* Phone */}
                            <a 
                                href={`tel:${contact.phone}`}  
                                className={`group flex text-white text-sm font-medium items-center cursor-pointer hover:text-${UI_CONFIG.footer.hoverColor} transition-all duration-300 hover:scale-105`}
                            >
                                <div className="p-2.5 rounded-full bg-white/20 mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg">
                                    <Phone size={18} className="group-hover:scale-110 transition-transform duration-300"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-md">Số điện thoại</span>
                                    <span className="font-normal text-sm">
                                        {contact.phone}
                                    </span>
                                </div>
                            </a>

                            {/* Hotline (nếu khác với phone) */}
                            {contact.hotLine && contact.hotLine !== contact.phone && (
                                <a 
                                    href={`tel:${contact.hotLine}`}  
                                    className={`group flex text-white text-sm font-medium items-center cursor-pointer hover:text-${UI_CONFIG.footer.hoverColor} transition-all duration-300 hover:scale-105`}
                                >
                                    <div className="p-2.5 rounded-full bg-white/20 mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg">
                                        <Phone size={18} className="group-hover:scale-110 transition-transform duration-300"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-md">Hotline</span>
                                        <span className="font-normal text-sm">
                                            {contact.hotLine}
                                        </span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div className="space-y-4">
                        <h4 className={`text-xl font-semibold text-${UI_CONFIG.footer.primaryColor} mb-6`}>
                            Vị Trí
                        </h4>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            {googleMapsEmbedUrl ? (
                                <iframe 
                                    src={googleMapsEmbedUrl}
                                    width="100%" 
                                    height="200" 
                                    style={{ border: 0, borderRadius: '8px' }}
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Vị trí ${brand.name}`}
                                />
                            ) : (
                                <div className="h-48 bg-slate-700 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-400">Đang tải bản đồ...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            <p>© {UI_CONFIG.copyright.year} {UI_CONFIG.copyright.companyName}. Tất cả quyền được bảo lưu.</p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            <p>Thiết kế bởi <span className={`text-${UI_CONFIG.footer.primaryColor} font-medium`}>{UI_CONFIG.copyright.designedBy}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to top button */}
            <button 
                onClick={scrollToTop}
                className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
                aria-label="Cuộn lên đầu trang"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
}