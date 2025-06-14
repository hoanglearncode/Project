import React, { useState, useEffect } from "react";

// Dữ liệu mẫu - có thể thay thế bằng API calls
const mockData = {
  hero: {
    title: "Về Chúng Tôi",
    subtitle: "Hành Trình 10 Năm Kiến Tạo Tương Lai Số",
    description: "Chúng tôi là đối tác tin cậy trong việc chuyển đổi số, mang đến những giải pháp công nghệ tiên tiến và dịch vụ chất lượng cao cho doanh nghiệp.",
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
  },
  
  companyOverview: {
    title: "Tổng Quan Công Ty",
    content: "Được thành lập vào năm 2014, chúng tôi đã không ngừng phát triển và khẳng định vị thế trong lĩnh vực công nghệ thông tin. Với tầm nhìn trở thành công ty công nghệ hàng đầu Việt Nam, chúng tôi luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu.",
    stats: [
      { number: "500+", label: "Khách Hàng Tin Tưởng", icon: "👥" },
      { number: "10+", label: "Năm Kinh Nghiệm", icon: "🏆" },
      { number: "1000+", label: "Dự Án Hoàn Thành", icon: "🚀" },
      { number: "50+", label: "Chuyên Gia", icon: "👨‍💻" },
      { number: "24/7", label: "Hỗ Trợ Khách Hàng", icon: "🔧" },
      { number: "99%", label: "Tỷ Lệ Hài Lòng", icon: "⭐" }
    ]
  },

  mission: {
    title: "Sứ Mệnh & Tầm Nhìn",
    items: [
      {
        type: "mission",
        title: "Sứ Mệnh",
        content: "Cung cấp các giải pháp công nghệ thông tin tiên tiến, giúp doanh nghiệp tối ưu hóa quy trình, nâng cao hiệu quả và thành công trong kỷ nguyên số.",
        icon: "🎯"
      },
      {
        type: "vision",
        title: "Tầm Nhìn",
        content: "Trở thành công ty công nghệ hàng đầu khu vực, được khách hàng tin tưởng và lựa chọn cho mọi nhu cầu chuyển đổi số.",
        icon: "🔮"
      },
      {
        type: "values",
        title: "Giá Trị Cốt Lõi",
        content: "Đổi mới - Chất lượng - Tin cậy - Tận tâm. Chúng tôi tin rằng thành công đến từ việc không ngừng học hỏi và cải tiến.",
        icon: "💎"
      }
    ]
  },

  services: {
    title: "Dịch Vụ Chính",
    description: "Chúng tôi cung cấp đa dạng các dịch vụ công nghệ để đáp ứng mọi nhu cầu của doanh nghiệp",
    items: [
      {
        id: 1,
        title: "Phát Triển Phần Mềm",
        description: "Thiết kế và phát triển các ứng dụng web, mobile và desktop theo yêu cầu riêng của từng doanh nghiệp.",
        icon: "💻",
        features: ["Web Application", "Mobile App", "Desktop Software", "API Development"]
      },
      {
        id: 2,
        title: "Tư Vấn Chuyển Đổi Số",
        description: "Đồng hành cùng doanh nghiệp trong hành trình số hóa, tối ưu quy trình và nâng cao năng suất.",
        icon: "🔄",
        features: ["Digital Strategy", "Process Automation", "System Integration", "Change Management"]
      },
      {
        id: 3,
        title: "Cloud & DevOps",
        description: "Triển khai và quản lý hạ tầng cloud, đảm bảo hiệu suất và bảo mật cho hệ thống của bạn.",
        icon: "☁️",
        features: ["Cloud Migration", "DevOps Setup", "Monitoring", "Security"]
      },
      {
        id: 4,
        title: "Data Analytics & AI",
        description: "Khai thác sức mạnh của dữ liệu và trí tuệ nhân tạo để tạo ra lợi thế c경쟁tranh.",
        icon: "📊",
        features: ["Business Intelligence", "Machine Learning", "Data Warehouse", "Predictive Analytics"]
      }
    ]
  },

  team: {
    title: "Đội Ngũ Lãnh Đạo",
    description: "Những con người tài năng và giàu kinh nghiệm đứng sau thành công của chúng tôi",
    members: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        position: "CEO & Founder",
        bio: "Hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ, từng làm việc tại các tập đoàn lớn trước khi thành lập công ty.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        social: {
          linkedin: "#",
          email: "ceo@company.com"
        }
      },
      {
        id: 2,
        name: "Trần Thị B",
        position: "CTO",
        bio: "Chuyên gia công nghệ với 12 năm kinh nghiệm, chuyên về kiến trúc hệ thống và công nghệ mới nhất.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        social: {
          linkedin: "#",
          email: "cto@company.com"
        }
      },
      {
        id: 3,
        name: "Lê Văn C",
        position: "Head of Sales",
        bio: "10 năm kinh nghiệm trong lĩnh vực kinh doanh B2B, đã giúp hàng trăm doanh nghiệp chuyển đổi số thành công.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        social: {
          linkedin: "#",
          email: "sales@company.com"
        }
      },
      {
        id: 4,
        name: "Phạm Thị D",
        position: "Head of Design",
        bio: "Chuyên gia UX/UI với tư duy sáng tạo, đã thiết kế hàng trăm sản phẩm digital được người dùng yêu thích.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        social: {
          linkedin: "#",
          email: "design@company.com"
        }
      }
    ]
  },

  timeline: {
    title: "Hành Trình Phát Triển",
    events: [
      {
        year: "2014",
        title: "Thành Lập Công Ty",
        description: "Khởi đầu với 5 thành viên và tầm nhìn trở thành công ty công nghệ hàng đầu."
      },
      {
        year: "2016",
        title: "Mở Rộng Đầu Tiên",
        description: "Tăng trưởng lên 20 nhân viên và hoàn thành 50+ dự án đầu tiên."
      },
      {
        year: "2018",
        title: "Công Nghệ AI & ML",
        description: "Đầu tư vào công nghệ AI và Machine Learning, mở ra hướng phát triển mới."
      },
      {
        year: "2020",
        title: "Chuyển Đổi Số",
        description: "Trở thành đối tác tin cậy cho doanh nghiệp trong thời kỳ chuyển đổi số."
      },
      {
        year: "2022",
        title: "Mở Rộng Khu Vực",
        description: "Mở văn phòng tại 3 thành phố lớn và phục vụ khách hàng toàn quốc."
      },
      {
        year: "2024",
        title: "Công Nghệ Tương Lai",
        description: "Nghiên cứu và phát triển các giải pháp IoT, Blockchain và Web3."
      }
    ]
  },

  awards: {
    title: "Giải Thưởng & Chứng Nhận",
    items: [
      {
        title: "Top 100 Công Ty CNTT Việt Nam",
        year: "2023",
        organization: "VINASA",
        description: "Được công nhận trong danh sách 100 công ty công nghệ thông tin hàng đầu Việt Nam."
      },
      {
        title: "Giải Thưởng Chuyển Đổi Số",
        year: "2022",
        organization: "Bộ TT&TT",
        description: "Giải nhất hạng mục 'Giải pháp chuyển đổi số xuất sắc cho doanh nghiệp SME'."
      },
      {
        title: "ISO 27001:2013",
        year: "2021",
        organization: "BSI Group",
        description: "Chứng nhận tiêu chuẩn quản lý bảo mật thông tin quốc tế."
      },
      {
        title: "Sao Khuê 2021",
        year: "2021",
        organization: "VINASA",
        description: "Giải thưởng Sao Khuê cho sản phẩm phần mềm xuất sắc."
      }
    ]
  }
};

// API Service
const apiService = {
  getHeroData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.hero;
  },
  
  getCompanyOverview: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockData.companyOverview;
  },
  
  getMissionData: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockData.mission;
  },
  
  getServicesData: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.services;
  },
  
  getTeamData: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockData.team;
  },
  
  getTimelineData: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.timeline;
  },
  
  getAwardsData: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockData.awards;
  }
};

export default function AboutPage() {
  const [data, setData] = useState({
    hero: null,
    companyOverview: null,
    mission: null,
    services: null,
    team: null,
    timeline: null,
    awards: null
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          heroData,
          overviewData,
          missionData,
          servicesData,
          teamData,
          timelineData,
          awardsData
        ] = await Promise.all([
          apiService.getHeroData(),
          apiService.getCompanyOverview(),
          apiService.getMissionData(),
          apiService.getServicesData(),
          apiService.getTeamData(),
          apiService.getTimelineData(),
          apiService.getAwardsData()
        ]);
        
        setData({
          hero: heroData,
          companyOverview: overviewData,
          mission: missionData,
          services: servicesData,
          team: teamData,
          timeline: timelineData,
          awards: awardsData
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-900 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {data.hero?.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              {data.hero?.subtitle}
            </p>
            <p className="text-lg opacity-90 max-w-2xl">
              {data.hero?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {data.companyOverview?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {data.companyOverview?.content}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {data.companyOverview?.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
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

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            {data.mission?.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.mission?.items.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {data.services?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.services?.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {data.services?.items.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {data.team?.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.team?.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.team?.members.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-800">
                      LinkedIn
                    </a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-600 hover:text-gray-800">
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            {data.timeline?.title}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            {data.timeline?.events.map((event, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            {data.awards?.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.awards?.items.map((award, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-400">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🏆</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {award.title}
                      </h3>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-3">
                      {award.organization}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu Dự Án Cùng Chúng Tôi?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực với những giải pháp công nghệ tối ưu nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Liên Hệ Ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}