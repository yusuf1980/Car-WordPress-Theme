<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package Indocar Market
 */
get_header(); ?>

	<section class="page-main single_vehic">
		<section class="page-section">
                <div class="carros-container section-breadcrumb">
                  <nav aria-label="breadcrumb">
                  	<?php
                        do_action('indocarmarket_action_breadcrumb');
                    ?>
                  </nav>
                </div>
        </section>

        
			<?php
			// Start the loop.
			while ( have_posts() ) :
				the_post();
        		// Include the single post content template.
			get_template_part( 'template-parts/single', 'vehicle' );

			endwhile;
			?>
				
	</section>

<?php get_footer(); ?>