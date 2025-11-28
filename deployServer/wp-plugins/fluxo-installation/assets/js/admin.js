/**
 * Fluxo Installation - Admin Scripts
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        // Format number inputs with thousand separators on blur
        $('input[type="number"]').on('blur', function() {
            const value = $(this).val();
            if (value) {
                const formatted = parseInt(value).toLocaleString('es-CL');
                console.log('Costo ingresado:', formatted);
            }
        });

        // Show confirmation before saving
        $('form').on('submit', function(e) {
            const confirmed = confirm('¿Guardar los costos de instalación?');
            if (!confirmed) {
                e.preventDefault();
            }
        });
    });

})(jQuery);
