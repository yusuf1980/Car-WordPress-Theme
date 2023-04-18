<?php
/**
 * Mobilcar Market functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package Mobilcar Market
 */

/*if ( version_compare( $GLOBALS['wp_version'], '5.2-2', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}*/
if ( ! function_exists( 'indocarmarket_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 *
	 * Create your own twentysixteen_setup() function to override in a child theme.
	 *
	 * @since Indocar Market 1.0
	 */
	function indocarmarket_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/twentysixteen
		 * If you're building a theme based on Twenty Sixteen, use a find and replace
		 * to change 'indocarmarket' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'indocarmarket' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for custom logo.
		 *
		 *  @since Twenty Sixteen 1.2
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 50,
				'width'       => 235,
				'flex-height' => true,
			)
		);

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'indocar-post-home-big', 650, 434, true );
		add_image_size( 'indocar-post-home-small', 520, 347, true );
		add_image_size( 'indocar-slider-thumbnail', 1366, 600, true );
		add_image_size( 'indocar-special_thumbnail', 284, 190, true );
		add_image_size( 'indocar-product_thumbnail', 784, 524, true );
		add_image_size( 'indocar-post-thumbnail', 578, 384, true );
		//add_image_size( 'indocar-product_thumbnail', 384, 226, true ); //real 384x216
		//add_image_size( 'indocar-special_thumbnail', 454, 454, true );
		//add_image_size( 'indocar-post-thumbnail', 432, 220, true );
		//add_image_size( 'indocar-slider-product-thumbnail', 768, 432, true );

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(
			array(
				'primary' => __( 'Primary Menu', 'indocarmarket' ),
				'footer_menu_1'  => __( 'Footer Menu 1', 'indocarmarket' ),
				'footer_menu_2'  => __( 'Footer Menu 2', 'indocarmarket' ),
				'footer_menu_3'  => __( 'Footer Menu 3', 'indocarmarket' ),
			)
		);

		// Add theme support for selective refresh for widgets.
        add_theme_support( 'customize-selective-refresh-widgets' );
        // Adding support for core block visual styles.
        add_theme_support( 'wp-block-styles' );
        // Add support for full and wide align images.
        add_theme_support( 'align-wide' );

        // Set up the WordPress core custom background feature.
		/*add_theme_support( 'custom-background', apply_filters( 'mobil_keren_custom_background_args', array(
			'default-color' => '0762A2',
			'default-image' => '',
		) ) );*/

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'status',
				'audio',
				'chat',
			)
		);

		/*
         * This theme styles the visual editor to resemble the theme style,
         * specifically font, colors, and column width.
         */
        add_editor_style( 'assets/admin/css/editor-style.css' );

		// Indicate widget sidebars can use selective refresh in the Customizer.
		//add_theme_support( 'customize-selective-refresh-widgets' );

	}
endif; // twentysixteen_setup
add_action( 'after_setup_theme', 'indocarmarket_setup' );

/**
 * Registers a widget area.
 *
 * @link https://developer.wordpress.org/reference/functions/register_sidebar/
 *
 * @since Indocar Market 1.0
 */
if ( ! function_exists( 'indocarmarket_widgets_init' ) ) :
function indocarmarket_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Sidebar Product', 'indocarmarket' ),
			'id'            => 'sidebar-products',
			'description'   => __( 'Sidebar berada di laman produk.', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Sidebar Blog', 'indocarmarket' ),
			'id'            => 'sidebar-blogs',
			'description'   => __( 'Sidebar berada di laman blog/news.', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 1', 'indocarmarket' ),
			'id'            => 'footer-1',
			'description'   => __( 'Footer 1.', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 2', 'indocarmarket' ),
			'id'            => 'footer-2',
			'description'   => __( 'Recom: Pilih widget menu', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 3', 'indocarmarket' ),
			'id'            => 'footer-3',
			'description'   => __( 'Recom: Pilih widget menu', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 4', 'indocarmarket' ),
			'id'            => 'footer-4',
			'description'   => __( 'Use Widget Kontak Footer.', 'indocarmarket' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

}
endif;
add_action( 'widgets_init', 'indocarmarket_widgets_init' );

/**
 * Enqueues scripts and styles.
 *
 * @since Twenty Sixteen 1.0
 */
function indocarmarket_scripts() {
	
	//bootstrap style
	wp_enqueue_style('bootstrap-style', get_template_directory_uri() . '/assets/css/bootstrap.min.css', array(), '4.3.1' );
	
	wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/assets/css/fontawesome.min.css', array(), '5.9.0', '' );

	//wp_enqueue_style('flexslider', get_template_directory_uri() . '/assets/libraries/flexslider/flexslider.css', array(), '2.7.2' );
	
	//wp_enqueue_style( 'owl-carousel', get_template_directory_uri() . '/assets/css/owl.carousel.min.css', array(), '2.2.1', '' );
	//wp_enqueue_style( 'owl-theme-default', get_template_directory_uri() . '/assets/css/owl.theme.default.min.css', array(), '2.2.1', '' );

	//wp_enqueue_style('ionicons', get_template_directory_uri() . '/assets/libraries/ionicons/css/ionicons.min.css');

	// Theme stylesheet.
	wp_enqueue_style( 'indocarmarket-style', get_stylesheet_uri() );

	wp_enqueue_style( 'indocarmarket-style-main', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0' );

	//inline style
    //wp_add_inline_style('indocarmarket-inline-style', indocarmarket_trigger_custom_css_action());

	$fonts_url = indocarmarket_fonts_url();
    if (!empty($fonts_url)) {
        wp_enqueue_style('indocarmarket-google-fonts', $fonts_url, array(), null);
    }

	wp_enqueue_script('jQuery', get_template_directory_uri() . '/assets/js/jquery.min.js', array(), '3.3.1', true );
	// bootstrap script
	wp_enqueue_script('bootstrap-script', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array(), '4.3.1', true );
	wp_enqueue_script('bootstrap-datepicker', get_template_directory_uri() . '/assets/js/bootstrap-datepicker.min.js', array(), '1.8.0', true );
	wp_enqueue_script('slick', get_template_directory_uri() . '/assets/js/slick.min.js', array(), '', true );
	//wp_enqueue_script( 'bootstrap-colequalizer', get_template_directory_uri() . '/assets/js/bootstrap-colequalizer.js', array( ), '', true );

	wp_enqueue_script('bangkit-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20151215', true);

	//wp_enqueue_script('headroom', get_template_directory_uri() . '/assets/libraries/headroom/headroom.js', array('jquery'), '', true);
	//wp_enqueue_script('jquery-headroom', get_template_directory_uri() . '/assets/libraries/headroom/jQuery.headroom.js', array('jquery'), '', true);

	//wp_enqueue_script('flexslider', get_template_directory_uri() . '/assets/libraries/flexslider/jquery.flexslider.js', array(), '2.7.2' );
	//wp_enqueue_script( 'owl-carousel', get_template_directory_uri() . '/assets/js/owl.carousel.min.js', array( 'jquery' ), '2.2.1', true );
	//wp_enqueue_script( 'jquery-matchheight', get_template_directory_uri() . '/assets/js/jquery.matchHeight-min.js', array( ), '0.7.2', true );

	// custom script
	//wp_enqueue_script('bangkit-script', get_template_directory_uri() . '/assets/js/custom-script.js', array( 'jquery', 'wp-mediaelement'), '', true);*/
	wp_enqueue_script('custom', get_template_directory_uri() . '/assets/js/custom.js', array(), '', true );
	wp_enqueue_script('main', get_template_directory_uri() . '/assets/js/main.js', array(), '', true );
	wp_enqueue_script('jquery-ui', get_template_directory_uri() . '/assets/js/jquery-ui-1.12.1.min.js', array(), '1.12.1', true );
}
add_action( 'wp_enqueue_scripts', 'indocarmarket_scripts' );


/**
 * Hook init for this theme.
 */
require get_template_directory() . '/inc/all-init.php';