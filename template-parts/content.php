<?php
/**
 * The template part for displaying content
 *
 * @package Indocar Market
 */
?>


  <div class="col-sm-6">
  	<a class="article-box"  href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
  	  <?php 
  	  if (has_post_thumbnail()) {
  	  	the_post_thumbnail('indocar-post-thumbnail');
  	  } ?>
  	  <div class="article-list-tile-textwrapper">
    	<h2 class="article-list-tile-header"><?php the_title(); ?></h2>
        <p class="article-list-tile-news"><?php indocarmarket_entry_category(); ?></p>
      </div>
  	</a>
  	
  </div>
