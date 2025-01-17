"use client"
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { firestore } from "./firebase";
import { collection, getDocs, query, setDoc, doc, deleteDoc,getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap:2,
  display:'flex',
  flexDirection:'column'
};
export default function Home() {
  const [pantry ,setPantry] = useState([])
  const [open,setOpen] = useState(false)
  const handleOpen = ()=> setOpen(true)
  const handleClose = ()=>setOpen(false)
  const [itemName , setItemName] = useState(' ')

  const updatePantry = async() =>{
    const snapshot = query(collection(firestore,'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((docs) =>{
      pantryList.push({name :docs.id, ...docs.data()})
      
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() =>{
    
    updatePantry()
  },[])

  const addItem =async (item) =>{
    const docRef = doc(collection(firestore,'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef,{count: count+1})
    }else{
      await setDoc(docRef,{count:1})
    }
    await updatePantry()
    
  
  }

  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore,'pantry'),item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {count} = docSnap.data()
      if(count ==1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef,{count:count-1})
      }
    }
    await updatePantry()
  }
    
  


  return (
    <Box width="100vw"
     height="100vw"
     display={"flex"}
     justifyContent={'center'}
     alignItems={'center'}
     flexDirection={'column'}
     bgcolor={"white"}
     gap={2}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>

          <Stack width='100%' direction={'row'} spacing={2}>
            <TextField id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            fullWidth value={itemName}
            onChange={(e) => setItemName(e.target.value)}/>
            <Button 
            variant="outlined"
            onClick={() =>{
              addItem(itemName)
              setItemName(' ')
              handleClose()
            }}>
              ADD
            </Button> 
          </Stack>
          
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Box border={'1px solid #333'}>
      <Box width='800px' height='100px' bgcolor={'#ADD8E6'} border={'1px solid #333'}>
        <Typography variant="h2" color={'#333'}textAlign={'center'}>
          Pantary Items
        </Typography>
      </Box>
      <Stack 
      width="800px"
      height = '300px'
      spacing={2}
      overflow={'auto'}>
        {pantry.map(({name , count}) =>(
          <Box 
          key={name}
          width='100%'
          minHeight={'150px'}
          display={'flex'}
          justifyContent={'space-between'}
          paddingX={5}
          alignItems={'center'}
          bgcolor={'yellow'}>
            <Typography variant="h4"
            color={'#333'}
            textAlign={'center'}
            fontWeight={'bold'}>
              {
                name.charAt(0).toUpperCase() + name.slice(1)
              }
            </Typography>
            <Typography variant="h3" color={'#333'} textAlign={'center'}>
              Quantity :{count}
            </Typography>
            <Button variant="contained" onClick={ () =>removeItem(name)}>
            remove
          </Button>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
