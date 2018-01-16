/**
 * Created by sandeep on 15/01/2018.
 */
import update from 'immutability-helper';
import request from 'ajax-request';
import { push } from 'react-router-redux';
import simpleAction from '../../util/simpleAction';

export const FETCH_REQUEST = 'fetchLoginRequest/login/shift';
export const FETCH_FAILURE = 'fetchLoginFailure/login/shift';
export const FETCH_SUCCESS = 'fetchLoginSuccess/login/shift';

const fetchFailure = simpleAction(FETCH_FAILURE);

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    error: [],
    response: [],
  }
};

export default function rootReducer(state = initialState, {type, payload}) {
  switch (type) {
    case FETCH_REQUEST: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case FETCH_FAILURE: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          error: { $push: payload },
        },
      });
    }
    case FETCH_SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          response: { $push: payload },
        },
      });
    }
  }
  return state;
}

export function fetchRequest () {
  return async (dispatch, getState) => {

    dispatch({
      type: FETCH_REQUEST
    });

    const { search } = getState().login.data;

    try {
      request({
        url: '/FAKE/END_POINT',
        method: 'POST',
        data: {
          search
        }
      }, (error, res, body) => {
        return new Promise((resolve, reject) => {
          if ( error ) {
            dispatch({
              type: FETCH_FAILURE,
              payload: error,
            });
            return reject();
          }
          return resolve(JSON.parse(body));
        }).then((resp) => {
          if (resp.response === 1) {
            return dispatch({
              type: FETCH_SUCCESS
            });
          }
          return dispatch({
            type: FETCH_FAILURE,
            payload: resp.msg,
          });
        });
      });
    } catch (e) {
      return dispatch(fetchFailure('Something went wrong'))
    }
  }
}