import { connect } from 'react-redux'
import SearchResult from './SearchResult'

const mapStateToProps = (state) => {
  let {nonstopOnly, availableOnly} = state;
  return {
    nonstopOnly, availableOnly
  }
}

const SearchResultContainer = connect(
  mapStateToProps
)(SearchResult)

export default SearchResultContainer