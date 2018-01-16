/**
 * Created by sandeep on 15/01/2018.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  fetchRequest
} from '../redux/reducers/root';

function mapStateToProps({root}) {
  const { ui, data } = root;
  return {
    loading: ui.loading,
    error: ui.error,
    response: data.response,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequest,
  }, dispatch);
}

class landingPage extends Component {
  render() {
    return (
      <div className="login-clean">
        <h2>HI THERE</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingPage);