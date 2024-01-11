<template>
	<div class="my-calendar" ref="calendar">
		<FullCalendar :key="calendarKey" :options="calendarOptions"/>
	</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import nlLocale from '@fullcalendar/core/locales/nl';
import enLocale from '@fullcalendar/core/locales/en-gb';

export default {
	components: {
		FullCalendar
	},
	props: {
		content: {type: Object, required: true},
	},

	emits: ["trigger-event"],

	computed: {
		endpoint() {
			return this.content.url;
		},
		bearer() {
			return this.content.bearer;
		},
		datasource() {
			return this.content.datasource;
		},
		locale() {
			return this.content.locale;
		},
		stylePrimaryColor() {
			return this.content.stylePrimaryColor;
		},
		stylePrimaryActiveColor() {
			return this.content.stylePrimaryActiveColor;
		},
	},

	data() {
		return {
			calendarKey: 0,
			calendarOptions: {
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				initialView: 'dayGridMonth',
				headerToolbar: {
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay"
				},
				locale: nlLocale,
				events: (fetchInfo, successCallback, failureCallback) => {
					let headers = {
						Authorization: `Bearer ${this.bearer}`
					}
					if (this.datasource !== '') {
						headers['X-Data-Source'] = this.datasource
					}
					axios.get(this.endpoint, {
						headers: headers
					}).then(response => {
						successCallback(response.data);
					}).catch(error => {
						failureCallback(error);
					});
				},
				eventClick: (info) => {
					console.log("eventClick", info);
					this.$emit("trigger-event", {
						name: "eventClick",
						event: info.event
					});
				},
				dateClick: (info) => {
					console.log("dateClick", info);
				},
			},
		};
	},

	methods: {
		setPrimaryColor() {
			this.$refs.calendar.style.setProperty('--fc-button-bg-color', this.stylePrimaryColor);
		},
		setPrimaryActiveColor() {
			this.$refs.calendar.style.setProperty('--fc-button-active-bg-color', this.stylePrimaryActiveColor);
		}
	},

	watch: {
		content: {
			async handler() {
				if (this.locale === 'nl') {
					this.calendarOptions.locale = nlLocale;
				} else if (this.locale === 'en') {
					this.calendarOptions.locale = enLocale;
				} else {
					this.calendarOptions.locale = nlLocale; // Default Dutch
				}
				if (this.stylePrimaryColor !== '') {
					this.setPrimaryColor();
				}
				if (this.stylePrimaryActiveColor !== '') {
					this.setPrimaryActiveColor();
				}
				this.calendarKey++;
			},
			deep: true
		}
	}
};
</script>

<style scoped>
.fc .fc-button-primary {
    background-color: var(--fc-button-bg-color, default_color);
	// --fc-button-bg-color: red;
}
.fc .fc-button-primary:not(:disabled).fc-button-active {
	background-color: var(--fc-button-active-bg-color, default_color);
}
</style>

