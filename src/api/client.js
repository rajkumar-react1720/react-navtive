import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import Axios from 'axios'

const endpointURI = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

const client = new ApolloClient({
	uri: endpointURI
})

export const api = {
	reservations: () => {
		return `
            {
                reservations {
                    name
                    hotelName
                    arrivalDate
                    departureDate
                    id
                }
            }
        `
	},
	createReservation: (name, hotel, arrivalDate, departureDate) => {
		return `
            mutation {
                createReservation(
                    data: {
                        name: "${name}"
                        hotelName: "${hotel}"
                        arrivalDate: "${arrivalDate}"
                        departureDate: "${departureDate}"
                    }
                ) 
                {
                    id
                    name
                    hotelName
                    arrivalDate
                    departureDate
                }
            }
        `
	}
}
