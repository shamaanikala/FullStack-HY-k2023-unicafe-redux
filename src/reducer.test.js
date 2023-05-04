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
    test('when ok is nonzero', () => {
      const state = { ...initialState, ok: 7}

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual(resetState)
    })
    test('when bad is nonzero', () => {
      const state = { ...initialState, bad: 23}

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual(resetState)
    })
    test('when state is random nonzero', () => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }
      
      const state = {
        good: getRandomInt(255),
        ok: getRandomInt(255),
        bad: getRandomInt(255)
      }

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual(resetState)
    })
  })
})