<?php // single vehicle
$info_vehicle    = get_post_meta( $post->ID, '_indocarmarket_vehicle', true);
$telp            = $info_vehicle['item_1'];
$wa              = $info_vehicle['item_2'];
$stnk            = $info_vehicle['item_3'];
$bahan_bakar     = $info_vehicle['item_4'];
$kapasitas_mesin = $info_vehicle['item_5'];
$youtube_id         = $info_vehicle['item_6'];

$sold = get_post_meta( get_the_ID(), '_indocarmarket_sold', true);
?>
<section class="page-section">
	<div class="product-tray-mb" id="product-tray-mb">
		<div class="pdp-tray-carousel-component">
			<button type="button" class="pdp-tray-carousel-prev slick-arrow" id="pdp-tray-carousel-prev-mb">
                <span class="pdp-tray-carousel-prev-icon">
                	<img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-left-icon.svg" alt="Previous Arrow" title="Previous Arrow" />
                </span>
            </button>
            <div class="pdp-tray-carousel" data-prev-id="pdp-tray-carousel-prev-mb" data-next-id="pdp-tray-carousel-next-mb" data-slide-count="1">
            
            <?php
			$images = get_field( 'images' ); 
			if( $images ) :
			
			foreach($images as $image){ ?>
            
            	<div>
                    <div class="pdp-tray-carousel-item" style="width: 100%; display: inline-block;">
                    	<img class="pdp-tray-carousel-img" src="<?php echo esc_url($image['sizes']['indocar-product_thumbnail']) ?>" alt="" data-toggle="modal" data-target="#pdp-tray-modal">
                    </div>
                </div>
            
            <?php 					
			}
            
            endif;
            ?>

            </div>
            <button type="button" class="pdp-tray-carousel-next slick-arrow" id="pdp-tray-carousel-next-mb" aria-label="Move pdp-tray-carousel forward">
                <span class="pdp-tray-carousel-next-icon">
                	<img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-right-icon.svg" alt="Next Arrow" title="Next Arrow" />
                </span>
            </button>
		</div>
	</div>
</section>
<section class="page-section">
    <div class="carros-container product-tray-wrapper">
    	<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-8">
		        <div class="product-tray-dt" id="product-tray-dt">
		        	<div class="product-tray cursor-pointer">
						
							<?php
							$images = get_field( 'images' );
							if( $images ) {
								$no = 1;
								foreach($images as $image){ ?>
									<div class="product-tray-item <?php echo $no==1?'active':''; ?>" data-show-id="item<?php echo $no; ?>">
										<img class="pdp-tray-carousel-img" src="<?php echo esc_url($image['sizes']['indocar-product_thumbnail']) ?>" alt="" data-toggle="modal" data-target="#pdp-tray-modal">
									</div>
								<?php 
								$no++;
								}
							}
							?>
		                
		            </div>
		            <div class="pdp-tray-carousel-thumbnails ">
		                <div class="pdp-tray-carousel-component">
		                	<button type="button" class="pdp-tray-carousel-prev slick-arrow" id="pdp-tray-carousel-prev">
		                    	<span class="pdp-tray-carousel-prev-icon">
		                        	<img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-left-icon.svg" alt="Previous Arrow" title="Previous Arrow" />
		                        </span>
		                    </button>
		                    <?php
		                    $count = count(get_field( 'images' ));
		                    ?>
		                    <div class="pdp-tray-carousel" data-prev-id="pdp-tray-carousel-prev" data-next-id="pdp-tray-carousel-next" data-slide-count="5">
		                    	<?php
							$images = get_field( 'images' );
							if( $images ) {
								$item = 1;
								foreach($images as $image){ ?>
		                    	<div>
		                            <div class="pdp-tray-carousel-item" style="width: 100%; display: inline-block;">
		                                <a href="#" class="pdp-tray-carousel-thumnails-trigger" data-trigger-id="item<?php echo $item ?>" tabindex="<?php echo $item==1||$item==3?'-1':'0'; ?>">
		                                    <img class="pdp-tray-carousel-img" src="<?php echo esc_url($image['sizes']['indocar-special_thumbnail']) ?>" alt="">
		                            	</a>
		                        	</div>
		                        </div>
		                        <?php 
		                        $item++;
		                    	}
							}
							?>
		                    </div>
		                    <button type="button" class="pdp-tray-carousel-next slick-arrow" id="pdp-tray-carousel-next" aria-label="Move pdp-tray-carousel forward">
		                        <span class="pdp-tray-carousel-next-icon">
		                        	<img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-right-icon.svg" alt="Next Arrow" title="Next Arrow" />
		                        </span>
		                    </button>
		                </div>
		                <?php                         
			            if(!empty($sold)) { ?>
			            <div class="sold_slide_image">
			            	<div class="sold_image">
			                	<img src="<?php echo get_template_directory_uri() . '/assets/images/terjual_.png';?>" alt="">
			                </div>
			            </div>
			            <?php
			            }
			            ?>
		            </div>
		        </div>
		    </div>

		    <div class="modal fade pdp-modal" id="pdp-tray-modal" role="dialog">
		        <div class="modal-dialog">
		        	<div class="modal-content">
		            	<button type="button" class="close" data-dismiss="modal">×</button>

		                <div class="modal-body">
		                	<div class="pdp-tray-carousel-slide-count" tabindex="1">
		                    	<span class="pdp-tray-carousel-current-slide"></span>/<span class="pdp-tray-carousel-total-slide"></span>
		                    </div>

		                    <div class="product-tray-mb">
		                    	<div class="pdp-tray-carousel-component">
		                        	<button type="button" class="pdp-tray-carousel-prev slick-arrow" id="pdp-tray-carousel-prev-modal">
		                            <span class="pdp-tray-carousel-prev-icon">
		                            	<img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-left-icon.svg" alt="Previous Arrow" title="Previous Arrow" />
		                            </span>
		                            </button>

		                            <div class="pdp-tray-carousel" data-prev-id="pdp-tray-carousel-prev-modal" data-next-id="pdp-tray-carousel-next-modal" data-slide-count="1">
		                            <?php
										$images = get_field( 'images' );
										if( $images ) {
												
											foreach($images as $image){ ?>
			                                  <div>
			                                    <div class="pdp-tray-carousel-item" style="width: 100%; display: inline-block;">
			                                      <img class="pdp-tray-carousel-img" src="<?php echo esc_url($image['sizes']['indocar-product_thumbnail']) ?>" alt="">
			                                    </div>
			                                  </div>
		                            <?php 
						                    }
										}
										?>
		                            </div>

		                            <button type="button" class="pdp-tray-carousel-next slick-arrow" id="pdp-tray-carousel-next-modal" aria-label="Move pdp-tray-carousel forward">
		                            	<span class="pdp-tray-carousel-next-icon">
		                                    <img src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/banner-right-icon.svg" alt="Next Arrow" title="Next Arrow" />
		                                </span>
		                            </button>
		                        </div>
		                	</div>
		            	</div>
		        	</div>
		        </div>
		    </div>

		    <?php if( !empty( $youtube_id )) : ?>
		    <div class="modal fade pdp-modal" id="youtube-modal" role="dialog">
		        <div class="modal-dialog">
		        	<div class="modal-content">
		            	<button type="button" class="close" data-dismiss="modal">×</button>

		                <div class="modal-body">
		                	
		                    <iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $youtube_id; ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		                	
		            	</div>
		        	</div>
		        </div>
		    </div>
		    <?php endif; ?>

		    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4">
		        <div class="product-detail">
		        	<div>
		            	<h1 class="producttxt"><?php the_title() ?></h1>

		                <?php if( !empty( $youtube_id )) : ?>
		                <div class="pdp-tray-location">
		                	<i class="fab fa-youtube pdp-tray-location-img"></i>
		                            
		                    <a href="" data-toggle="modal" data-target="#youtube-modal">
		                    	<span class="pdp-tray-location-text">Tonton Video Review</span>
		                    </a>
		                </div>
		            	<?php endif; ?>

		                <div class="mt-2 productstrike"><?php echo do_shortcode( "[vehicle_msrp]" ) ?></div>

		                <div class="productRPBig">
		                	<label>
			                    <?php
			                    if(empty($sold)) :
			                    if(!empty(do_shortcode( "[vehicle_price]" ))) {
			                    	echo do_shortcode( "[vehicle_price]" );
			                    } else {
			                    	echo '<span class="ask_seller">Tanya Harga Ke Penjual</span>';
			                    }
			                    else :
			                    	echo '<p class="sold-price">Item ini telah terjual</p>';
			                    endif;
			                    ?>
			                              
			                    
		                   	</label>
		                          </div>
		                        </div>

		                        <div class="mt-4 pdp-tray-reserve-cta">
		                          <input type="hidden" id="reserveURL" value="" />

		                          <?php if(!empty($telp) ) : ?>
									<a href="tel:<?php echo $telp; ?>" title="Klik untuk menelpon Penjual" class="call-img">
										<img src="<?php echo get_template_directory_uri() . '/assets/images/telp.png';?>" alt="Gambar Call">
									</a>
									<?php endif; ?>
									<?php if(!empty($wa) ) : ?>
									<a href="https://api.whatsapp.com/send?phone=<?php echo $wa; ?>" target="_blank" title="Klik untuk Chat WA dengan Penjual" class="call-img">
										<img src="<?php echo get_template_directory_uri() . '/assets/images/chat-wa.png';?>" alt="Gambar Whatsapp">
									</a>
									<?php endif; ?>
		                        </div>

		                        <div class="productwishlist mt-3">
		                          

		                          <div class="socialicon">
		                          	<?php //ADDTOANY_SHARE_SAVE_KIT(); ?>
		                          	<?php echo do_shortcode('[DISPLAY_ULTIMATE_SOCIAL_ICONS]'); ?>
		                            <!--button class="sharer facebook-blue" data-sharer="facebook" data-title="Daihatsu SIRION D (SIRION)" data-url="#"></button>
		                            
		                            <button class="sharer twitter-blue" data-sharer="twitter" data-title="Take a look at the Daihatsu SIRION D (SIRION) on carros at" data-url="#"></button-->
		                          </div>
		                        </div>
		        </div>
		    </div>

		</div>
	</div>
</section>

<section class="page-section">
                <div class="carros-container">
                  <div class="pdp-tray-specification-item-box">
                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/meter.svg" alt="Kilometer">
                      <div class="pdp-tray-specification-desc">Kilometer</div>
                      <div class="pdp-tray-specification-detail"><?php echo milage_content_single() ?></div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/manufacture-year.svg" alt="Tahun Pembuatan">
                      <div class="pdp-tray-specification-desc">Tahun Pembuatan</div>
                      <div class="pdp-tray-specification-detail"><?php echo do_shortcode( "[vehicle_registration]" ) ?></div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/transmission.svg" alt="Transmisi">
                      <div class="pdp-tray-specification-desc">Transmisi</div>
                      <div class="pdp-tray-specification-detail"><?php echo do_shortcode( "[vehicle_transmission]" ) ?></div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/expiry-date.svg" alt="Masa Berlaku STNK">
                      <div class="pdp-tray-specification-desc">Masa Berlaku STNK</div>
                      <div class="pdp-tray-specification-detail"><?php echo $stnk ?></div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/number-owners.svg" alt="Jumlah Kepemilikan">
                      <div class="pdp-tray-specification-desc">Jumlah Kepemilikan</div>
                      <div class="pdp-tray-specification-detail">1</div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/fuel-type.svg" alt="Bahan Bakar">
                      <div class="pdp-tray-specification-desc">Bahan Bakar</div>
                      <div class="pdp-tray-specification-detail"><?php echo $bahan_bakar=='bensin'?'Bensin':'Solar'; ?></div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/engine.svg" alt="Kapasitas Mesin">
                      <div class="pdp-tray-specification-desc">Kapasitas Mesin</div>
                      <div class="pdp-tray-specification-detail"><?php echo $kapasitas_mesin ?>&nbsp;CC</div>
                    </div>

                    <div class="pdp-tray-specification-item">
                      <img class="pdp-tray-specification-img" src="https://www.mobil88.astra.co.id/_ui/responsive/common/images/icons/drive-train.svg" alt="Sistem Penggerak">
                      <div class="pdp-tray-specification-desc">Kondisi</div>
                      <div class="pdp-tray-specification-detail"><?php echo do_shortcode( "[vehicle_condition]" ) ?></div>
                    </div>
                  </div>

                </div>
</section>

<div class="carros-container">
	<div class="row">
		<?php if(!empty(do_shortcode( '[vehicle_description]' ))) : ?>
		<div class="col-12 col-md-12">
			<h3 class="title_desc">Deskripsi</h3>
			<div class="description_product">
				<?php 

				echo do_shortcode( '[vehicle_description]' ); 

				?>
			</div>
		</div>
		<?php endif; ?>
		<div class="col-12 col-md-12">
                <div class="contact_us_page_url">
                  <div class="align-items-center">
                    
                      <h2 class="pdp-contactus-title">Hubungi Kami</h2>

                      <div class="">
                        Ingin menjual mobil Anda di sini?
                      </div>
                      

                    
                      <h3 class="tombol_jual">
                        <a class="btn primary-btn">Jual Mobil</a>
                      </h3>
                    
                  </div>
                </div>
        </div>
	</div>
</div>