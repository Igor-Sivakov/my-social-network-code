import { create, ReactTestInstance } from 'react-test-renderer'
import ProfileStatusCC from './ProfileStatusCC'

type I = {
  state: {
    status: string
  }
  deactivateEditMode: () => void
}

describe('ProfileStatusCC component tests', () => {
  test('status form props should be in the state', () => {
    const component = create(
      <ProfileStatusCC updateUserStatus={() => {}} status={'it-kamasutra'} />
    )

    const instance: ReactTestInstance & I =
      component.getInstance() as ReactTestInstance & I
    expect(instance.state.status).toBe('it-kamasutra')
  })

  test('after creation <span> should be displayed', async () => {
    const component = create(
      <ProfileStatusCC updateUserStatus={() => {}} status={'it-kamasutra'} />
    )
    const root = component.root
    const span = await root.findByType('span')

    expect(span).not.toBeNull()
  })

  test('after creation <input> shouldn`t be displayed', () => {
    const component = create(
      <ProfileStatusCC updateUserStatus={() => {}} status={'it-kamasutra'} />
    )
    const root = component.root
    const input = () => root.findByType('input')

    expect(input).toThrow()
  })

  test('after creation <span> should contains correct status', async () => {
    const component = create(
      <ProfileStatusCC updateUserStatus={() => {}} status={'it-kamasutra'} />
    )
    const root = component.root
    const span = await root.findByType('span')

    expect(span.children[0]).toBe('it-kamasutra')
  })

  test('input should be displayed in editMode instead of span', async () => {
    const component = create(
      <ProfileStatusCC updateUserStatus={() => {}} status={'it-kamasutra'} />
    )
    const root = component.root
    const span = await root.findByType('span')

    span.props.onDoubleClick()
    const input = await root.findByType('input')

    expect(input.props.value).toBe('it-kamasutra')
  })

  test('callback should be called', async () => {
    const mockCallback = jest.fn()
    const component = create(
      <ProfileStatusCC
        status={'it-kamasutra'}
        updateUserStatus={mockCallback}
      />
    )
    const instance: ReactTestInstance & I =
      component.getInstance() as ReactTestInstance & I
    instance.deactivateEditMode()

    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
