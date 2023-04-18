          <!--section class="page-section">
                <div class="carros-container article-details-container">
                  <div class="article-details-header-container">
                    <?php the_title( '<h1 class="article-details-header">', '</h1>' ); ?>
                    <p class="article-details-date"><?php indocarmarket_entry_date(); ?>  <?php indocarmarket_posted_by(); ?></p>
                  </div>
                </div>
          </section-->

          <section class="page-section">
                <div class="carros-container article-details-container">
                  <div class="content">
                    <div class="article-details-content">
                    	<?php the_content(); 
                    	wp_link_pages(
							array(
								'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Halaman:', 'indocarmarket' ) . '</span>',
								'after'       => '</div>',
								'link_before' => '<span>',
								'link_after'  => '</span>',
								'pagelink'    => '<span class="screen-reader-text">' . __( 'Halaman', 'indocarmarket' ) . ' </span>%',
								'separator'   => '<span class="screen-reader-text">, </span>',
							)
						); ?>
                    </div>

                    <div class="edit_footer">
                     	<?php
							edit_post_link(
								sprintf(
									__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'indocarmarket' ),
									get_the_title()
								),
								'<span class="edit-link">',
								'</span>'
							);
							?>
                     </div>
                  </div>
                </div>
          </section>

              <section class="page-section">
                <div class="article-details-footer">
                  <div class="articles-details-footer-header">Bagikan :</div>
                  
                  <div class="article-details-img-container">
                    <div class="article-details-img-holders">
                    	<?php echo do_shortcode('[DISPLAY_ULTIMATE_SOCIAL_ICONS]'); ?>
                    </div>
                  </div>
                </div>
              </section>

			  <div class="biografy">
                     	<?php
                     	if ( '' !== get_the_author_meta( 'description' ) ) {
							get_template_part( 'template-parts/biography' );
						}
                     	?>
                </div>