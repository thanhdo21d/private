import { Breadcrumb } from '~/components'
import { FeatureProducts } from '~/features/Products'

export const ProductPage = () => {
  return (
    <div>
      <Breadcrumb pageName='products' />
      <FeatureProducts />
    </div>
  )
}
