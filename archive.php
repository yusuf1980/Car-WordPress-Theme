<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Indocar Market
 */
/*$tags = esc_attr( indocarmarket_get_option('slide_tag_name') ) ;
query_posts(array( 
        'post_type' => 'post',
        'tag__not_in' => $tags,
        'order' => 'DESC',
        'orderby' => 'date'
    ) );*/

get_header(); ?>

<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<section class="page-main">
			  <div class="headline__banner" style="background-image: url(<?php echo get_header_image(); ?>)">
                <div class="container clearfix">
                  <h1 class="image-banner-text"><?php the_archive_title(); ?></h1>

                  <?php
                    do_action('indocarmarket_action_breadcrumb');
                  ?>
                </div>
              </div>
              <section class="page-section">
              	<div class="carros-container">
              	  <div class="yCmsContentSlot">
              	  	<div class="article-listing-area">
              	  	  <div class="row">
              	  	    <div class="col">
              	  	      <div class="articls-tab-contents">
              	  	      	<div class="row">
              	  	      		<?php if ( have_posts() ) : 
              	  	      		while ( have_posts() ) :
									the_post();

									?>
									
									<?php

									/*
									 * Include the Post-Format-specific template for the content.
									 * If you want to override this in a child theme, then include a file
									 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
									 */
									get_template_part( 'template-parts/content', get_post_format() );

									?>
									
									<?php

									// End the loop.
								endwhile;
								echo '<div style="margin: 0 auto">';
									bootstrap_wpbs_pagination();
								echo '</div>';

								wp_reset_postdata();
								else :
								get_template_part( 'template-parts/content', 'none' ); 
              	  	      		endif;
								?>
              	  	      	</div>
              	  	      </div>
              	  	    </div>
              	  	    
						<?php get_sidebar(); ?>
              	  	    
              	  	  </div>
              	  	</div>
              	  </div>
              	</div>
              </section>
			</section>
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>