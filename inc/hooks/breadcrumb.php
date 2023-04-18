<?php

if (!function_exists('indocarmarket_add_breadcrumb')) :

    /**
     * Add breadcrumb.
     *
     * @since 1.0.0
     */
    function indocarmarket_add_breadcrumb()
    {

        // Bail if Breadcrumb disabled.
        /*$breadcrumb_type = bangkit_get_option('breadcrumb_type');
        if ('disabled' === $breadcrumb_type) {
            return;
        }*/
        // Bail if Home Page.
        if (is_front_page() || is_home()) {
            return;
        }
        // Render breadcrumb.
        /*switch ($breadcrumb_type) {
            case 'simple':
                echo "<div class='breadcrumb-bgcolor'>";
                indocarmarket_simple_breadcrumb();
                echo "</div>";
                break;

            case 'advanced':
                if (function_exists('bcn_display')) {
                    bcn_display();
                }
                break;

            default:
                break;
        }*/
        //echo "<div class='breadcrumb-bgcolor'>";
        //indocarmarket_simple_breadcrumb();
        //echo "</div>"; ?>

        <nav aria-label="breadcrumb">
            <?php indocarmarket_simple_breadcrumb(); ?>
            <!--ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="./index.html">Beranda</a></li>
                <li class="breadcrumb-item active" aria-current="page">Produk</li>
            </ol-->
        </nav>

        <?php
        return;

    }

endif;

add_action('indocarmarket_action_breadcrumb', 'indocarmarket_add_breadcrumb', 10);
