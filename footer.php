<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Incocar Market
 */
?>
				   
				</div>
				<footer class="footer">
            <div class="footer-container">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-6 col-sm-3">
                    <div class="responsive-area">
                      <?php dynamic_sidebar( 'footer-1' ); ?>
                    </div>
                  </div>

                  <div class="col-6 col-sm-3">
                    <div class="responsive-area">
                      <?php dynamic_sidebar( 'footer-2' ); ?>
                    </div>
                  </div>

                  <div class="col-6 col-sm-3">
                    <div class="responsive-area">
                      <?php dynamic_sidebar( 'footer-3' ); ?>
                    </div>
                  </div>

                  <div class="col-6 col-sm-3">
                    <div class="responsive-area">
                      <?php dynamic_sidebar( 'footer-4' ); ?>
                      <!--span class="fw-600">Pusat Pelanggan</span>

                      <div class="contact__footer">
                        <div class="icon__contact">
                          <i class="fas fa-phone"></i>
                        </div>

                        <ul>
                          <li>Hubungi kami : 0804-1-000088</li>
                          <li>Senin - Jumat : 08.30 - 17.30 WIB</li>
                          <li>Sabtu, 08.30 - 15.00 WIB</li>
                        </ul>
                      </div-->
                    </div>
                  </div>
                </div>

                <div class="row footer-copyright">
                  <div class="col-lg-8">
                    <div class="responsive-area ">
                      


                      <p class="copyright">
                        <?php if (!empty(indocarmarket_get_option('url_footer_1')) && !empty(indocarmarket_get_option('url_footer_2'))  ): ?>
                        <span class="privacy-term">
                          <a href="#">Kebijakan Privasi</a>
                          <span>|</span>
                          <a href="#">Syarat & Ketentuan</a>
                        </span>
                        <?php endif; ?>
                        <?php if (indocarmarket_get_option('enable_footer_copyright') == 1 ): ?>
                          <span class=""><?php echo indocarmarket_get_option('copyright_text') ?></span>
                        <?php endif; ?>
                      </p>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <ul class="social__link__footer">
                        <li>
                          <a href="<?php echo indocarmarket_get_option('footer_social_facebook') ?>" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        </li>

                        <li>
                          <a href="<?php echo indocarmarket_get_option('footer_social_twitter') ?>" title="Twitter"><i class="fab fa-twitter"></i></a>
                        </li>
                        
                        <li>
                          <a href="<?php echo indocarmarket_get_option('footer_social_instagram') ?>" title="Instagram"><i class="fab fa-instagram"></i></a>
                        </li>
                        
                        <li>
                          <a href="<?php echo indocarmarket_get_option('footer_social_youtube') ?>" title="YouTube"><i class="fab fa-youtube"></i></a>
                        </li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
			</main>
<script type="text/javascript">
          /*<![CDATA[*/
            var ACC = { config: {} };
            
            
          /*]]>*/
        </script>
<?php wp_footer(); ?>

		</div>
	</div>

</body>
</html>