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

 get_header(); ?>

 <div id="primary" class="content-area">
 	<section class="page-main">
 		<div class="headline__banner" style="background-image: url(<?php echo get_header_image(); ?>)">
                <div class="container clearfix">
                  <h1 class="image-banner-text"><?php the_title() ?></h1>

                  <?php
                    //do_action('indocarmarket_action_breadcrumb');
                  ?>
                </div>
              </div>
 		<section class="page-section">
            <div class="carros-container">
               <nav aria-label="breadcrumb">
                    <?php
                    //do_action('indocarmarket_action_breadcrumb');
                  ?>
                </nav>
            </div>
        </section>
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
									get_template_part( 'template-parts/content', 'page' );

									?>
									
									<?php

									// End the loop.
								endwhile;

								wp_reset_postdata();
								else :
								get_template_part( 'template-parts/content', 'none' ); 
              	  	      		endif;
		?>
		<section class="comments page-section">
	 		<div class="carros-container article-details-container">
	 		<?php
	 		// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}
			?>
			</div>
 		</section>
 	</section>
 	
 </div>

 <?php get_footer(); ?>