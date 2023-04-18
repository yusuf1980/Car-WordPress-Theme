<?php
/**
 * CSS related hooks.
 *
 * This file contains hook functions which are related to CSS.
 *
 * @package Indocar Market
 */

if (!function_exists('indocarmarket_trigger_custom_css_action')):

    /**
     * Do action theme custom CSS.
     *
     * @since 1.0.0
     */
    function indocarmarket_trigger_custom_css_action()
    {
    	/*global $indocarmarket_google_fonts;
        
        $indocarmarket_primary_color   = indocarmarket_get_option('primary_color');
        $indocarmarket_secondary_color = indocarmarket_get_option('secondary_color');
        $indocarmarket_tertiary_color  = indocarmarket_get_option('tertiary_color');

        $indocarmarket_footer_bg_first             = indocarmarket_get_option('footer_bg_first');
        $indocarmarket_footer_first_font_color     = indocarmarket_get_option('footer_first_font_color');
        $indocarmarket_footer_bg_copyright         = indocarmarket_get_option('footer_bg_copyright');
        $indocarmarket_footer_copyright_font_color = indocarmarket_get_option('footer_copyright_font_color');

        $indocarmarket_primary_font   = $indocarmarket_google_fonts[indocarmarket_get_option('primary_font')];
        $indocarmarket_secondary_font = $indocarmarket_google_fonts[indocarmarket_get_option('secondary_font')];

        $indocarmarket_font_size_body            = indocarmarket_get_option('text_size_body');
        $indocarmarket_font_title_font_list_post = indocarmarket_get_option('text_size_title_font_list_post');
        $indocarmarket_font_title_font_post      = indocarmarket_get_option('text_size_title_font_post');
        $indocarmarket_font_title_meta_post      = indocarmarket_get_option('text_size_meta_font_post');
        $indocarmarket_font_title_list_product   = indocarmarket_get_option('text_size_title_font_list_product');
        $indocarmarket_font_title_product        = indocarmarket_get_option('text_size_title_font_product');
        $indocarmarket_font_size_p               = indocarmarket_get_option('text_size_p');

        ?>
		<style type="text/css">

            <?php if (!empty($indocarmarket_primary_color) ){ ?>
            body .site .content-area button,
            body .site .btn-primary,
            body .site .alt-bg,
            body .site .widget-cta:before,
            body .site .widget-testmonial,
            body .site .owl-dots .owl-dot:after,
            body .site .mc4wp-form-fields input[type="submit"],
            body .site .scroll-up:hover,
            body .site .scroll-up:focus,
            body .site .img-hover:before,
            body #page.site .social-icons.footer-social-icon ul li:hover,
            body #page.site .social-icons.footer-social-icon ul li:focus,
            body .site .custom-header-media:before,
            body .site .popup-social-icons.social-icons ul li:hover a,
            body .site .popup-social-icons.social-icons ul li:focus a {
                background-color: <?php echo esc_html($indocarmarket_primary_color); ?>;
            }

            body .site .content-area button,
            body .site .content-area input[type="button"],
            body .site .content-area input[type="reset"],
            body .site .content-area input[type="submit"],
            body .site .btn-primary,
            body .site .site-footer .author-info .profile-image,
            body .site .owl-dots .owl-dot{
                border-color: <?php echo esc_html($indocarmarket_primary_color); ?>;
            }
            
            body .navbar-brand,
            body .navbar-dark .navbar-brand,
            body .navbar-light .navbar-brand,
            body .sticky header:before,
            body .title-des {
                color: <?php echo esc_html($indocarmarket_primary_color); ?>;
            }

            

            <?php } ?>

            <?php if (!empty($indocarmarket_secondary_color) ){ ?>
            body .primary-bgcolor,
            body .content-area button:hover,
            body .content-area button:focus,
            body .content-area input[type="button"]:hover,
            body .content-area input[type="button"]:focus,
            body .content-area input[type="reset"]:hover,
            body .content-area input[type="reset"]:focus,
            body .content-area input[type="submit"]:hover,
            body .content-area input[type="submit"]:focus {
                background: <?php echo esc_html($indocarmarket_secondary_color); ?>;
            }

            body .primary-textcolor {
                color: <?php echo esc_html($indocarmarket_secondary_color); ?>;
            }

            body .content-area button:hover,
            body .content-area button:focus,
            body .content-area input[type="button"]:hover,
            body .content-area input[type="button"]:focus,
            body .content-area input[type="reset"]:hover,
            body .content-area input[type="reset"]:focus,
            body .content-area input[type="submit"]:hover,
            body .content-area input[type="submit"]:focus {
                border-color: <?php echo esc_html($indocarmarket_secondary_color); ?>;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_tertiary_color) ){ ?>

            .site ::-moz-selection {
                background: <?php echo esc_html($indocarmarket_tertiary_color); ?>;
            }

            .site ::selection {
                background: <?php echo esc_html($indocarmarket_tertiary_color); ?>;
            }

            body .site .btn-secondary,
            body .site .secondary-bgcolor,
            body .site .main-navigation .menu-description,
            body .site .widget .widget-portfolio .portfolio-masonry .filter-group li :before{
                background: <?php echo esc_html($indocarmarket_tertiary_color); ?>;
            }

            body .loader-text-2:before,
            body .site a:hover,
            body .site a:focus,
            body .site a:active,
            body .site .img-hover .hover-caption .entry-meta,
            body .site .wp-custom-header .wp-custom-header-video-button:hover,
            body .site .wp-custom-header .wp-custom-header-video-button:focus,
            .pcd-price,
            .title-des {
                color: <?php echo esc_html($indocarmarket_tertiary_color); ?>;
            }

            body .site .wp-custom-header .wp-custom-header-video-button:hover,
            body .site .wp-custom-header .wp-custom-header-video-button:focus {
                border-color: <?php echo esc_html($indocarmarket_tertiary_color); ?>;
            }

            <?php } ?>
        
            <?php if (!empty($indocarmarket_footer_first_font_color) ){ ?>
            footer .footer-first {
                color: <?php echo esc_html($indocarmarket_footer_first_font_color); ?> !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_footer_bg_first) ){ ?>
            footer .footer-first {
                background-color: <?php echo esc_html($indocarmarket_footer_bg_first); ?> !important;
            }

            <?php } ?>
        
            <?php if (!empty($indocarmarket_footer_copyright_font_color) ){ ?>
            footer .copyright-area {
                color: <?php echo esc_html($indocarmarket_footer_copyright_font_color); ?> !important;
            }

            <?php } ?>
        
            <?php if (!empty($indocarmarket_footer_bg_copyright) ){ ?>
            footer .copyright-area {
                background-color: <?php echo esc_html($indocarmarket_footer_bg_copyright); ?> !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_primary_font) ){ ?>
		
            body .primary-font,
            h1, h2, h3, h4, h5, h6,
            #nav-affix.navbar {
                font-family: <?php echo esc_html($indocarmarket_primary_font); ?> !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_secondary_font) ){ ?>
            body,
            button,
            input,
            select,
            textarea {
                font-family: <?php echo esc_html($indocarmarket_secondary_font); ?> !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_font_size_body) ){ ?>
            body {
                font-size: <?php echo esc_html($indocarmarket_font_size_body); ?>px !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_font_title_font_list_post) ){ ?>
            body .featured-details .entry-title,
            body .twp-article-wrapper .entry-title {
                font-size: <?php echo esc_html($indocarmarket_font_title_font_list_post); ?>px !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_font_title_font_post) ){ ?>
            body.single-post .entry-title, 
            .on-listing .entry-title {
                font-size: <?php echo esc_html($indocarmarket_font_title_font_post); ?>px !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_font_title_meta_post) ){ ?>
            body .twp-article-wrapper .entry-meta a {
                font-size: <?php echo esc_html($indocarmarket_font_title_meta_post); ?>px !important;
            }

            <?php } ?>

            <?php if (!empty($indocarmarket_font_size_p) ){ ?>
            body,
            body .site button,
            body .site input,
            body .site select,
            body .site textarea,
            body .site p,
            body .site .main-navigation .toggle-menu {
                font-size: <?php echo esc_html($indocarmarket_font_size_p); ?>px !important;
            }

            <?php } ?>

		</style>
    
    <?php */ }

endif;