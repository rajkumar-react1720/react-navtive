let {Link, Image, ImageFit, DetailsList, buildColumns, IColumn, mergeStyles, IGroup, Fabric} = window.Fabric

class DetailsListCustomColumnsExample extends React.Component {
	constructor (props) {
		super(props)
		this._onColumnClick = (event, column) => {
			const {columns} = this.state
			let {sortedItems} = this.state
			let isSortedDescending = column.isSortedDescending
			// If we've sorted this column, flip it.
			if (column.isSorted) {
				isSortedDescending = !isSortedDescending
			}
			// Sort the items.
			sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending)
			// Reset the items and columns to match the state.
			this.setState({
				sortedItems: sortedItems,
				columns: columns.map(col => {
					col.isSorted = col.key === column.key
					if (col.isSorted) {
						col.isSortedDescending = isSortedDescending
					}
					return col
				})
			})
		}
		const items = createListItems(500)
		this.state = {
			sortedItems: items,
			columns: _buildColumns(items)
		}
	}

	render () {
		const {sortedItems, columns} = this.state
		return (<DetailsList items={sortedItems} setKey="set" columns={columns} onRenderItemColumn={_renderItemColumn} onColumnHeaderClick={this._onColumnClick} onItemInvoked={this._onItemInvoked}
												 onColumnHeaderContextMenu={this._onColumnHeaderContextMenu} ariaLabelForSelectionColumn="Toggle selection" ariaLabelForSelectAllCheckbox="Toggle selection for all items"/>)
	}

	_onColumnHeaderContextMenu (column, ev) {
		console.log(`column ${column.key} contextmenu opened.`)
	}

	_onItemInvoked (item, index) {
		alert(`Item ${item.name} at index ${index} has been invoked.`)
	}
}

function _buildColumns (items) {
	const columns = buildColumns(items)
	const thumbnailColumn = columns.filter(column => column.name === 'thumbnail')[0]
	// Special case one column's definition.
	thumbnailColumn.name = ''
	thumbnailColumn.maxWidth = 50
	return columns
}

function _renderItemColumn (item, index, column) {
	const fieldContent = item[column.fieldName]
	switch (column.key) {
		case 'thumbnail':
			return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover}/>
		case 'name':
			return <Link href="#">{fieldContent}</Link>
		case 'color':
			return (<span data-selection-disabled={true} className={mergeStyles({color: fieldContent, height: '100%', display: 'block'})}>
          {fieldContent}
        </span>)
		default:
			return <span>{fieldContent}</span>
	}
}

function _copyAndSort (items, columnKey, isSortedDescending) {
	const key = columnKey
	return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1))
}

const LOREM_IPSUM = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
	'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
	'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
	'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
	'mollit anim id est laborum').split(' ')
const DATA = {
	color: ['red', 'blue', 'green', 'yellow'],
	shape: ['circle', 'square', 'triangle'],
	location: ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland']
}

function createListItems (count, startIndex = 0) {
	return Array.apply(null, Array(count)).map((item, index) => {
		const size = 150 + Math.round(Math.random() * 100)
		return {
			thumbnail: `//placehold.it/${size}x${size}`,
			key: 'item-' + (index + startIndex) + ' ' + lorem(4),
			name: lorem(5),
			description: lorem(10 + Math.round(Math.random() * 50)),
			color: _randWord(DATA.color),
			shape: _randWord(DATA.shape),
			location: _randWord(DATA.location),
			width: size,
			height: size
		}
	})
}

function createGroups (groupCount, groupDepth, startIndex, itemsPerGroup, level = 0, key = '', isCollapsed) {
	if (key !== '') {
		key = key + '-'
	}
	const count = Math.pow(itemsPerGroup, groupDepth)
	return Array.apply(null, Array(groupCount)).map((value, index) => {
		return {
			count: count,
			key: 'group' + key + index,
			name: 'group ' + key + index,
			startIndex: index * count + startIndex,
			level: level,
			isCollapsed: isCollapsed,
			children: groupDepth > 1
				? createGroups(groupCount, groupDepth - 1, index * count + startIndex, itemsPerGroup, level + 1, key + index)
				: []
		}
	})
}

function lorem (wordCount) {
	return Array.apply(null, Array(wordCount))
		.map((item, idx) => {
			return LOREM_IPSUM[idx % LOREM_IPSUM.length]
		})
		.join(' ')
}

function isGroupable (key) {
	return key === 'color' || key === 'shape' || key === 'location'
}

function _randWord (array) {
	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

ReactDOM.render(<DetailsListCustomColumnsExample/>, document.getElementById('content'))
