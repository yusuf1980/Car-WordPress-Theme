<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package Indocar Market
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Access-Control-Allow-Origin" content ="*" />
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php echo esc_url( get_bloginfo( 'pingback_url' ) ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>
<body class="page-homepage pageType-ContentPage template-pages-layout-landingLayout2Page pageLabel-homepage language-in" <?php //body_class(); ?>>
	<div class="container-fluid">
		<div class="row position-relative">
			<div class="branding-mobile hidden-md hidden-lg">
	          <div class="js-mobile-logo"></div>
	        </div>

	        <main data-currency-iso-code="IDR" class="w-100">
          		<div class="yCmsContentSlot"></div>

          		<div class="dsp-none">homepage</div>

          		<?php wp_reset_query(); ?>
				
				<?php if( is_front_page() ) : ?>
          		<header class="carros-header carros-slider-header">
		            <nav class="navbar navbar-expand-lg navbar-light">
		              <div class="banner__component simple-banner">
		              	<?php if ( get_theme_mod( 'custom_logo_1' ) ) : ?>
		                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="site-logo" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"> 
		                  <img class="w-100" title="Carros" src="<?php echo get_theme_mod( 'custom_logo_1' ); ?>" />
		                </a>
		                <?php endif; ?>
		              </div>
		              
		              <span class="search-icon-tab-mobile cursor-pointer" data-toggle="modal" data-target="#SearchModal"></span>

		              <button class="navbar-toggler" type="button" data-toggle="modal" data-target="#SignInModal" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		                <span class="navbar-toggler-icon"></span>
		              </button>

		              <div class="collapse navbar-collapse dir-right mobile-nav" id="navbarNavAltMarkup">
		              	<ul class="navbar-nav">

		              	<?php if ( has_nav_menu( 'primary' ) ) : 
		        
							create_bootstrap_menu('primary');

				      	endif; ?>
						<?php if( indocarmarket_get_option('enable_button_right_primary_menu') == 1 ) : ?>
		                  <li class="nav-item">
		                    <a href="<?php echo indocarmarket_get_option('url_right_primary_menu'); ?>" class="nav-item nav-link sign-up"><i class="fa fa-sign-in-alt mr-1"></i>  <?php echo indocarmarket_get_option('text_right_primary_menu'); ?></a>
		                  </li>
		                <?php endif; ?>
		                </ul>
		              </div>
		            </nav>
		        </header>
		    	<?php else: ?>
		    	<?php endif; ?>
				
				<?php wp_reset_query(); ?>
		        <header class="carros-header stickyHeader" id="<?php echo is_front_page() ?'stickyHeader':''?>">
		            <nav class="navbar navbar-expand-lg navbar-light">
		              <span class="navbar-brand color-logo">
		                <div class="banner__component simple-banner">
		                  <?php if ( get_theme_mod( 'custom_logo_2' ) ) : ?>
		                  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="site-logo" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"> 
		                    <img class="w-100" src="<?php echo get_theme_mod( 'custom_logo_2' ); ?>" />
		                  </a>
		                  <?php endif; ?>
		                </div>
		              </span>
					  
					  <?php if( is_front_page() ) : ?>
		              <span class="navbar-brand white-logo">
		                <div class="banner__component simple-banner">
		                  <?php if ( get_theme_mod( 'custom_logo_1' ) ) : ?>
		                  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="site-logo" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"> 
		                    <img class="w-100" src="<?php echo get_theme_mod( 'custom_logo_1' ); ?>" alt="Carros" />
		                  </a>
		              	  <?php endif; ?>
		                </div>
		              </span>
		          	  <?php endif; ?>

		              <span class="search-icon-tab-mobile cursor-pointer" data-toggle="modal" data-target="#SearchModal"></span>

		              <button class="navbar-toggler" type="button" data-toggle="modal" data-target="#SignInModal" aria-controls="navbarNavAltMarkup2" aria-expanded="false" aria-label="Toggle navigation">
		                <span class="navbar-toggler-icon"></span>
		              </button>

		              <div class="collapse navbar-collapse dir-right mobile-nav" id="navbarNavAltMarkup2">
		                <ul class="navbar-nav">
		                  <li>
		                    <div>
		                      <div class="yCmsComponent">
		                        <form name="search_form_SearchBox" action="<?php echo get_site_url() ?>" class="type-ahead-search">
		                          <div class="typeahead">
		                            <input oninput="hideDropdown()" type="text" name="s" class="typeahead-input header-input js-site-search-input" placeholder="Masukan Merek/Nama Mobil"/> 
		                            <input type="hidden" name="post_type" value="vehicle" />
		                          </div>
		                        </form>
		                      </div>
		                    </div>
		                  </li>

		                  <?php if ( has_nav_menu( 'primary' ) ) : 
		        
							create_bootstrap_menu('primary');

				      		endif; ?>

				      	  <?php if( indocarmarket_get_option('enable_button_right_primary_menu') == 1 ) : ?>
		                  <li class="nav-item">
		                    <a href="<?php echo indocarmarket_get_option('url_right_primary_menu'); ?>" class="nav-item nav-link sign-up"><i class="fa fa-sign-in-alt mr-1"></i> <?php echo indocarmarket_get_option('text_right_primary_menu'); ?> </a>
		                  </li>
		              	  <?php endif; ?>
		                </ul>
		              </div>
		            </nav>
		        </header>

		        <div class="modal fade" id="SignInModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		            <div class="modal-dialog nav-slider" role="document">
		              <div class="modal-content">
		                <div class="modal-body nopadding">

		                  <?php if( indocarmarket_get_option('enable_button_right_primary_menu') == 1 ) : ?>
		                  <a href="<?php echo indocarmarket_get_option('url_right_primary_menu'); ?>" class="sign-up sign-up-mobile"><i class="fa fa-sign-in-alt mr-1"></i>  <?php echo indocarmarket_get_option('text_right_primary_menu'); ?></a>
		                  <?php endif; ?>

		                  <div class="navbar-nav mobile-meu-collapse">
		                    
		                    <?php if ( has_nav_menu( 'primary' ) ) :

		                    	create_mobile_menu('primary');

		                    endif; ?>

		                  </div>
		                </div>

		                <div class="modal-footer slider-menu-footer">
		                  <span>Butuh Bantuan?</span>
		                  <p><i class="fas fa-phone-alt"></i> Hubungi kami : <a href="tel:0804-1-000088">0804-1-000088</a></p>
		                </div>
		              </div>
		            </div>
		        </div>

		        <div class="modal fade" id="SearchModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		            <div class="modal-dialog" role="document">
		              <div class="modal-content search-modal">
		                <div class="yCmsComponent">

		                  <form name="search_form_SearchBox" action="<?php echo get_site_url() ?>" class="type-ahead-search">
		                    <div class="typeahead">
		                      <input type="text" name="s" class="typeahead-input header-input js-site-search-input" placeholder="Masukan Merek/Mobil" />
		                      <input type="hidden" name="post_type" value="vehicle" />
		                    </div>
		                  </form>
		                </div>
		              </div>
		            </div>
		        </div>

		          
		        <div class="main__inner-wrapper">
		        	

            



