<?php
/**
 * Main plugin file.
 *
 * @package DLXListBlock
 */

/**
 * Plugin Name: DLX List B;lock
 * Plugin URI: https://dlxplugins.com/plugins/
 * Description: A nested list block demonstrating InnerBlocks.
 * Author: DLX Plugins
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.2
 * Author URI: https://dlxplugins.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: dlx-list-block
 */

namespace DLXPlugins\ListBlock;

// Register block types.
add_action( 'init', __NAMESPACE__ . '\register_block_types' );

/**
 * Register block types.
 */
function register_block_types() {
	// Get path to block.json.
	$block_json_path = plugin_dir_path( __FILE__ ) . 'build/blocks/list-block/block.json';
	register_block_type(
		$block_json_path,
		array(
			'render_callback' => __NAMESPACE__ . '\render_list_block',
		)
	);
}

/**
 * Render list block.
 *
 * @param array  $attributes          Block attributes.
 * @param string $innerblocks_content Inner blocks content.
 */
function render_list_block( $attributes, $innerblocks_content ) {
	return 'test content';
}

// Enqueue block editor assets.
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Enqueue block editor assets.
 */
function enqueue_block_editor_assets() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'dlx-list-block-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
}
