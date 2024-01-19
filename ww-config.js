export default {
	editor: {
		label: {
			en: "Full Calendar",
		},
	},
	triggerEvents: [
		{
			name: "dateClick",
			label: {
				en: "User clicked on a date"
			},
			event: {
				all_day: true,
				date: '',
				date_epoch: 0,
			},
		},
		{
			name: "eventClick",
			label: {
				en: "User clicked on an event"
			},
			event: {
				id: 0,
				title: '',
				start: '',
				end: '',
				start_epoch: 0,
				end_epoch: 0,
			},
		}
	],
	properties: {
		url: {
			label: {
				en: "Endpoint URL",
			},
			type: "String",
			defaultValue: "",
			bindable: true,
		},
		bearer: {
			label: {
				en: "Authorization token",
			},
			type: "String",
			defaultValue: "",
			bindable: true,
		},
		datasource: {
			label: {
				en: "Data source",
			},
			type: "String",
			defaultValue: "",
			bindable: true,
		},
		calendarEvents: {
			label: {
				en: "Events",
			},
			type: "Array",
			defaultValue: [],
			bindable: true,
		},
		locale: {
			label: {
				en: "Locale",
			},
			type: "String",
			defaultValue: "nl",
			bindable: true,
		},
		fixedWeekCount: {
			label: {
				en: "Fixed week count?",
			},
			type: "OnOff",
			defaultValue: false,
			bindable: true,
		},
		showWeekNumbers: {
			label: {
				en: "Show week numbers?",
			},
			type: "OnOff",
			defaultValue: false,
			bindable: true,
		},
		stylePrimaryColor: {
			label: {
				en: "Primary color",
			},
			type: "Color",
			defaultValue: "#007bff",
			bindable: true,
		},
		stylePrimaryActiveColor: {
			label: {
				en: "Primary active color",
			},
			type: "Color",
			defaultValue: "#0033ff",
			bindable: true,
		}
	},
};
