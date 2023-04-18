<?php
/**
 * Main Custom admin widget field area
 *
 * @since Indocar Market
 *
 * @param indocarmarket
 */

function indocarmarket_widgets_show_widget_field($instance = '', $widget_field = '', $indocar_field_value = '') {
   
    //list category list in array
    $indocarmarket_category_list[0] = array(
        'value' => 0,
        'label' => esc_html__('Select Categories','indocarmarket')
    );
    $indocarmarket_posts = get_categories();
    foreach ($indocarmarket_posts as $indocarmarket_post) :
        $indocarmarket_category_list[$indocarmarket_post->term_id] = array(
            'value' => $indocarmarket_post->term_id,
            'label' => $indocarmarket_post->name
        );
    endforeach;

    // list merek (make)
    $indocarmarket_merek_list[0] = array(
        'value' => 0,
        'label' => esc_html__('Semua Merek','indocarmarket')
    );
    $terms_make = get_terms( array(
	    'taxonomy' => 'make',
	    'hide_empty' => false,
	) );
    foreach ($terms_make as $indocarmarket_make) :
        $indocarmarket_merek_list[$indocarmarket_make->term_id] = array(
            'value' => $indocarmarket_make->term_id,
            'label' => $indocarmarket_make->name
        );
    endforeach;

    extract($widget_field);

    switch ($indocarmarket_widgets_field_type) {

        /**
         * Standard Text Field
         */
        case 'text' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <input class="widefat" id="<?php echo esc_attr( $instance->get_field_id($indocarmarket_widgets_name) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="text" value="<?php echo esc_attr( $indocar_field_value ) ; ?>" />
                <?php if ( isset( $indocarmarket_widgets_description ) ) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        /**
         * Section Title Field
         */
        case 'title' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <input class="widefat" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="text" value="<?php echo esc_attr( $indocar_field_value ); ?>" />
                <?php if (isset( $indocarmarket_widgets_description )) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        /**
         * Section Title Field
         */
        case 'info' : ?>
            <p>
                <strong for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?>: </strong>
                <?php if (isset( $indocarmarket_widgets_description )) { ?>
                    <?php echo esc_html( $indocarmarket_widgets_description ); ?>
                <?php } ?>
            </p>
            
            <?php
            break;

        /**
         * Standard URL Field
         */
        case 'url' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <input class="widefat" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="text" value="<?php echo esc_attr( $indocar_field_value ); ?>" />
                <?php if (isset( $indocarmarket_widgets_description )) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        /**
         * Textarea field
         */
        case 'textarea' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <textarea class="widefat" rows="<?php echo absint( $indocarmarket_widgets_row ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>">
                    <?php echo esc_attr( $indocar_field_value ); ?>
                </textarea>
            </p>
            <?php
            break;

        /**
         * Checkbox field
         */
        case 'checkbox' : ?>
            <p>
                <input id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="checkbox" value="1" <?php checked('1', $indocar_field_value ); ?> />
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <?php if (isset($indocarmarket_widgets_description)) { ?>
                    <br />
                    <small><?php echo esc_html($indocarmarket_widgets_description); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        /**
         * Radio field
         */
        case 'radio' : ?>
            <p>
                <?php
                echo esc_attr( $indocarmarket_widgets_title );
                echo '<br />';
                foreach ($indocarmarket_widgets_field_options as $indocarmarket_option_name => $indocarmarket_option_title) { ?>
                    <input id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_option_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="radio" value="<?php echo esc_attr( $indocarmarket_option_name ); ?>" <?php checked( $indocarmarket_option_name, $indocar_field_value ); ?> />
                    <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_option_name ) ); ?>"><?php echo esc_attr( $indocarmarket_option_title ); ?></label>
                    <br />
                <?php } ?>

                <?php if (isset($indocarmarket_widgets_description)) { ?>
                    <small><?php echo esc_html($indocarmarket_widgets_description); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        /**
         * Select field
         */
        case 'select' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label>
                <select name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" class="widefat">
                    <?php foreach ( $indocarmarket_widgets_field_options as $indocarmarket_option_name => $indocarmarket_option_title ) { ?>
                        <option value="<?php echo esc_attr( $indocarmarket_option_name ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_option_name ) ); ?>" <?php selected( $indocarmarket_option_name, $indocar_field_value ); ?>><?php echo esc_attr( $indocarmarket_option_title ); ?></option>
                    <?php } ?>
                </select>

                <?php if (isset($indocarmarket_widgets_description)) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        case 'number' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?></label><br />
                <input name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" type="number" step="1" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" value="<?php echo esc_attr( $indocar_field_value ); ?>" class="widefat" />

                <?php if ( isset( $indocarmarket_widgets_description ) ) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;        

        // Select category field
        case 'select_category' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?> :</label>
                <select name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" class="widefat">
                    <?php foreach ($indocarmarket_category_list as $indocarmarket_single_post) { ?>
                        <option value="<?php echo esc_attr( $indocarmarket_single_post['value'] ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_single_post['label'] ) ); ?>" <?php selected( $indocarmarket_single_post['value'], $indocar_field_value ); ?> ><?php echo esc_attr( $indocarmarket_single_post['label'] ); ?></option>
                    <?php } ?>
                </select>

                <?php if (isset($indocarmarket_widgets_description)) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        // Select category field
        case 'select_make_vehicle' : ?>
            <p>
                <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>"><?php echo esc_attr( $indocarmarket_widgets_title ); ?> :</label>
                <select name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" class="widefat">
                    <?php foreach ($indocarmarket_merek_list as $indocarmarket_single_post) { ?>
                        <option value="<?php echo esc_attr( $indocarmarket_single_post['value'] ); ?>" id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_single_post['label'] ) ); ?>" <?php selected( $indocarmarket_single_post['value'], $indocar_field_value ); ?> ><?php echo esc_attr( $indocarmarket_single_post['label'] ); ?></option>
                    <?php } ?>
                </select>

                <?php if (isset($indocarmarket_widgets_description)) { ?>
                    <br />
                    <small><?php echo esc_html( $indocarmarket_widgets_description ); ?></small>
                <?php } ?>
            </p>
            <?php
            break;

        //Multi checkboxes
        case 'multicheckboxes' :
            
            if( isset( $indocarmarket_mulicheckbox_title ) ) { ?>
                <label><?php echo esc_attr( $indocarmarket_mulicheckbox_title ); ?></label>
            <?php }
            echo '<div class="indocarmarket-multiplecat">';
                foreach ( $indocarmarket_widgets_field_options as $indocarmarket_option_name => $indocarmarket_option_title) {
                    if( isset( $indocar_field_value[$indocarmarket_option_name] ) ) {
                        $indocar_field_value[$indocarmarket_option_name] = 1;
                    }else{
                        $indocar_field_value[$indocarmarket_option_name] = 0;
                    }                
                ?>
                    <p>
                        <input id="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ); ?>" name="<?php echo esc_attr( $instance->get_field_name( $indocarmarket_widgets_name ) ).'['.esc_attr( $indocarmarket_option_name ).']'; ?>" type="checkbox" value="1" <?php checked('1', $indocar_field_value[$indocarmarket_option_name]); ?>/>
                        <label for="<?php echo esc_attr( $instance->get_field_id( $indocarmarket_option_name ) ); ?>"><?php echo esc_attr( $indocarmarket_option_title ); ?></label>
                    </p>
                <?php
                    }
            echo '</div>';
                if (isset($indocarmarket_widgets_description)) {
            ?>
                    <small><em><?php echo esc_html( $indocarmarket_widgets_description ); ?></em></small>
            <?php
                }
            
        break;

        case 'upload' :

            $output = '';
            $id = $instance->get_field_id($indocarmarket_widgets_name);
            $class = '';
            $int = '';
            $value = $indocar_field_value;
            $name = $instance->get_field_name($indocarmarket_widgets_name);

            if ($value) {
                $class = ' has-file';
            }
            $output .= '<div class="sub-option section widget-upload">';
            $output .= '<label for="'.esc_attr( $instance->get_field_id( $indocarmarket_widgets_name ) ).'">'.esc_attr( $indocarmarket_widgets_title ).'</label><br/>';
            $output .= '<input id="' . $id . '" class="upload' . $class . '" type="text" name="' . $name . '" value="' . $value . '" placeholder="' . esc_html__('No file chosen', 'indocarmarket') . '" />' . "\n";
            
            if ( function_exists('wp_enqueue_media') ) {
                if (( $value == '')) {
                    $output .= '<input id="upload-' . $id . '" class="upload-button-wdgt button" type="button" value="' . esc_html__('Upload', 'indocarmarket') . '" />' . "\n";
                } else {
                    $output .= '<input id="remove-' . $id . '" class="remove-file button" type="button" value="' . esc_html__('Remove', 'indocarmarket') . '" />' . "\n";
                }
            } else {
                $output .= '<p><i>' . esc_html__('Upgrade your version of WordPress for full media support.', 'indocarmarket') . '</i></p>';
            }

            $output .= '<div class="screenshot team-thumb" id="' . $id . '-image">' . "\n";
            if ($value != '') {
                $remove = '<a class="remove-image">'.esc_html__('Remove','indocarmarket').'</a>';
                $image = preg_match('/(^.*\.jpg|jpeg|png|gif|ico*)/i', $value);
                if ($image) {
                    $output .= '<img src="' . $value . '" />' . $remove;
                } else {
                    $parts = explode("/", $value);
                    for ( $i = 0; $i < sizeof($parts ); ++$i ) {
                        $title = $parts[$i];
                    }
                    $output .= '';
                    $title = esc_html__('View File', 'indocarmarket');
                    $output .= '<div class="no-image"><span class="file_link"><a href="' . $value . '" target="_blank" rel="external">' . $title . '</a></span></div>';
                }
            }
            $output .= '</div></div>' . "\n";
            echo $output;
            break;
    }
}

function indocarmarket_widgets_updated_field_value($widget_field, $new_field_value) {

    extract( $widget_field );

    if ($indocarmarket_widgets_field_type == 'number') {

        return absint($new_field_value);

    } elseif ($indocarmarket_widgets_field_type == 'textarea') {
        
        if (!isset($indocarmarket_widgets_allowed_tags)) {
            $indocarmarket_widgets_allowed_tags = '<span><br><p><strong><em><a>';
        }

        return wp_kses_data($new_field_value, $indocarmarket_widgets_allowed_tags);
    } 
    elseif ($indocarmarket_widgets_field_type == 'url') {
        return esc_url_raw($new_field_value);
    }
    elseif ($indocarmarket_widgets_field_type == 'title') {
        return wp_kses_post($new_field_value);
    }
    elseif ($indocarmarket_widgets_field_type == 'multicheckboxes') {
        return wp_kses_post($new_field_value);
    }
    else {
        return wp_kses_data($new_field_value);
    }
}


/**
 * Load widget fields file.
*/
require get_template_directory() . '/inc/widgets/widget-all-vehicle.php';

require get_template_directory() . '/inc/widgets/widget-column-vehicle.php';

require get_template_directory() . '/inc/widgets/widget-post.php';

require get_template_directory() . '/inc/widgets/widget-image-4-column.php';