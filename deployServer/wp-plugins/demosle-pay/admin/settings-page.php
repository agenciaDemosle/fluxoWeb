<?php
/**
 * Admin Settings Page
 *
 * @package Demosle_Pay
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Demosle_Pay_Admin {

    /**
     * Add admin menu
     */
    public static function add_menu() {
        add_menu_page(
            'Demosle Pay',
            'Demosle Pay',
            'manage_options',
            'demosle-pay',
            [__CLASS__, 'render_settings_page'],
            'dashicons-money-alt',
            56
        );
    }

    /**
     * Register settings
     */
    public static function register_settings() {
        register_setting('demosle_pay_settings_group', 'demosle_pay_settings');
    }

    /**
     * Render settings page
     */
    public static function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        // Save settings
        if (isset($_POST['demosle_pay_save'])) {
            check_admin_referer('demosle_pay_settings_nonce');

            $settings = [
                'bank_name' => sanitize_text_field($_POST['bank_name'] ?? ''),
                'account_type' => sanitize_text_field($_POST['account_type'] ?? ''),
                'account_number' => sanitize_text_field($_POST['account_number'] ?? ''),
                'account_holder' => sanitize_text_field($_POST['account_holder'] ?? ''),
                'rut' => sanitize_text_field($_POST['rut'] ?? ''),
                'email' => sanitize_email($_POST['email'] ?? ''),
                'phone' => sanitize_text_field($_POST['phone'] ?? ''),
                'instructions' => sanitize_textarea_field($_POST['instructions'] ?? ''),
            ];

            update_option('demosle_pay_settings', $settings);
            echo '<div class="notice notice-success"><p>Configuración guardada exitosamente.</p></div>';
        }

        $settings = get_option('demosle_pay_settings', []);
        $api_url = rest_url('demosle-pay/v1/bank-details');
        ?>

        <div class="wrap">
            <h1>⚙️ Configuración de Demosle Pay</h1>
            <p class="description">Configure los datos bancarios para transferencias que se mostrarán a los clientes.</p>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>📋 Datos Bancarios</h2>

                <form method="post" action="">
                    <?php wp_nonce_field('demosle_pay_settings_nonce'); ?>

                    <table class="form-table">
                        <tr>
                            <th scope="row"><label for="bank_name">Banco</label></th>
                            <td>
                                <select name="bank_name" id="bank_name" class="regular-text">
                                    <option value="Banco de Chile" <?php selected($settings['bank_name'] ?? '', 'Banco de Chile'); ?>>Banco de Chile</option>
                                    <option value="Banco Estado" <?php selected($settings['bank_name'] ?? '', 'Banco Estado'); ?>>Banco Estado</option>
                                    <option value="Banco Santander" <?php selected($settings['bank_name'] ?? '', 'Banco Santander'); ?>>Banco Santander</option>
                                    <option value="BCI" <?php selected($settings['bank_name'] ?? '', 'BCI'); ?>>BCI</option>
                                    <option value="Banco Scotiabank" <?php selected($settings['bank_name'] ?? '', 'Banco Scotiabank'); ?>>Banco Scotiabank</option>
                                    <option value="Banco Itaú" <?php selected($settings['bank_name'] ?? '', 'Banco Itaú'); ?>>Banco Itaú</option>
                                    <option value="Banco Security" <?php selected($settings['bank_name'] ?? '', 'Banco Security'); ?>>Banco Security</option>
                                    <option value="Banco Falabella" <?php selected($settings['bank_name'] ?? '', 'Banco Falabella'); ?>>Banco Falabella</option>
                                    <option value="Banco Ripley" <?php selected($settings['bank_name'] ?? '', 'Banco Ripley'); ?>>Banco Ripley</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="account_type">Tipo de Cuenta</label></th>
                            <td>
                                <select name="account_type" id="account_type" class="regular-text">
                                    <option value="Cuenta Corriente" <?php selected($settings['account_type'] ?? '', 'Cuenta Corriente'); ?>>Cuenta Corriente</option>
                                    <option value="Cuenta Vista" <?php selected($settings['account_type'] ?? '', 'Cuenta Vista'); ?>>Cuenta Vista</option>
                                    <option value="Cuenta de Ahorro" <?php selected($settings['account_type'] ?? '', 'Cuenta de Ahorro'); ?>>Cuenta de Ahorro</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="account_number">Número de Cuenta</label></th>
                            <td>
                                <input type="text" name="account_number" id="account_number" value="<?php echo esc_attr($settings['account_number'] ?? ''); ?>" class="regular-text" placeholder="12345678-9" required>
                                <p class="description">Número de cuenta bancaria</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="account_holder">Titular de la Cuenta</label></th>
                            <td>
                                <input type="text" name="account_holder" id="account_holder" value="<?php echo esc_attr($settings['account_holder'] ?? ''); ?>" class="regular-text" placeholder="Empresa SpA" required>
                                <p class="description">Nombre o razón social del titular</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="rut">RUT</label></th>
                            <td>
                                <input type="text" name="rut" id="rut" value="<?php echo esc_attr($settings['rut'] ?? ''); ?>" class="regular-text" placeholder="76.XXX.XXX-X" required>
                                <p class="description">RUT del titular de la cuenta</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="email">Email de Pagos</label></th>
                            <td>
                                <input type="email" name="email" id="email" value="<?php echo esc_attr($settings['email'] ?? ''); ?>" class="regular-text" placeholder="pagos@empresa.cl" required>
                                <p class="description">Email donde recibir comprobantes de pago</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="phone">WhatsApp</label></th>
                            <td>
                                <input type="text" name="phone" id="phone" value="<?php echo esc_attr($settings['phone'] ?? ''); ?>" class="regular-text" placeholder="+56912345678">
                                <p class="description">Número de WhatsApp para recibir comprobantes (incluir +56)</p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><label for="instructions">Instrucciones</label></th>
                            <td>
                                <textarea name="instructions" id="instructions" rows="4" class="large-text"><?php echo esc_textarea($settings['instructions'] ?? ''); ?></textarea>
                                <p class="description">Instrucciones adicionales para el cliente</p>
                            </td>
                        </tr>
                    </table>

                    <p class="submit">
                        <button type="submit" name="demosle_pay_save" class="button button-primary">Guardar Configuración</button>
                    </p>
                </form>
            </div>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>🔌 Endpoint API</h2>
                <p>Los datos están disponibles en el siguiente endpoint REST:</p>
                <code style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; margin: 10px 0;">
                    GET <?php echo esc_url($api_url); ?>
                </code>
                <p class="description">Este endpoint es público y puede ser consumido por tu frontend para mostrar los datos bancarios.</p>

                <button type="button" class="button" onclick="testAPI()">Probar API</button>
                <div id="api-response" style="margin-top: 10px;"></div>
            </div>
        </div>

        <script>
        function testAPI() {
            const responseDiv = document.getElementById('api-response');
            responseDiv.innerHTML = '<p>Cargando...</p>';

            fetch('<?php echo esc_js($api_url); ?>')
                .then(response => response.json())
                .then(data => {
                    responseDiv.innerHTML = '<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;">' +
                        JSON.stringify(data, null, 2) +
                        '</pre>';
                })
                .catch(error => {
                    responseDiv.innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
                });
        }
        </script>

        <style>
        .card {
            background: white;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 4px;
        }
        .card h2 {
            margin-top: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        </style>
        <?php
    }
}
