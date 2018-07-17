import { EVENT_CATEGORY_RECEIVE_ALL } from '../constants/category-constant';
import * as R from 'ramda'

export const getAllCategories = (items) => {
  return {
    type: EVENT_CATEGORY_RECEIVE_ALL,
    payload: items
  }
}

export const toggleMenuCategory = (items, item, value = false) => {
  const addToggleMenu = () => {
    const newItem = R.assoc('openMenu', value, item)
    return newItem
  }

  const verifyChild = (elms) => {
    return elms.map(elm => {
      if (elm.id === item.id) {
        return addToggleMenu()
      }

      const elmreturn = elm.children? R.assoc('children', verifyChild(elm.children), elm): elm

      return elmreturn
    })
  }

  const newArray = items.map(elmMap => {
    if (elmMap.id === item.id) {
      return addToggleMenu()
    }

    const elmReturn = elmMap.children? R.assoc('children', verifyChild(elmMap.children), elmMap): elmMap

    return elmReturn
  })

  return {
    type: EVENT_CATEGORY_RECEIVE_ALL,
    payload: newArray
  }
}

export const toggleEditCategory = (items, item, value = false) => {
  const addToggleMenu = () => {
    const newItem = R.assoc('edit', value, item)
    return newItem
  }

  const verifyChild = (elms) => {
    return elms.map(elm => {
      if (elm.id === item.id) {
        return addToggleMenu()
      }

      const elmNotMenu =  R.assoc('openMenu', false, elm)
      const elmNotEdit =  R.assoc('edit', false, elmNotMenu)

      const elmreturn = elmNotEdit.children? R.assoc('children', verifyChild(elmNotEdit.children), elmNotEdit): elmNotEdit

      return elmreturn
    })
  }

  const newArray = items.map(elmMap => {
    if (elmMap.id === item.id) {
      return addToggleMenu()
    }

    const elmNotMenu =  R.assoc('openMenu', false, elmMap)
    const elmNotEdit =  R.assoc('edit', false, elmNotMenu)

    const elmReturn = elmNotEdit.children? R.assoc('children', verifyChild(elmNotEdit.children), elmNotEdit): elmNotEdit

    return elmReturn
  })

  return {
    type: EVENT_CATEGORY_RECEIVE_ALL,
    payload: newArray
  }
}

export const toggleNewCategory = (items, item, value = false) => {
  const setNew = (elm) => {
    if (elm.children) {
      const childrenElm = R.append({
        parentId: elm.id,
        new: value
      }, elm.children)

      return R.assoc('children', childrenElm, elm)
    } else {
      return R.assoc('children', [{
        parentId: elm.id,
        new: value
      }], elm)
    }
  }

  const verify = (elm) => {
    if (!value) {
      if (elm.id === item.parentId) {
        if (elm.children.length > 1) {
          const resultDrop = R.dropLast(1, elm.children)
          return R.assoc('children', resultDrop, elm)
        } else {
          return R.dissoc('children', elm)
        }
      } else {
        if (elm.children) {
          const setChildren = R.assoc('children', elm.children.map(verify), elm)
          return setChildren
        }
  
        return elm  
      }
    }

    if (elm.id === item.id) {
      return setNew(elm)
    } else {
      if (elm.children) {
        const setChildren = R.assoc('children', elm.children.map(verify), elm)
        return setChildren
      }

      return elm
    }
  }

  const newArray = items.map(verify)

  return {
    type: EVENT_CATEGORY_RECEIVE_ALL,
    payload: newArray
  }
}
