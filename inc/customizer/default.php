<?php
/**
 * Default theme options.
 *
 * @package Indocar Market
 */

if (!function_exists('indocarmarket_default_theme_options')):

/**
 * Get default theme options
 *
 * @since 1.0.0
 *
 * @return array Default theme options.
 */
function indocarmarket_default_theme_options() {

	$defaults = array();

	//banner section

	//layout
	$defaults['enable_slider_on_home']             = 1;
	$defaults['slide_tag_name']             	   = 'Slider';
	$defaults['slide_number_post']             	   = 3;
	$defaults['enable_button_right_primary_menu']  = 1;
	$defaults['text_right_primary_menu']    = 'Jual Mobil Di sini';
	$defaults['url_right_primary_menu']            = '#';
	$defaults['footer_social_facebook']            = '#';
	$defaults['footer_social_twitter']             = '#';
	$defaults['footer_social_instagram']           = '#';
	$defaults['footer_social_youtube']             = '#';
	
	$defaults['enable_archive_category']           = 1;
	$defaults['enable_archive_post_date']          = 1;
	$defaults['enable_archive_post_by']            = 1;
	$defaults['enable_thumbnail_single_post']      = 1;

	$defaults['sum_post_vehicle']      			   = 10;
	
	$defaults['enable_footer_widget']              = 1;
	//$defaults['url_footer_1']           		   = '';
	//$defaults['url_footer_2']           		   = '';
	$defaults['enable_footer_copyright']           = 1;
	$defaults['enable_footer_copyright']           = 1;
	$defaults['copyright_text']                    = esc_html__('Copyright © 2019 All right reserved', 'indocarmarket');
	
	
	//font and color

    $defaults['primary_color']					= '#0F75BD';
    $defaults['secondary_color']				= '#EECD58';
    //$defaults['tertiary_color']					= '#0336aa';
    
	//$defaults['navbar_color_type']                 = 'dark';
	//$defaults['navbar_bg_color']                   = '#343A40';
	//$defaults['navbar_button_color_type']          = 'success';

	$defaults['footer_bg_first']				   = '#1C3053';
	$defaults['footer_first_font_color']		   = '#FFF';
	$defaults['footer_bg_copyright']			   = '#1C3053';
	$defaults['footer_copyright_font_color']	   = '#FFF';

	$defaults['primary_font']                      = 'Source+Sans+Pro:400,400italic,600,900,300';
	$defaults['secondary_font']                    = 'Source+Sans+Pro:400,400italic,600,900,300';
	$defaults['text_size_body']                    = 16;
	$defaults['text_size_p']                       = 16;
	$defaults['text_size_title_font_list_post']    = 24;
	$defaults['text_size_title_font_post']         = 40;
	$defaults['text_size_meta_font_post']          = 14;

	$defaults['text_size_title_font_list_product'] = 18;
	$defaults['text_size_title_font_product']      = 40;

	// Pass through filter.
	$defaults = apply_filters('indocarmarket_filter_default_theme_options', $defaults);

	return $defaults;

}

endif;