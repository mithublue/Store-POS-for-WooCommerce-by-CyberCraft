<?php
/**
 * Frontend POS loader
 *
 * @package StorePOS\Frontend
 */

namespace StorePOS\Frontend;

class POSFrontend {

    /**
     * Enqueue frontend assets
     */
    public function enqueue_assets() {
        // Only load on POS pages
        if (!$this->is_pos_page()) {
            return;
        }

        // Enqueue POS styles
        wp_enqueue_style(
            'store-pos-frontend',
            STORE_POS_PLUGIN_URL . 'assets/css/pos.css',
            [],
            STORE_POS_VERSION
        );
    }

    /**
     * Check if current page is POS page
     */
    private function is_pos_page() {
        // Add logic to determine if we're on a POS page
        // For now, we'll rely on the admin menu rendering
        return false;
    }
}
