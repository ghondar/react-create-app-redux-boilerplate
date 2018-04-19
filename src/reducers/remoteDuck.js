import Duck from 'extensible-duck'

export default function createDuck({
  namespace,
  store,
  initialState = {},
  creators,
  selectors
}) {
  return new Duck({
    namespace,
    store,
    consts: {
      statuses: [ 'NEW', 'LOADING', 'READY', 'SAVING', 'SAVED', 'ERROR' ]
    },
    types: [
      'UPDATE',
      'FETCH',
      'FETCH_PENDING',
      'FETCH_FULFILLED',
      'FETCH_FAILURE',
      'POST',
      'POST_PENDING',
      'POST_FULFILLED',
      'POST_FAILURE',
      'RESET'
    ],
    reducer: (state, action, { types, statuses }) => {
      switch (action.type) {
        case types.UPDATE:
          return {
            ...state,
            [Object.keys(action.payload)[0]]: {
              ...state[Object.keys(action.payload)[0]],
              ...action.payload
            }
          }
        case types.FETCH_PENDING:
          return { ...state, status: statuses.LOADING }
        case types.FETCH_FULFILLED:
          return {
            ...state,
            ...action.payload,
            status: statuses.READY
          }
        case types.POST_PENDING:
        case types.PATCH_PENDING:
          return { ...state, status: statuses.SAVING }
        case types.POST_FULFILLED:
        case types.PATCH_FULFILLED:
          return { ...state, status: statuses.SAVED }
        case types.FETCH_FAILURE:
        case types.POST_FAILURE:
          return { ...state, status: statuses.ERROR, error: action.error }
        case types.RESET:
          return {
            ...initialState,
            status: statuses.NEW,
            error : null
          }
        default:
          return state
      }
    },
    selectors,
    creators,
    initialState: ({ statuses }) => ({
      ...initialState,
      status: statuses.NEW,
      error : null
    })
  })
}
