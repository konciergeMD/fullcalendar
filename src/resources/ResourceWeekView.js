
fcViews.resourceWeek = ResourceWeekView;

function ResourceWeekView(element, calendar) {
	var t = this;

	// exports
	t.render = render;

	// imports
	ResourceView.call(t, element, calendar, 'resourceWeek');
	var opt = t.opt;
	var renderResourceView = t.renderResourceView;
	var formatDate = calendar.formatDate;

	function render(date, delta, rebuildSkeleton) {
        var days = opt('weekends') ? 7:5;
		if (delta) {
			addDays(date, delta * days);
			if (!opt('weekends')) {
				skipWeekend(date, delta < 0 ? -1 : 1);
			}
		}

		//var start = cloneDate(date, true);
		//var end = addDays(cloneDate(start), days);

        var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + days) % days));
        var end = addDays(cloneDate(start), days);

		t.title = formatDate(date, opt('titleFormat'));
		t.start = t.visStart = start;
		t.end = t.visEnd = end;
        t.daysCnt = days;
		renderResourceView(rebuildSkeleton);
	}
}
