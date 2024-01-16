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
		fixedWeekCount() {
			return this.content.fixedWeekCount;
		},
		showWeekNumbers() {
			return this.content.showWeekNumbers;
		},
		stylePrimaryColor() {
			return this.content.stylePrimaryColor;
		},
		stylePrimaryActiveColor() {
			return this.content.stylePrimaryActiveColor;
		},
		calendarEvents() {
			if (this.content.calendarEvents === undefined) {
				return [];
			} else {
				return this.content.calendarEvents;
			}
		}
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
					if (!this.endpoint) {
						successCallback(this.calendarEvents);
					} else {
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
					}
				},
				eventClick: (info) => {
					const emitEvent = {
						id: info.event.id,
						title: info.event.title,
						start: info.event.start,
						end: info.event.end,
						start_epoch: info.event.start.valueOf(),
						end_epoch: info.event.end.valueOf()
					};
					console.log("eventClick", emitEvent);
					this.$emit("trigger-event", {
						name: "eventClick",
						event: emitEvent
					});
				},
				dateClick: (info) => {
					const emitDate = {
						all_day: info.allDay,
						date: info.date,
						date_epoch: info.date.valueOf()
					};
					console.log("dateClick", emitDate);
					this.$emit("trigger-event", {
						name: "dateClick",
						date: emitDate
					});
				},
				fixedWeekCount: this.fixedWeekCount,
				weekNumbers: this.showWeekNumbers,
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

				this.calendarOptions.fixedWeekCount = this.fixedWeekCount;
				this.calendarOptions.weekNumbers = this.showWeekNumbers;

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

