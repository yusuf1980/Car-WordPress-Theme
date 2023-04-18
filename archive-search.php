<?php
/**
 * Template Name: Lists Mobil
 * @package Incocar Market
 */

wp_reset_query(); 

$min_price = $_GET['price'] ?: '';
$min_year = $_GET['year'] ?: '';
if($min_price) {
	if($min_price==100){
		$min_p = 1;
		$max_p = 100000000;
	}elseif($min_price==200){
		$min_p = 100000000;
		$max_p = 200000000;
	}elseif($min_price==400){
		$min_p = 200000000;
		$max_p = 400000000;
	}else {
		$min_p = 400000000;
		$max_p = 900000000;
	}
}
if($min_year) {
	if($min_year=='2018'){
		$min_y = '2018';
		$max_y = '2030';
	}elseif($min_year=='2017'){
		$min_y = '2016';
		$max_y = '2017';
	}elseif($min_year=='2015'){
		$min_y = '2012';
		$max_y = '2015';
	}else {
		$min_y = '1900';
		$max_y = '2012';
	}
}
$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
$posts_per_page = indocarmarket_get_option('sum_post_vehicle');
$args = array( 
        'post_type' => 'vehicle',
        'posts_per_page' =>$posts_per_page,
        'paged' => $paged,
        //'showposts' => 2 
        'tax_query' => array( 
	          array(                    
	            'taxonomy' => 'vehicle_type',
	            'field' => 'slug',
	            'terms' => 'car',
	            //'include_children' => true,          
	            //'operator' => 'IN' 
	        )
	      ),
		'meta_query' => [],
        'meta_key'     => '_indocarmarket_sold',
        'orderby' => array( 
          '_indocarmarket_sold' => 'asc', 'date' => 'desc'
        ),
      'order' => 'DESC',
      's' => get_search_query(),
) ;
if($min_price) {
	$args['meta_query'][] = [
		'key' => 'price',
        'value' => $min_p,
        'compare' => '>=',
        'type' => 'NUMERIC'
	];
	$args['meta_query'][] = [
		'key' => 'price',
        'value' => $max_p,
        'compare' => '<=',
        'type' => 'NUMERIC'
	];
}
if($min_year) {
	$args['meta_query'][] = [
		'key' => 'registration',
        'value' => $min_y,
        'compare' => '>=',
        //'type' => 'NUMERIC'
	];
	$args['meta_query'][] = [
		'key' => 'registration',
        'value' => $max_y,
        'compare' => '<=',
        //'type' => 'NUMERIC'
	];
}

$query = new WP_Query( $args );
                              

get_header(); ?>

<div>
              <div class="yCmsContentSlot search-grid-page-result-grid-slot">
                <div class="yCmsComponent search-grid-page-result-grid-component">
                  <input type="hidden" value="#" id="contextPath" />

                  <section class="page-main">
                    <div class="headline__banner" style="background-image: url(<?php echo get_header_image(); ?>)">
                      <div class="container clearfix">
                        <h1 class="image-banner-text">Hasil Cari Mobil</h1>

                        <?php
                        do_action('indocarmarket_action_breadcrumb');
                        ?>
                      </div>
                    </div>

                    <div class="container filter-container clearfix">
  
                      <div class="search-results-items section">
                      	<h5 class="page-title screen-reader-text"><?php //single_post_title(); ?>
						 <?php printf(esc_html__('Hasil Cari dari : %s', 'indocarmarket'), '<span>' . get_search_query() . '</span>'); ?>
						 </h5>
                        <div class="row">
                          
          
                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-sm-hidden col-xs-hidden margin-zero-auto products-containers">
                            <div class="row">

                              

                              <?php if ( $query->have_posts() ) : ?>

                              <?php
                                // Start the loop.
                                while ( $query->have_posts() ) :
                                  $query->the_post();

                                  ?>
                                  
                                  <?php

                                  /*
                                   * Include the Post-Format-specific template for the content.
                                   * If you want to override this in a child theme, then include a file
                                   * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                                   */
                                  get_template_part( 'template-parts/content', 'vehicle' );

                                  ?>
                                      
                                  <?php

                                  // End the loop.
                                endwhile;


                                // Previous/next page navigation.
                                echo '<div class="col-12" style="margin-top:20px">';
                                echo '<div style="margin: 0 auto">';
                                  bootstrap_wpbs_pagination($paged, 2, $query);
                                echo '</div>'; 
                                echo '</div>';

                                // If no content, include the "No posts found" template.
                                wp_reset_postdata();
                              else :
                                get_template_part( 'template-parts/content', 'none' );

                              endif;
                              ?>

                              
                            </div>
                            
                            <div id="loader" class="d-none text-center">
                              <img src="<?php echo get_template_directory_uri() ?>>/assets/images/icons/loader.gif" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </section>

                  
                </div>
              </div>
            </div>

<?php //get_sidebar(); ?>
<?php get_footer(); ?>