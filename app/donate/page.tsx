'use client';

import { useState, useMemo } from 'react';
import { logger } from '@/lib/logger';
import { Heart, Copy, CheckCircle, Users, BookOpen, Trophy, Home } from 'lucide-react';
import { useDonate } from '@/hooks/use-donate';
import QRCode from 'react-qr-code';
import { QrCodePix } from 'qrcode-pix';

// Função para gerar QR Code PIX manualmente (fallback)
const generatePixQRCode = (pixKey: string, amount?: string) => {
  const cleanKey = pixKey.replace(/[^\w]/g, '');
  const pixAmount = amount ? parseFloat(amount).toFixed(2) : '0.00';
  
  // Estrutura do QR Code PIX conforme especificação do Banco Central
  const pixData = [
    '000201', // Payload Format Indicator
    '2658', // Point of Initiation Method
    '0014br.gov.bcb.pix', // Global Unique Identifier
    '01' + cleanKey.length.toString().padStart(2, '0') + cleanKey, // PIX Key
    '52040000', // Merchant Category Code
    '5303986', // Transaction Currency
    '54' + pixAmount.length.toString().padStart(2, '0') + pixAmount, // Transaction Amount
    '5802BR', // Country Code
    '59' + 'REINO NAS RUAS'.length.toString().padStart(2, '0') + 'REINO NAS RUAS', // Merchant Name
    '60' + 'SAO PAULO'.length.toString().padStart(2, '0') + 'SAO PAULO', // Merchant City
    '62070503***', // Additional Data Field Template
    '6304' // CRC16
  ].join('');
  
  return pixData;
};

export default function DonatePage() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [qrError, setQrError] = useState(false);

  const donateInfo = useDonate();
  const pixKey = donateInfo.pix;

  // Função para validar e formatar a chave PIX
  const formatPixKey = (key: string) => {
    // Remove caracteres especiais e espaços
    return key.replace(/[^\w]/g, '');
  };

  // Função para validar se a chave PIX é válida
  const isValidPixKey = (key: string) => {
    if (!key || key === '00.000.000/0000-00') return false;
    
    // Remove caracteres especiais para validação
    const cleanKey = key.replace(/[^\w]/g, '');
    
    // Validações específicas por tipo de chave PIX
    if (cleanKey.length === 11) {
      // CPF
      return /^\d{11}$/.test(cleanKey);
    } else if (cleanKey.length === 14) {
      // CNPJ
      return /^\d{14}$/.test(cleanKey);
    } else if (cleanKey.includes('@')) {
      // Email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key);
    } else if (cleanKey.length === 11 && cleanKey.startsWith('55')) {
      // Telefone (Brasil)
      return /^55\d{9}$/.test(cleanKey);
    } else if (cleanKey.length >= 10) {
      // Chave aleatória (mínimo 10 caracteres)
      return true;
    }
    
    return false;
  };

    const qrPayload = useMemo(() => {
    try {
      setQrError(false);
      
      // Validar se a chave PIX é válida
      if (!isValidPixKey(pixKey)) {
        // Em vez de throw, usar fallback diretamente
        setQrError(true);
        return generatePixQRCode(pixKey, selectedAmount);
      }

      // Tentar usar a biblioteca qrcode-pix primeiro
      const qr = QrCodePix({
        version: '01',
        key: formatPixKey(pixKey),
        name: 'REINO NAS RUAS',
        city: 'SAO PAULO',
        value: selectedAmount ? Number(selectedAmount) : undefined,
        transactionId: 'REINO' + Date.now().toString().slice(-8),
        message: 'Doação Reino nas Ruas',
      });
      
      return qr.payload();
    } catch (error) {
      // Só logar erro se não for de validação
      if (error instanceof Error && !error.message?.includes('Chave PIX inválida')) {
        console.error('Erro ao gerar QR Code PIX com biblioteca:', error);
      }
      setQrError(true);
      // Fallback para geração manual
      return generatePixQRCode(pixKey, selectedAmount);
    }
  }, [pixKey, selectedAmount]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleShare = async () => {
    if ('share' in navigator) {
      const shareData = {
        title: 'Reino nas Ruas',
        text: 'Conheça o trabalho incrível da ONG Reino nas Ruas! Vi no site e achei inspirador.',
        url: window.location.href,
      };
      try {
        if (navigator.canShare && !navigator.canShare(shareData)) {
          throw new Error('Dados de compartilhamento não suportados.');
        }
        await navigator.share(shareData);
      } catch (err) {
                logger.error('Erro ao compartilhar conteúdo', err as Error, {
          page: 'donate',
          action: 'share_content',
          shareData
        });
      }
    } else {
      alert('O compartilhamento não é suportado neste navegador.');
    }
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

  const suggestedAmounts = donateInfo.suggested_values;

  return (
    <>
      <title>DOE | Reino nas Ruas</title>
      <div className="min-h-screen pt-16 sm:pt-18 lg:pt-20">
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
                  <div className="bg-gray-100 rounded-2xl p-8 mb-6 flex items-center justify-center">
                    {qrPayload ? (
                      <div className="text-center">
                        <QRCode value={qrPayload} size={192} />
                        {qrError && (
                          <p className="text-xs text-orange-600 mt-2">
                            QR Code gerado manualmente
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <p className="text-sm">QR Code não disponível</p>
                        <p className="text-xs mt-1">Use a chave PIX acima</p>
                      </div>
                    )}
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
                <button
                  onClick={handleShare}
                  className="bg-[var(--reino-green-c)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--reino-green-c-hover)] transition-colors"
                >
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}