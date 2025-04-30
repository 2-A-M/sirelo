<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * The callback that should be used to create the reset password URL.
     *
     * @var \Closure|null
     */
    public static $createUrlCallback;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // Obtém a URL base do frontend a partir das configurações
        $frontendUrl = Config::get('frontend.url', 'https://front-production-2f2b.up.railway.app');
        
        // Obtém o caminho da rota de redefinição de senha
        $resetPasswordRoute = Config::get('frontend.routes.reset_password', '/reset-password/');
        
        // Constrói a URL completa de redefinição incluindo o email como parâmetro
        $resetUrl = $frontendUrl . $resetPasswordRoute . $this->token . '?email=' . urlencode($notifiable->email);
        
        return (new MailMessage)
            ->subject('Recuperação de Senha')
            ->greeting('Olá!')
            ->line('Esqueceu sua senha? Fica tranquilo que esse tipo de coisa acontece.')
            ->line('Clique no botão abaixo para criar uma nova senha de acesso:')
            ->action('Criar Nova Senha', $resetUrl)
            ->line('Se você não solicitou uma recuperação de senha, basta ignorar este e-mail.')
            ->line('Este link é válido por 60 minutos e pode ser usado apenas uma vez.')
            ->salutation('Atenciosamente,')
            ->salutation(Config::get('app.name', 'Nossa Equipe'));
    }
} 