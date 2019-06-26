import * as React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import _ from 'lodash'

let _items = []

class ReservationsList extends React.Component {
	constructor (props) {
		super(props)

		this._onColumnClick = this._onColumnClick.bind(this)
		this._onSearch = this._onSearch.bind(this)

		this._items = this.props.items
		_items = this.props.items

		this._columns = this.props.columns

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
			const string = _.toLower(obj.name)
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
						   label={`Search by Customer`}
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

export { ReservationsList }
