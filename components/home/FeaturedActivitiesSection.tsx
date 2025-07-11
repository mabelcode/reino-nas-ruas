'use client';

import { Zap, Music, BookOpen, Users } from 'lucide-react';

export function FeaturedActivitiesSection() {
  const activities = [
    {
      icon: Zap,
      title: "Jiu-Jitsu",
      description: "Desenvolvimento da disciplina, autoestima e valores através da arte marcial",
      image: "https://images.pexels.com/photos/7045859/pexels-photo-7045859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: Music,
      title: "RAP e Cultura",
      description: "Expressão artística e desenvolvimento cultural através da música",
      image: "https://images.pexels.com/photos/7034369/pexels-photo-7034369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: BookOpen,
      title: "Reforço Escolar",
      description: "Apoio pedagógico e acompanhamento educacional personalizado",
      image: "https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      icon: Users,
      title: "Empoderamento Feminino",
      description: "Capacitação profissional e desenvolvimento de habilidades para mulheres",
      image: "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#385723] mb-4">
            Nossas Atividades
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Oferecemos uma variedade de programas que promovem o desenvolvimento integral das crianças e adolescentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <div 
              key={activity.title}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-4/3 relative">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center mb-2">
                  <activity.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFDB42] mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold">{activity.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}