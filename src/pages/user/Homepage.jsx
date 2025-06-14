import React, { useState, useEffect } from "react";

// Dữ liệu mẫu - có thể thay thế bằng API calls
const mockData = {
  banner: {
    title: "Chào Mừng Đến Với Công Ty Chúng Tôi",
    subtitle: "Giải pháp công nghệ hàng đầu cho doanh nghiệp",
    description: "Chúng tôi cung cấp các dịch vụ phát triển phần mềm, thiết kế web và tư vấn công nghệ chuyên nghiệp.",
    ctaText: "Khám Phá Ngay",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
  },
  introduction: {
    title: "Về Chúng Tôi",
    content: "Với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin, chúng tôi đã phục vụ hơn 500 khách hàng trên toàn quốc. Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng mang đến những giải pháp tối ưu nhất cho doanh nghiệp của bạn.",
    stats: [
      { number: "500+", label: "Khách Hàng" },
      { number: "10+", label: "Năm Kinh Nghiệm" },
      { number: "100+", label: "Dự Án Hoàn Thành" },
      { number: "24/7", label: "Hỗ Trợ" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Hệ Thống Quản Lý Bán Hàng",
      description: "Phát triển hệ thống CRM toàn diện cho công ty bán lẻ lớn, tăng hiệu quả bán hàng 40%",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 2,
      title: "Ứng Dụng Mobile Banking",
      description: "Thiết kế và phát triển ứng dụng ngân hàng di động với bảo mật cao và UX tối ưu",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      technologies: ["React Native", "Firebase", "Blockchain"],
      link: "#"
    },
    {
      id: 3,
      title: "Platform E-Learning",
      description: "Xây dựng nền tảng học trực tuyến với tính năng tương tác cao và AI hỗ trợ học tập",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Python", "AI/ML"],
      link: "#"
    }
  ],
  contact: {
    title: "Liên Hệ Với Chúng Tôi",
    description: "Sẵn sàng biến ý tưởng của bạn thành hiện thực. Hãy liên hệ với chúng tôi ngay hôm nay!",
    info: {
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phone: "+84 123 456 789",
      email: "contact@company.com",
      website: "www.company.com"
    },
    socialLinks: {
      facebook: "#",
      linkedin: "#",
      twitter: "#"
    }
  }
};

// API Service - có thể thay thế bằng các API calls thực tế
const apiService = {
  getBannerData: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.banner;
  },
  
  getIntroductionData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.introduction;
  },
  
  getProjects: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockData.projects;
  },
  
  getContactData: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockData.contact;
  }
};

export default function Homepage() {
  const [data, setData] = useState({
    banner: null,
    introduction: null,
    projects: [],
    contact: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, introData, projectsData, contactData] = await Promise.all([
          apiService.getBannerData(),
          apiService.getIntroductionData(),
          apiService.getProjects(),
          apiService.getContactData()
        ]);
        
        setData({
          banner: bannerData,
          introduction: introData,
          projects: projectsData,
          contact: contactData
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <header className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {data.banner?.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            {data.banner?.subtitle}
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
            {data.banner?.description}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            {data.banner?.ctaText}
          </button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {data.introduction?.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {data.introduction?.content}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.introduction?.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Dự Án Nổi Bật
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá những dự án tiêu biểu mà chúng tôi đã thực hiện thành công
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Xem Chi Tiết →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                {data.contact?.title}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {data.contact?.description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Địa Chỉ</h4>
                    <p className="text-gray-300">{data.contact?.info.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Điện Thoại</h4>
                    <p className="text-gray-300">{data.contact?.info.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-gray-300">{data.contact?.info.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Website</h4>
                    <p className="text-gray-300">{data.contact?.info.website}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h3>
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Họ và tên"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Tin nhắn"
                      rows={4}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <button 
                    onClick={() => console.log('Gửi tin nhắn')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Gửi Tin Nhắn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}