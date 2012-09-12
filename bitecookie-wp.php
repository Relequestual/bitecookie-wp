<?php
/**
 * Plugin Name: BiteCP Cookies
 * Plugin URI: http://BiteCP.com
 * Description: Adds cookie law requested popup implied consent
 * Author: Ben Hutton (@relequestual)- BiteCP
 * Version: 0.1.0
 */


function bitecookies_enqueue_style(){
	wp_enqueue_style('cookiestyle', plugins_url('/css/jquery.cookienotice.css', __FILE__ ), false);
}

function bitecookies_enqueue_script(){
	wp_enqueue_script('bitecookie_notice', plugins_url('/js/jquery.cookienotice.js', __FILE__ ), 'jquery');
	wp_enqueue_script('bitecookie_apply', plugins_url('/js/cookieready.js', __FILE__ ), 'bitecookie_apply');
}

add_action('wp_enqueue_scripts', 'bitecookies_enqueue_style');
add_action('wp_enqueue_scripts', 'bitecookies_enqueue_script');

?>