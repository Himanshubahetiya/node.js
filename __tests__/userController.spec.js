// test("addition", () => {
//     expect(2+3).toBe(5);
// });

// test("null", () => {
//     const i = null;
//     expect.assertions(2);

//     expect(i).toBeNull();
//     expect(i).toBeDefined();
// })

// const animals = ['dog', 'cat']
// test("animal array", () => {
//     expect(animals).toContain('cat');
//     expect(animals).toBeInstanceOf(Array);
// })

// function getData() {
//     throw new Error("user not found");
// }

// test("getData", () => {
//     expect(() => getData()).toThrow("user not found");
// })

const { getUsers, createUser, showUser, updateUser, deleteUser } = require('../controllers/userController');
const User = require('../models/User');
jest.mock('../models/User');

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('User Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('getUsers return all users', async () => {
        const mockUsers = [{ name: 'himanshu', email: 'himanshu@example.com', age: 25 }];
        User.find.mockResolvedValue(mockUsers);
        const req = mockRequest();
        const res = mockResponse();
        await getUsers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
        expect(User.find).toHaveBeenCalledTimes(1);
    });

    test('createUser create a new user', async () =>{
        const newUser = {name: 'himanshu', email: 'himanshu@example.com', age:20};
        User.create.mockResolvedValue(newUser);
        const req = mockRequest({},newUser);
        const res = mockResponse();
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json,).toHaveBeenCalledWith(newUser);
        expect(User.create).toHaveBeenCalledWith(newUser);       
    })

    test('showUser  return the user by its id ', async () =>{
        const mockUser = {_id:"1", name:"himanshu", email:"himanshu@gmail.com", age:25};
        User.findById.mockResolvedValue(mockUser);
        const req = mockRequest({id:'1'});
        const res = mockResponse();
        await showUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
        expect(User.findById).toHaveBeenCalledWith('1', req.body, { new: true });
        
    })

    test('updateUser with there id', async () =>{
        const mockUser = {id:"1", name:"himanshu", email:"himanshu@gmail.com", age:25};
        User.findByIdAndUpdate.mockResolvedValue(mockUser);
        const req = mockRequest({id:'1'},{name:"sonu", age:20});
        const res = mockResponse();
        await updateUser(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body,{new: true});
    });  
    
    test('deleteUser with there id' , async () =>{
        const userdelete = {id: '1', name:"himanshu", email:"test@example.com", age:24};
        User.findByIdAndDelete.mockResolvedValue(userdelete);
        const req = mockRequest({id:'1'});
        const res = mockResponse();
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: 'User deleted successfully'});
        expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    })
    
})

