<?php
/**
 * Template Name: Lists Mobil
 * @package Incocar Market
 */

wp_reset_query(); 
$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
$posts_per_page = indocarmarket_get_option('sum_post_vehicle');
$tax_terms = $wp_query->queried_object;
$args = array( 
        'post_type' => 'vehicle',
        'posts_per_page' =>$posts_per_page,
        'paged' => $paged,
        'tax_query' => array( 
	          array(                    
	            'taxonomy'         => 'make',
	            'field'            => 'slug',
	            'terms'            => $tax_terms->slug,
	            'include_children' => true,          
	            'operator'         => 'IN' 
	        )
	      ),
        'meta_key' => '_indocarmarket_sold',
        'orderby'  => array( 
          '_indocarmarket_sold' => 'asc', 'date' => 'desc'
        ),
        'order' => 'DESC',
    ) ;
$query = new WP_Query( $args );
                              

get_header(); ?>

<div>
              <div class="yCmsContentSlot search-grid-page-result-grid-slot">
                <div class="yCmsComponent search-grid-page-result-grid-component">
                  <input type="hidden" value="#" id="contextPath" />

                  <section class="page-main">
                    <div class="headline__banner" style="background-image: url(<?php echo get_header_image(); ?>)">
                      <div class="container clearfix">
                        <?php //column_vehicle_search() ?>
                        <h1 class="image-banner-text"><?php the_title() ?></h1>

                        <?php
                        do_action('indocarmarket_action_breadcrumb');
                        ?>
                      </div>
                    </div>

                    <div class="container filter-container clearfix">
  
                      <div class="search-results-items section">
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
                                ?>

                                <?php //echo get_next_posts_link( 'Next Page', $query->max_num_pages ); ?>
                                <?php //echo get_previous_posts_link( 'Previous Page' ); ?> <?php


                                // If no content, include the "No posts found" template.
                                wp_reset_postdata();
                              else :
                                get_template_part( 'template-parts/content', 'none' );

                              endif;
                              ?>

                              
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