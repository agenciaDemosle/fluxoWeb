<?php
/**
 * Plugin Name: Demosle Login
 * Plugin URI: https://demosle.cl
 * Description: Personalización de la página de login de WordPress con el branding de Demosle
 * Version: 1.0.0
 * Author: Demosle
 * Author URI: https://demosle.cl
 * Text Domain: demosle-login
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DEMOSLE_LOGIN_VERSION', '1.0.0');
define('DEMOSLE_LOGIN_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DEMOSLE_LOGIN_PLUGIN_URL', plugin_dir_url(__FILE__));

// Customize login page (hooks deben estar fuera de la función)
add_action('login_enqueue_scripts', 'demosle_login_styles');
add_filter('login_headerurl', 'demosle_login_url');
add_filter('login_headertext', 'demosle_login_title');
add_filter('login_message', 'demosle_login_message');
add_action('login_footer', 'demosle_login_whatsapp_cta');

/**
 * Enqueue custom login styles
 */
function demosle_login_styles() {
    // Demosle branding values
    $primary_color = '#7B34CD';
    $secondary_color = '#FF00A8';
    $background_color = '#F8F7E5';

    ?>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');

        body.login {
            background: <?php echo esc_attr($background_color); ?>;
            font-family: 'Work Sans', system-ui, sans-serif;
            position: relative;
            overflow-x: hidden;
        }

        /* Subtle Grid Pattern */
        body.login::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.02;
            z-index: 0;
        }

        /* Main container */
        #login {
            max-width: 400px !important;
            width: 100% !important;
            padding: 40px 32px 32px 32px !important;
            margin: 100px auto 60px auto !important;
            position: relative;
            z-index: 1;
            background: white !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            border-radius: 20px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
        }

        /* Logo Demosle - centered inside card */
        #login h1 {
            text-align: center !important;
            margin-bottom: 20px !important;
            margin-top: 0 !important;
        }

        #login h1 a {
            background-image: none !important;
            width: auto !important;
            height: auto !important;
            text-indent: 0 !important;
            overflow: visible !important;
            font-family: monospace !important;
            font-size: 26px !important;
            font-weight: 900 !important;
            color: #000 !important;
            letter-spacing: 2px !important;
            display: inline-block !important;
        }

        /* Welcome message */
        .login .message,
        .login #login_error,
        .login .success,
        #login p {
            text-align: center !important;
        }

        .login .message {
            font-size: 13px !important;
            color: #666 !important;
            margin-bottom: 20px !important;
            background: none !important;
            border: none !important;
            box-shadow: none !important;
        }

        /* Login form - remove card style since #login is now the card */
        .login form {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        /* Form fields wrapper */
        .login form p {
            margin-bottom: 20px !important;
        }

        /* Labels */
        .login label {
            color: #374151 !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            display: block !important;
            margin-bottom: 8px !important;
        }

        /* Inputs */
        .login input[type="text"],
        .login input[type="password"] {
            border: 2px solid #e5e7eb !important;
            border-radius: 8px !important;
            padding: 12px 16px !important;
            font-size: 16px !important;
            transition: all 0.2s !important;
            background: white !important;
            width: 100% !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
        }

        .login input[type="text"]:focus,
        .login input[type="password"]:focus {
            border-color: <?php echo esc_attr($primary_color); ?> !important;
            box-shadow: 0 0 0 3px rgba(123, 52, 205, 0.1) !important;
            outline: none !important;
        }

        /* Checkbox */
        .login .forgetmenot input[type="checkbox"] {
            accent-color: <?php echo esc_attr($primary_color); ?>;
        }

        /* Botón de login */
        .login .button-primary,
        .login input[type="submit"],
        body.login .button-primary,
        body.login input[type="submit"],
        body.login #wp-submit {
            background: <?php echo esc_attr($primary_color); ?> !important;
            background-color: <?php echo esc_attr($primary_color); ?> !important;
            border: none !important;
            border-radius: 12px !important;
            padding: 14px 24px !important;
            font-weight: 700 !important;
            font-size: 16px !important;
            text-transform: none !important;
            transition: all 0.2s !important;
            width: 100% !important;
            box-shadow: none !important;
            text-shadow: none !important;
            color: white !important;
        }

        .login .button-primary:hover,
        .login input[type="submit"]:hover,
        body.login .button-primary:hover,
        body.login input[type="submit"]:hover,
        body.login #wp-submit:hover {
            background: #6a2db8 !important;
            background-color: #6a2db8 !important;
            transform: translateY(-1px);
            color: white !important;
        }

        .login .button-primary:active,
        body.login #wp-submit:active {
            transform: translateY(0);
        }

        .login .button-primary:focus,
        body.login #wp-submit:focus {
            background: <?php echo esc_attr($primary_color); ?> !important;
            background-color: <?php echo esc_attr($primary_color); ?> !important;
            box-shadow: 0 0 0 3px rgba(123, 52, 205, 0.2) !important;
        }

        /* Links */
        #login a {
            color: <?php echo esc_attr($primary_color); ?>;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
        }

        #login a:hover {
            text-decoration: underline;
        }

        #backtoblog a, #nav a {
            color: #666;
        }

        #backtoblog a:hover, #nav a:hover {
            color: #000;
        }

        /* Mensajes de error */
        .login #login_error {
            border-left: 4px solid #dc2626;
            background: white;
            border-radius: 12px;
            padding: 16px;
            border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .login .success {
            border-left: 4px solid <?php echo esc_attr($primary_color); ?>;
            background: white;
            border-radius: 12px;
            padding: 16px;
            border: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* Footer */
        .login #backtoblog,
        .login #nav {
            text-align: center !important;
            margin-top: 16px !important;
        }

        /* Language switcher - hide it */
        .login .language-switcher,
        .login #language-switcher,
        body.login .language-switcher {
            display: none !important;
        }

        /* Promo Notification - small card bottom right */
        #demosle-promo {
            position: fixed;
            bottom: 24px;
            right: 24px;
            max-width: 360px;
            background: white;
            border-radius: 16px;
            padding: 20px 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            color: #000;
            border: 2px solid <?php echo esc_attr($secondary_color); ?>;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        #demosle-promo .promo-badge {
            display: inline-block;
            background: <?php echo esc_attr($secondary_color); ?>;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1px;
            margin-bottom: 12px;
            text-transform: uppercase;
        }

        #demosle-promo .promo-title {
            font-size: 16px;
            font-weight: 800;
            line-height: 1.3;
            margin: 0 0 8px 0;
            color: #000;
        }

        #demosle-promo .promo-title .highlight {
            color: <?php echo esc_attr($primary_color); ?>;
        }

        #demosle-promo .promo-description {
            font-size: 13px;
            line-height: 1.4;
            margin: 0 0 16px 0;
            color: #666;
        }

        #demosle-promo .promo-cta {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            background: <?php echo esc_attr($primary_color); ?> !important;
            color: white !important;
            padding: 10px 16px !important;
            border-radius: 10px !important;
            text-decoration: none !important;
            font-weight: 700 !important;
            font-size: 12px !important;
            transition: all 0.2s !important;
            width: 100% !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }

        #demosle-promo .promo-cta:hover {
            background: #6a2db8 !important;
            color: white !important;
        }

        #demosle-promo .promo-cta svg {
            width: 16px !important;
            height: 16px !important;
            flex-shrink: 0 !important;
        }

        #demosle-promo .promo-footer {
            margin: 10px 0 0 0;
            font-size: 11px;
            color: #999;
            font-weight: 500;
            text-align: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
            #login h1 a {
                font-size: 28px !important;
            }

            .login form {
                padding: 32px 24px;
            }

            #demosle-promo {
                bottom: 16px;
                right: 16px;
                left: 16px;
                max-width: none;
                padding: 16px 20px;
            }
        }
    </style>
    <?php
}

/**
 * Change login logo URL to Demosle
 */
function demosle_login_url() {
    return 'https://demosle.cl';
}

/**
 * Change login logo title to Demosle
 */
function demosle_login_title() {
    return 'DEMOSLE';
}

/**
 * Add custom message above login form
 */
function demosle_login_message($message) {
    $message .= '<p class="message" style="text-align: center; font-size: 16px;">Bienvenido! Ingresa tus credenciales para acceder</p>';
    return $message;
}

/**
 * Add promotional content and WhatsApp CTA
 */
function demosle_login_whatsapp_cta() {
    $whatsapp_number = '+56966354128';
    $whatsapp_message = '¡Hola! Quiero información sobre publicidad digital';
    $whatsapp_url = 'https://wa.me/' . preg_replace('/[^0-9+]/', '', $whatsapp_number) . '?text=' . urlencode($whatsapp_message);

    ?>

    <div id="demosle-promo">
        <div class="promo-badge">Impulsa tu negocio</div>
        <h2 class="promo-title">¿Listo para <span class="highlight">escalar tus ventas</span> con publicidad digital?</h2>
        <p class="promo-description">Campañas medibles en Meta Ads y Google Ads que convierten inversión en clientes reales</p>

        <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="promo-cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Cotizar campañas
        </a>

        <p class="promo-footer">Asesoría gratis</p>
    </div>
    <?php
}

// No activation/deactivation hooks needed - plugin works immediately
