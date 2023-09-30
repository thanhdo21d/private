import { Breadcrumb, Button, PlusIcon } from '~/components'

import { ToppingFeature } from '~/features'

export const ToppingPage = () => {
  return (
    <>
      <Breadcrumb pageName='Toppings'>
        <Button icon={<PlusIcon />}>Thêm</Button>
      </Breadcrumb>
      <ToppingFeature />
    </>
  )
}
