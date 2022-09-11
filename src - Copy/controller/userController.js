const userModel = require('../models/SignUpmodel');
const validation = require('../validation/validations')

const { 
  firstNameRequired, 
  validProprety, 
  requiredBody,
  lastNameRequired,
  emailRequired,
  addressRequired,
  patternEmail,
  doesNotExists,
  addUserSuccess,
  allReady,
  upDatedSuccess,
  noParameterPass,
  notValidId,
} = require('../validation/error');

const userCreate = async function (req, res) {
  try {
    let requestBody = req.body;
    let { firstName, lastName, email, address } = requestBody;
    if (!(firstName || lastName || email || address)) {
      return res
      .status(400)
      .send({message:validProprety});
    }
    // if (Object.keys(data) == 0) {
    //   return res
    //   .status(400)
    //   .send(requiredBody);
    // }
    if (!validation.isValidRequestBody(requestBody)) {
     return res
      .status(400)
      .send({message:requiredBody});
    }

    if (!validation.isValid(firstName)) {
      return res
      .status(400)
      .send({message:firstNameRequired});
    }
    if (!validation.isValid(lastName)) {
      return res  
      .status(400)
      .send({message:lastNameRequired});
    }
    if (!validation.isValid(email)) {
      return res
      .status(400)
      .send({message:emailRequired});
    }
    let pattern = /\S+@\S+\.\S+/;
    if (!pattern.test(email)) {
      return res
      .status(400)
      .send({message:patternEmail});
    }
    let allReadyEmailExist = await userModel.findOne({ email });
    if (allReadyEmailExist) {
      return res
      .status(400)
      .send({message:allReady});
    }
    if (!validation.isValid(address)) {
      return res
      .status(400)
      .send({message:addressRequired});
    }
    let userCreated = await userModel.create(requestBody);
    return res
    .status(201)
    .send({
      message: addUserSuccess,
      // data: userCreated,
    });
  } catch (error) {
    return res
    .status(500)
    .send({ 
      err: error.message 
    });
  }
};
const userdata = async function (req, res) {
  try {
    let getData = await userModel.find().select({
      // firstName: 1,
      // lastName: 1,
      // email: 1,
      // address: 1,
      // _id:0,
      __v:0    
    });
    if (!getData.length) {
      return res
      .status(404)
      .send({ 
        message: doesNotExists 
      });
    } else {
      return res
      .status(200)
      .send({data:getData});
    }
  } catch (error) {
    return res
    .status(500)
    .send({ 
      err: error.message 
    });
  }
};
const updateUser = async function (req, res) {
  try {
    const requestBody = req.body;
    const params = req.params;
    const userId = params.userId;
    if (!validation.isValidObjectId(userId)) {
      res
        .status(400)
        .send({  
          message: `${userId} ${notValidId}` 
        });
      return;
    }
    const userData = await userModel.findOne({
      _id: userId,
      // isDeleted: false,
      // deletedAt: null,
    });

    if (!userData) {
      res.status(404).send({
        status: false,
        message: doesNotExists,
      });
      return;
    }
    if (!validation.isValidRequestBody(requestBody)) {
      res
      .status(200)
      .send({
        message: noParameterPass,
        data: userData,
      });
      return;
    }

    // Extract params
    const { firstName, lastName, email, address } = requestBody;
    if (!(firstName || lastName || email || address)) {
      return res
      .status(400)
      .send(validProprety);
    }

    const updateduserData = {};

    if (firstName && validation.isValid(firstName)) {
      if (!Object.prototype.hasOwnProperty.call(updateduserData, '$set'))
        updateduserData['$set'] = {};

      updateduserData['$set']['firstName'] = firstName;
    }

    if (lastName && validation.isValid(lastName)) {
      if (!Object.prototype.hasOwnProperty.call(updateduserData, '$set'))
        updateduserData['$set'] = {};

      updateduserData['$set']['lastName'] = lastName;
    }
    if (email && !validation.isValid(email)) {
      return res
      .status(400)
      .send(emailRequired);
    }
    let pattern = /\S+@\S+\.\S+/;
    if (email && !pattern.test(email)) {
      return res
      .status(400)
      .send(patternEmail);
    }
    let allReadyEmailExist = await userModel.findOne({ email });
    if (allReadyEmailExist) {
      return res
      .status(400)
      .send(allReady);
    }
      if (!Object.prototype.hasOwnProperty.call(updateduserData, '$set'))
        updateduserData['$set'] = {};

      updateduserData['$set']['email'] = email;
    // }
    if (address && validation.isValid(address)) {
      if (!Object.prototype.hasOwnProperty.call(updateduserData, '$set'))
        updateduserData['$set'] = {};
      updateduserData['$set']['address'] = address;
    }
    const UpdateData = await userModel.findOneAndUpdate(
      { _id: userId },
      updateduserData,
      { new: true }
    )
    .select({__v : 0});
    return res.status(200).send({
      message: upDatedSuccess,
      data: UpdateData,
    });
  } catch (error) {
    res
    .status(500)
    .send({
      message: error.message,
    });
  }
};

module.exports = { userCreate, updateUser, userdata };
