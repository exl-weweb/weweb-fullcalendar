export default {
	editor: {
		label: {
			en: "Full Calendar",
		},
	},
	triggerEvents: [
		{
			name: "eventClick",
			label: {
				en: "User clicked on an event"
			},
			event: {
				id: 0,
				title: '',
				start: 0,
				end: 0
			}
		},
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
		locale: {
			label: {
				en: "Locale",
			},
			type: "String",
			defaultValue: "nl",
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
