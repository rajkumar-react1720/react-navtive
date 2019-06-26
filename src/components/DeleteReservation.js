import * as React from 'react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { graphql } from 'react-apollo'
import axios from 'axios'
import Chance from 'chance'

const chance = new Chance()

class DeleteReservation extends React.Component {
	constructor (props) {
		super(props)

		this._deleteReservation = this._deleteReservation.bind(this)

		this.state = {}

	};

	_deleteReservation (id) {

		const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

		axios({
			url: _endpoint,
			method: 'post',
			data: {
				query: `
                    mutation {
                        deleteReservation(
                        where: {
                            id: "${id}"
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
		}).then((res) => {
			let deleteConfirm = res.data.data.deleteReservation
			console.log({deleteConfirm})

		})
			.catch((err) => {
				console.error(err)
			})

	}

	render () {

		const delete_id = 'cjrrwn5b4kx9v0a08z8iy498s'

		return (
			<section>

				<PrimaryButton
					data-automation-id="Reservation"
					text="Delete Reservation"
					onClick={() => {this._deleteReservation(delete_id)}}
				/>

			</section>
		)
	};

}

export { DeleteReservation }