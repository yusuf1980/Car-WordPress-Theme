<?php

if ( ! function_exists( 'indocarmarket_excerpt' ) ) :
	/**
	 * Displays the optional excerpt.
	 *
	 * Wraps the excerpt in a div element.
	 *
	 * Create your own indocarmarket_excerpt() function to override in a child theme.
	 *
	 * @since indocarmarket 1.0
	 *
	 * @param string $class Optional. Class string of the div element. Defaults to 'entry-summary'.
	 */
	function indocarmarket_excerpt( $class = 'entry-summary' ) {
		$class = esc_attr( $class );

		if ( has_excerpt() || is_search() ) :
			?>
			<div class="<?php echo $class; ?>">
				<?php the_excerpt(); ?>
			</div><!-- .<?php echo $class; ?> -->
			<?php
		endif;
	}
endif;

if ( ! function_exists( 'indocarmarket_excerpt_more' ) && ! is_admin() ) :
	/**
	 * Replaces "[...]" (appended to automatically generated excerpts) with ... and
	 * a 'Continue reading' link.
	 *
	 * Create your own indocarmarket_excerpt_more() function to override in a child theme.
	 *
	 * @since indocarmarket 1.0
	 *
	 * @return string 'Continue reading' link prepended with an ellipsis.
	 */
	function indocarmarket_excerpt_more() {
		$link = sprintf(
			'<a href="%1$s" class="more-link">%2$s</a>',
			esc_url( get_permalink( get_the_ID() ) ),
			/* translators: %s: Name of current post */
			sprintf( __( 'Baca Lengkap <span class="screen-reader-text"> "%s"</span>', 'indocarmarket' ), get_the_title( get_the_ID() ) )
		);
		return ' &hellip; ' . $link;
	}
	add_filter( 'excerpt_more', 'indocarmarket_excerpt_more' );
endif;

if ( ! function_exists( 'indocarmarket_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 *
	 * Create your own indocarmarket_post_thumbnail() function to override in a child theme.
	 *
	 * @since Indocar Market 1.0
	 */
	function indocarmarket_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

		<div class="post-thumbnail">
			<?php the_post_thumbnail(); ?>
	</div><!-- .post-thumbnail -->

	<?php else : ?>

	<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true">
		<?php the_post_thumbnail( 'post-thumbnail', array( 'alt' => the_title_attribute( 'echo=0' ) ) ); ?>
	</a>

		<?php
	endif; // End is_singular()
	}
endif;

/**
 * Flushes out the transients used in indocarmarket_categorized_blog().
 *
 * @since Indocar Market 1.0
 */
function indocarmarket_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'indocarmarket_categories' );
}
add_action( 'edit_category', 'indocarmarket_category_transient_flusher' );
add_action( 'save_post', 'indocarmarket_category_transient_flusher' );

if ( ! function_exists( 'indocarmarket_the_custom_logo' ) ) :
	/**
	 * Displays the optional custom logo.
	 *
	 * Does nothing if the custom logo is not available.
	 *
	 * @since Indocar Market 1.2
	 */
	function indocarmarket_the_custom_logo() {
		if ( function_exists( 'the_custom_logo' ) ) {
			the_custom_logo();
		}
	}
endif;

if( !function_exists( 'icon_video' ) ):
    function icon_video() {
        if ( has_post_format( 'video' )) {
            echo '<div class="block-video">
                <a href="'. esc_url( get_permalink() ) .'" class="video-show"><img src="'.get_template_directory_uri().'/assets/images/icon-video-4.png" alt="icon-video">
                </a>
                </div>';
        }
    }
endif;

if ( ! function_exists( 'bangkit_ajax_pagination' ) ) :
    /**
     * Outputs the required structure for ajax loading posts on scroll and click
     *
     * @since 1.0.0
     * @param $type string Ajax Load Type
     */
    function bangkit_ajax_pagination($type) {
        ?>
        <div class="load-more-posts" data-load-type="<?php echo esc_attr($type);?>">
            <a href="#" class="btn btn-primary">
                <span class="ajax-loader"></span>
                <?php _e('Load Artikel Selanjutnya', 'bangkit')?>
                <i class="ion-ios-arrow-right"></i>
            </a>
        </div>
        <?php
    }
endif;

if (!function_exists('bangkit_custom_posts_navigation')):
/**
 * Posts navigation.
 *
 * @since 1.0.0
 */
function bangkit_custom_posts_navigation() {

	bangkit_ajax_pagination('scroll');

}
endif;

add_action('bangkit_action_posts_navigation', 'bangkit_custom_posts_navigation');



if (!function_exists("bootstrap_wpbs_pagination")) :
	
	function bootstrap_wpbs_pagination($pages = '', $range = 2, $query = array()) {  
		 $showitems = ($range * 2) + 1;  
		 global $paged;
		 if(empty($paged)) $paged = 1;
		 
		 if($pages == '') {
		 	global $wp_query; 
		 	$pages = $wp_query->max_num_pages;
		 
		 	if(!$pages)
		 	$pages = 1; 
		 }else {
		 	$pages = $query->max_num_pages;
		 }
		 
		 if(1 != $pages) {

		    echo '<nav aria-label="Page navigation" role="navigation">';
		    echo '<span class="sr-only">Page navigation</span>';
		    echo '<ul class="pagination justify-content-center ft-wpbs">';
		 
		    echo '<li class="page-item disabled hidden-md-down d-none d-lg-block"><span class="page-link">Halaman '.$paged.' dari '.$pages.'</span></li>';
		 
		 	if($paged > 2 && $paged > $range+1 && $showitems < $pages) 
		 		echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link(1).'" aria-label="First Page">&laquo;<span class="hidden-sm-down d-none d-md-block"> First</span></a></li>';
		 
		 	if($paged > 1 && $showitems < $pages) 
		 		echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($paged - 1).'" aria-label="Previous Page">&lsaquo;<span class="hidden-sm-down d-none d-md-block"> Previous</span></a></li>';
		 
		 	for ($i=1; $i <= $pages; $i++)
		 	{
		     	if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems ))
		 			echo ($paged == $i)? '<li class="page-item active"><span class="page-link"><span class="sr-only">Current Page </span>'.$i.'</span></li>' : '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($i).'"><span class="sr-only">Page </span>'.$i.'</a></li>';
		 	}
		 
		 	if ($paged < $pages && $showitems < $pages) 
		 		echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($paged + 1).'" aria-label="Next Page"><span class="hidden-sm-down d-none d-md-block">Next </span>&rsaquo;</a></li>';  
		 
		 	if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) 
				echo '<li class="page-item"><a class="page-link" href="'.get_pagenum_link($pages).'" aria-label="Last Page"><span class="hidden-sm-down d-none d-md-block">Last </span>&raquo;</a></li>';
		 
		 	echo '</ul>';
		    echo '</nav>';
		        //echo '<div class="pagination-info mb-5 text-center">[ <span class="text-muted">Page</span> '.$paged.' <span class="text-muted">of</span> '.$pages.' ]</div>'; 
		 }
	}

endif;

if (!function_exists('indocarmarket_simple_breadcrumb')):

/**
 * Simple breadcrumb.
 *
 * @since 1.0.0
 */
function indocarmarket_simple_breadcrumb() {

    if (!function_exists('breadcrumb_trail')) {

        require_once get_template_directory().'/assets/libraries/breadcrumbs/breadcrumbs.php';
    }

    $breadcrumb_args = array(
        'container'   => 'div',
        'show_browse' => false,
    );
    breadcrumb_trail($breadcrumb_args);

}

endif;

if (!function_exists('indocarmarket_entry_category_link')) :
    /**
     * Prints HTML with meta information for the categories, tags and comments.
     */
    function indocarmarket_entry_category_link()
    {
        // Hide category and tag text for pages.
        if ('post' === get_post_type()) {
            /* translators: used between list items, there is a space after the comma */
            $categories_list = get_the_category_list(esc_html__(' ,', 'indocarmarket'));
            if ($categories_list && indocarmarket_categorized_blog()) {
                printf(esc_html__('%1$s', 'bangkit'), $categories_list);
            }
            //$categories = get_the_category();
			//$separator = ', ';
			/*$output = '';
			if ( ! empty( $categories ) ) {
			    foreach( $categories as $category ) {
			        $output .=  esc_html( $category->name ) . $separator;
			    }
			    echo trim( $output, $separator );
			}*/
        }
    }
endif;

if (!function_exists('indocarmarket_entry_category')) :
    /**
     * Prints HTML with meta information for the categories, tags and comments.
     */
    function indocarmarket_entry_category()
    {
        // Hide category and tag text for pages.
        if ('post' === get_post_type()) {
            /* translators: used between list items, there is a space after the comma */
            /*$categories_list = get_the_category_list(esc_html__(' ,', 'indocarmarket'));
            if ($categories_list && indocarmarket_categorized_blog()) {
                printf(esc_html__('%1$s', 'bangkit'), $categories_list);
            }*/
            $categories = get_the_category();
			$separator = ', ';
			$output = '';
			if ( ! empty( $categories ) ) {
			    foreach( $categories as $category ) {
			        $output .=  esc_html( $category->name ) . $separator;
			    }
			    echo trim( $output, $separator );
			}
        }
    }
endif;

function indocarmarket_categorized_blog()
{
    if (false === ($all_the_cool_cats = get_transient('indocarmarket_categories'))) {
        // Create an array of all the categories that are attached to posts.
        $all_the_cool_cats = get_categories(array(
            'fields' => 'ids',
            'hide_empty' => 1,
            // We only need to know if there is more than one category.
            'number' => 2,
        ));

        // Count the number of categories that are attached to the posts.
        $all_the_cool_cats = count($all_the_cool_cats);

        set_transient('indocarmarket_categories', $all_the_cool_cats);
    }

    if ($all_the_cool_cats > 1) {
        // This blog has more than 1 category so bangkit_categorized_blog should return true.
        return true;
    } else {
        // This blog has only 1 category so bangkit_categorized_blog should return false.
        return false;
    }
}

if (!function_exists('indocarmarket_simple_breadcrumb')):

/**
 * Simple breadcrumb.
 *
 * @since 1.0.0
 */
function indocarmarket_simple_breadcrumb() {

    if (!function_exists('breadcrumb_trail')) {

        require_once '/hooks/breadcrumbs.php';
    }

    $breadcrumb_args = array(
        'container'   => 'div',
        'show_browse' => false,
    );
    breadcrumb_trail($breadcrumb_args);

}

endif;

if ( ! function_exists( 'indocarmarket_entry_taxonomies' ) ) :
	/**
	 * Prints HTML with category and tags for current post.
	 *
	 * Create your own indocarmarket_entry_taxonomies() function to override in a child theme.
	 *
	 * @since indocarmarket 1.0
	 */
	function indocarmarket_entry_taxonomies() {
		$categories_list = get_the_category_list( _x( ', ', 'Used between list items, there is a space after the comma.', 'indocarmarket' ) );
		if ( $categories_list && indocarmarket_categorized_blog() ) {
			printf(
				'<span class="cat-links"><span class="screen-reader-text">%1$s </span>%2$s</span>',
				_x( ' Kategori', 'Used before category names.', 'indocarmarket' ),
				$categories_list
			);
		}

		$tags_list = get_the_tag_list( '', _x( ', ', 'Used between list items, there is a space after the comma.', 'indocarmarket' ) );
		if ( $tags_list && ! is_wp_error( $tags_list ) ) {
			printf(
				'<span class="tags-links"><span class="screen-reader-text">%1$s </span>%2$s</span>',
				_x( 'Tags', 'Used before tag names.', 'indocarmarket' ),
				$tags_list
			);
		}
	}
endif;

if (!function_exists('indocarmarket_posted_details')) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function indocarmarket_posted_details()
    {
        global $post;
        $author_id = $post->post_author;
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if (get_the_time('U') !== get_the_modified_time('U')) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf($time_string,
            esc_attr(get_the_date('c')),
            esc_html(get_the_date()),
            esc_attr(get_the_modified_date('c')),
            esc_html(get_the_modified_date())
        );

        $posted_on = sprintf(
            //esc_html__( 'Posted On %s', 'multipurpose-business' ),
            '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
        );

        $byline = sprintf(
            esc_html__( 'oleh %s', 'indocarmarket' ),
            '<a class="url" href="' . esc_url(get_author_posts_url($author_id)) . '">' . esc_html(get_the_author_meta('display_name', $author_id)) . '</a>'
        );

        echo '<span class="posted-on">' . $posted_on . '</span><span class="author"> ' . $byline . '</span>'; // WPCS: XSS OK.

        edit_post_link(
            sprintf(
            /* translators: %s: Name of current post */
                the_title('<span class="screen-reader-text">"', '"</span>', false)
            ),
            '<span class="edit-link">',
            '</span>'
        );
    }
endif;

if (!function_exists('indocarmarket_posted_by')) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function indocarmarket_posted_by()
    {
        global $post;
        $author_id = $post->post_author;
        $byline = sprintf(
            esc_html__( 'oleh %s', 'bangkit' ),
            '<a class="url" href="' . esc_url(get_author_posts_url($author_id)) . '">' . esc_html(get_the_author_meta('display_name', $author_id)) . '</a>'
        );

        echo '<span class="author"> ' . $byline . '</span>'; // WPCS: XSS OK.
    }
endif;

if ( ! function_exists( 'indocarmarket_entry_meta' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags.
	 *
	 * Create your own indocarmarket_entry_meta() function to override in a child theme.
	 *
	 * @since Indocar Market 1.0
	 */
	function indocarmarket_entry_meta() {
		/*if ( 'post' === get_post_type() ) {
			$author_avatar_size = apply_filters( 'indocarmarket_author_avatar_size', 49 );
			printf(
				'<span class="byline"><span class="author vcard">%1$s<span class="screen-reader-text">%2$s </span> <a class="url fn n" href="%3$s">%4$s</a></span></span>',
				get_avatar( get_the_author_meta( 'user_email' ), $author_avatar_size ),
				_x( 'Author', 'Used before post author name.', 'indocarmarket' ),
				esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
				get_the_author()
			);
		}*/

		if ( in_array( get_post_type(), array( 'post', 'attachment' ) ) ) {
			indocarmarket_entry_date();
		}

		$format = get_post_format();
		if ( current_theme_supports( 'post-formats', $format ) ) {
			printf(
				'<span class="entry-format">%1$s<a href="%2$s">%3$s</a></span>',
				sprintf( '<span class="screen-reader-text">%s </span>', _x( 'Format', 'Used before post format.', 'indocarmarket' ) ),
				esc_url( get_post_format_link( $format ) ),
				get_post_format_string( $format )
			);
		}

		if ( 'post' === get_post_type() ) {
			indocarmarket_entry_taxonomies();
		}

		if ( ! is_singular() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link( sprintf( __( ' Leave a comment<span class="screen-reader-text"> on %s</span>', 'indocarmarket' ), get_the_title() ) );
			echo '</span>';
		}
	}
endif;

if ( ! function_exists( 'indocarmarket_entry_date' ) ) :
	/**
	 * Prints HTML with date information for current post.
	 *
	 * Create your own indocarmarket_entry_date() function to override in a child theme.
	 *
	 * @since  1.0
	 */
	function indocarmarket_entry_date() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

		/*if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}*/

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( 'c' ) ),
			get_the_date(),
			esc_attr( get_the_modified_date( 'c' ) ),
			get_the_modified_date()
		);

		printf(
			'<span class="posted-on"><span class="screen-reader-text">%1$s </span><a href="%2$s" rel="bookmark">%3$s</a></span>',
			_x( '', 'Used before publish date.', 'indocarmarket' ),
			esc_url( get_permalink() ),
			$time_string
		);
	}
endif;

if (!function_exists('indocarmarket_posted_by')) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function indocarmarket_posted_by()
    {
        global $post;
        $author_id = $post->post_author;
        $byline = sprintf(
            esc_html__( 'oleh %s', 'indocarmarket' ),
            '<a class="url" href="' . esc_url(get_author_posts_url($author_id)) . '">' . esc_html(get_the_author_meta('display_name', $author_id)) . '</a>'
        );

        echo '<span class="author"> ' . $byline . '</span>'; // WPCS: XSS OK.
    }
endif;
