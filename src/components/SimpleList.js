import * as React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { DetailsList, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import _ from 'lodash'

let _items = []

const getMarketsQuery = gql`
	{
		all_markets {
			_id
			base
			quote
			pairing
			symbol
			market_name
			market_id
		}
	}
`

const childClass = mergeStyles({
	display: 'block',
	marginBottom: '10px'
})

class List extends React.Component {
	constructor (props) {
		super(props)

		this._onColumnClick = this._onColumnClick.bind(this)
		this._onSearch = this._onSearch.bind(this)

		this._items = this.props.items

		_items = this.props.items

		this._columns = [
			{
				key: '_id',
				name: '_id',
				fieldName: '_id',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item._id}</span>)
				}
			},
			{
				key: 'base',
				name: 'base',
				fieldName: 'base',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.base}</span>)
				}
			},
			{
				key: 'quote',
				name: 'quote',
				fieldName: 'quote',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.quote}</span>)
				}
			},
			{
				key: 'pairing',
				name: 'pairing',
				fieldName: 'pairing',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.pairing}</span>)
				}
			},
			{
				key: 'symbol',
				name: 'symbol',
				fieldName: 'symbol',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.symbol}</span>)
				}
			},
			{
				key: 'market_name',
				name: 'market_name',
				fieldName: 'market_name',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.market_name}</span>)
				}
			},
			{
				key: 'market_id',
				name: 'market_id',
				fieldName: 'market_id',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.market_id}</span>)
				}
			}
		]

		this.state = {
			items: this._items,
			columns: this._columns
		}
	}

	_onColumnClick () {
		console.log('Column Clicked')
	}

	_onSearch = (ev, text) => {

		let _text = _.toLower(text)

		let _search = _.filter(_items, (obj) => {
			const string = _.toLower(obj.pairing)
			return _text ? string.indexOf(_text) > -1 : _items
		})

		this.setState({
			items: _search
		})

	}

	render () {

		const {items, columns} = this.state

		return (
			<section>

				<TextField id={'search_all_markets'}
									 label={'Search by pairing'}
									 iconProps={{iconName: 'Search'}}
									 onChange={this._onSearch}/>

				<DetailsList items={items}
										 setKey="set"
										 columns={columns}
										 onColumnHeaderClick={this._onColumnClick}
										 selectionMode={SelectionMode.none}/>

			</section>
		)

	}

}

const SimpleList = graphql(getMarketsQuery)(List)

export { SimpleList }
