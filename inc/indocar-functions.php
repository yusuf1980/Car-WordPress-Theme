<?php
/**
 * next functions for this theme.
 *
 * @package Indocar Market
 */

add_filter( 'pcd/get_specs', 'autocar_specification', 1, 2 );
function autocar_specification( $html, $fields ){
	$html = '';
	global $post;
	if ( ! empty( $fields ) ) {

		$html .= '<ul class="car-info">';
		
		$categories = get_the_terms($post->ID,'make');
		foreach($categories as $category) {      
			$make = $category->name;
			break;
		}
		
		/*$categories = get_the_terms($post->ID,'model');
		foreach($categories as $category) {      
			$model = $category->name;
			break;
		}*/
		
		$html .= "<li><span>". esc_html__('Merek','autocar')."</span> <p>". esc_html($make) ."</p></li>";
		//$html .= "<li><span>". esc_html__('Model','autocar')."</span> <p>". esc_html($model) ."</p></li>";
		
		foreach ( $fields as $k => $field ) {

			$label = $field['label'];

			$html .= "<li><span>". esc_html($label)."</span> <p>". $fields[$k]['value'] ."</p></li>";

		}

		$html .= "<li><span class='date_new'><i class='fa fa-clock-o'></i> Diposting pada ".get_the_date()."</span></li>";

		$html .= '</ul>';
		return $html;
	}
}

function autocar_get_vehicle_specs($post_id = null){
	global $car_dealer;

	$html = '';

	$fields = $car_dealer->fields->get_registered_fields( 'specs' );

	// render output
	if ( ! empty( $fields ) ) {
		foreach ( $fields as $k => $field ) {
			echo '<li>';
			$label = $field['label'];
			if($post_id === null){			
				echo '<a href="#">'.esc_html($label).'</a>';			
			}elseif($post_id === ''){
				//echo '<a href="#"></a>';
			}else{
        		$name  = $field['name'];

        		$value = get_field( $field['name'], $post_id );

        		if ( $value ) { 
					echo '<a href="#">'.esc_html($value).'</a>';	
        		}
				
			}
			echo '</li>';
		}		
	}	
}

if ( ! function_exists( 'autocar_postsnavigation' ) ) :

function autocar_postsnavigation($query) {

	/** Stop execution if there's only 1 page */
	if( $query->max_num_pages <= 1 )
		return;

	$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
	$max   = intval( $query->max_num_pages );

	/**	Add current page to the array */
	if ( $paged >= 1 )
		$links[] = $paged;

	/**	Add the pages around the current page to the array */
	if ( $paged >= 3 ) {
		$links[] = $paged - 1;
		$links[] = $paged - 2;
	}

	if ( ( $paged + 2 ) <= $max ) {
		$links[] = $paged + 2;
		$links[] = $paged + 1;
	}

	echo '<div class="page-numbers"><div class="pagination-content"><ul>' . "\n";

	/**	Previous Post Link */
	if ( get_previous_posts_link() )
		//printf( '<li>%s</li>' . "\n", get_previous_posts_link() );

	/**	Link to first page, plus ellipses if necessary */
	if ( ! in_array( 1, $links ) ) {
		$class = 1 == $paged ? ' class="active"' : '';

		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );

		if ( ! in_array( 2, $links ) )
			echo '<li>...</li>'. "\n";
	}

	/**	Link to current page, plus 2 pages in either direction if necessary */
	sort( $links );
	foreach ( (array) $links as $link ) {
		$class = $paged == $link ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
	}

	/**	Link to last page, plus ellipses if necessary */
	if ( ! in_array( $max, $links ) ) {
		if ( ! in_array( $max - 1, $links ) )
			echo '<li>...</li>' . "\n";

		$class = $paged == $max ? ' class="active"' : '';
		printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
	}

	/**	Next Post Link */
	if ( get_next_posts_link() )
		printf( '<li>%s</li>', get_next_posts_link('<i class="fa fa-angle-double-right"></i>') );

	echo '</ul></div></div>' . "\n";

}
endif;

function fwp_archive_per_page( $query ) {
    if ( is_tax( 'make' ) ) {
        //$query->set( 'posts_per_page', 2 );
    }
}
add_filter( 'pre_get_posts', 'fwp_archive_per_page' );


if ( ! function_exists( 'sold_image_content' ) ) :

	function sold_image_content() { ?>
		<div class="sold_image">
        	<img src="<?php echo get_template_directory_uri() . '/assets/images/terjual_.png';?>" alt="">
        </div>
        <?php
	}

endif;

if ( ! function_exists( 'sold_price_content' ) ) :

	function sold_price_content($sold) { 
		if(!empty($sold)) : ?>
            	<p class="sold-price">
                		Item ini telah terjual
               	</p>
        <?php else: ?>
        	<p class="price"><?php echo do_shortcode( "[vehicle_price]" ); ?></p>
        <?php endif; ?>
    <?php
	}

endif;

if ( ! function_exists( 'milage_content' ) ) :

	function milage_content() {
		if(!empty(do_shortcode( "[vehicle_milage]" ) )) { 
			echo '| '.do_shortcode( "[vehicle_milage]" ) . ' KM';
		} else {
			echo '';
		}
	}

endif;

if ( ! function_exists( 'milage_content_single' ) ) :

	function milage_content_single() {
		if(!empty(do_shortcode( "[vehicle_milage]" ) )) { 
			echo do_shortcode( "[vehicle_milage]" ) . ' KM';
		} else {
			echo '';
		}
	}

endif;

if ( ! function_exists( 'column_vehicle_search' ) ) :

	function column_vehicle_search() { ?>
		<div class="yCmsContentSlot">
              <div class="yCmsComponent yComponentWrapper search-column">
                <div class="container search-area">
                  <h1 class="mobile-text-centre" id="othdiv">Cari Mobil Bekas di Carros</h1>
                  <form action="<?php echo get_site_url() ?>">
                    <div class="row nomargin carros-search-input">
                      <div class="col-12 col-sm-12 col-md-12 col-lg-5	col-xl-5 input-area">
                        <input name="s" tipe="text" id="searchstring" placeholder="Masukan Merek/Nama Mobil" />
                        <input type="hidden" name="post_type" value="vehicle" />
                      </div>

                      <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 select-area">
                        <div class="price-search-input input-home">
                          <i class="fas fa-money-bill-alt carros-main-color"></i>
                          <select class="custom-select" name="price" id="">
                            <option value="">Semua Harga</option>
                            <option value="100">1-100 Juta</option>
                            <option value="200">100-200 Juta</option>
                            <option value="400">200-400 Juta</option>
                            <option value="900">400-900 Juta</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-12	col-sm-12	col-md-12 col-lg-3	col-xl-3 select-area">
                        <div class="year-search-input input-home">
                          <i class="fas fa-car carros-main-color"></i>
                          <select class="custom-select" name="year" id="">
                            <option value="">Semua Tahun</option>
                            <option value="2018">Diatas 2018</option>
                            <option value="2017">2016-2017</option>
                            <option value="2015">2012-2015</option>
                            <option value="2012">Dibawah 2012</option>
                          </select>
                        </div>
                      </div>

                      <button class="col-12	col-sm-12	col-md-12 col-lg-1	col-xl-1 search-btn">
                        <span class="seach-icon"></span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    <?php
	}

endif;

function sydney_child_add_fontawesome_cdn() {
    ?>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <?php
    }
    add_action('wp_head', 'sydney_child_add_fontawesome_cdn');

    function sydney_child_loads_font_awesome_script() {
       // Remove Font Awesome from main theme
       wp_dequeue_style( 'sydney-font-awesome' );
    }
    add_action( 'wp_enqueue_scripts', 'sydney_child_loads_font_awesome_script', 999 );



// Enqueue additional admin scripts
add_action('admin_enqueue_scripts', 'ctup_wdscript');
function ctup_wdscript() {
    wp_enqueue_media();
    
    //wp_enqueue_script('ads_script', get_template_directory_uri() . '/assets/admin/js/widgets.js', false, '1.0.0', true);
}
