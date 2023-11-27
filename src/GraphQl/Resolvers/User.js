import jwt from "jsonwebtoken";
import User from "../../Models/User.js";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";
import { generateFromEmail } from "unique-username-generator";
import { hashedPassword, jwtSign } from "../../Constants/_general.js";


//----------------------------------QUERIES
const me = async (_, __, { session }) => {
  try {
    console.log(session);
    if (session) {
      return session;
    } else {
      throw new Error("NO_SESSION_USER");
    }
  } catch (error) {
    return error;
  }
};
const users = async (_, { filter }, { session }) => {
  let query = {};
  if (filter) {
    const { search } = filter;
    for (let data in filter) {
      if (Object.hasOwnProperty.call(filter, data)) {
        let element = filter[data];
        if (data === "search") {
          const like = { $regex: search, $options: "i" };
          data = "$or";
          element = [{ name: like }, { price: like }];
        }
        query[data] = element;
      }
    }
  }

  try {
    if (session?.rol && session?.rol === "ADMIN") {
      let user = User.aggregate([]).match(query);
      return await user;
    } else {
      throw new Error("No esta autorizado para ver los usuarios");
    }
  } catch (error) {
    return error;
  }
};
//----------------------------------MUTATIONS
const userLogin = async (_, { filter }) => {
  try {
    const { password, email, googleToken } = filter;
    let googleSession = {}
    if (googleToken) {
      googleSession = await verifyGoogleToken(googleToken)
      filter.email = googleSession.email
    }

    let user = await User.findOne({ email:filter.email });
    if(!user)throw new Error('USER_NOT_FOUND')
    if (!user) {
      if(googleSession.email_verified){
        
        const data = {
          name:googleSession.name,
          email:googleSession.email,
          rol: 'ADMIN'
        }
        user = await userCreate(_,{data})
      }
    }
    if (password) {
      const hashedPass = hashedPassword(password, process.env.HASH_SECRET);
      if (user.password !== hashedPass)
        throw new Error("PASSWORD_IS_INCORRECT");
    }
    let sessionUser;
    if (user) {
      sessionUser = {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        rol: user.rol,
      };
      const payload = sessionUser;
      return jwtSign(payload,{ expiresIn: "8h" })
    } else {
      throw new Error("El usuario no existe.");
    }
  } catch (error) {
    return error;
  }
};
const userCreate = async (_, { data } ) => {
  const { name, password = null, email, rol } = data;
  const username = generateFromEmail(
    email,
    3
  );
  try {
    const hashedPass = hashedPassword(password, process.env.HASH_SECRET)||'';
    const newUser = new User({
      _id: uuidv4(),
      name,
      username,
      password: hashedPass,
      email,
      rol,
    });
    
    return await newUser.save();;
  } catch (error) {
    return error;
  }
};
const userRecoveryPassword = async (_, { email } ) =>{
  try {
  //console.log(email);
  const user = await User.findOne({email},{_id:1,username:1,email:1}).lean()
  const token = jwtSign(user,{expiresIn: '10m'})
  user.resetToken = token;
  console.log(token);
  return {name:true}
  } catch (error) {
    return error
  }
}

//----------------------------------GENERAL FUNCTIONS
const verifyGoogleToken = async (token) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
  
      return payload
    } catch (error) {
      return Promise.reject(error)
    }
  };

export const userResolver = {
  Query: {
    users,
    me,
  },
  Mutation: {
    userCreate,
    userLogin,
    userRecoveryPassword,
  },
};
