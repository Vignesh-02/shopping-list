
import Header from './Header';
import AddItem from './AddItem';
import Content1 from './Content1';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {

  const API_URL = "http://localhost:3500/items" 
  

  const [items,setItems] = useState([])
  const [newItem,setNewItem] = useState('')
  const [search,setSearch]=useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Did not recieve expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      }catch (err){
        setFetchError(err.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchItems()
    },500)
    

  },[])

  // whenever items is modified set local storage.
  // also loads one time initially
  


const addItem =async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const myNewItem = { id, checked: false, item};
  const listItems = [...items, myNewItem];
  setItems(listItems);

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions)
  if(result) setFetchError(result)
  // if there is an set the error and display it

  // 304 means retrieveing cached information


} 

const handleCheck =async (id) => {
  const listItems = items.map((itemObj) => itemObj.id === id ? 
  { ...itemObj, checked: !itemObj.checked} : itemObj );
  setItems(listItems);

   const myItem = listItems.filter((item) => item.id === id)

  const updateOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checked: myItem[0].checked})
  };

  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, updateOptions)
  if(result) setFetchError(result)
}

const handleDelete = async (id) => {
  const listItems = items.filter((itemObj) => itemObj.id !== id );
  setItems(listItems)

  const deleteOptions = {
    method: 'DELETE',
   };

  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, deleteOptions)
  if(result) setFetchError(result)
}


const handleSubmit = (e) => {
  e.preventDefault();
  if(!newItem) return;
  // addItem 
  addItem(newItem)
  setNewItem('')

}

  return (
    <div className="App">
     <Header title='Bienvenido a mi applicación' />
     <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
     />
      <SearchItem 
        search={search}
        setSearch={setSearch}
     />
     <main>
      {isLoading && <p>Loading items....</p>}
      {fetchError && <p style={{ color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content1 
            items={items.filter(item => ((item.item).toLowerCase())
            .includes(search.toLowerCase()))
            }
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />}
     </main>
     
     <Footer length={items.length}/>
    </div>
  );
}

export default App;
