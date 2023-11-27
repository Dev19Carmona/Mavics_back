import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const hashedPassword = (password, salt) => {
  const hash = CryptoJS.SHA256(password + salt);
  return hash.toString(CryptoJS.enc.Hex);
};

export const userTypes = Object.freeze({
  begginer: { _id: "1", key: "BEGINNER", name: "Beginner", color: "blue" },
  admin: { _id: "2", key: "ADMIN", name: "Administrator", color: "black" },
});

export const allUsers = () => {
  const users = [];
  for (const type in userTypes) {
    if (Object.hasOwnProperty.call(userTypes, type)) {
      const element = userTypes[type];
      users.push(element.key);
    }
  }
  return users;
};

export const jwtSign = (payload, options = {}) =>
  jwt.sign(payload, process.env.SECRET_JWT, {
    algorithm: process.env.ALGORITHM,
    ...options,
  })

export const jwtVerify = (token) =>jwt.verify(token, process.env.SECRET_JWT)
