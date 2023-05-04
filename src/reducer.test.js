import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('OK is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState
    
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 })
  })

  describe('zero resets stats to zero', () => {
    const action = {
      type: 'ZERO'
    }

    const resetState = {
      good: 0,
      ok: 0,
      bad: 0
    }

    test('when the state is initial just zeros', () => {
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual(resetState)
    })

    test('when good is nonzero', () => {
      const state = { ...initialState, good: 13}

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual(resetState)
    })
    test.todo('when ok is nonzero')
    test.todo('when bad is nonzero')
    test.todo('when state is random nonzero')
  })
})