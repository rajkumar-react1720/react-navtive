import * as React from 'react'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker'

import axios from 'axios'

const DayPickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
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

function convertDate(inputFormat) {
    function pad(s) {
        return s < 10 ? '0' + s : s
    }

    let d = new Date(inputFormat)
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/')
}

class CreateReservation extends React.Component {
    constructor(props) {
        super(props)

        this._createReservation = this._createReservation.bind(this)
        this._checkReservation = this._checkReservation.bind(this)
        this._changeState = this._changeState.bind(this)
        this._onSelectArrivalDate = this._onSelectArrivalDate.bind(this)
        this._onSelectDepartureDate = this._onSelectDepartureDate.bind(this)
        this._firstName = this._firstName.bind(this)
        this._lastName = this._lastName.bind(this)

        this.state = {
            confirm_arrivalDate: null,
            confirm_departureDate: null,
            confirm_hotelName: null,
            confirm_id: null,
            confirm_name: null,
            firstDayOfWeek: DayOfWeek.Sunday,
            selectedItem: undefined,
            arrivalDate: undefined,
            arrivalDateFormatted: undefined,
            departureDate: undefined,
            departureDateFormatted: undefined,
            hotel: undefined,
            firstName: undefined,
            lastName: undefined
        }
    }

    _onSelectArrivalDate(arrival) {
        let date = convertDate(arrival)
        console.log(date)
        this.setState({
            arrivalDate: arrival,
            arrivalDateFormatted: date
        })
    }

    _onSelectDepartureDate(departure) {
        let date = convertDate(departure)
        console.log(date)
        this.setState({
            departureDate: departure,
            departureDateFormatted: date
        })
    }

    _changeState(e, item) {
        console.log(item)
        this.setState({
            hotel: item.text,
            selectedItem: item
        })
    }

    _createReservation(firstName, lastName, hotelName, arrivalDate, departureDate) {
        const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

        axios({
            url: _endpoint,
            method: 'post',
            data: {
                query: `
					mutation {
							createReservation(
							data: {
									name: "${firstName} ${lastName}"
									hotelName: "${hotelName}"
									arrivalDate: "${arrivalDate}"
									departureDate: "${departureDate}"
							}
							) {
									id
									name
									hotelName
									arrivalDate
									departureDate
							}
					}
			`
            }
        })
            .then(res => {
                let reservation = res.data.data.createReservation
                console.log(reservation)
                let confirmation = {
                    confirm_arrivalDate: reservation.arrivalDate,
                    confirm_departureDate: reservation.departureDate,
                    confirm_hotelName: reservation.hotelName,
                    confirm_id: reservation.id,
                    confirm_name: reservation.name
                }
                this.setState(confirmation)
            })
            .catch(err => {
                console.error(err)
            })
    }

    _checkReservation() {
        this._createReservation(
            this.state.firstName,
            this.state.lastName,
            this.state.hotel,
            this.state.arrivalDateFormatted,
            this.state.departureDateFormatted
        )
    }

    _firstName(e, string) {
        console.log('firstName', string)
        this.setState({ firstName: string })
    }

    _lastName(e, string) {
        this.setState({ lastName: string })
    }

    render() {
        const { firstDayOfWeek, selectedItem } = this.state

        return (
            <section className={'form-reservation mt12 child'}>
                <div className={'p12'}>
                    <section>
                        <label className={'label-wide'}>
                            Hotel
                            <Dropdown
                                className={'mb12'}
                                placeholder='Select a Hotel'
                                selectedKey={selectedItem ? selectedItem.key : undefined}
                                onChange={this._changeState}
                                options={[
                                    { key: 'nyc', text: 'Hilton NYC' },
                                    { key: 'lax', text: 'Hilton LAX' },
                                    { key: 'italy', text: 'Hilton Giardini Naxos' }
                                ]}
                                componentRef={this._basicDropdown}
                            />
                        </label>

                        <label>
                            Arrival date
                            <DatePicker
                                firstDayOfWeek={firstDayOfWeek}
                                className={'mb12'}
                                strings={DayPickerStrings}
                                onSelectDate={this._onSelectArrivalDate}
                                value={this.state.arrivalDate}
                                placeholder='Select a date...'
                                ariaLabel='Select a date'
                            />
                        </label>

                        <label>
                            Departure date
                            <DatePicker
                                firstDayOfWeek={firstDayOfWeek}
                                className={'mb12'}
                                strings={DayPickerStrings}
                                onSelectDate={this._onSelectDepartureDate}
                                value={this.state.departureDate}
                                placeholder='Select a date...'
                                ariaLabel='Select a date'
                            />
                        </label>

                        <label>
                            First name:
                            <TextField className={'mb12'} onChange={this._firstName} placeholder='First Name' />
                        </label>

                        <label>
                            Last name
                            <TextField className={'mb12'} onChange={this._lastName} placeholder='Last Name'/>
                        </label>

                        <PrimaryButton onClick={this._checkReservation}>Submit</PrimaryButton>
                    </section>

                    <section />
                </div>
            </section>
        )
    }
}

export { CreateReservation }
