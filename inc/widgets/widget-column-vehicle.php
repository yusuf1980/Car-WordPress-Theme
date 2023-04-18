<?php
/**
 * Adds indocarmarket_column_vehicle_widget.
*/

add_action('widgets_init', 'indocarmarket_column_vehicle_widget');

function indocarmarket_column_vehicle_widget() {
    register_widget('indocarmarket_column_vehicle_widget_area');
}

class indocarmarket_column_vehicle_widget_area extends WP_Widget {
	/**
     * Register widget with WordPress.
    */
    public function __construct() {
        parent::__construct(
            'indocarmarket_column_vehicle', esc_html_x('Mobil - 4 Kolom', 'widget name', 'indocarmarket'),
            array(
                'classname' => 'indocarmarket_column_vehicle',
                'description' => esc_html__('Widget menampilkan List (Daftar) Mobil', 'indocarmarket'),
                'customize_selective_refresh' => true
            )
        );
    }

    private function widget_fields() {

        $fields = array(
            
            'indocarmarket_block_title' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_title',
                'indocarmarket_widgets_title' => esc_html__('Judul Blok', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'title',
            ),

            'indocarmarket_sord_by' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_sord_by',
                'indocarmarket_widgets_title' => esc_html__('Mobil Berdasar Urutan', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'select',
                'indocarmarket_widgets_field_options' => array('desc' => 'Mobil Terbaru', 'asc' => 'Mobil Pertama')
            ),

            'indocarmarket_rand' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_rand',
                'indocarmarket_widgets_title' => esc_html__('Mobil Random', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'checkbox',
            ),


            'indocarmarket_made_list' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_made_list',
                'indocarmarket_widgets_title' => esc_html__('Pilih Merek', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'select_make_vehicle',
                //'indocarmarket_widgets_field_options' => $cat_lists
            ),

            'indocarmarket_block_display_number_posts' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_display_number_posts',
                'indocarmarket_widgets_title' => esc_html__('Jumlah Mobil Per Halaman', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'number',
            ),

            'indocarmarket_block_url_all_posts' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_url_all_posts',
                'indocarmarket_widgets_title' => esc_html__('URL Lihat Lainnya', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'text',
            ),

            /*'indocarmarket_block_info' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_info',
                'indocarmarket_widgets_title' => esc_html__('Info', 'indocarmarket'),
                'indocarmarket_widgets_description' => esc_html__('Widget ini Menampilkan Seluruh Daftar Mobil.', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'info',
            )*/
            
        );

        return $fields;
    }



    public function widget($args, $instance) {
        extract($args);
        
        /**
         * wp query for first block
        */
		$title        = apply_filters( 'widget_title', empty($instance['indocarmarket_block_title']) ? '' : $instance['indocarmarket_block_title'], $instance, $this->id_base);
		$number_posts = empty( $instance['indocarmarket_block_display_number_posts'] ) ? 5 : $instance['indocarmarket_block_display_number_posts'];
		$sort_by      = empty( $instance['indocarmarket_sord_by'] ) ? 'desc' : $instance['indocarmarket_sord_by'];
		$p_term_id    = empty( $instance['indocarmarket_made_list'] ) ? '' : $instance['indocarmarket_made_list'];
        $view_all     = empty( $instance['indocarmarket_block_url_all_posts'] ) ? '' : $instance['indocarmarket_block_url_all_posts'];
		$rand         = $instance['indocarmarket_rand'] == 1 ? 'rand' : 'date';

        $term_id_in = [];

        if( !empty($p_term_id) ) {
            $term_id_in = array(
                array(
                    'taxonomy' => 'make',
                    'field'    => 'term_id',
                    'terms'    => $p_term_id,
                )
                
            );
        }
        $args = array(
			'post_type'      => 'vehicle',
			'posts_per_page' => $number_posts,
			'tax_query'      => $term_id_in,
            'meta_key'     => '_indocarmarket_sold',
            /*'orderby' => 'meta_value_num',
            'meta_query'      => array(
                'relation' => 'AND',
                '_indocarmarket_sold'    => array(
                    'value'     => 1,
                ),
            ),
            'orderby' => array( 
                '_indocarmarket_sold' => 'asc',
            ),*/
            'orderby' => array( 
                '_indocarmarket_sold' => 'asc', 'date' => 'desc'
            ),
            
			'order'          => $sort_by,
			//'orderby'        => $rand,
        );

        //array_push($args,$ter);

        $query = new WP_Query( $args );

        echo $before_widget; 

    ?>

        <section class="featured-car section">
              <div class="container position-relative clearfix">
                <div class="title-section">
                  <h2><?php echo esc_attr( $title ); ?></h2>
                </div>

                <div class="row padding-7">
                   <?php 
                    while( $query->have_posts() ): $query->the_post(); 
                    $sold = get_post_meta( get_the_ID(), '_indocarmarket_sold', true);
                ?>

                <div class="col-6 col-sm-3">
                                <div class="featured-car-product for-compare-button">
                                  
                                  
                                  <a class="featured-car-product-link" href="<?php echo esc_url(get_the_permalink( get_the_ID() )); ?>" tabindex="0">
                                    <div class="img-area">

                                      <?php 
                                        $src = '';
                                        if(has_post_thumbnail()) {
                                            $thumb = get_post_thumbnail_id( get_the_ID() );
                                            $src = wp_get_attachment_image_src($thumb,'indocar-special_thumbnail'); 
                                            echo '<img src="'.esc_url($src[0]).'" alt="" />';
                                        }  ?>
                                        
                                        <?php                         
                                            if(!empty($sold)) { 
                                                sold_image_content();
                                            }
                                            
                                        ?>
                                        
                                      
                                      <span class="undefined"></span>
                                    </div>
                                    
                                    <section class="description">
                                      <h5 class="product-name"><?php echo the_title(); ?></h5>
                                      
                                      <p class="product-feature">
                                        <?php echo do_shortcode( "[vehicle_registration]" ) ?> 
                                        <?php echo milage_content() ?> | 
                                        <?php echo do_shortcode( "[vehicle_transmission]" ) ?> 
                                      </p>

                                      <?php sold_price_content($sold); ?>
                                    </section>
                                  </a>
                                  
                                  <div class="compare-cta-box">
                                    <button class="compare-cta" tabindex="0">
                                      <span class="inactive-icon"><i class="fas fa-phone-square-alt"></i></span>
                                      &nbsp;Lihat Mobil
                                    </button>
                                  </div>
                                </div>
                </div>
                <?php 
                    endwhile;  
                wp_reset_postdata(); ?>
                </div>

                <a href="<?php echo $view_all ?>" class="see-more-btn" id="featuredcar-viewall">Lihat Semua Mobil <i class="fas fa-angle-double-right"></i></a>
              </div>
            </section>
    <?php  
    }

    public function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $widget_fields = $this->widget_fields();
        foreach ($widget_fields as $widget_field) {
            extract($widget_field);
            $instance[$indocarmarket_widgets_name] = indocarmarket_widgets_updated_field_value( $widget_field, $new_instance[$indocarmarket_widgets_name] );
        }
        return $instance;
    }

    public function form($instance) {
        $widget_fields = $this->widget_fields();
        foreach ( $widget_fields as $widget_field ) {
            extract( $widget_field );
            $indocarmarket_widgets_field_value = !empty( $instance[ $indocarmarket_widgets_name ] ) ? $instance[ $indocarmarket_widgets_name ] : '';
            indocarmarket_widgets_show_widget_field( $this, $widget_field, $indocarmarket_widgets_field_value );
        }
    }
}