<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Indocar Market
 */

//$post_sidebar = esc_attr( get_post_meta($post->ID, 'indocarmarket', true) ); ?>

<div class="col-4">

	<?php form_post_search() ?>

 	<?php dynamic_sidebar( 'sidebar-blogs' ); ?>

</div>