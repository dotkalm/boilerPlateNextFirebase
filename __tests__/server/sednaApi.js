import * as React from 'react'
import { mount } from 'enzyme'
import { postRequest, getRequest } from '../../src/server/sedna'

test('sedna low level', async () => {
  const data = await getRequest()
  expect(data).toBe('come sail away')
  expect(typeof(data)).toBe('string')
})

test('the fetch fails with an error', async () => {
  try {
    await getRequest()
  } catch (e) {
    expect(e).toMatch('error')
  }
})
