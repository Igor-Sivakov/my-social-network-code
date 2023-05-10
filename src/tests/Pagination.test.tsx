import { create } from 'react-test-renderer'
import Pagination from '../components/common/Pagination/Pagination'

test('count of spans in pagination should be showed 10', async () => {
  const component = create(
    <Pagination
      onPageChanged={() => {}}
      totalItemsCount={120}
      pageSize={5}
      currentPage={10}
    />
  )
  const root = component.root
  const spans = await root.findAllByType('span')
  expect(spans.length).toBe(10)
})
