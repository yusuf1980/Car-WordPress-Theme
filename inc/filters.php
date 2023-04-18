<?php

/**
 * remove kategori and tag word in archive page.
 */
add_filter( 'get_the_archive_title', function ( $title ) {
 
    if( is_category() ) {
        $title = single_cat_title( "", false );
    }
    if( is_tag() ) {
        $title = single_tag_title( "", false );
    }
    /*if( is_post_type_archive('vehicle') ) {
        $title = single_tag_title( "", false );
    }*/
    if( is_taxonomy('make') ) {
        $title = single_tag_title( "Mobil ", false );
    }
     
    return $title;
});

function template_vehicle_search($template)   
{    
    global $wp_query;   
    $post_type = get_query_var('post_type');   
    if( $wp_query->is_search && $post_type == 'vehicle' )   
    {
        return locate_template('archive-search.php');  //  redirect to archive-search.php
    }   
    return $template;   
}
add_filter('template_include', 'template_vehicle_search');



function template_post_search($template)   
{    
    global $wp_query;   
    $post_type = get_query_var('post_type');   
    if( $wp_query->is_search && $post_type == 'post' )   
    {
        return locate_template('archive-search-post.php');  //  redirect to archive-search.php
    }   
    return $template;   
}
add_filter('template_include', 'template_post_search');

//add_filter( 'pre_get_posts', 'tgm_io_cpt_search' );
/**
 * This function modifies the main WordPress query to include an array of 
 * post types instead of the default 'post' post type.
 *
 * @param object $query  The original query.
 * @return object $query The amended query.
 */
/*function tgm_io_cpt_search( $query ) {
    
    if ( $query->is_search ) {
    $query->set( 'post_type', array( 'post') );
    }
    
    return $query;
    
}*/

function tn_custom_excerpt_length( $length ) {
    return 35;
}
add_filter( 'excerpt_length', 'tn_custom_excerpt_length', 999 );