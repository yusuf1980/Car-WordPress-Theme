<?php
/**
 * Adds indocarmarket_all_vehicle widget.
*/

add_action('widgets_init', 'indocarmarket_all_vehicle_widget');

function indocarmarket_all_vehicle_widget() {
    register_widget('indocarmarket_all_vehicle_widget_area');
}

class indocarmarket_all_vehicle_widget_area extends WP_Widget {

	/**
     * Register widget with WordPress.
    */
    public function __construct() {
        parent::__construct(
            'indocarmarket_recent_posts', esc_html_x('Mobil - Semua Daftar', 'widget name', 'indocarmarket'),
            array(
                'classname' => 'indocar_all_vehicle',
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

            /*'indocarmarket_posts_type' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_posts_type',
                'indocarmarket_widgets_title' => esc_html__('Mobil Berdasar Urutan', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'select',
                'indocarmarket_widgets_field_options' => array('desc' => 'Mobil Terbaru', 'rand' => 'Random Mobil')
            ),*/


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
        $title = apply_filters( 'widget_title', empty($instance['indocarmarket_block_title']) ? '' : $instance['indocarmarket_block_title'], $instance, $this->id_base);
        $number_posts        = empty( $instance['indocarmarket_block_display_number_posts'] ) ? 5 : $instance['indocarmarket_block_display_number_posts'];
        $p_term_id       = empty( $instance['indocarmarket_made_list'] ) ? '' : $instance['indocarmarket_made_list'];

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
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        $args = array(
            'post_type' => 'vehicle',
            'paged'          => $paged,
            'posts_per_page' => $number_posts,
            'tax_query' => $term_id_in,
            'meta_key'     => '_indocarmarket_sold',
            /*'orderby' => 'meta_value_num',
            'meta_query'      => array(
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
            'order' => 'DESC',

            );

        //array_push($args,$ter);

        $query = new WP_Query( $args );

        echo $before_widget; 

    ?>
        <div class="recent-car similar-car">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <div class="atc_sect_heading">
                            <h4 class="title-des"><?php echo esc_attr( $title ); ?></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="" class="carousel owl-theme">
                <div class="row">
                    <?php 
                   
                    while( $query->have_posts() ): $query->the_post(); 
                    $sold = get_post_meta( get_the_ID(), '_indocarmarket_sold', true);
                    ?>
                    <div class="col-6">
                        <div class="product-box my-2">
                        <a href="<?php echo esc_url(get_the_permalink( get_the_ID() )); ?>">
                            <div class="media-product">
                                <div class="image-list-product">
                                <?php 
                                    $src = '';
                                    if(has_post_thumbnail()){
                                        $thumb = get_post_thumbnail_id( get_the_ID() );
                                        $src = wp_get_attachment_image_src($thumb,'indocar-product_thumbnail'); 
                                        echo '<img class="rounded" src="'.esc_url($src[0]).'" />';
                                    }                           
                                    
                                    ?>
                                    <?php                         
                                        if(!empty($sold)) { 
                                            sold_image_content();
                                        }
                                    ?>
                                </div>
                            </div>
                            <div class="info-product px-2 py-1">
                                    <h6 class="tw-product-title my-2"><?php echo the_title(); ?></h6>
                                    <div class=""><?php echo get_term_by('id',get_field( 'make', get_the_ID() ),'make')->name; ?></div>
                                <?php  
                                    sold_price_content($sold);
                                ?>
                            </div>
                        </a>
                        </div>
                    </div>
                    <?php 
                    endwhile;  
                    wp_reset_postdata(); ?>
                    <div class="col-12">
                        <div class="pagination">
                            <?php autocar_postsnavigation($query); //bootstrap_wpbs_pagination(); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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