import React from 'react'

const AllProducts = () => {

      const [products, setProducts] = useState([]);
    
      const getData = async () => {
        try {
          const res = await apiInstance.get("/products/find");
    
          console.log(res.data.data);
          setProducts(res.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
    
      
      useEffect(() => {
        getData();
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default AllProducts
