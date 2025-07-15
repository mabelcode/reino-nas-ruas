export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  availability?: string;
  skills?: string;
}

export interface ONGInfo {
  email: string;
  phone: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  email_2?: string | null;
  phone_2?: string | null;
}

export function orgEmailHtml(info: ONGInfo, payload: ContactPayload, baseUrl: string) {
  return `
  <div style="font-family: Arial, sans-serif; color:#333;">
    <div style="text-align:center; margin-bottom:20px;">
      <img src="${baseUrl}/assets/images/logos/logo-primary.png" alt="Logo" style="max-width:180px;" />
    </div>
    <h2 style="color:#1e293b;">Novo contato recebido</h2>
    <p><strong>Nome:</strong> ${payload.name}</p>
    <p><strong>E-mail:</strong> ${payload.email}</p>
    <p><strong>Telefone:</strong> ${payload.phone}</p>
    <p><strong>Assunto:</strong> ${payload.subject}</p>
    ${payload.availability ? `<p><strong>Disponibilidade:</strong> ${payload.availability}</p>` : ''}
    ${payload.skills ? `<p><strong>Habilidades:</strong> ${payload.skills}</p>` : ''}
    <p style="margin-top:20px; white-space:pre-line;">${payload.message}</p>
    <hr style="margin:40px 0" />
    <p>
      ${info.street}, ${info.number} - ${info.neighborhood}<br/>
      ${info.city} - ${info.state}<br/>
      ${info.phone}${info.phone_2 ? ' / ' + info.phone_2 : ''}
    </p>
  </div>`;
}

export function userEmailHtml(info: ONGInfo, payload: ContactPayload, baseUrl: string) {
  return `
  <div style="font-family: Arial, sans-serif; color:#333;">
    <div style="text-align:center; margin-bottom:20px;">
      <img src="${baseUrl}/assets/images/logos/logo-primary.png" alt="Logo" style="max-width:180px;" />
    </div>
    <p>Olá ${payload.name},</p>
    <p>Recebemos sua mensagem enviada para a Associação Reino nas Ruas. Em breve entraremos em contato.</p>
    <h3 style="color:#1e293b;">Cópia da mensagem:</h3>
    <p><strong>Assunto:</strong> ${payload.subject}</p>
    <p style="white-space:pre-line;">${payload.message}</p>
    <hr style="margin:40px 0" />
    <p>
      ${info.street}, ${info.number} - ${info.neighborhood}<br/>
      ${info.city} - ${info.state}<br/>
      ${info.email}${info.email_2 ? ' / ' + info.email_2 : ''}<br/>
      ${info.phone}${info.phone_2 ? ' / ' + info.phone_2 : ''}
    </p>
  </div>`;
}
