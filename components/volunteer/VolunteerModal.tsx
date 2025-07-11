'use client';

import { useState, useEffect } from 'react';
import { X, Heart, User, Mail, Phone, MessageCircle, CheckCircle } from 'lucide-react';

export function VolunteerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    availability: '',
    skills: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    window.addEventListener('openVolunteerModal', handleOpenModal);
    return () => window.removeEventListener('openVolunteerModal', handleOpenModal);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Volunteer form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        availability: '',
        skills: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
              <h2 className="text-lg sm:text-xl font-bold">Seja Voluntário</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--reino-green-c)] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--reino-green-e)] mb-2">
                Obrigado!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Recebemos sua inscrição e entraremos em contato em breve. Juntos, faremos a diferença!
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--reino-green-e)] mb-2">
                  Junte-se a nós!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Preencha o formulário abaixo e faça parte do time que está transformando vidas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Disponibilidade
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  >
                    <option value="">Selecione sua disponibilidade</option>
                    <option value="manhã">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                    <option value="fins-de-semana">Fins de semana</option>
                    <option value="flexível">Flexível</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Habilidades/Áreas de Interesse
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Ex: Educação, Esportes, Arte, Administração..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Mensagem
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                      placeholder="Conte-nos um pouco sobre sua motivação..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--reino-orange)] text-white px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-[var(--reino-orange-dark)] transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4 sm:mt-6 text-sm sm:text-base"
                >
                  Enviar Inscrição
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}