## React Native GraphQL
  

```bash{.env-code}
npm install
```
```bash{.env-code}
npm start
```
Navigate to http://localhost:3005
  
### Create Reservation
 
> Create a reservation and get confirmation using Hilton Hotels dev GraphQL endpoint.
  
'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
  
### Axios is used inside a React method to post mutations to GraphQL
  
```javascript
_createReservation (firstName, lastName, hotelName, arrivalDate, departureDate) {
    
    const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

    axios({
        url: _endpoint,
        method: 'post',
        -----
    })
    .then(res => {
		----
	}
}
```
![](img/createReservation.png?0.8317726698521553 )  

---

## Apollo Client

> Setup Apollo Client in App.js
  
```javascript
import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
  
const client = new ApolloClient({
	uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
})
```
> Bind query for all reservations to Reservations.js Component
```javascript

  
const reservations = `
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
const getMarketsQuery = gql`${reservations}`
  

class Res extends React.Component {
	constructor (props) {
		super(props)
  
        ---
	}
}
  
const Reservations = graphql(getMarketsQuery)(Res)
  
export { Reservations } 
  
```

### The Apollo query is bound to the component an retrieves all reservations from the external endpoint
  
> Create a reservation then refresh. You can now search for your reservation in the list below by first and last name.
  
![](img/list.png?0.9571717133047106 )  
  
