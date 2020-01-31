import { Header, Button } from 'semantic-ui-react'

function ProductAttributes({ description }) {
  return <>
    <Header as='h3'>About the product</Header>
    <p>
      {description}
    </p>
    <Button
      icon='trash alternate outline'
      color='red'
      content="Delete this Product"
    ></Button>
  </>;
}

export default ProductAttributes;
