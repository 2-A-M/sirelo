<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Request;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        // Get the preferred language from the request headers
        $language = Request::header('Accept-Language');
        
        // Also check X-Language header that our frontend might be sending
        if (!$language || !in_array($language, ['en', 'pt'])) {
            $language = Request::header('X-Language');
        }
        
        // Check query parameter as a last resort
        if (!$language || !in_array($language, ['en', 'pt'])) {
            $language = Request::input('lang');
        }
        
        // Log which language we're using for debugging
        \Illuminate\Support\Facades\Log::info("Sending password reset email with language: " . ($language ?: 'default'));
        
        // Pass the language to the notification
        $this->notify(new ResetPasswordNotification($token, $language));
    }
}
