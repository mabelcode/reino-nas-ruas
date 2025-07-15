'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { useInfo } from '@/hooks/use-info';
import { useSocials } from '@/hooks/use-socials';
import MapIframe from '@/components/MapIframe';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const info = useInfo();
  const socials = useSocials();
  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  } as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error('Failed to send contact');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Estamos sempre prontos para ouvir você. Entre em contato conosco para tirar dúvidas, fazer sugestões ou conhecer melhor nosso trabalho.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="heading-font text-3xl text-[var(--reino-green-e)] mb-6">
                Envie uma Mensagem
              </h2>

              {isSubmitted ? (
                <div className="bg-[var(--reino-green-c)] text-white rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                  <p>Obrigado pelo contato. Responderemos em breve!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="informacoes">Informações Gerais</option>
                        <option value="doacao">Doações</option>
                        <option value="voluntario">Voluntariado</option>
                        <option value="parceria">Parcerias</option>
                        <option value="imprensa">Imprensa</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--reino-orange)] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="animate-slide-in-right">
              <h2 className="heading-font text-3xl text-[var(--reino-green-e)] mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--reino-orange)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--reino-green-e)] mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      {info.street}, {info.number}<br />
                      {info.neighborhood}, {info.city} - {info.state}<br />
                      CEP: {info.zipcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--reino-green-c)] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--reino-green-e)] mb-1">Telefone</h3>
                    <p className="text-gray-600">
                      {info.phone}
                      {info.phone_2 && (
                        <>
                          <br />
                          {info.phone_2}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--reino-yellow)] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[var(--reino-green-e)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--reino-green-e)] mb-1">E-mail</h3>
                    <p className="text-gray-600">
                      {info.email}
                      {info.email_2 && (
                        <>
                          <br />
                          {info.email_2}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--reino-green-e)] rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--reino-green-e)] mb-1">Horário de Funcionamento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: {info.working_days_1}
                      {info.working_days_2 && (
                        <>
                          <br />
                          Sábado: {info.working_days_2}
                        </>
                      )}
                      {info.working_days_3 && (
                        <>
                          <br />
                          Domingo: {info.working_days_3}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-semibold text-[var(--reino-green-e)] mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {socials.map(({ id, platform, url }) => {
                    const Icon = iconMap[platform as keyof typeof iconMap] || Facebook;
                    return (
                      <a
                        key={id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[var(--reino-orange)] rounded-full flex items-center justify-center hover:bg-[var(--reino-orange-hover)] transition-colors"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </a>
                    );
                  })}
                  <WhatsAppButton
                    className="w-12 h-12"
                    color="var(--reino-orange)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
              Nossa Localização
            </h2>
            <p className="text-lg text-gray-600">
              Venha nos visitar! Estamos localizados no coração da comunidade que atendemos.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="aspect-video">
              <MapIframe
                address={`${info.street}, ${info.number} - ${info.neighborhood}, ${info.city} - ${info.state}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}