import Layout from "../../../layout/layout"
import ErrorView from "../../../components/molecules/errors/error-view"
import ViewModel from "./viewmodel"

export default function Error500Route() {
  const {viewProps} = ViewModel()

  return (
    <Layout withHeader = {false}>
      <ErrorView {...viewProps}/>
    </Layout>
  )


}