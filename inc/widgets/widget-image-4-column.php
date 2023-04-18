<?php
/**
 * Adds indocarmarket_post_widget.
*/

add_action('widgets_init', 'indocarmarket_4_column_widget');

function indocarmarket_4_column_widget() {
    register_widget('indocarmarket_4_column_area');
}

class indocarmarket_4_column_area extends WP_Widget {
	/**
     * Register widget with WordPress.
    */
    public function __construct() {
        parent::__construct(
            'indocarmarket_4_column_widget', esc_html_x('Mobil - 4 Kolom Gambar', 'widget name', 'indocarmarket'),
            array(
                'classname' => 'indocarmarket_4_column_widget',
                'description' => esc_html__('Widget menampilkan 4 Gambar', 'indocarmarket'),
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

            'indocarmarket_image_1' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_image_1',
                'indocarmarket_widgets_title' => esc_html__('Gambar 1', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'upload',
            ),

            'indocarmarket_url_image_1' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_url_image_1',
                'indocarmarket_widgets_title' => esc_html__('URL Gambar 1', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'text',
            ),


            /*'indocarmarket_made_list' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_category_list',
                'indocarmarket_widgets_title' => esc_html__('Pilih Kategori', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'select_category',
                //'indocarmarket_widgets_field_options' => $cat_lists
            ),

            'indocarmarket_block_display_number_posts' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_display_number_posts',
                'indocarmarket_widgets_title' => esc_html__('Jumlah Mobil Per Halaman', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'number',
            ),

            'indocarmarket_block_url_all_vehicle' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_block_url_all_vehicle',
                'indocarmarket_widgets_title' => esc_html__('URL Lihat Lainnya', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'text',
            ),*/
        );

        return $fields;
    }

    public function widget($args, $instance) {
        extract($args);
        
        /**
         * wp query for first block
        */
		$title        = apply_filters( 'widget_title', empty($instance['indocarmarket_block_title']) ? '' : $instance['indocarmarket_block_title'], $instance, $this->id_base);
		$image_1 = empty( $instance['indocarmarket_image_1'] ) ? 5 : $instance['indocarmarket_image_1'];
		$url_1 = empty( $instance['indocarmarket_url_image_1'] ) ? 5 : $instance['indocarmarket_url_image_1'];

        echo $before_widget; 
        ?>
        
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