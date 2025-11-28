<?php
/**
 * Plugin Name: Demosle Analytics
 * Plugin URI: https://demosle.cl
 * Description: Gestión centralizada de píxeles y códigos de seguimiento (Meta Pixel, Google Analytics, GTM, TikTok Pixel)
 * Version: 1.0.0
 * Author: Demosle
 * Author URI: https://demosle.cl
 * Text Domain: demosle-analytics
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DEMOSLE_ANALYTICS_VERSION', '1.0.0');
define('DEMOSLE_ANALYTICS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DEMOSLE_ANALYTICS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Add admin menu
 */
add_action('admin_menu', 'demosle_analytics_add_admin_menu');

function demosle_analytics_add_admin_menu() {
    add_menu_page(
        'Demosle Analytics',
        'Analytics',
        'manage_options',
        'demosle-analytics',
        'demosle_analytics_settings_page',
        'dashicons-chart-line',
        30
    );
}

/**
 * Register settings
 */
add_action('admin_init', 'demosle_analytics_register_settings');

function demosle_analytics_register_settings() {
    register_setting('demosle_analytics_group', 'demosle_analytics_settings');
}

/**
 * Settings page
 */
function demosle_analytics_settings_page() {
    $settings = get_option('demosle_analytics_settings', []);

    // Default values
    $meta_pixel_id = isset($settings['meta_pixel_id']) ? $settings['meta_pixel_id'] : '';
    $ga4_id = isset($settings['ga4_id']) ? $settings['ga4_id'] : '';
    $gtm_id = isset($settings['gtm_id']) ? $settings['gtm_id'] : '';
    $tiktok_pixel_id = isset($settings['tiktok_pixel_id']) ? $settings['tiktok_pixel_id'] : '';
    $custom_head = isset($settings['custom_head']) ? $settings['custom_head'] : '';
    $custom_body = isset($settings['custom_body']) ? $settings['custom_body'] : '';
    ?>

    <div class="wrap demosle-analytics-wrap">
        <style>
            .demosle-analytics-wrap {
                max-width: 900px;
                margin: 40px auto;
            }

            .demosle-header {
                background: linear-gradient(135deg, #7B34CD 0%, #9B4CE8 100%);
                padding: 32px;
                border-radius: 12px;
                margin-bottom: 32px;
                color: white;
                box-shadow: 0 4px 20px rgba(123, 52, 205, 0.2);
            }

            .demosle-header h1 {
                margin: 0 0 8px 0;
                color: white;
                font-size: 28px;
                font-weight: 700;
            }

            .demosle-header p {
                margin: 0;
                opacity: 0.9;
                font-size: 15px;
            }

            .analytics-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 32px;
                margin-bottom: 24px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            }

            .analytics-card h2 {
                margin-top: 0;
                font-size: 20px;
                color: #111827;
                margin-bottom: 8px;
            }

            .analytics-card p {
                margin: 0 0 24px 0;
                color: #6b7280;
                font-size: 14px;
            }

            .form-group {
                margin-bottom: 24px;
            }

            .form-group:last-child {
                margin-bottom: 0;
            }

            .form-group label {
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
                font-size: 14px;
            }

            .form-group input[type="text"],
            .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 14px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                transition: all 0.2s;
            }

            .form-group input[type="text"]:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #7B34CD;
                box-shadow: 0 0 0 3px rgba(123, 52, 205, 0.1);
            }

            .form-group textarea {
                min-height: 120px;
                font-family: 'Courier New', monospace;
                font-size: 13px;
            }

            .form-group small {
                display: block;
                margin-top: 6px;
                color: #6b7280;
                font-size: 13px;
            }

            .code-example {
                background: #f9fafb;
                padding: 12px;
                border-radius: 6px;
                margin-top: 8px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: #4b5563;
                border: 1px solid #e5e7eb;
            }

            .submit-button {
                background: #7B34CD;
                color: white;
                border: none;
                padding: 14px 32px;
                border-radius: 8px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(123, 52, 205, 0.2);
            }

            .submit-button:hover {
                background: #6a2db8;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(123, 52, 205, 0.3);
            }

            .submit-button:active {
                transform: translateY(0);
            }

            .demosle-promo {
                background: linear-gradient(135deg, #7B34CD 0%, #9B4CE8 100%);
                border-radius: 12px;
                padding: 32px;
                margin-top: 32px;
                color: white;
                position: relative;
                overflow: hidden;
            }

            .demosle-promo::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            }

            .demosle-promo-content {
                position: relative;
                z-index: 1;
            }

            .promo-badge {
                display: inline-block;
                background: #FF00A8;
                color: white;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 1px;
                margin-bottom: 16px;
                text-transform: uppercase;
            }

            .demosle-promo h3 {
                margin: 0 0 12px 0;
                font-size: 24px;
                font-weight: 700;
                color: white;
            }

            .demosle-promo p {
                margin: 0 0 20px 0;
                opacity: 0.95;
                line-height: 1.6;
                font-size: 15px;
            }

            .promo-cta {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: white;
                color: #7B34CD;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 700;
                font-size: 14px;
                transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .promo-cta:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                color: #6a2db8;
            }

            .promo-footer {
                margin-top: 16px;
                font-size: 13px;
                opacity: 0.8;
            }

            .success-message {
                background: #d1fae5;
                border: 1px solid #6ee7b7;
                color: #065f46;
                padding: 12px 16px;
                border-radius: 8px;
                margin-bottom: 24px;
                font-size: 14px;
            }
        </style>

        <div class="demosle-header">
            <h1>📊 Demosle Analytics</h1>
            <p>Gestiona todos tus píxeles y códigos de seguimiento desde un solo lugar</p>
        </div>

        <?php if (isset($_GET['settings-updated'])): ?>
            <div class="success-message">
                ✓ Configuración guardada correctamente. Los códigos de seguimiento se están inyectando en tu sitio.
            </div>
        <?php endif; ?>

        <form method="post" action="options.php">
            <?php settings_fields('demosle_analytics_group'); ?>

            <div class="analytics-card">
                <h2>🎯 Meta Pixel (Facebook Ads)</h2>
                <p>Instala el píxel de Meta para medir conversiones y optimizar tus campañas de Facebook e Instagram</p>

                <div class="form-group">
                    <label for="meta_pixel_id">Meta Pixel ID</label>
                    <input type="text" id="meta_pixel_id" name="demosle_analytics_settings[meta_pixel_id]" value="<?php echo esc_attr($meta_pixel_id); ?>" placeholder="123456789012345">
                    <small>Ejemplo: 123456789012345</small>
                </div>
            </div>

            <div class="analytics-card">
                <h2>📈 Google Analytics 4</h2>
                <p>Mide el tráfico y comportamiento de usuarios con Google Analytics 4</p>

                <div class="form-group">
                    <label for="ga4_id">Google Analytics 4 Measurement ID</label>
                    <input type="text" id="ga4_id" name="demosle_analytics_settings[ga4_id]" value="<?php echo esc_attr($ga4_id); ?>" placeholder="G-XXXXXXXXXX">
                    <small>Ejemplo: G-XXXXXXXXXX</small>
                </div>
            </div>

            <div class="analytics-card">
                <h2>🏷️ Google Tag Manager</h2>
                <p>Gestiona todos tus tags de marketing desde un solo lugar</p>

                <div class="form-group">
                    <label for="gtm_id">Google Tag Manager ID</label>
                    <input type="text" id="gtm_id" name="demosle_analytics_settings[gtm_id]" value="<?php echo esc_attr($gtm_id); ?>" placeholder="GTM-XXXXXXX">
                    <small>Ejemplo: GTM-XXXXXXX</small>
                </div>
            </div>

            <div class="analytics-card">
                <h2>🎵 TikTok Pixel</h2>
                <p>Rastrea conversiones de tus campañas en TikTok Ads</p>

                <div class="form-group">
                    <label for="tiktok_pixel_id">TikTok Pixel ID</label>
                    <input type="text" id="tiktok_pixel_id" name="demosle_analytics_settings[tiktok_pixel_id]" value="<?php echo esc_attr($tiktok_pixel_id); ?>" placeholder="XXXXXXXXXXXXXXXXXXXX">
                    <small>Ejemplo: XXXXXXXXXXXXXXXXXXXX</small>
                </div>
            </div>

            <div class="analytics-card">
                <h2>⚙️ Código personalizado</h2>
                <p>Agrega cualquier otro código de seguimiento o script personalizado</p>

                <div class="form-group">
                    <label for="custom_head">Scripts en &lt;head&gt;</label>
                    <textarea id="custom_head" name="demosle_analytics_settings[custom_head]" placeholder="<!-- Tu código aquí -->"><?php echo esc_textarea($custom_head); ?></textarea>
                    <small>Este código se inyectará en el &lt;head&gt; de tu sitio</small>
                </div>

                <div class="form-group">
                    <label for="custom_body">Scripts después de &lt;body&gt;</label>
                    <textarea id="custom_body" name="demosle_analytics_settings[custom_body]" placeholder="<!-- Tu código aquí -->"><?php echo esc_textarea($custom_body); ?></textarea>
                    <small>Este código se inyectará justo después del tag &lt;body&gt;</small>
                </div>
            </div>

            <?php submit_button('Guardar configuración', 'primary submit-button', 'submit', false); ?>
        </form>

        <div class="demosle-promo">
            <div class="demosle-promo-content">
                <span class="promo-badge">Lleva tus campañas al siguiente nivel</span>
                <h3>¿Quieres maximizar el ROI de tus campañas digitales?</h3>
                <p>En Demosle creamos estrategias de publicidad digital medibles en Meta Ads y Google Ads. Optimizamos cada peso invertido para generar resultados reales: más tráfico, más leads, más ventas.</p>

                <a href="https://wa.me/56966354128?text=<?php echo urlencode('¡Hola! Quiero optimizar mis campañas de publicidad digital'); ?>" target="_blank" class="promo-cta">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hablar con un especialista
                </a>

                <p class="promo-footer">🎁 Primera consultoría sin costo · Respuesta en menos de 24 horas</p>
            </div>
        </div>
    </div>

    <?php
}

/**
 * Inject tracking codes
 */
add_action('wp_head', 'demosle_analytics_inject_head_codes', 1);
add_action('wp_body_open', 'demosle_analytics_inject_body_codes', 1);

function demosle_analytics_inject_head_codes() {
    $settings = get_option('demosle_analytics_settings', []);

    // Meta Pixel
    if (!empty($settings['meta_pixel_id'])) {
        $pixel_id = esc_js($settings['meta_pixel_id']);
        echo "\n<!-- Meta Pixel Code (Demosle Analytics) -->\n";
        echo "<script>\n";
        echo "!function(f,b,e,v,n,t,s)\n";
        echo "{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n";
        echo "n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n";
        echo "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n";
        echo "n.queue=[];t=b.createElement(e);t.async=!0;\n";
        echo "t.src=v;s=b.getElementsByTagName(e)[0];\n";
        echo "s.parentNode.insertBefore(t,s)}(window, document,'script',\n";
        echo "'https://connect.facebook.net/en_US/fbevents.js');\n";
        echo "fbq('init', '{$pixel_id}');\n";
        echo "fbq('track', 'PageView');\n";
        echo "</script>\n";
        echo "<noscript><img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://www.facebook.com/tr?id={$pixel_id}&ev=PageView&noscript=1\"/></noscript>\n";
        echo "<!-- End Meta Pixel Code -->\n\n";
    }

    // Google Analytics 4
    if (!empty($settings['ga4_id'])) {
        $ga4_id = esc_attr($settings['ga4_id']);
        echo "<!-- Google Analytics 4 (Demosle Analytics) -->\n";
        echo "<script async src=\"https://www.googletagmanager.com/gtag/js?id={$ga4_id}\"></script>\n";
        echo "<script>\n";
        echo "window.dataLayer = window.dataLayer || [];\n";
        echo "function gtag(){dataLayer.push(arguments);}\n";
        echo "gtag('js', new Date());\n";
        echo "gtag('config', '{$ga4_id}');\n";
        echo "</script>\n";
        echo "<!-- End Google Analytics 4 -->\n\n";
    }

    // Google Tag Manager (Head)
    if (!empty($settings['gtm_id'])) {
        $gtm_id = esc_attr($settings['gtm_id']);
        echo "<!-- Google Tag Manager (Demosle Analytics) -->\n";
        echo "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n";
        echo "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n";
        echo "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n";
        echo "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n";
        echo "})(window,document,'script','dataLayer','{$gtm_id}');</script>\n";
        echo "<!-- End Google Tag Manager -->\n\n";
    }

    // TikTok Pixel
    if (!empty($settings['tiktok_pixel_id'])) {
        $tiktok_id = esc_js($settings['tiktok_pixel_id']);
        echo "<!-- TikTok Pixel Code (Demosle Analytics) -->\n";
        echo "<script>\n";
        echo "!function (w, d, t) {\n";
        echo "  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=[\"page\",\"track\",\"identify\",\"instances\",\"debug\",\"on\",\"off\",\"once\",\"ready\",\"alias\",\"group\",\"enableCookie\",\"disableCookie\"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i=\"https://analytics.tiktok.com/i18n/pixel/events.js\";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement(\"script\");o.type=\"text/javascript\",o.async=!0,o.src=i+\"?sdkid=\"+e+\"&lib=\"+t;var a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(o,a)};\n";
        echo "  ttq.load('{$tiktok_id}');\n";
        echo "  ttq.page();\n";
        echo "}(window, document, 'ttq');\n";
        echo "</script>\n";
        echo "<!-- End TikTok Pixel Code -->\n\n";
    }

    // Custom Head Code
    if (!empty($settings['custom_head'])) {
        echo "\n<!-- Custom Head Code (Demosle Analytics) -->\n";
        echo $settings['custom_head'];
        echo "\n<!-- End Custom Head Code -->\n\n";
    }
}

function demosle_analytics_inject_body_codes() {
    $settings = get_option('demosle_analytics_settings', []);

    // Google Tag Manager (Body)
    if (!empty($settings['gtm_id'])) {
        $gtm_id = esc_attr($settings['gtm_id']);
        echo "\n<!-- Google Tag Manager (noscript) -->\n";
        echo "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id={$gtm_id}\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n";
        echo "<!-- End Google Tag Manager (noscript) -->\n\n";
    }

    // Custom Body Code
    if (!empty($settings['custom_body'])) {
        echo "\n<!-- Custom Body Code (Demosle Analytics) -->\n";
        echo $settings['custom_body'];
        echo "\n<!-- End Custom Body Code -->\n\n";
    }
}
