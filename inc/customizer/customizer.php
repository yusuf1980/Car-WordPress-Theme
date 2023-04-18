<?php

/**
 * Indocar Market Theme Customizer.
 *
 * @package Indocar Market
 */

//customizer core option
require get_template_directory().'/inc/customizer/core/customizer-core.php';

//customizer default
require get_template_directory().'/inc/customizer/default.php';

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function indocarmarket_customize_register($wp_customize) {
	// Load custom controls.
	require get_template_directory().'/inc/customizer/core/control.php';

	// Load customize sanitize.
	require get_template_directory().'/inc/customizer/core/sanitize.php';

	$wp_customize->get_setting('blogname')->transport        = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport = 'postMessage';

	/*front page section details*/
	//require get_template_directory().'/inc/customizer/banner-section.php';

	/*theme option panel details*/
	require get_template_directory().'/inc/customizer/theme-option.php';
	/*color typo panel details*/
	require get_template_directory() . '/inc/customizer/color-typo.php';
	
}
add_action('customize_register', 'indocarmarket_customize_register');


/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */
function indocarmarket_customize_preview_js() {

	wp_enqueue_script('indocarmarket_customizer', get_template_directory_uri().'/assets/admin/js/customizer.js', array('customize-preview'), '20130508', true);

}

add_action('customize_preview_init', 'indocarmarket_customize_preview_js');

function indocarmarket_customizer_css() {
	wp_enqueue_script('indocarmarket_customize_controls', get_template_directory_uri().'/assets/admin/js/customizer-admin.js', array('customize-controls'));
}
add_action('customize_controls_enqueue_scripts', 'indocarmarket_customizer_css', 0);