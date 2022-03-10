import React,{ useState } from 'react'

const AdminForm = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        url: "",
        desc: "",
        price: 0
    })
    async function addNewProduct() {
        const response = await fetch("/api/hello", {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
  return (
    <div>
        <input type="text" placeholder='product name' value={formValues.name} onChange={e=>setFormValues({...formValues, name: e.target.value})}/>
        <br />
        <input type="text" placeholder='product image url' value={formValues.url} onChange={e=>setFormValues({...formValues, url: e.target.value})}/>
        <br />
        <textarea cols="30" rows="10" placeholder='product description' value={formValues.desc} onChange={e=>setFormValues({...formValues, desc: e.target.value})}></textarea>
        <br />
        <input type="number" placeholder='product price' value={formValues.price} onChange={e=>setFormValues({...formValues, price: e.target.value})}/>
        <br />
        <button onClick={addNewProduct}>Submit</button>
    </div>
  )
}

export default AdminForm