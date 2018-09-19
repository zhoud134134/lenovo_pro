(function($){
	$.fn.stickySort = function(opts) {

		// Default settings
		var settings = $.extend(true, {
			threshold: {
				rows: 3,
				viewport: 0.25,
				px: false,
				allowanceEval: 'min'
			},
			sortable: false,
			scrollThrottle: 5,
			resizeThrottle: 250
		}, opts);

		this.each(function() {
			if($(this).is('table') && $(this).find('thead').length > 0 && $(this).find('th').length > 0) {
				// Clone <thead>
				var $w	   = $(window),
					$t	   = $(this),
					$thead = $t.find('thead').clone(),
					$col   = $t.find('thead, tbody').clone();
				//	console.log($thead)
				// Add class, copy children classes, remove margins, reset width and wrap table
				$t
				.wrap('<div class="sticky-wrap" />')
				.parent()
					.addClass($t.attr('class'))
					.end()
				.addClass('sticky-enabled');

				if($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');

				// Create new sticky table head (basic)
				$t.after('<div class="sticky-thead"><table></table></div>');

				// If <tbody> contains <th>, then we create sticky column and intersect (advanced)
				if($t.find('tbody th').length > 0) {
					$t.after('<div class="sticky-col"><table></table ></div>');
				}

				// Create shorthand for things
				var $stickyHead  = $(this).siblings('.sticky-thead'),
					$stickyCol   = $(this).siblings('.sticky-col'),
					$stickyInsct = $(this).siblings('.sticky-intersect'),
					$stickyWrap  = $(this).parent('.sticky-wrap');

				$stickyHead.find('table').append($thead);

				$stickyCol
				.find('table')
				.append($col)
					.find('thead th')
					.end()
					.find('tbody td').remove();

				$stickyInsct.find('table').html('<thead><tr><th>'+$t.find('thead th:first-child').html()+'</th></tr></thead>');

				
				// Set widths
				var setWidths = function () {
						$t
						.find('thead th').each(function (i) {
							$stickyHead.find('th').eq(i).width($(this).width());
						})
						.end()
						.find('tr').each(function (i) {
							$stickyCol.find('tr').eq(i).height($(this).height());
						});

						// Set width of sticky table head
						$stickyHead
						.width($stickyWrap.width())
						.find('table')
							.width($t.width());

						// Set width of sticky table col
						$stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').first().width());

						// Set position sticky intersect
						$stickyCol.find('table').css({
							left: $stickyWrap.offset().left
						});
					},
					repositionSticky = function () {
						// Return value of calculated allowance
						var allowance = calcAllowance();
					
						// 1. Deal with positioning of sticky header
						// Check if wrapper parent is overflowing along the y-axis
						if($t.height() > $stickyWrap.height()) {
							// If it is overflowing (advanced layout)
							// Position sticky header based on wrapper scrollTop()
							if($stickyWrap.scrollTop() > 0) {
								// When top of wrapping parent is out of view
								$stickyHead.add($stickyInsct).css({
									opacity: 1,
									'pointer-events': 'auto',
									position: 'fixed',
									top: $stickyWrap.offset().top - $w.scrollTop(),
									left: $stickyWrap.offset().left
								});
								$stickyHead.find('table').css({
									left: -$stickyWrap.scrollLeft()
								});
							} else {
								// When top of wrapping parent is in view
								$stickyHead.add($stickyInsct).css({
									opacity: 0,
									'pointer-events': 'none'
								});
								$stickyInsct.css({
									position: 'absolute',
									top: 0,
									left: 0
								});
							}
						} else {
							// If it is not overflowing (basic layout)
							// Position sticky header based on viewport scrollTop
							if($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
								// When top of viewport is in the table itself
								$stickyHead.add($stickyInsct).css({
									opacity: 1,
									'pointer-events': 'auto',
									position: 'fixed',
									left: $stickyWrap.offset().left
								});
								$stickyHead.find('table').css({
									left: -$stickyWrap.scrollLeft()
								});
							} else {
								// When top of viewport is above or below table
								$stickyHead.add($stickyInsct).css({
									opacity: 0,
									'pointer-events': 'none',
									position: 'absolute',
									left: 0
								});
							}
						}

						// 2. Now deal with positioning of sticky column
						if($stickyWrap.scrollLeft() > 0) {
							// When left of wrapping parent is out of view
							$stickyCol.css({
								position: 'fixed',
								left: $stickyWrap.offset().left,
								top: $stickyWrap.offset().top - $w.scrollTop(),
								height: $stickyWrap.height()
							})
							.find('table')
								.css({
									top: -$stickyWrap.scrollTop(),
									left: 0
								})
							.end()
							.add($stickyInsct).css({
								opacity: 1,
								'pointer-events': 'auto'
							});
						} else {
							// When left of wrapping parent is in view
							$stickyCol
							.css({
								opacity: 0,
								'pointer-events': 'none'
							});
						}
					},
					calcAllowance = function () {
						var rowHeight = 0,
							allowance = [];

						// Calculate allowance
						$t.find('tbody tr:lt('+settings.threshold.rows+')').each(function () {
							rowHeight += $(this).height();
						});
						allowance.push(rowHeight);
						
						// Get height based on viewport
						allowance.push($w.height()*settings.threshold.viewport)
						
						// If pixel threshold exists, add it
						if(settings.threshold.px) {
							allowance.push(settings.threshold.px);
						}

						// Get minimum or maximum?
						if(settings.threshold.allowanceEval == 'min') {
							return Math.min.apply(null, allowance);
						} else {
							return Math.max.apply(null, allowance);
						}
					};

				setWidths();

				$t.parent('.sticky-wrap').scroll($.throttle(settings.scrollThrottle, repositionSticky));

				$w
				.load(setWidths)
				.resize($.debounce(settings.resizeThrottle, function () {
					setWidths();
					repositionSticky();
				}))
				.scroll($.throttle(settings.scrollThrottle, repositionSticky));

				// Extended feature: Sortable table
				// Do sorting only when original table is slated for sorting:
				// 1. Check if HTML5 data- attribute, data-sortable, exists
				// 2. Check if table has the class 'sortable'
				// 3. Check if settings.sortable is enabled
				if(settings.sortable || ($t.data('sortable') != undefined || $t.hasClass('sortable'))) {

					// Store original order of rows first, so we can return to its natural/resting state
					$t.find('tbody tr').each(function (i) {
						$(this).attr('data-sortOrder', i);
					});


					// Bind click function to all <thead>'s <th> elements in the original table AND all dynamically generated sticky tables
				
				}
			}
		});

		// Return to allow chaining
		return this;
	};
})(jQuery);