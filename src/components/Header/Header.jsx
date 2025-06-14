import { NavLink, useLocation  } from "react-router-dom";
import { useState, useEffect  } from "react";
import TopHeader from "./TopHeader";
import {Globe, Menu, X, Home, User, Briefcase, DollarSign, Phone } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Trang chủ', icon: Home, to: '/' },
    { name: 'Giới thiệu', icon: User, to: '/about' },
    { name: 'Dự án', icon: Briefcase, to: '/projects' },
    { name: 'Bảng giá', icon: DollarSign, to: '/pricing' },
    { name: 'Liên hệ', icon: Phone, to: '/contact' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="relative">
      <TopHeader />
      
      {/* Main Navigation */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-md border-b border-gray-100'
      }`}>
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transform transition-all duration-500 
                  group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                  <img src="logo.svg" className=" rounded-full"/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                  rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 
                  transform scale-150 blur-xl -z-10"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                  bg-clip-text text-transparent">
                  Your Brand
                </h1>
                <p className="text-sm text-gray-500 font-medium">Giải pháp công nghệ hàng đầu</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 bg-gray-50/80 backdrop-blur-sm rounded-full p-2 shadow-inner">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-full 
                      text-sm font-medium transition-all duration-300 group overflow-hidden
                      ${isActive
                        ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/25 transform scale-105'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-white/70 hover:shadow-md'
                      }`}
                  >
                    {/* Background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 
                      transition-opacity duration-300 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`}></div>
                    
                    <Icon size={16} className={`relative z-10 transition-all duration-300 
                      ${isActive ? 'text-blue-500' : 'group-hover:text-blue-500'}`} />
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Active/Hover indicator */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 
                      w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300
                      ${isActive ? 'w-8' : 'group-hover:w-6'}`}></div>
                  </NavLink>
                );
              })}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r 
                from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full 
                font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 
                transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Liên hệ ngay</span>
                <Phone size={16} className="relative z-10" />
              </button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 
                  transform hover:scale-110 mobile-menu-container"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X size={24} className="text-gray-700" />
                  ) : (
                    <Menu size={24} className="text-gray-700" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-out mobile-menu-container ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
        } overflow-hidden`}>
          <div className="px-4 py-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/50">
            <nav className="space-y-3">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-2xl 
                      text-sm font-medium transition-all duration-300 transform hover:scale-105
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-md'
                      }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : ''} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </NavLink>
                );
              })}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200/50">
                <button className="w-full flex items-center justify-center space-x-2 
                  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
                  px-6 py-4 rounded-2xl font-medium shadow-lg shadow-purple-500/25
                  transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Phone size={20} className="relative z-10" />
                  <span className="relative z-10">Liên hệ ngay</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}