import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Reservations } from './components/Reservations'
import { CreateReservation } from './components/CreateReservation'

const client = new ApolloClient({	
	uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
})

class App extends React.Component {
	render () {
		return (
			<ApolloProvider client={client}>

				<section className={'wrapper'}>
					<div id={'main'}>

						<div className={'p12 create-reservations'}>

							<CreateReservation/>
						</div>

						<div className={'p12 reservations'}>
							<h5 className={'mb0'}>All Reservations</h5>
							<Reservations/>
						</div>

					</div>
				</section>

			</ApolloProvider>
		)
	}
}

export default App