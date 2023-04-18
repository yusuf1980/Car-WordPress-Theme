<?php

require 'class_wp_bootstrap_navwalker.php';

class Custom_Menu_Walker extends WP_Bootstrap_Navwalker {

    public $menu_location = 'primary';

    function __construct($menu_location_var) {
        // parent class doesnt have a constructor so no parent::__construct();
        $this->menu_location = $menu_location_var;
    }

    public function end_el(&$output, $item, $depth = 0, $args = array(), $id=0) {
        $locations = get_nav_menu_locations(); //get all menu locations
        $menu = wp_get_nav_menu_object($locations[$this->menu_location]); //one menu for one location so lets get the menu of this location
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $top_lvl_menu_items_count = 0; //we need this to work with a menu with children too so we dont use simply $menu->count here
        foreach ($menu_items as $menu_item) {
            if ($menu_item->menu_item_parent == "0") {
                $top_lvl_menu_items_count++;
            }
        }

        $total_menu_items = $top_lvl_menu_items_count;

        $item_position = $item->menu_order;

        //print_r($item_position);

        $position_to_have_the_logo = ceil($total_menu_items / 2);

        /*if ($item_position == $position_to_have_the_logo && $item->menu_item_parent == "0") { //make sure we output for top level only
            $output .= "<li>\n<a class='nav-link' href=''>TEst</a>"; //here we add the logo
        } else {
            $output .= "</li>\n";
        }*/
        //$output .= "Testtt";
        /*if( $item->menu_item_parent == "0" ) {
            $test = array('testt');
        array_push($output, $test);
        }*/

        //var_dump($output);

        /*$end_item = end($item->menu_order);
        if($item->menu_item_parent == "0" && $end_item ) {
            $output .= "<li>TEst</li>";
        }*/
        //if ($menu_items->menu_item_parent == '0') {
            var_dump($menu_items);
        //}
        //var_dump($menu_items);
        
    }
}