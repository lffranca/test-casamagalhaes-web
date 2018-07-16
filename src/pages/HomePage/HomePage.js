import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { categorySocket } from '../../store/ProviderStore';
import { EVENT_CATEGORY_SEND_ALL } from '../../constants/category-constant';

class HomePage extends Component {
  getCategories () {
    categorySocket.emit(EVENT_CATEGORY_SEND_ALL, true)
  }

  createNewCategorie (item) {
    console.log(item)
  }

  renderCategories (categories) {
    if (!categories) {
      return false
    }

    return categories.map((elm, index) => {
      return (
        <ul key={index}>
          <li
            onDoubleClick={() => this.createNewCategorie(elm)} >
            {elm.description}
          </li>
          <ul>{this.renderCategories(elm.children)}</ul>
        </ul>
      );
    })
  }

  render () {
    const {items: categories} = this.props.Category

    return (
      <div>
        <div>
          <button onClick={this.getCategories.bind(this)}>GET CATEGORIES</button>
        </div>
        <div>
          {this.renderCategories(categories)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Category }) => ({ Category })
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);