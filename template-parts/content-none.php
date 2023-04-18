<?php
/**
 * The template part for displaying content
 *
 * @package Indocar Market
 */
?>


  <div class="col-sm-12">
  	<?php if (is_home() && current_user_can('publish_posts')) : ?>

  	<?php elseif (is_search()) : ?>

  	<p><?php esc_html_e('Maaf, tidak ditemukan istilah pencarian. Silahkan coba lagi dengan kata kunci yang berbeda.', 'indocarmarket'); ?></p>
	<?php
	//form_post_search();

    else : ?>

  	<?php endif; ?>
  	
  </div>
