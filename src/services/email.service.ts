// Mock email service for demonstrating multilingual email templates

export interface EmailTemplate {
  subject: string;
  body: string;
}

const emailTemplates = {
  resetPassword: {
    en: {
      subject: "Reset Password",
      body: `
        <h1>Reset Password</h1>
        <p>Hello,</p>
        <p>A password reset has been requested. Please click on the link below to create a new password:</p>
        <p><a href="{{resetLink}}">Reset Password</a></p>
        <p>If this wasn't requested, this email can be safely ignored.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,</p>
        <p>The Support Team</p>
      `
    },
    pt: {
      subject: "Recuperação de Senha",
      body: `
        <h1>Recuperação de Senha</h1>
        <p>Olá,</p>
        <p>Uma recuperação de senha foi solicitada. Clique no link abaixo para criar uma nova senha:</p>
        <p><a href="{{resetLink}}">Redefinir Senha</a></p>
        <p>Se isso não foi solicitado, este e-mail pode ser ignorado com segurança.</p>
        <p>Este link expira em 24 horas.</p>
        <p>Atenciosamente,</p>
        <p>Equipe de Suporte</p>
      `
    }
  }
};

export const emailService = {
  // This is a mock function - in a real app, this would send an actual email
  async sendPasswordResetEmail(email: string, resetToken: string, language: string = 'pt'): Promise<void> {
    // Validate language and fall back to Portuguese if not supported
    const validLanguage = ['en', 'pt'].includes(language) ? language : 'pt';
    
    // Get template in the selected language
    const template = emailTemplates.resetPassword[validLanguage as keyof typeof emailTemplates.resetPassword];

    // Create reset link (this would be a real link in production)
    const resetLink = `http://localhost:3000/reset-password/${resetToken}?email=${encodeURIComponent(email)}`;
    
    // Replace placeholders in the template
    const emailBody = template.body.replace('{{resetLink}}', resetLink);
    
    // In a real application, we would send an email here
    console.log(`Sending email to: ${email}`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Body: ${emailBody}`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful email sending
    return Promise.resolve();
  }
}; 