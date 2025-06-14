import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from 'lucide-react';
import SearchBox from "../Search/SearchBox";
export default function TopHeader() {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [language, setLanguage] = useState({ code: 'VN', name: 'Tiếng Việt', flag: '🇻🇳' });
    const menuRef = useRef(null);

    const listLanguage = [
        { code: 'VN', name: 'Tiếng Việt', flag: '🇻🇳' }
    ]

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsLanguageMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            {/* Main Header */}
            <div className='px-4 sm:px-6 lg:px-10 xl:px-20 py-3 flex justify-between items-center 
                bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 shadow-lg'>

                {/* Search Box */}
                <SearchBox />

                {/* Language Selector */}
                <div className="relative" ref={menuRef}>
                    <button
                        className="flex items-center gap-2 text-white/95 text-sm font-medium 
                            cursor-pointer hover:text-white transition-all duration-300 
                            hover:bg-white/15 active:bg-white/20 px-3 py-2.5 rounded-xl
                            border border-white/20 hover:border-white/30 backdrop-blur-sm"
                        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                        aria-expanded={isLanguageMenuOpen}
                        aria-haspopup="true"
                    >
                        <span className="text-base">{language.flag}</span>
                        <span className="font-semibold hidden sm:inline">{language.code}</span>
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${
                                isLanguageMenuOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Language Dropdown */}
                    <div className={`absolute top-full right-0 mt-2 bg-white rounded-xl 
                        shadow-2xl border border-gray-100 py-2 min-w-[160px] z-50 
                        transform transition-all duration-300 origin-top-right backdrop-blur-sm
                        ${isLanguageMenuOpen
                            ? 'opacity-100 scale-100 translate-y-0 visible'
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                        }`}>
                        
                        <div className="px-3 py-2 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Chọn ngôn ngữ
                            </span>
                        </div>

                        {listLanguage.map((lang) => (
                            <button
                                key={lang.code}
                                className={`w-full px-4 py-3 cursor-pointer hover:bg-blue-50 
                                    transition-all duration-200 flex items-center justify-between
                                    ${language.code === lang.code 
                                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500' 
                                        : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                onClick={() => {
                                    setLanguage(lang);
                                    setIsLanguageMenuOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="text-sm font-medium">{lang.name}</span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{lang.code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}