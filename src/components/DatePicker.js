import * as React from 'react'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker'
import './DatePicker.Examples.scss'

const DayPickerStrings = {
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	goToToday: 'Go to today',
	prevMonthAriaLabel: 'Go to previous month',
	nextMonthAriaLabel: 'Go to next month',
	prevYearAriaLabel: 'Go to previous year',
	nextYearAriaLabel: 'Go to next year',
	closeButtonAriaLabel: 'Close date picker'
}

class DatePicker extends React.Component {
	constructor (props) {
		super(props)
		this._onDropdownChange = (event, option) => {
			this.setState({
				firstDayOfWeek: DayOfWeek[option.key]
			})
		}
		this.state = {
			firstDayOfWeek: DayOfWeek.Sunday
		}
	}

	render () {
		const {firstDayOfWeek} = this.state
		return (<div className="docs-DatePickerExample">
			<DatePicker firstDayOfWeek={firstDayOfWeek} strings={DayPickerStrings} placeholder="Select a date..." ariaLabel="Select a date"/>
		</div>)
	}
}

export { DatePicker }
