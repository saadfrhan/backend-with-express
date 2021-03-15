const mongooose = require('mongoose');
const userSchema = new mongooose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: {type: Date, default: Date.now}
})

const UserModel = new mongooose.model('users', userSchema)

module.exports.createNewUser = (userParameters) => {
    
    return new Promise((resolve, reject) => {
        let usersInstance = new UserModel(userParameters);
        
        usersInstance.save((err, newUser) => {
            if(err) {
                console.log('Unable to save user', err);
                return reject(err)
            }
            resolve(newUser)
        })
    })
}

module.exports.findSingleUserByQuery = (query) => {
    return UserModel.findOne(query)
}