import { useEffect, useState } from 'react'
import './App.css'

type ProductProps = {
  id: string,
  title: string,
  description: string,
  category: string,
  price: number,
  rating: number
}

function App() {
  const [products, setProducts] = useState<[]>([])
  const [skip, setSkip] = useState<number>(0)
  
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip*10}`)
    const data = await res.json()
    if(data.products.length === 0)return
    setProducts(data.products)
  }

  useEffect(() => {
    fetchProducts()
  },[skip])

  return (
    <>
    {
      products.map((product: ProductProps) => (
        <div key={product.id}>
        <h1>{product.title}</h1>
        <p>Decription: {product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
        <br />
        </div>
      ))
    }

    <button onClick={() => {
      setSkip(skip+1)
      window.scrollTo(0, 0)
    }}>Next</button>
    </>
  )
}

export default App
