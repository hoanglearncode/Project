import React, { useState, useEffect } from "react";
import { X, ExternalLink, Calendar, User, Building, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Dữ liệu mẫu - có thể thay thế bằng API calls
const mockData = {
  hero: {
    title: "Dự Án Của Chúng Tôi",
    subtitle: "Khám Phá Những Giải Pháp Công Nghệ Đột Phá",
    description: "Từ những ý tưởng táo bạo đến những sản phẩm hoàn thiện, chúng tôi tự hào mang đến những dự án công nghệ tiên tiến nhất.",
    stats: [
      { number: "1000+", label: "Dự Án Hoàn Thành" },
      { number: "50+", label: "Công Nghệ Sử Dụng" },
      { number: "15+", label: "Lĩnh Vực Phục Vụ" },
      { number: "99%", label: "Khách Hàng Hài Lòng" }
    ]
  },

  categories: [
    { id: "all", name: "Tất Cả", count: 24 },
    { id: "web", name: "Web Application", count: 8 },
    { id: "mobile", name: "Mobile App", count: 6 },
    { id: "ecommerce", name: "E-Commerce", count: 4 },
    { id: "ai", name: "AI & Machine Learning", count: 3 },
    { id: "blockchain", name: "Blockchain", count: 2 },
    { id: "iot", name: "IoT Solutions", count: 1 }
  ],

  projects: [
    {
      id: 1,
      title: "Hệ Thống Quản Lý Bán Hàng Thông Minh",
      category: "web",
      client: "ABC Retail Group",
      duration: "6 tháng",
      year: "2024",
      status: "completed",
      description: "Phát triển hệ thống CRM toàn diện với AI analytics, giúp tăng doanh thu 40% và cải thiện trải nghiệm khách hàng.",
      longDescription: "Dự án này bao gồm việc xây dựng một hệ thống quản lý bán hàng hoàn chỉnh với các tính năng tiên tiến như phân tích hành vi khách hàng bằng AI, dự đoán xu hướng mua sắm, và tự động hóa quy trình bán hàng. Hệ thống đã giúp khách hàng tăng 40% doanh thu và giảm 60% thời gian xử lý đơn hàng.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Python", "TensorFlow", "AWS"],
      features: [
        "Dashboard thời gian thực",
        "AI Analytics & Predictions",
        "CRM tự động",
        "Mobile responsive",
        "Multi-language support",
        "API Integration"
      ],
      results: [
        { metric: "Tăng doanh thu", value: "40%" },
        { metric: "Giảm thời gian xử lý", value: "60%" },
        { metric: "Tăng customer retention", value: "35%" },
        { metric: "ROI", value: "300%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Ứng Dụng Mobile Banking Thế Hệ Mới",
      category: "mobile",
      client: "XYZ Bank",
      duration: "8 tháng",
      year: "2024",
      status: "completed",
      description: "Thiết kế và phát triển ứng dụng ngân hàng di động với bảo mật blockchain và UX/UI hiện đại.",
      longDescription: "Ứng dụng mobile banking tiên tiến với công nghệ bảo mật blockchain, tích hợp AI chatbot, và giao diện người dùng trực quan. Ứng dụng hỗ trợ đa nền tảng iOS/Android và đã phục vụ hơn 1 triệu người dùng trong 6 tháng đầu ra mắt.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      technologies: ["React Native", "Blockchain", "Node.js", "PostgreSQL", "Firebase", "Biometric API"],
      features: [
        "Bảo mật Blockchain",
        "Biometric Authentication",
        "AI Chatbot Support",
        "Real-time Notifications",
        "Multi-currency Support",
        "Offline Mode"
      ],
      results: [
        { metric: "Người dùng active", value: "1M+" },
        { metric: "App Store Rating", value: "4.8/5" },
        { metric: "Giảm fraud", value: "80%" },
        { metric: "User satisfaction", value: "95%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Platform E-Learning AI-Powered",
      category: "web",
      client: "EduTech Vietnam",
      duration: "10 tháng",
      year: "2023",
      status: "completed",
      description: "Nền tảng học trực tuyến với AI adaptive learning và virtual classroom tương tác cao.",
      longDescription: "Hệ thống e-learning thông minh sử dụng AI để cá nhân hóa trải nghiệm học tập cho từng học viên. Platform tích hợp virtual classroom, gamification, và analytics chi tiết để theo dõi tiến độ học tập.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Python", "Django", "MySQL", "WebRTC", "TensorFlow"],
      features: [
        "AI Adaptive Learning",
        "Virtual Classroom",
        "Gamification System",
        "Progress Analytics",
        "Multi-device Support",
        "Offline Content"
      ],
      results: [
        { metric: "Học viên đăng ký", value: "50K+" },
        { metric: "Tỷ lệ hoàn thành khóa học", value: "85%" },
        { metric: "Satisfaction score", value: "4.7/5" },
        { metric: "Retention rate", value: "78%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Marketplace B2B Logistics",
      category: "ecommerce",
      client: "LogiConnect Asia",
      duration: "12 tháng",
      year: "2023",
      status: "completed",
      description: "Nền tảng kết nối doanh nghiệp logistics với hệ thống tracking thời gian thực và AI optimization.",
      longDescription: "Marketplace B2B chuyên về logistics với tính năng matching thông minh giữa các nhà cung cấp và khách hàng. Hệ thống tích hợp GPS tracking, AI route optimization và blockchain để đảm bảo minh bạch.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      technologies: ["Angular", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Microservices"],
      features: [
        "Smart Matching Algorithm",
        "Real-time GPS Tracking",
        "AI Route Optimization",
        "Blockchain Transparency",
        "Multi-vendor Support",
        "API Integration"
      ],
      results: [
        { metric: "Giao dịch/tháng", value: "$2M+" },
        { metric: "Vendors active", value: "500+" },
        { metric: "Delivery success rate", value: "99.2%" },
        { metric: "Cost reduction", value: "25%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=500&fit=crop"
      ]
    },
    {
      id: 5,
      title: "AI Chatbot Healthcare Assistant",
      category: "ai",
      client: "MedCare Group",
      duration: "4 tháng",
      year: "2024",
      status: "in-progress",
      description: "Trợ lý AI y tế thông minh với khả năng tư vấn sức khỏe và đặt lịch khám tự động.",
      longDescription: "AI Chatbot chuyên ngành y tế với khả năng hiểu và phản hồi các câu hỏi về sức khỏe, đưa ra lời khuyên sơ bộ và hỗ trợ đặt lịch khám. Hệ thống được training với dữ liệu y khoa chính thống và tuân thủ các quy định về bảo mật y tế.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      technologies: ["Python", "OpenAI GPT", "Natural Language Processing", "FastAPI", "MongoDB", "Docker"],
      features: [
        "Medical Knowledge Base",
        "Symptom Analysis",
        "Appointment Scheduling",
        "Multi-language Support",
        "HIPAA Compliance",
        "Integration APIs"
      ],
      results: [
        { metric: "Truy vấn/ngày", value: "10K+" },
        { metric: "Accuracy rate", value: "94%" },
        { metric: "Response time", value: "<2s" },
        { metric: "User satisfaction", value: "92%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop"
      ]
    },
    {
      id: 6,
      title: "Smart Factory IoT Solution",
      category: "iot",
      client: "Manufacturing Corp",
      duration: "14 tháng",
      year: "2023",
      status: "completed",
      description: "Giải pháp IoT cho nhà máy thông minh với monitoring thiết bị và predictive maintenance.",
      longDescription: "Hệ thống IoT toàn diện cho nhà máy sản xuất với hàng nghìn sensors, dashboard theo dõi thời gian thực, và AI predictive maintenance. Giải pháp giúp giảm downtime và tối ưu hóa hiệu suất sản xuất.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      technologies: ["IoT Sensors", "MQTT", "InfluxDB", "Grafana", "Python", "Edge Computing"],
      features: [
        "Real-time Monitoring",
        "Predictive Maintenance",
        "Energy Optimization",
        "Quality Control",
        "Alert Systems",
        "Historical Analytics"
      ],
      results: [
        { metric: "Giảm downtime", value: "45%" },
        { metric: "Tăng hiệu suất", value: "30%" },
        { metric: "Tiết kiệm năng lượng", value: "20%" },
        { metric: "ROI", value: "250%" }
      ],
      link: "#",
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=500&fit=crop",
        "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&h=500&fit=crop"
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "CEO, ABC Retail Group",
      company: "ABC Retail Group",
      content: "Hệ thống CRM mà đội ngũ phát triển đã vượt qua mọi kỳ vọng của chúng tôi. Doanh thu tăng 40% chỉ sau 3 tháng triển khai.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      projectId: 1
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "CTO, XYZ Bank",
      company: "XYZ Bank",
      content: "Ứng dụng mobile banking không chỉ đẹp mà còn rất an toàn. Khách hàng của chúng tôi rất hài lòng với trải nghiệm mới.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      projectId: 2
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Founder, EduTech Vietnam",
      company: "EduTech Vietnam",
      content: "Platform e-learning với AI đã giúp chúng tôi tăng tỷ lệ hoàn thành khóa học lên 85%. Đầu tư rất đáng giá!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      projectId: 3
    }
  ]
};

// API Service
const apiService = {
  getHeroData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.hero;
  },
  
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockData.categories;
  },
  
  getProjects: async (category = 'all', page = 1, limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filteredProjects = mockData.projects;
    
    if (category !== 'all') {
      filteredProjects = mockData.projects.filter(project => project.category === category);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      projects: filteredProjects.slice(startIndex, endIndex),
      total: filteredProjects.length,
      hasMore: endIndex < filteredProjects.length
    };
  },
  
  getProjectById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.projects.find(project => project.id === parseInt(id));
  },
  
  getTestimonials: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockData.testimonials;
  }
};

// Star Rating Component
const StarRating = ({ rating, size = 5 }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={size === 5 ? 16 : 20}
          className={`${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
        <img
          src={images[currentImage]}
          alt={`${title} - ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <ImageGallery images={project.gallery} title={project.title} />
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {project.year}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-gray-500" />
                  <span className="text-blue-600 font-medium">{project.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-gray-600">Thời gian: {project.duration}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Công Nghệ Sử Dụng</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tính Năng Chính</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Kết Quả Đạt Được</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {result.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {project.link && project.link !== '#' && (
            <div className="mt-8 text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={20} />
                Xem Demo Live
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
