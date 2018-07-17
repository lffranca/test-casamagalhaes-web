import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {categorySocket} from '../../store/ProviderStore';
import {EVENT_CATEGORY_SEND_ALL, EVENT_CATEGORY_EDIT, EVENT_CATEGORY_NEW, EVENT_CATEGORY_REMOVE} from '../../constants/category-constant';
import {toggleMenuCategory, toggleEditCategory, toggleNewCategory} from '../../actions/CategoryActions'

class HomePage extends Component {
  constructor (props) {
    super (props)

    this.state = {
      newRoot: false,
      item: {
        id: null,
        description: ''
      }
    }
  }

  getCategories () {
    categorySocket.emit(EVENT_CATEGORY_SEND_ALL, true)
  }

  toggleMenuCategory (item, value) {
    this.props.toggleMenuCategory(this.props.Category.items, item, value)
  }

  toggleEditCategory (item, value) {
    if (value) {
      this.setState({item})
    }

    this.props.toggleEditCategory(this.props.Category.items, item, value)
  }

  toggleNewCategory (item, value = false) {
    this.setState({
      item: {
        parentId: item.id,
        description: ''
      }
    })

    this.props.toggleNewCategory(this.props.Category.items, item, value)
  }

  changeEdit (e) {
    this.setState({
      item: {
        id: this.state.item.id,
        description: e.target.value
      }
    })
  }

  changeNew (e) {
    this.setState({
      item: {
        parentId: this.state.item.parentId,
        description: e.target.value
      }
    })
  }

  inputEditPress (e) {
    if (e.key === 'Enter') {
      categorySocket.emit(EVENT_CATEGORY_EDIT, {
        ...this.state.item
      })
    }
  }

  editToggle (item) {
    if (!item.edit) {
      return (
        <li
          onMouseOver={() => this.toggleMenuCategory(item, true)}
          onMouseLeave={() => this.toggleMenuCategory(item, false)} >
          <span
            onDoubleClick={() => this.toggleEditCategory(item, true)} >
            {item.description}
          </span>
          {this.menuToggle(item)}
        </li>
      )
    }

    return (
      <li>
        <input
          type="text"
          value={this.state.item.description}
          onChange={this.changeEdit.bind(this)}
          onKeyPress={this.inputEditPress.bind(this)} />
        <button onClick={() => this.toggleEditCategory(item, false)}>X</button>
      </li>
    )
  }

  menuToggle (item) {
    if (!item.openMenu) {
      return ('')
    }

    return (
      <span style={{
        marginLeft: '10px'
      }}>
        <button onClick={() => this.toggleNewCategory(item, true)}>+</button>
        <button onClick={() => this.goDelete(item)}>-</button>
        <span style={{ marginLeft: '10px' }}>Clique 2x para editar</span>
      </span>
    )
  }

  inputNewPress (e) {
    if (e.key === 'Enter') {
      categorySocket.emit(EVENT_CATEGORY_NEW, {
        ...this.state.item
      })

      this.toggleNewRoot(false)
    }
  }

  itemInput = (keyToIndex, elm) => {
    return (
      <ul key={keyToIndex} ref={keyToIndex}>
        <li>
          <input
            type="text"
            value={this.state.item.description}
            onChange={this.changeNew.bind(this)}
            onKeyPress={this.inputNewPress.bind(this)} />
          <button onClick={() => this.toggleNewCategory(elm, false)}>X</button>
        </li>
      </ul>
    )
  }

  changeNewRoot (e) {
    this.setState({
      item: {
        description: e.target.value
      }
    })
  }

  toggleNewRoot (value) {
    this.setState({
      newRoot: value,
      item: {
        id: null,
        parentId: null,
        description: ''
      }
    })
  }

  setNewRoot (categories) {
    if (!this.state.newRoot) {
      return (
        <ul key={categories.length} ref={categories.length}>
          <li>
            <button onClick={() => this.toggleNewRoot(true)}>Adicionar</button>
          </li>
        </ul>
      )
    }

    return (
      <ul key={categories.length} ref={categories.length}>
        <li>
          <input
            type="text"
            value={this.state.item.description}
            onChange={this.changeNewRoot.bind(this)}
            onKeyPress={this.inputNewPress.bind(this)} />
          <button onClick={() => this.toggleNewRoot(false)}>X</button>
        </li>
      </ul>
    )
  }

  renderCategories (categories, key = undefined) {
    if (!categories) {
      return false
    }

    const keyIndex = key === undefined? '': `${key}-`

    return categories.map((elm, index) => {
      const keyToIndex = `${keyIndex}${index}`

      if (elm.new) {
        return this.itemInput(keyToIndex, elm)
      }

      return (
        <ul key={keyToIndex} ref={keyToIndex}>
          {this.editToggle(elm)}
          {this.renderCategories(elm.children, keyToIndex)}
        </ul>
      )
    })
  }

  goDelete (elm) {
     const result = window.confirm(`Deseja realmente deletar ${elm.description}?`);

    if (result === true) {
      categorySocket.emit(EVENT_CATEGORY_REMOVE, elm.id)
    }
  }

  render () {
    const {items: categories} = this.props.Category

    if ((!categories) || (categories.length <= 0)) {
      return (
        <div>
          <div>
            {this.setNewRoot([])}
          </div>
        </div>
      )
    }

    return (
      <div>
        <div>
          {this.renderCategories(categories)}
          {this.setNewRoot(categories)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Category }) => ({ Category })
const mapDispatchToProps = (dispatch) => bindActionCreators({toggleMenuCategory, toggleEditCategory, toggleNewCategory}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);