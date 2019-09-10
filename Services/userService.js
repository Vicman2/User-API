//Third party module for hashing our password
const bcrypt = require('bcryptjs');

// importing the mongoDb usermodel
const UserModel = require('../Model/userModel')


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
        const savedUser = await this.findByEmail(this.email)

        if(savedUser){
            return Promise.reject("User already exist ");
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

         const result = await  user.save();
        return result
    }

    static async logIn(email, password){
        const userByEmail =  await UserModel.findOne({email: email})
        if(userByEmail){
            const hashedPassword = userByEmail.password
            const isTrue = await bcrypt.compare(password , hashedPassword);
            if(isTrue){
                return Promise.resolve(true)
            }else{
                return Promise.reject(false);
            }
        }else{
            return Promise.resolve("Invalid User, please signIn in order to use this database");
        }
    }
}


module.exports = Student