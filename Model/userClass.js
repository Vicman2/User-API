const bcrypt = require('bcryptjs');

const UserModel = require('./userModel')


class Student{
    constructor(name, email, phoneNo, address, password){
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.address = address
        this.password = password
    }

    async findByEmail(email){
        const user =  await UserModel.findOne({email: email})
        return user;
    }

    async save(){
        const savedUser = this.findUser(this.email)

        if(savedUser){
            return Promise.reject(new Error("User already exist"));
        }

        const salt  = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        const user = new UserModel({
            name : this.name,
            email: this.email, 
            phone: this.phoneNo, 
            address: this.address, 
            password: hashedPassword
        })

        result = await  user.save();
    }

    async logIn(user){
        const userByEmail = await this.findByEmail(user.email);
        const hashedPassword = userByEmail.password
        const isTrue = await bcrypt.compare(user.password , hashedPassword);
        if(isTrue){
            return true
        }else{
            return false;
        }
    }
}


module.exports = Student