<?php
/**
 * Template Name: Home Page
 * @package Incocar Market
 */

get_header();
?>
<div class="content-area">
	<?php
			do_action('indocarmarket_main_slider'); 
	?>
	          <?php column_vehicle_search() ?>

            <?php
          // Start the loop.
          while ( have_posts() ) :
            the_post();

              get_template_part( 'template-parts/home', 'vehicle' );

            // End the loop.
          endwhile;

          ?>

</div>
            
<?php //get_sidebar(); ?>
<?php get_footer(); ?>