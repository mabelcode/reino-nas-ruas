'use client';

import { useState } from 'react';
import { Heart, Copy, CheckCircle, Users, BookOpen, Trophy, Home } from 'lucide-react';

export default function DonatePage() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');

  const pixKey = "reinonasruas@pix.com.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const donationImpacts = [
    {
      icon: BookOpen,
      amount: "R$ 30",
      description: "Custeia 1 mês de atividades educativas para 1 criança",
      color: "text-[var(--reino-orange)]"
    },
    {
      icon: Trophy,
      amount: "R$ 100",
      description: "Compra materiais esportivos para 5 crianças",
      color: "text-[var(--reino-green-c)]"
    },
    {
      icon: Users,
      amount: "R$ 250",
      description: "Mantém 1 professor por 1 semana",
      color: "text-[var(--reino-yellow)]"
    },
    {
      icon: Home,
      amount: "R$ 500",
      description: "Organiza 1 evento para 50 famílias",
      color: "text-[var(--reino-green-e)]"
    }
  ];

  const suggestedAmounts = ['30', '50', '100', '250', '500'];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white">
        <div className="container-max">
          <div className="text-center">
            <Heart className="w-20 h-20 mx-auto mb-6" />
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl mb-6">
              Doe com o Coração
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Sua doação transforma vidas. Cada contribuição ajuda a construir um futuro melhor para nossas crianças e adolescentes.
            </p>
          </div>
        </div>
      </section>

      {/* Doação PIX */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-6">
                Doação via PIX
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fazer sua doação é simples e rápido! Use nossa chave PIX abaixo ou escaneie o QR Code para contribuir de forma segura.
              </p>

              {/* Valores Sugeridos */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[var(--reino-green-e)] mb-4">
                  Valores Sugeridos
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'bg-[var(--reino-orange)] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      R$ {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chave PIX */}
              <div className="bg-gray-50 rounded-3xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-[var(--reino-green-e)] mb-4">
                  Chave PIX
                </h3>
                <div className="flex items-center justify-between bg-white rounded-xl p-4">
                  <span className="text-gray-700 font-mono">{pixKey}</span>
                  <button
                    onClick={handleCopyPix}
                    className="ml-4 bg-[var(--reino-orange)] text-white p-2 rounded-lg hover:bg-[var(--reino-orange-hover)] transition-colors"
                  >
                    {copiedPix ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copiedPix && (
                  <p className="text-[var(--reino-green-c)] text-sm mt-2">
                    Chave PIX copiada com sucesso!
                  </p>
                )}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-[var(--reino-green-e)] mb-6">
                  QR Code PIX
                </h3>
                <div className="bg-gray-100 rounded-2xl p-8 mb-6">
                  <div className="w-48 h-48 bg-white rounded-xl mx-auto flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-black rounded-lg mb-4 mx-auto"></div>
                      <p className="text-sm text-gray-600">
                        QR Code PIX
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Escaneie o QR Code acima com seu aplicativo bancário para fazer a doação instantaneamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto das Doações */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
              Impacto das Suas Doações
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como cada valor doado se transforma em oportunidades reais para nossas crianças e adolescentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationImpacts.map((impact, index) => (
              <div 
                key={impact.amount}
                className={`bg-white rounded-3xl p-6 shadow-lg text-center card-hover animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 ${impact.color} bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <impact.icon className="w-8 h-8" />
                </div>
                <div className={`text-2xl font-bold ${impact.color} mb-3`}>
                  {impact.amount}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-font text-3xl sm:text-4xl text-[var(--reino-green-e)] mb-4">
              Transparência Total
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Saiba exatamente como suas doações são utilizadas. Prestamos contas mensalmente de todos os recursos recebidos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-[var(--reino-orange)] to-[var(--reino-yellow)] text-white rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">70%</div>
              <div className="text-lg font-semibold mb-2">Programas Diretos</div>
              <p className="text-sm opacity-90">
                Atividades educativas, esportivas e culturais
              </p>
            </div>

            <div className="bg-linear-to-br from-[var(--reino-green-c)] to-[var(--reino-green-e)] text-white rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">20%</div>
              <div className="text-lg font-semibold mb-2">Infraestrutura</div>
              <p className="text-sm opacity-90">
                Manutenção, equipamentos e materiais
              </p>
            </div>

            <div className="bg-linear-to-br from-[var(--reino-yellow)] to-[var(--reino-orange)] text-white rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold mb-2">10%</div>
              <div className="text-lg font-semibold mb-2">Administração</div>
              <p className="text-sm opacity-90">
                Gestão e operação da organização
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outras Formas de Ajudar */}
      <section className="section-padding bg-[var(--reino-green-e)] text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-font text-3xl sm:text-4xl mb-4">
              Outras Formas de Ajudar
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Além da doação em dinheiro, existem outras maneiras de contribuir com nosso trabalho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <Users className="w-12 h-12 text-[var(--reino-yellow)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Seja Voluntário</h3>
              <p className="text-gray-300 mb-4">
                Doe seu tempo e conhecimento para ajudar diretamente nossas atividades.
              </p>
              <button 
                onClick={() => {
                  const event = new CustomEvent('openVolunteerModal');
                  window.dispatchEvent(event);
                }}
                className="bg-[var(--reino-yellow)] text-[var(--reino-green-e)] px-6 py-2 rounded-full font-semibold hover:bg-[var(--reino-yellow-hover)] transition-colors"
              >
                Inscrever-se
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <Trophy className="w-12 h-12 text-[var(--reino-orange)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Doe Materiais</h3>
              <p className="text-gray-300 mb-4">
                Equipamentos esportivos, materiais escolares e brinquedos são sempre bem-vindos.
              </p>
              <a 
                href="/contact" 
                className="bg-[var(--reino-orange)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-colors"
              >
                Saiba Mais
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-3xl p-6 text-center">
              <Heart className="w-12 h-12 text-[var(--reino-green-c)] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Divulgue</h3>
              <p className="text-gray-300 mb-4">
                Compartilhe nosso trabalho nas redes sociais e ajude a ampliar nosso alcance.
              </p>
              <button className="bg-[var(--reino-green-c)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--reino-green-c-hover)] transition-colors">
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}