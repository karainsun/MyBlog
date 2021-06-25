import React from 'react'
import * as renderer from 'react-test-renderer'
import Button from '../components/button'

describe('button', () => {
  it('是个div', () => {
    //渲染一个Button，因为Button是一个对象所以我们可以把它转成json
    const json = renderer.create(<Button />).toJSON()
    //期待它去匹配Snapshot
    expect(json).toMatchSnapshot()
  })
})