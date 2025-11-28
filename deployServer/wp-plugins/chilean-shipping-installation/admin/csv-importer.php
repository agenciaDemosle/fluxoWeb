<?php
/**
 * CSV Importer
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_CSV_Importer {

    /**
     * Render CSV import page
     */
    public static function render() {
        ?>
        <div class="wrap">
            <h1>Importar Costos desde Planilla</h1>
            <p class="description">Descarga la plantilla, rellénala con tus costos y súbela.</p>

            <div class="card" style="max-width: 800px;">
                <h2>📥 Paso 1: Descarga la Plantilla</h2>
                <p>Descarga la plantilla con todas las regiones de Chile pre-cargadas. Elige el formato que prefieras:</p>

                <div style="display: flex; gap: 15px; margin: 20px 0; flex-wrap: wrap;">
                    <a href="<?php echo CSI_PLUGIN_URL . 'templates/shipping-template.xls'; ?>"
                       class="button button-primary button-hero"
                       download="costos-envio-chile.xls"
                       style="flex: 1; min-width: 200px; text-align: center;">
                        📊 Descargar Excel (.xls)
                    </a>
                    <a href="<?php echo CSI_PLUGIN_URL . 'templates/shipping-template.csv'; ?>"
                       class="button button-secondary button-hero"
                       download="costos-envio-chile.csv"
                       style="flex: 1; min-width: 200px; text-align: center;">
                        📄 Descargar CSV
                    </a>
                </div>

                <div style="background: #e7f3ff; border-left: 4px solid #0073aa; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>💡 Recomendado:</strong> Usa el formato Excel (.xls) para editar más fácilmente. También puedes abrirlo con Google Sheets o LibreOffice.</p>
                </div>
            </div>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>✏️ Paso 2: Edita los Costos</h2>
                <p>La plantilla incluye estas columnas:</p>
                <table class="widefat" style="margin: 15px 0;">
                    <thead>
                        <tr>
                            <th>Columna</th>
                            <th>Descripción</th>
                            <th>Ejemplo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>region</code></td>
                            <td>Código de región (NO modificar)</td>
                            <td>RM, VS, BI</td>
                        </tr>
                        <tr>
                            <td><code>nombre_zona</code></td>
                            <td>Nombre de la región (NO modificar)</td>
                            <td>Región Metropolitana</td>
                        </tr>
                        <tr>
                            <td><code>costo_envio</code></td>
                            <td><strong>Costo de envío en pesos</strong> (modificar este)</td>
                            <td>0, 5000, 8000</td>
                        </tr>
                    </tbody>
                </table>

                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>⚠️ Importante:</strong> Solo modifica la columna "costo_envio". No cambies los códigos de región ni elimines filas.</p>
                </div>
            </div>

            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>📤 Paso 3: Sube el Archivo</h2>
                <form method="post" enctype="multipart/form-data">
                    <?php wp_nonce_field('csi_csv_import'); ?>

                    <table class="form-table">
                        <tr>
                            <th scope="row">Archivo</th>
                            <td>
                                <input type="file" name="csv_file" accept=".csv,.xlsx,.xls" required style="margin-bottom: 10px;">
                                <p class="description">Acepta CSV, Excel (.xlsx) o .xls</p>
                            </td>
                        </tr>
                    </table>

                    <p class="submit">
                        <button type="submit" name="csi_import_csv" class="button button-primary button-large">
                            ⬆️ Importar Costos
                        </button>
                    </p>
                </form>
            </div>

            <p style="margin-top: 30px;">
                <a href="<?php echo admin_url('admin.php?page=chilean-shipping'); ?>">&larr; Volver a Configuración</a>
            </p>
        </div>
        <?php
    }
}
