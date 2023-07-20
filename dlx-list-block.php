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
	// Get path to parent block block.json.
	$block_json_path = plugin_dir_path( __FILE__ ) . 'build/blocks/list-block/block.json';
	register_block_type(
		$block_json_path,
		array(
			'render_callback' => __NAMESPACE__ . '\render_list_block',
		)
	);

	// Get path to child block block.json.
	$block_json_path = plugin_dir_path( __FILE__ ) . 'build/blocks/list-item-block/block.json';
	register_block_type(
		$block_json_path,
		array(
			'render_callback' => __NAMESPACE__ . '\render_list_item_block',
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
	ob_start();
	?>
	<ul class="dlx-list-block">
		<?php echo wp_kses_post( $innerblocks_content ); ?>
	</ul>
	<?php
	return ob_get_clean();
}

/**
 * Render list item block.
 *
 * @param array  $attributes          Block attributes.
 * @param string $innerblocks_content Inner blocks content.
 */
function render_list_item_block( $attributes, $innerblocks_content ) {
	ob_start();
	?>
	<li class="dlx-list-item-block">
		<?php echo wp_kses_post( $innerblocks_content ); ?>
	</li>
	<?php
	return ob_get_clean();
}

// Enqueue block editor assets.
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Enqueue block editor assets.
 */
function enqueue_block_editor_assets() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register main script, which registers a handle used in block.json.
	wp_register_script(
		'dlx-list-block-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'dlx-list-block-editor-css',
		plugins_url( 'build/index.css', __FILE__ ),
		array(),
		$asset_file['version'],
		'all'
	);
}
