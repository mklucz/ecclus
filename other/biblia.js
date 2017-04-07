jQuery(document).ready(function () {
	var ksiega = jQuery('select[name$=ksiega]');
	var rozdzial = jQuery('select[name$=rozdzial]');
	var div_buttons = jQuery('div#chapter-buttons');
	var msg_box = jQuery('span#msg_box');
	var swich_chapter = jQuery('a#switch-chapter-nav');
	var chapter_nav = jQuery('div.chapter-nav');
	ksiega.change(function () {
		ajax_data = {
			action: 'ksiega_change',
			book: ksiega.val(),
		};
		jQuery.post("index.php", ajax_data, function (msg) {
			var data = jQuery.parseJSON(msg);
			var options = '<option value="-1">-</option>';
			var buttons = '';
			for (var key in data) {
				console.log('data[' + key + '] = ' + data[key]);
				options += '<option value="' + data[key] + '">' + key + '</option>';
				buttons += '<a class="chapter-button" href="rozdzial.php?id=' + data[key] + '">' + key + '</a>';
			}
			rozdzial.html(options);
			console.log(buttons);
			div_buttons.html(buttons);
		});
		return false;
	});
	rozdzial.change(function () {
		if (rozdzial.val() <= 0) return;
		document.location.href = 'rozdzial.php?id=' + rozdzial.val();
	});
	swich_chapter.click(function () {
		chapter_nav.slideToggle();
		return false;
	});
	document.onkeydown = function (e) {
		e = e || window.event;
		uAgent = navigator.userAgent;
		if (uAgent.search('Kindle/3') < 0) return;
		search_input = jQuery('input[name$=slowa]');
		if (search_input.is(':focus')) return;
		switch (e.keyCode) {
		case 80:
			left_href = jQuery('#left-button').attr('href');
			if (typeof(left_href) != 'undefined') document.location.href = left_href;
			break;
		case 78:
			right_href = jQuery('#right-button').attr('href');
			if (typeof(right_href) != 'undefined') document.location.href = right_href;
			break;
		case 72:
			document.location.href = 'index.php';
			break;
		case 77:
			jQuery('a#switch-chapter-nav').click();
			break;
		default:
			return;
		}
	}
	uAgent = navigator.userAgent;
	if (uAgent.search('Kindle/3') > 0) jQuery('div.mobile-nav').hide();
});