<?php
/**
 * Theme Options Panel.
 *
 * @package Indocar Market
 */

$default = indocarmarket_default_theme_options();

$wp_customize->add_panel('theme_option_panel',
	array(
		'title'      => esc_html__('Pengaturan Tema', 'indocarmarket'),
		'priority'   => 200,
		'capability' => 'edit_theme_options',
	)
);


// Logo Section
$wp_customize->add_section( 'custom_logo' , array(
    'title'      => __( 'Custom Logo', 'indocarmarket' ),
    'priority'   => 10,
	'panel'      => 'theme_option_panel',
) );

$wp_customize->add_setting('custom_logo_1');

$wp_customize->add_control(
	new WP_Customize_Image_Control(
    	$wp_customize,
        'custom_logo_1',
        array(
        	'label'      => __( 'Logo Putih', 'indocarmarket' ),
            'section'    => 'custom_logo',
            'settings'   => 'custom_logo_1' 
        )
    )
);

$wp_customize->add_setting('custom_logo_2');

$wp_customize->add_control(
	new WP_Customize_Image_Control(
    	$wp_customize,
        'custom_logo_2',
        array(
        	'label'      => __( 'Logo Asli', 'indocarmarket' ),
            'section'    => 'custom_logo',
            'settings'   => 'custom_logo_2' 
        )
    )
);

// Pengaturan Header
$wp_customize->add_section('enable_button_right_menu_setting',
	array(
		'title'      => esc_html__('Tombol Kanan Menu (Atas)', 'indocarmarket'),
		'priority'   => 10,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_option_panel',
	)
);

$wp_customize->add_setting('enable_button_right_primary_menu',
	array(
		'default'           => $default['enable_button_right_primary_menu'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_button_right_primary_menu',
	array(
		'label'    => esc_html__('Aktifkan Tombol Kanan Menu', 'indocarmarket'),
		'section'  => 'enable_button_right_menu_setting',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);
$wp_customize->add_setting('text_right_primary_menu',
	array(
		'default'           => $default['text_right_primary_menu'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('text_right_primary_menu',
	array(
		'label'    => esc_html__('Teks pada tombol', 'indocarmarket'),
		'section'  => 'enable_button_right_menu_setting',
		'type'     => 'text',
		'priority' => 150,
	)
);
$wp_customize->add_setting('url_right_primary_menu',
	array(
		'default'           => $default['url_right_primary_menu'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('url_right_primary_menu',
	array(
		'label'    => esc_html__('URL pada tombol', 'indocarmarket'),
		'section'  => 'enable_button_right_menu_setting',
		'type'     => 'text',
		'priority' => 150,
	)
);

// Slider Home
$wp_customize->add_section('slider_section_settings',
	array(
		'title'      => esc_html__('Slider Home', 'indocarmarket'),
		'priority'   => 10,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_option_panel',
	)
);

$wp_customize->add_setting('enable_slider_on_home',
	array(
		'default'           => $default['enable_slider_on_home'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_slider_on_home',
	array(
		'label'    => esc_html__('Aktifkan Slider di Home', 'indocarmarket'),
		'section'  => 'slider_section_settings',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);

$wp_customize->add_setting('slide_tag_name',
	array(
		'default'           => $default['slide_tag_name'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('slide_tag_name',
	array(
		'label'    => esc_html__('Nama Tag di Pos', 'indocarmarket'),
		'section'  => 'slider_section_settings',
		'type'     => 'text',
		'priority' => 150,
	)
);

$wp_customize->add_setting( 'slide_number_post',
	array(
		'default'           => $default['slide_number_post'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'slide_number_post',
	array(
		'label'    => __( 'Jumlah Slide', 'indocarmarket' ),
		'section'  => 'slider_section_settings',
		'type'     => 'number',
		'priority' => 150,
		'input_attrs'     => array( 'min' => 1, 'max' => 10, 'style' => 'width: 150px;' ),
	)
);

/*$wp_customize->add_setting('show_star',
	array(
		'default'           => $default['show_star'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('show_star',
	array(
		'label'    => esc_html__('Aktifkan Bintang', 'indocarmarket'),
		'section'  => 'slider_section_settings',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);*/

/*$wp_customize->add_setting('show_slider_title',
	array(
		'default'           => $default['show_slider_title'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('show_slider_title',
	array(
		'label'    => esc_html__('Aktifkan Judul Slider', 'indocarmarket'),
		'section'  => 'slider_section_settings',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);

$wp_customize->add_setting('enable_title_site_on_header',
	array(
		'default'           => $default['enable_title_site_on_header'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_title_site_on_header',
	array(
		'label'    => esc_html__('Aktifkan Judul Site di Header', 'indocarmarket'),
		'section'  => 'side_panel_section_settings',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);

$wp_customize->add_setting('enable_search_on_header',
	array(
		'default'           => $default['enable_search_on_header'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_search_on_header',
	array(
		'label'    => esc_html__('Aktifkan Pencarian di Header', 'indocarmarket'),
		'section'  => 'side_panel_section_settings',
		'type'     => 'checkbox',
		'priority' => 150,
	)
);
*/

//layout management section start 
$wp_customize->add_section('theme_option_section_settings',
	array(
		'title'      => esc_html__('Tampilan Blog', 'indocarmarket'),
		'priority'   => 100,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_option_panel',
	)
);

$wp_customize->add_setting( 'sum_post_vehicle',
	array(
		'default'           => $default['sum_post_vehicle'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'sum_post_vehicle',
	array(
		'label'    => __( 'Jumlah Mobil Per Halaman', 'indocarmarket' ),
		'section'  => 'theme_option_section_settings',
		'type'     => 'number',
		'priority' => 150,
		'input_attrs'     => array( 'min' => 1, 'max' => 50, 'style' => 'width: 150px;' ),
	)
);

$wp_customize->add_setting('enable_archive_post_date',
	array(
		'default'           => $default['enable_archive_post_date'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_archive_post_date',
	array(
		'label'    => esc_html__('Aktifkan Tanggal di list blog (Archive)', 'indocarmarket'),
		'section'  => 'theme_option_section_settings',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

$wp_customize->add_setting('enable_archive_post_by',
	array(
		'default'           => $default['enable_archive_post_by'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_archive_post_by',
	array(
		'label'    => esc_html__('Aktifkan Penulis di list blog (Archive)', 'indocarmarket'),
		'section'  => 'theme_option_section_settings',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

$wp_customize->add_setting('enable_archive_category',
	array(
		'default'           => $default['enable_archive_category'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_archive_category',
	array(
		'label'    => esc_html__('Aktifkan info kategori di list blog', 'indocarmarket'),
		'section'  => 'theme_option_section_settings',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

$wp_customize->add_setting('enable_thumbnail_single_post',
	array(
		'default'           => $default['enable_thumbnail_single_post'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_thumbnail_single_post',
	array(
		'label'    => esc_html__('Aktifkan Thumbnail di Single Pos', 'indocarmarket'),
		'section'  => 'theme_option_section_settings',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

// Footer Section.
$wp_customize->add_section('footer_section',
	array(
		'title'      => esc_html__('Pengaturan Footer (Kaki)', 'indocarmarket'),
		'priority'   => 130,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_option_panel',
	)
);

$wp_customize->add_setting('enable_footer_widget',
	array(
		'default'           => $default['enable_footer_widget'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_footer_widget',
	array(
		'label'    => esc_html__('Aktifkan Footer Widget', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

$wp_customize->add_setting('enable_footer_copyright',
	array(
		'default'           => $default['enable_footer_copyright'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_checkbox',
	)
);
$wp_customize->add_control('enable_footer_copyright',
	array(
		'label'    => esc_html__('Aktifkan Copyright Footer', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'checkbox',
		'priority' => 175,
	)
);

// Setting copyright_text.
$wp_customize->add_setting('copyright_text',
	array(
		'default'           => $default['copyright_text'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('copyright_text',
	array(
		'label'    => esc_html__('Teks Copyright Footer', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 120,
	)
);

// Setting URL Footer.
/*$wp_customize->add_setting('text_url_footer_1',
	array(
		'default'           => $default['text_url_footer_1'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('text_url_footer_1',
	array(
		'label'    => esc_html__('Teks URL Footer I', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 120,
	)
);
$wp_customize->add_setting('url_footer_1',
	array(
		'default'           => $default['url_footer_1'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('url_footer_1',
	array(
		'label'    => esc_html__('URL Footer I', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 120,
	)
);

// Setting URL Footer.
$wp_customize->add_setting('text_url_footer_2',
	array(
		'default'           => $default['text_url_footer_1'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('text_url_footer_2',
	array(
		'label'    => esc_html__('Teks URL Footer II', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 120,
	)
);
$wp_customize->add_setting('url_footer_2',
	array(
		'default'           => $default['url_footer_2'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('url_footer_2',
	array(
		'label'    => esc_html__('URL Footer II', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 120,
	)
);*/


// Social Footer
$wp_customize->add_setting('footer_social_facebook',
	array(
		'default'           => $default['footer_social_facebook'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('footer_social_facebook',
	array(
		'label'    => esc_html__('URL Halaman Facebook', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 180,
	)
);
$wp_customize->add_setting('footer_social_twitter',
	array(
		'default'           => $default['footer_social_twitter'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('footer_social_twitter',
	array(
		'label'    => esc_html__('URL Twitter', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 180,
	)
);
$wp_customize->add_setting('footer_social_instagram',
	array(
		'default'           => $default['footer_social_instagram'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('footer_social_instagram',
	array(
		'label'    => esc_html__('URL Instagram', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 180,
	)
);
$wp_customize->add_setting('footer_social_youtube',
	array(
		'default'           => $default['footer_social_youtube'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('footer_social_youtube',
	array(
		'label'    => esc_html__('URL Youtube', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'text',
		'priority' => 180,
	)
);
// Aplikasi Information
/*$wp_customize->add_setting('app_footer_store',
	array(
		'default'           => $default['app_footer_store'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_text_field',
	)
);
$wp_customize->add_control('app_footer_store',
	array(
		'label'    => esc_html__('Informasi Aplikasi Store', 'indocarmarket'),
		'section'  => 'footer_section',
		'type'     => 'textarea',
		'priority' => 180,
	)
);*/