<?php 
$default = indocarmarket_default_theme_options();

// Add Theme Options Panel.
$wp_customize->add_panel( 'theme_color_typo',
	array(
		'title'      => __( 'Huruf dan Warna', 'indocarmarket' ),
		'priority'   => 40,
		'capability' => 'edit_theme_options',
	)
);

// font Section.
$wp_customize->add_section( 'font_typo_section',
	array(
		'title'      => __( 'Fonts & Typography', 'indocarmarket' ),
		'priority'   => 100,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_color_typo',
	)
);

// Color Section.
$wp_customize->add_section( 'colors',
	array(
		'title'      => __( 'Warna Utama', 'indocarmarket' ),
		'priority'   => 100,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_color_typo',
	)
);

// Header Section.
/*$wp_customize->add_section( 'header_colors',
	array(
		'title'      => __( 'Warna Header (Menu)', 'indocarmarket' ),
		'priority'   => 100,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_color_typo',
	)
);*/

// Footer Section.
$wp_customize->add_section( 'footer_colors',
	array(
		'title'      => __( 'Warna Footer', 'indocarmarket' ),
		'priority'   => 100,
		'capability' => 'edit_theme_options',
		'panel'      => 'theme_color_typo',
	)
);

// Setting - primary_color.
$wp_customize->add_setting( 'primary_color',
	array(
		'default'           => $default['primary_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'primary_color',
		array(
			'label'   => __( 'Warna Primary (Utama)', 'indocarmarket' ),
			'section' => 'colors',
			'priority' => 100,
		)
	)
);


// Setting - secondary_color.
$wp_customize->add_setting( 'secondary_color',
	array(
		'default'           => $default['secondary_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'secondary_color',
		array(
			'label'   => __( 'Warna Secondary', 'indocarmarket' ),
			'section' => 'colors',
			'priority' => 100,
		)
	)
);


// Setting - tertiary_color.
/*$wp_customize->add_setting( 'tertiary_color',
	array(
		'default'           => $default['tertiary_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'tertiary_color',
		array(
			'label'   => __( 'Warna Tertiary', 'indocarmarket' ),
			'section' => 'colors',
			'priority' => 100,
		)
	)
);

// Setting - navbar_color_type.
$wp_customize->add_setting( 'navbar_color_type',
	array(
		'default'           => $default['navbar_color_type'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_select',
	)
);
$wp_customize->add_control( 'navbar_color_type',
	array(
		'label'    => __( 'Tipe Warna Font Menu Header', 'indocarmarket' ),
		'section'  => 'header_colors',
		'choices'        => array(
			'dark'  => esc_html__('Terang', 'indocarmarket'),
			'light' => esc_html__('Gelap', 'indocarmarket'),
		),
		'type'     => 'select',
		'priority' => 100,
	)
);

// Setting - navbar_bg_color.
$wp_customize->add_setting( 'navbar_bg_color',
	array(
		'default'           => $default['navbar_bg_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);
$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'navbar_bg_color',
		array(
			'label'   => __( 'Warna Background Menu Header', 'indocarmarket' ),
			'section' => 'header_colors',
			'priority' => 100,
		)
	)
);

// Setting - navbar_button_color_type.
$wp_customize->add_setting( 'navbar_button_color_type',
	array(
		'default'           => $default['navbar_button_color_type'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_select',
	)
);
$wp_customize->add_control( 'navbar_button_color_type',
	array(
		'label'    => __( 'Tipe Warna Tombol Pencarian', 'indocarmarket' ),
		'section'  => 'header_colors',
		'choices'        => array(
			'primary'  => esc_html__('Primary', 'indocarmarket'),
			'secondary' => esc_html__('Secondary', 'indocarmarket'),
			'success'  => esc_html__('Success', 'indocarmarket'),
			'danger' => esc_html__('Danger', 'indocarmarket'),
			'warning'  => esc_html__('Warning', 'indocarmarket'),
			'info' => esc_html__('Info', 'indocarmarket'),
			'light'  => esc_html__('Light', 'indocarmarket'),
			'dark' => esc_html__('Dark', 'indocarmarket'),
		),
		'type'     => 'select',
		'priority' => 100,
	)
);*/

// Footer First Settings.
$wp_customize->add_setting( 'footer_bg_first',
	array(
		'default'           => $default['footer_bg_first'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);

$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_bg_first',
		array(
			'label'    => __( 'Warna Background Footer Atas', 'indocarmarket' ),
			'section' => 'footer_colors',
			'priority' => 100,
		)
	)
);

$wp_customize->add_setting( 'footer_first_font_color',
	array(
		'default'           => $default['footer_first_font_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);

$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_first_font_color',
		array(
			'label'   => __( 'Warna Font Footer Atas', 'indocarmarket' ),
			'section' => 'footer_colors',
			'priority' => 100,
		)
	)
);

// Footer Copyright settings 
$wp_customize->add_setting( 'footer_bg_copyright',
	array(
		'default'           => $default['footer_bg_copyright'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);

$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_bg_copyright',
		array(
			'label'   => __( 'Warna Background Footer Copyright', 'indocarmarket' ),
			'section' => 'footer_colors',
			'priority' => 100,
		)
	)
);

$wp_customize->add_setting( 'footer_copyright_font_color',
	array(
		'default'           => $default['footer_copyright_font_color'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'sanitize_hex_color',
	)
);

$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'footer_copyright_font_color',
		array(
			'label'   => __( 'Warna Font Footer Copyright', 'indocarmarket' ),
			'section' => 'footer_colors',
			'priority' => 100,
		)
	)
);


global $indocarmarket_google_fonts;

// Setting - primary_font.
$wp_customize->add_setting( 'primary_font',
	array(
		'default'           => $default['primary_font'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_select',
	)
);
$wp_customize->add_control( 'primary_font',
	array(
		'label'    => __( 'Primary Font', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'select',
		'choices'     => $indocarmarket_google_fonts,
		'priority' => 100,
	)
);

// Setting - secondary_font.
$wp_customize->add_setting( 'secondary_font',
	array(
		'default'           => $default['secondary_font'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_select',
	)
);
$wp_customize->add_control( 'secondary_font',
	array(
		'label'    => __( 'Secondary Font', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'select',
		'choices'     => $indocarmarket_google_fonts,
		'priority' => 110,
	)
);


// Setting - text_size_body.
$wp_customize->add_setting( 'text_size_body',
	array(
		'default'           => $default['text_size_body'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_body',
	array(
		'label'    => __( 'Ukuran Font Body (Umum)', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_p.
$wp_customize->add_setting( 'text_size_p',
	array(
		'default'           => $default['text_size_p'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_p',
	array(
		'label'    => __( 'Ukuran Font P (Deskripsi)', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_title_font_list_post.
$wp_customize->add_setting( 'text_size_title_font_list_post',
	array(
		'default'           => $default['text_size_title_font_list_post'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_title_font_list_post',
	array(
		'label'    => __( 'Ukuran Font Judul List Pos (Blog)', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_title_font_post.
$wp_customize->add_setting( 'text_size_title_font_post',
	array(
		'default'           => $default['text_size_title_font_post'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_title_font_post',
	array(
		'label'    => __( 'Ukuran Font Judul Pos', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_meta_font_post.
$wp_customize->add_setting( 'text_size_meta_font_post',
	array(
		'default'           => $default['text_size_meta_font_post'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_meta_font_post',
	array(
		'label'    => __( 'Ukuran Font Meta Pos', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_title_font_list_product.
$wp_customize->add_setting( 'text_size_title_font_list_product',
	array(
		'default'           => $default['text_size_title_font_list_product'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_title_font_list_product',
	array(
		'label'    => __( 'Ukuran Font Judul List Produk', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);


// Setting - text_size_title_font_product.
$wp_customize->add_setting( 'text_size_title_font_product',
	array(
		'default'           => $default['text_size_title_font_product'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'indocarmarket_sanitize_positive_integer',
	)
);
$wp_customize->add_control( 'text_size_title_font_product',
	array(
		'label'    => __( 'Ukuran Font Judul Produk', 'indocarmarket' ),
		'section'  => 'font_typo_section',
		'type'     => 'number',
		'priority' => 120,
		'input_attrs'     => array( 'min' => 1, 'max' => 100, 'style' => 'width: 150px;' ),
	)
);