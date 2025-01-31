const users=[];


const addUser = ({ id, name, room }) => {
   
    if (!name || !room) {
      return { error: 'Username and room are required.' };
    }
  
    // Trim and standardize to lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  
    // Check if user already exists in the same room
    const existingUser = users.find((user) => user.room === room && user.name === name);
  
    if (existingUser) {
      return { error: 'Username is taken.' };
    }
  
    // Create new user object and add to the users array
    const user = { id, name, room };
    users.push(user);
  
    return { user };
  };
const removeUser= (id)=>{
const index =users.findIndex((user)=> user.id===id)

if(index!=-1){
    return users.splice(index,1)[0]
}
}

const getUser= (id)=>users.find((user)=>user.id === id)

const getUserInRoom= (room)=>users.filter((user)=>user.room===room);

module.exports={addUser, removeUser, getUser, getUserInRoom}