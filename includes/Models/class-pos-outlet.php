<?php
/**
 * Outlet model
 *
 * @package StorePOS\Models
 */

namespace StorePOS\Models;

class Outlet {

    /**
     * Create a new outlet
     */
    public static function create($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        $defaults = [
            'name' => '',
            'slug' => '',
            'address' => '',
            'phone' => '',
            'timezone' => 'UTC',
            'manager_user_id' => null,
            'status' => 'active'
        ];

        $data = wp_parse_args($data, $defaults);

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = sanitize_title($data['name']);
        }

        // Ensure unique slug
        $data['slug'] = self::generate_unique_slug($data['slug']);

        $inserted = $wpdb->insert(
            $table,
            [
                'name' => sanitize_text_field($data['name']),
                'slug' => $data['slug'],
                'address' => sanitize_textarea_field($data['address']),
                'phone' => sanitize_text_field($data['phone']),
                'timezone' => sanitize_text_field($data['timezone']),
                'manager_user_id' => absint($data['manager_user_id']) ?: null,
                'status' => sanitize_text_field($data['status']),
            ],
            ['%s', '%s', '%s', '%s', '%s', '%d', '%s']
        );

        if ($inserted) {
            $outlet_id = $wpdb->insert_id;
            Logger::log('outlet_created', 'outlet', $outlet_id, "Created outlet: {$data['name']}");
            return $outlet_id;
        }

        return false;
    }

    /**
     * Get outlet by ID
     */
    public static function get($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE id = %d",
            $id
        ));
    }

    /**
     * Get outlet by slug
     */
    public static function get_by_slug($slug) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE slug = %s",
            $slug
        ));
    }

    /**
     * Get all outlets
     */
    public static function get_all($args = []) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        $defaults = [
            'status' => 'active',
            'orderby' => 'name',
            'order' => 'ASC'
        ];

        $args = wp_parse_args($args, $defaults);

        $where = ['1=1'];
        $where_values = [];

        if ($args['status']) {
            $where[] = 'status = %s';
            $where_values[] = $args['status'];
        }

        $where_clause = implode(' AND ', $where);
        $orderby = sanitize_sql_orderby("{$args['orderby']} {$args['order']}");

        $query = "SELECT * FROM $table WHERE $where_clause ORDER BY $orderby";

        if (!empty($where_values)) {
            $query = $wpdb->prepare($query, $where_values);
        }

        return $wpdb->get_results($query);
    }

    /**
     * Update outlet
     */
    public static function update($id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        $allowed_fields = ['name', 'slug', 'address', 'phone', 'timezone', 'manager_user_id', 'status'];
        $update_data = [];
        $format = [];

        foreach ($allowed_fields as $field) {
            if (isset($data[$field])) {
                if ($field === 'slug') {
                    $update_data[$field] = self::generate_unique_slug(sanitize_title($data[$field]), $id);
                    $format[] = '%s';
                } elseif ($field === 'manager_user_id') {
                    $update_data[$field] = absint($data[$field]) ?: null;
                    $format[] = '%d';
                } elseif ($field === 'address') {
                    $update_data[$field] = sanitize_textarea_field($data[$field]);
                    $format[] = '%s';
                } else {
                    $update_data[$field] = sanitize_text_field($data[$field]);
                    $format[] = '%s';
                }
            }
        }

        if (empty($update_data)) {
            return false;
        }

        $updated = $wpdb->update(
            $table,
            $update_data,
            ['id' => $id],
            $format,
            ['%d']
        );

        if ($updated !== false) {
            Logger::log('outlet_updated', 'outlet', $id, "Updated outlet ID: $id");
            return true;
        }

        return false;
    }

    /**
     * Delete outlet
     */
    public static function delete($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        // Check if outlet has drawers
        $drawers_table = $wpdb->prefix . 'wc_pos_drawers';
        $has_drawers = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $drawers_table WHERE outlet_id = %d",
            $id
        ));

        if ($has_drawers > 0) {
            return new \WP_Error('outlet_has_drawers', __('Cannot delete outlet with existing drawers.', 'store-pos'));
        }

        $deleted = $wpdb->delete($table, ['id' => $id], ['%d']);

        if ($deleted) {
            Logger::log('outlet_deleted', 'outlet', $id, "Deleted outlet ID: $id");
            return true;
        }

        return false;
    }

    /**
     * Generate unique slug
     */
    private static function generate_unique_slug($slug, $exclude_id = null) {
        global $wpdb;
        $table = $wpdb->prefix . 'wc_pos_outlets';

        $original_slug = $slug;
        $counter = 1;

        while (true) {
            $query = "SELECT COUNT(*) FROM $table WHERE slug = %s";
            $params = [$slug];

            if ($exclude_id) {
                $query .= " AND id != %d";
                $params[] = $exclude_id;
            }

            $exists = $wpdb->get_var($wpdb->prepare($query, $params));

            if (!$exists) {
                break;
            }

            $slug = $original_slug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Get outlet statistics
     */
    public static function get_stats($outlet_id) {
        global $wpdb;

        // Get drawer count
        $drawers_table = $wpdb->prefix . 'wc_pos_drawers';
        $drawer_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $drawers_table WHERE outlet_id = %d",
            $outlet_id
        ));

        // Get active sessions count
        $sessions_table = $wpdb->prefix . 'wc_pos_sessions';
        $active_sessions = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $sessions_table WHERE outlet_id = %d AND ended_at IS NULL",
            $outlet_id
        ));

        return [
            'drawer_count' => (int)$drawer_count,
            'active_sessions' => (int)$active_sessions
        ];
    }
}
