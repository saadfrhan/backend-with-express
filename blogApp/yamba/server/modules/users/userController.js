let userModel = require('./userModel');

module.exports.signUpWithDetails = (req, res) => {
    userModel.createNewUser(req.body)
        .then(newCreatedUser => {
            req.session.loggedInUserId = newCreatedUser._id
            req.session.loggedInUser = newCreatedUser
            res.send({ status: true, created: true, signedInUserName: newCreatedUser.name })
        })
        .catch(err => {
        })
}

module.exports.signInWithEmailAndPass = (req, res) => {
    userModel.findSingleUserByQuery({ email: req.body.email })
        .then(user => {

            if (!user) {
                res.send({
                    status: false,
                    errorMessage: 'No user find that matches your entered email!'
                })
                return;
            }

            if (user.password !== req.body.password) {
                res.send({
                    status: false,
                    errorMessage: 'Password not matched X)'
                })
                return;
            }

            req.session.loggedInUserId = user._id.toString();
            req.session.loggedInUser = user
            res.send({ status: true, created: true, signedInUserName: user.name })

        })
        .catch((err) => {
            console.log('Unable to find user by ID ', e);
            res({ status: false, found: false, pwdMatched: false })
        })
}