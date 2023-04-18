<?php
/**
 * The template part for displaying single posts
 *
 * @package Indocar Market
 */

$sold = get_post_meta( get_the_ID(), '_indocarmarket_sold', true);
?>


							  <div class="col-6 col-sm-3">
                                <div class="featured-car-product for-compare-button" data-product-id="SN201906-000000468" data-product-name="Toyota CALYA G (CALYA)" data-image-url="https://www.mobil88.astra.co.id/mobil88webservices/v2/medias/-.D.S.C.1.2.7.7-284.jpg?context=bWFzdGVyfHJvb3R8MTIzODN8aW1hZ2UvanBlZ3xoNDkvaDQ3Lzg4MjgyMTQ1NDIzNjYuanBnfDg2NDY1ZWUxYmRkYmMzOTQ4ODc0NzlhMmJkMDM0YjZiZGUzYmUyMTVlYjFiNjI3NDM4ODc5ZjA5YTNkZDllNjc" style="width: 100%; display: inline-block;">
                                  <span id="SN201906-000000468" data-product-code="SN201906-000000468" class="featured-car-wishlist star-normal cursor-pointer"></span>
                                  
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