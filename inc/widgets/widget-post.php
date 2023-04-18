<?php
/**
 * Adds indocarmarket_post_widget.
*/

add_action('widgets_init', 'indocarmarket_post_widget');

function indocarmarket_post_widget() {
    register_widget('indocarmarket_post_widget_area');
}

class indocarmarket_post_widget_area extends WP_Widget {
	/**
     * Register widget with WordPress.
    */
    public function __construct() {
        parent::__construct(
            'indocarmarket_post_widget', esc_html_x('Mobil - Tampil Pos', 'widget name', 'indocarmarket'),
            array(
                'classname' => 'indocarmarket_post_widget',
                'description' => esc_html__('Widget menampilkan List (Daftar) Pos', 'indocarmarket'),
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
                'indocarmarket_widgets_title' => esc_html__('Post Berdasar Urutan', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'select',
                'indocarmarket_widgets_field_options' => array('desc' => 'Pos Terbaru', 'asc' => 'Pos Pertama')
            ),

            'indocarmarket_rand' => array(
                'indocarmarket_widgets_name' => 'indocarmarket_rand',
                'indocarmarket_widgets_title' => esc_html__('Post Random', 'indocarmarket'),
                'indocarmarket_widgets_field_type' => 'checkbox',
            ),


            'indocarmarket_made_list' => array(
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
            ),
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
		$catgory_id   = empty( $instance['indocarmarket_category_list'] ) ? '' : $instance['indocarmarket_category_list'];
        $view_all     = empty( $instance['indocarmarket_block_url_all_vehicle'] ) ? '' : $instance['indocarmarket_block_url_all_vehicle'];
		$rand         = empty( $instance['indocarmarket_rand'] ) ? 'ID' : 'rand';

		$slug = indocarmarket_get_option('slide_tag_name');
		$term = get_term_by('slug', $slug, 'post_tag'); 

		$args = array( 
			'ignore_sticky_posts' => 1, 
            'category__in' => $catgory_id,
			'posts_per_page' => $number_posts, 
			'post_status' => 'publish', 
			'order' => $sort_by,
			'orderby' => $rand,
			'tag__not_in' => $term->term_id
			);

		$query = new WP_Query( $args );

        echo $before_widget; 
        ?>
        

        <section class="article-home section">
              <div class="container position-relative clearfix">
                <div class="title-section">
                  <h2><?php echo $title ?></h2>
                </div>
  
                <div class="row">
                    <?php $i = 1; ?>
                    <?php while( $query->have_posts() ): $query->the_post(); 
                    $image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'indocar-post-home-big', true);
                    if($i==1) :
                    ?>
                    <?php if( has_post_thumbnail() ){ ?>
                    <div class="col-12 col-sm-6 padding-sm-right-0">
                        <a href="<?php the_permalink(); ?>">
                      <img class="bg-gray-lightest col-xs-12 padding-0" src="<?php echo esc_url( $image[0] ); ?>">
                      </a>
                    </div>
                    <?php } ?>
                    <div class="col-12 <?php echo has_post_thumbnail()?'col-sm-6':'';?> padding-sm-left-0">
                      <div class="desc-big-news bg-gray-lightest">
                        <h4 class="text-uppercase text-gray text-size-14 text-bold category-blog-big"><?php indocarmarket_entry_category(); ?></h4>
                        <h3 class="text-gray-base text-size-sm-20 text-link title-big-blog"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p class="text-gray-dark padding-top-4 display-sm-block desc-blog">
                            <?php the_excerpt() ?>
                        </p>
                      </div>
                    </div>
                    <?php 
                    endif;
                    $i++;
                    endwhile;  
                    wp_reset_postdata(); ?>
                </div>

                <div class="row list-small">
                    <?php $s = 1; ?>
                    <?php while( $query->have_posts() ): $query->the_post(); 
                    $image_sm = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'indocar-post-home-small', true);
                    if($s!=1) :
                    ?>
                    <div class="col-12 col-sm-6 col-lg-3 pt-3">
                      <div class="row">
                        <div class="image-blog-home col-4 col-sm-12">
                          <a href="<?php the_permalink(); ?>">
                            <img src="<?php echo esc_url( $image_sm[0] ); ?>" alt="">
                          </a>
                        </div>
                        <div class="desc-list-blog col-8 col-sm-12">
                          <a href="<?php the_permalink(); ?>">
                            <h6 class="text-uppercase text-gray text-bold cat-small-blog"><?php indocarmarket_entry_category(); ?></h6>
                          </a>
                          <div class="display-flex justify-content-between title-small-blog">
                            <a class="text-gray-base" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?php 
                    endif;
                    $s++;
                    endwhile;  
                    wp_reset_postdata(); ?>
                </div> 

                <a href="<?php echo $view_all; ?>" class="see-more-btn"> Lihat Semua <i class="fas fa-angle-double-right"></i></a>
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