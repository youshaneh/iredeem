import { connect } from 'react-redux'
import { setNonstopOnly, setAvailableOnly } from './actions'
import SearchOptions from './SearchOptions'

const mapStateToProps = ({nonstopOnly, availableOnly}) => {
  return {
    nonstopOnly, availableOnly
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAvailableOnlyChange: (value) => {
      dispatch(setAvailableOnly(value))
    },
    onNonstopOnlyChange: (value) => {
      dispatch(setNonstopOnly(value))
    }
  }
}

const SearchOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOptions)

export default SearchOptionsContainer