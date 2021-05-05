import * as React from 'react'
import { mount } from 'enzyme'
import jsonRequest from '../../src/server/sedna'

describe('sedna', () => {
  describe('request', async () => {
    it('should return xml', function () {
			const xml = await jsonRequest
      expect(typeof(xml).tobe('string'))
    })
  })  
})


