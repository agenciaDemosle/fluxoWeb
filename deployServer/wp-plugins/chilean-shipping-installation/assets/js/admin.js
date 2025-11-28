/**
 * Chilean Shipping & Installation Manager - Admin Scripts
 * By Demosle.cl
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        // Confirmation for bulk actions
        $('button[name="csi_quick_setup"]').on('click', function(e) {
            if (!confirm('¿Estás seguro de que deseas configurar las zonas automáticamente? Esto eliminará las zonas existentes.')) {
                e.preventDefault();
                return false;
            }
        });

        // Auto-dismiss notices after 5 seconds
        setTimeout(function() {
            $('.notice.is-dismissible').fadeOut();
        }, 5000);
    });

})(jQuery);
