<?php
/**
 * next functions for this theme.
 *
 * @package Indocar Market
 */

/**
 * Enqueue admin scripts and styles.
 */
function indocarmarket_admin_scripts($hook)
{
    if ('widgets.php' === $hook) {
        wp_enqueue_media();
        wp_enqueue_style('indocar-market-custom-admin-style', get_template_directory_uri() . '/assets/admin/css/admin.css', array(), '1.0.0');
        wp_enqueue_script('indocar-market-custom-widgets', get_template_directory_uri() . '/assets/admin/js/widgets.js', array('jquery'), '1.0.0', true);
    }

}

add_action('admin_enqueue_scripts', 'indocarmarket_admin_scripts');

if (!function_exists('indocarmarket_fonts_url')):

/**
 * Return fonts URL.
 *
 * @since 1.0.0
 * @return string Fonts URL.
 */
function indocarmarket_fonts_url() {
    $fonts_url = '';
    $fonts     = array();

    $indocarmarket_primary_font   = indocarmarket_get_option('primary_font');
    $indocarmarket_secondary_font = indocarmarket_get_option('secondary_font');

    $indocarmarket_fonts   = array();
    $indocarmarket_fonts[] = $indocarmarket_primary_font;
    $indocarmarket_fonts[] = $indocarmarket_secondary_font;

    $indocarmarket_fonts_stylesheet = '//fonts.googleapis.com/css?family=';

    $i = 0;
    for ($i = 0; $i < count($indocarmarket_fonts); $i++) {

        if ('off' !== sprintf(_x('on', '%s font: on or off', 'indocarmarket'), $indocarmarket_fonts[$i])) {
            $fonts[] = $indocarmarket_fonts[$i];
        }

    }

    if ($fonts) {
        $fonts_url = add_query_arg(array(
                'family' => urldecode(implode('|', $fonts)),
            ), 'https://fonts.googleapis.com/css');
    }

    return $fonts_url;
}

endif;

/*$args_phone = 
        array(
            'name'  => esc_html__( 'Nomor Telepon', 'indocarmarket' ),
            'id'    => "indocarmarketv_phonenumber",
            'desc'  => esc_html__( 'Nomor telepon penjual', 'indocarmarket' ),
            'type'  => 'text_callback',
            'std'   => esc_html__( '', 'indocarmarket' ),
        );*/
if ( ! function_exists( 'indocarmarket_sold' ) ) {
    
    function indocarmarket_sold(){   
        add_meta_box('indocarmarket_sold', 
            'Nomor Telepon', 
            'sold_callback', 
            'vehicle', 
            'normal', 
            'high',
            $args_phone
        );
    }
}
add_action('add_meta_boxes', 'indocarmarket_sold');

if ( ! function_exists( 'sold_callback' ) ) {
    function sold_callback() {
        global $post;
        wp_nonce_field( basename( __FILE__ ), 'indocarmarket_sold_nonce' ); ?>

        <div>
            <div class="meta-box">
                <label for="_indocarmarket_sold" style="font-weight:700">Terjual</label>
                <?php 
                    $checkbox_value = get_post_meta($post->ID, "_indocarmarket_sold", true);

                    if ($checkbox_value == '' ) { ?>
                        <input type="checkbox" name="_indocarmarket_sold" value="true">
                    
                    <?php } else if ( $checkbox_value == 'true' ) { ?>
                        <input type="checkbox" name="_indocarmarket_sold" value="true" checked>
                    <?php } ?>
            </div>
            <div class="desc"><i>*Centang jika sudah terjual.</i></div>
        </div>
  <?php  }
}
if ( ! function_exists( 'indocarmarket_save_sold' ) ) {
    function indocarmarket_save_sold($post_id, $post, $update) {
        if ( !isset( $_POST[ 'indocarmarket_sold_nonce' ] ) || !wp_verify_nonce( sanitize_key( $_POST[ 'indocarmarket_sold_nonce' ] ) , basename( __FILE__ ) ) ) 
            return;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE)  
            return; 
        if (isset( $_POST['post_type'] ) && 'page' == $_POST['post_type']) {  
            if (!current_user_can( 'edit_page', $post_id ) )  
                return $post_id;  
        } elseif (!current_user_can( 'edit_post', $post_id ) ) {  
                return $post_id;  
        } 

        $meta_box_text_value = "";
        $meta_box_checkbox_value = "";

        if(isset($_POST["_indocarmarket_sold"]))
        {
            $meta_box_checkbox_value = $_POST["_indocarmarket_sold"];
        }   
        update_post_meta($post_id, "_indocarmarket_sold", $meta_box_checkbox_value);

    }
}
add_action("save_post", "indocarmarket_save_sold", 10, 3);

// widhout header
if ( ! function_exists( 'indocarmarket_without_header' ) ) {
    /* add featured meta box */
    function indocarmarket_without_header(){   
        add_meta_box('featured_check', 
            'Tanpa Header', 
            'indocarmarket_without_header_callback', 
            array('post', 'product', 'page', 'vehicle'), 
            'side', 
            'low'
        );
    }
}
add_action('add_meta_boxes', 'indocarmarket_without_header');

if ( ! function_exists( 'indocarmarket_without_header_callback' ) ) {
    function indocarmarket_without_header_callback() {
        global $post;
        wp_nonce_field( basename( __FILE__ ), 'indocarmarket_featured_nonce' ); ?>

        <div>
            <div class="meta-box">
                <label for="_without_header">Tanpa Header</label>
                <?php 
                    $checkbox_value = get_post_meta($post->ID, "_without_header", true);

                    if ($checkbox_value == '' ) { ?>
                        <input type="checkbox" name="_without_header" value="true">
                    
                    <?php } else if ( $checkbox_value == 'true' ) { ?>
                        <input type="checkbox" name="_without_header" value="true" checked>
                    <?php } ?>
            </div>
            <div class="desc"><i>*Centang untuk hilangkan header.</i></div>
        </div>
  <?php  }
}


if ( ! function_exists( 'indocarmarket_save_featured_settings' ) ) {
    function indocarmarket_save_featured_settings($post_id, $post, $update) {
        if ( !isset( $_POST[ 'indocarmarket_featured_nonce' ] ) || !wp_verify_nonce( sanitize_key( $_POST[ 'indocarmarket_featured_nonce' ] ) , basename( __FILE__ ) ) ) 
            return;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE)  
            return; 
        if (isset( $_POST['post_type'] ) && 'page' == $_POST['post_type']) {  
            if (!current_user_can( 'edit_page', $post_id ) )  
                return $post_id;  
        } elseif (!current_user_can( 'edit_post', $post_id ) ) {  
                return $post_id;  
        } 

        $meta_box_text_value = "";
        $meta_box_checkbox_value = "";

        if(isset($_POST["_without_header"]))
        {
            $meta_box_checkbox_value = $_POST["_without_header"];
        }   
        update_post_meta($post_id, "_without_header", $meta_box_checkbox_value);

    }
}
add_action("save_post", "indocarmarket_save_featured_settings", 10, 3);

// widhout header
if ( ! function_exists( 'indocarmarket_url_slider' ) ) {
    /* add featured meta box */
    function indocarmarket_url_slider(){   
        add_meta_box('url_slider', 
            'URL Slider', 
            'indocarmarket_url_slider_callback', 
            array('post'), 
            'side', 
            'low'
        );
    }
}
add_action('add_meta_boxes', 'indocarmarket_url_slider');

if ( ! function_exists( 'indocarmarket_url_slider_callback' ) ) {
    function indocarmarket_url_slider_callback() {
        global $post;
        wp_nonce_field( basename( __FILE__ ), 'indocarmarket_featured_nonce' ); ?>

        <div>
            <div class="meta-box">
                <label for="_url_slider">URL Slider</label>
                <?php 
                    $url_slider = get_post_meta($post->ID, "_url_slider", true); ?>

                    <input type="text" name="_url_slider" value="<?php echo $url_slider ?>">
                    <?php
/*
                    if ($checkbox_value == '' ) { ?>
                        <input type="checkbox" name="_url_slider" value="true">
                    
                    <?php } else if ( $checkbox_value == 'true' ) { ?>
                        <input type="checkbox" name="_url_slider" value="true" checked>
                    <?php } */?>
            </div>
            <div class="desc"><i>*Hanya untuk Slider</i></div>
        </div>
  <?php  }
}
if ( ! function_exists( 'indocarmarket_save_featured_settings_2' ) ) {
    function indocarmarket_save_featured_settings_2($post_id, $post, $update) {
        if ( !isset( $_POST[ 'indocarmarket_featured_nonce' ] ) || !wp_verify_nonce( sanitize_key( $_POST[ 'indocarmarket_featured_nonce' ] ) , basename( __FILE__ ) ) ) 
            return;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE)  
            return; 
        if (isset( $_POST['post_type'] ) && 'page' == $_POST['post_type']) {  
            if (!current_user_can( 'edit_page', $post_id ) )  
                return $post_id;  
        } elseif (!current_user_can( 'edit_post', $post_id ) ) {  
                return $post_id;  
        } 

        $meta_box_text_value = "";
        $meta_box_checkbox_value = "";

        if(isset($_POST["_url_slider"]))
        {
            $meta_box_checkbox_value = $_POST["_url_slider"];
        }   
        update_post_meta($post_id, "_url_slider", $meta_box_checkbox_value);

    }
}
add_action("save_post", "indocarmarket_save_featured_settings_2", 10, 3);


/**
 * Frontpage slider
 */
add_action( 'indocarmarket_main_slider', 'indocarmarket_get_featured_posts' );
function indocarmarket_get_featured_posts(){
    if ( is_admin() ) {
        return ;
    }

    $tags = esc_attr( indocarmarket_get_option('slide_tag_name') ) ;
    if ( empty( $tags ) ) {
        return;
    }
    //$show_star = esc_attr( indocarmarket_get_option( 'show_star' ) );
    $show_title = esc_attr( indocarmarket_get_option( 'show_slider_title' ) );

    $num_post = absint( indocarmarket_get_option( 'slide_number_post' ) );
    $featured_content_args = array(
        'post_type' => 'post',
        'meta_key' => '_thumbnail_id',
        'tag' => $tags,
        'order' => 'DESC',
        'orderby' => 'date',
        'posts_per_page' => $num_post,
    );

    $f_query = new WP_Query( $featured_content_args );

    if ( $f_query ) { 

        
    ?>

        <div class="yCmsContentSlot container-fluid">
              <div class="yCmsComponent row position-relative">
                <div class="container-fluid">
                  <div class="row position-relative"> 

                    <section class="home-page-banner-carousel slick"> <?php

                    while ( $f_query->have_posts() ): $f_query->the_post();

                    $url_slider = get_post_meta(get_the_ID(), "_url_slider", true);

                    $thumbnail_url = wp_get_attachment_image_src( get_post_thumbnail_id( $f_query->ID ), 'indocar-slider-thumbnail' , true ); ?>
                      
                      <div class="slide slide-home-page cursor-pointer">
                        <a href="<?php echo esc_url(get_the_permalink( get_the_ID() )); ?>">
                          <img class="js-responsive-image w-100" src="<?php echo esc_url( $thumbnail_url[0] ) ?>" alt="<?php  the_title() ?>" />
                        </a>
                      </div>
                    <?php
                    endwhile;
                    ?>
                    </section>
                  </div>
                </div>
              </div>
        </div>
        <?php
        /*echo '<div class="slider-outer-wrapper"><div id="main_slider" class="owl-carousel owl-theme">';
        while ( $f_query->have_posts() ): $f_query->the_post();
            $thumbnail_url = wp_get_attachment_image_src( get_post_thumbnail_id( $f_query->ID ), 'indocar-slider-thumbnail' , true );
            ?>
            <div class="item">
                <img src="<?php echo esc_url( $thumbnail_url[0] ) ?>" alt="" />
                <div class="carousel-caption intro-caption">
                    <div class="slide-info">
                        <div class="slide-content">
                            <?php if ( $show_title == 1) : ?>
                            <h1 class="slider-title"><?php  the_title() ?></h1>
                            <?php endif; ?>
                            <?php  if ( $show_star == 1 ) {  ?>
                            <div class="inline">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <?php } ?>
                            <?php the_excerpt() ?>
                        </div>
                    </div>
                </div>
            </div>*/
            //<?php
        //endwhile;
        //echo '</div></div>';
    }
    wp_reset_postdata();

}

/*add_action( 'indocarmarket_main_video', 'indocarmarket_get_video_post' );
function indocarmarket_get_video_post(){ ?>
    <!--div class="slider-outer-wrapper"-->
        <!--div id="video_slider" class="owl-carousel owl-theme"-->
            <div class=" ">
                <div  class="item-video" data-merge="1">
                    <a class="owl-video" href="https://www.youtube.com/watch?v=JpxsRwnRwCQ"></a>
                    <!--img src='//placehold.it/800x600.png'/>
                    <div class='promo-container'>
                        <div class='promo'>
                            <h2>Promo Title Here</h2>
                            <a href="#" class="btn btn-default">Watch Video</a>
                            <a href="#" class="btn btn-default">Learn More</a>
                        </div>
                    </div-->
                </div>
                
                
            </div>
        <!--/div-->   
    <!--/div-->
<?php
}*/


function create_bootstrap_menu( $theme_location ) {
    if ( ($theme_location) && ($locations = get_nav_menu_locations()) && isset($locations[$theme_location]) ) {
         
         
         
        $menu = get_term( $locations[$theme_location], 'nav_menu' );
        $menu_items = wp_get_nav_menu_items($menu->term_id);
 
        //$menu_list = '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' ."\n";
        $menu_list = '';
          
        foreach( $menu_items as $menu_item ) {
            if( $menu_item->menu_item_parent == 0 ) {
                 
                $parent = $menu_item->ID;
                 
                $menu_array = array();
                foreach( $menu_items as $submenu ) {
                    if( $submenu->menu_item_parent == $parent ) {
                        $bool = true;
                        $menu_array[] = '<a class="dropdown-item" href="' . $submenu->url . '">' . $submenu->title . '</a>' ."\n";
                    }
                }
                if( $bool == true && count( $menu_array ) > 0 ) {
                     
                    $menu_list .= '<li class="nav-item dropdown">' ."\n";
                    $menu_list .= '<a class="nav-link dropdown-toggle" href="' . $menu_item->url . '" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' . $menu_item->title . ' <span class="caret"></span></a>' ."\n";
                     
                    $menu_list .= '<div class="dropdown-menu">' ."\n";
                    $menu_list .= implode( "\n", $menu_array );
                    $menu_list .= '</div>' ."\n";
                    $menu_list .= '</li>';
                     
                } else {
                     
                    $menu_list .= '<li class="nav-item">' ."\n";
                    $menu_list .= '<a class="nav-item nav-link" href="' . $menu_item->url . '">' . $menu_item->title . '</a>' ."\n";
                }
                 
            }
             
            // end <li>
            $menu_list .= '</li>' ."\n"; 
        }            
          
        //$menu_list .= '</ul>' ."\n";
  
    } else {
        $menu_list = '<!-- no menu defined in location "'.$theme_location.'" -->';
    }
     
    echo $menu_list;
}

function create_mobile_menu( $theme_location ) {
    if ( ($theme_location) && ($locations = get_nav_menu_locations()) && isset($locations[$theme_location]) ) {
         
         
         
        $menu = get_term( $locations[$theme_location], 'nav_menu' );
        $menu_items = wp_get_nav_menu_items($menu->term_id);
 
        //$menu_list = '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' ."\n";
        $menu_list = '';
          
        foreach( $menu_items as $menu_item ) {
            if( $menu_item->menu_item_parent == 0 ) {
                 
                $parent = $menu_item->ID;
                 
                $menu_array = array();
                foreach( $menu_items as $submenu ) {
                    if( $submenu->menu_item_parent == $parent ) {
                        $bool = true;
                        $menu_array[] = '<li><a href="' . $submenu->url . '">' . $submenu->title . '</a></li>';
                    }
                }
                if( $bool == true && count( $menu_array ) > 0 ) {
                     
                    $menu_list .= '<a class="nav-item nav-link submenu" role="button" data-toggle="collapse" href="#mobile'.$menu_item->menu_order.'" aria-expanded="true" aria-controls="mobile'.$menu_item->menu_order.'">' . $menu_item->title . '</a>' ."\n";
                    $menu_list .= '<div id="mobile'.$menu_item->menu_order.'" class="panel-collapse collapse nav-slider-collapse in" role="tabpanel">' ."\n";
                     
                    $menu_list .= '<ul class="submenu-mobile">' ."\n";
                    $menu_list .= implode( "\n", $menu_array );
                    $menu_list .= '</ul>' ."\n";
                    $menu_list .= '</div>';
                     
                } else {
                     
                    $menu_list .= '<a class="nav-item nav-link" href="' . $menu_item->url . '">' . $menu_item->title . '</a>' ."\n";
                }
                 
            }
             
            // end <li>
            $menu_list .= '</li>' ."\n"; 
        }            
          
        //$menu_list .= '</ul>' ."\n";
  
    } else {
        $menu_list = '<!-- no menu defined in location "'.$theme_location.'" -->';
    }
     
    echo $menu_list;


}


function mobil_keren_custom_header_setup() {
    add_theme_support( 'custom-header', apply_filters( 'mobil_keren_custom_header_args', array(
        'default-image'          => '',
        'default-text-color'     => '000000',
        'width'                  => 1366,
        'height'                 => 300,
        'flex-height'            => true,
        'flex-width'             => true,
        'wp-head-callback'       => 'mobil_keren_header_style',
    ) ) );
}
add_action( 'after_setup_theme', 'mobil_keren_custom_header_setup' );

if ( ! function_exists( 'mobil_keren_header_style' ) ) :
    /**
     * Styles the header image and text displayed on the blog.
     *
     * @see mobil_keren_custom_header_setup().
     */
    function mobil_keren_header_style() {
        $header_text_color = get_header_textcolor();

        /*
         * If no custom options for text are set, let's bail.
         * get_header_textcolor() options: Any hex value, 'blank' to hide text. Default: add_theme_support( 'custom-header' ).
         */
        if ( get_theme_support( 'custom-header', 'default-text-color' ) === $header_text_color ) {
            return;
        }

        // If we get this far, we have custom styles. Let's do this.
        ?>
        <style type="text/css">
        <?php
        // Has the text been hidden?
        if ( ! display_header_text() ) :
        ?>
            .site-title,
            .site-description {
                position: absolute;
                clip: rect(1px, 1px, 1px, 1px);
            }
        <?php
            // If the user has set a custom color for the text use that.
            else :
        ?>
            .site-title a,
            .site-description {
                color: #<?php echo esc_attr( $header_text_color ); ?>;
            }
        <?php endif; ?>
        </style>
        <?php
    }
endif;


if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) { ADDTOANY_SHARE_SAVE_KIT(); }

if ( ! function_exists( 'form_post_search' ) ) :

    function form_post_search() { ?>

        <div class="widget search-widget">
            <form action="<?php echo get_site_url() ?>">
                <input type="text" id="carros-blog-search" name="s" placeholder="Cari berita/promo di sini!" />
                <input type="hidden" name="post_type" value="post" />
                <button type="submit"><i class="fas fa-search"></i></button>
            </form>
        </div>
    <?php
    }
endif;

?>

