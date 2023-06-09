<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Indocar Market
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    <div class="comments-wrapper">
        <?php
        // You can start editing here -- including this comment!
        if (have_comments()) : ?>
            <h3 class="comments-title">
                <?php
                $comments_number = get_comments_number();
                if ('1' === $comments_number) {
                    /* translators: %s: post title */
                    printf(_x('Satu komentar untuk &ldquo;%s&rdquo;', 'comments title', 'indocarmarket'), get_the_title());
                } else {
                    printf(
                    /* translators: 1: number of comments, 2: post title */
                        _nx('%1$s komentar untuk &ldquo;%2$s&rdquo;', '%1$s pemikiran untuk &ldquo;%2$s&rdquo;', $comments_number, 'comments title', 'indocarmarket'),
                        number_format_i18n($comments_number),
                        get_the_title()
                    );
                }
                ?>
            </h3>

            <?php if (get_comment_pages_count() > 1 && get_option('page_comments')) : // Are there comments to navigate through? ?>
                <nav id="comment-nav-above" class="navigation comment-navigation" role="navigation">
                    <h2 class="screen-reader-text"><?php esc_html_e('Navigasi komentar', 'indocarmarket'); ?></h2>
                    <div class="nav-links">
                        <div class="nav-previous primary-bgcolor"> <?php previous_comments_link(esc_html__('Komentar lama', 'indocarmarket')); ?></div>
                        <div class="nav-next primary-bgcolor"><?php next_comments_link(esc_html__('Komentar lebih baru', 'indocarmarket')); ?></div>
                    </div><!-- .nav-links -->
                </nav><!-- #comment-nav-above -->
            <?php endif; // Check for comment navigation. ?>

            <ol class="comment-list">
                <?php
                wp_list_comments(array(
                    'style' => 'ol',
                    'short_ping' => true,
                    'avatar_size' => 64,
                ));
                ?>
            </ol><!-- .comment-list -->

            <?php if (get_comment_pages_count() > 1 && get_option('page_comments')) : // Are there comments to navigate through? ?>
                <nav id="comment-nav-below" class="navigation comment-navigation" role="navigation">
                    <h2 class="screen-reader-text"><?php esc_html_e('Navigasi komentar', 'indocarmarket'); ?></h2>
                    <div class="nav-links">
                        <div class="nav-previous primary-bgcolor"><?php previous_comments_link(esc_html__('Komentar lama', 'indocarmarket')); ?></div>
                        <div class="nav-next primary-bgcolor"><?php next_comments_link(esc_html__('Komentar lebih baru', 'indocarmarket')); ?></div>
                    </div><!-- .nav-links -->
                </nav><!-- #comment-nav-below -->
                <?php
            endif; // Check for comment navigation.

        endif; // Check for have_comments().


        // If comments are closed and there are comments, let's leave a little note, shall we?
        if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>

            <p class="no-comments"><?php esc_html_e('Komentar ditutup.', 'indocarmarket'); ?></p>
            <?php
        endif;

        comment_form();
        ?>
    </div>
</div><!-- #comments -->