<?php
/* this still is not using */
$meta_boxes[] = array(
	'id'         => 'autocar_vehicle',
	'title'      => esc_html__( 'Input Detail Kendaraan', 'indocarmarket' ),
	'post_types' => 'vehicle',
	'context'    => 'normal',
	'priority'   => 'high',
	'autosave'   => true,
	'fields'     => array(
		array(
			'name'  => esc_html__( 'Nomor Telepon', 'indocarmarket' ),
			'id'    => "{$prefix}v_phonenumber",
			'desc'  => esc_html__( 'Nomor telepon penjual', 'indocarmarket' ),
			'type'  => 'text',
			'std'   => esc_html__( '', 'indocarmarket' ),
		),
		array(
			'name'  => esc_html__( 'Nomor Whatsapp', 'indocarmarket' ),
			'id'    => "{$prefix}v_wanumber",
			'desc'  => esc_html__( 'Nomor Whatsapp penjual', 'indocarmarket' ),
			'type'  => 'text',
			'std'   => esc_html__( '', 'indocarmarket' ),
		),
		array(
			'name'  => esc_html__( 'Masa Berlaku STNK', 'indocarmarket' ),
			'id'    => "{$prefix}v_stnk_expired",
			'desc'  => esc_html__( 'Masa Berlaku STNK', 'indocarmarket' ),
			'type'  => 'text',
			'std'   => esc_html__( '', 'indocarmarket' ),
		),
	)
}