// const fs = require('node:fs');
const fs = require("node:fs/promises");
const path = require("node:path");
const folder = "./src/GraphQl";

// const configGraphQl = async (folder) => {

//   let files;
//   try {
//     files = await fs.readdir(folder);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
//   const filePromises = files.map(async (file) => {
//     const filePath = path.join(folder, file);
//     let stats;
//     try {
//       stats = await fs.stat(filePath);
//     } catch (error) {
//       console.log(error);
//       process.exit(1);
//     }
//     const isDirectory = stats.isDirectory();
//     const fileType = isDirectory ? "D" : "F";
//     let pathDirectories
//     let pathFiles
//     if (fileType === "D") {
//       pathDirectories=filePath
//       let files
//       try {
//         files = await fs.readdir(pathDirectories);
//       } catch (error) {
//         console.log(error);
//         process.exit(1);
//       }
//       pathFiles = files.map(file=>{
//         return path.join(pathDirectories,file)
//       })
//       //console.log(pathFiles);
//       //console.log(filePath);
//     }
//     return pathFiles
//     //return path.join(pathDirectories, files)
//     //return pathDirectories
//     //console.log(filePath, fileType, pathDirectories);
//   });
//   const filesInfo = await Promise.all(filePromises);
//   const filePathsArray = filesInfo.filter(element => element !== undefined)

//   filePathsArray.map(async filePathArray=>{
    
//     for (const key in filePathArray) {
//       if (Object.hasOwnProperty.call(filePathArray, key)) {
//         const element = filePathArray[key];
//         fs.readFile(element, 'utf-8')
//         .then(code=>{
//           const moduleExportsRegex = /module\.exports\s*=\s*{([\s\S]*?)}/;
//           const matches = code.match(moduleExportsRegex);
          
//           if (matches && matches.length >= 2) {
//             const moduleExportsContent = matches[1].trim();
//             return `const { ${moduleExportsContent} } = require('${element}')`
           
//           } else {
//             throw new Error("No se pudo encontrar module.exports en el código proporcionado.");
//           }
//         })
      
//       }
//     }
//   })


// };
// const configGraphQl = async (folder) => {
//   let files;
//   try {
//     files = await fs.readdir(folder);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
  
//   const moduleExportsArray = []; // Aquí almacenaremos los resultados

//   const filePromises = files.map(async (file) => {
//     const filePath = path.join(folder, file);
//     let stats;
//     try {
//       stats = await fs.stat(filePath);
//     } catch (error) {
//       console.log(error);
//       process.exit(1);
//     }
//     const isDirectory = stats.isDirectory();
//     const fileType = isDirectory ? "D" : "F";
//     let pathDirectories;
//     let pathFiles;
//     if (fileType === "D") {
//       pathDirectories = filePath;
//       let files;
//       try {
//         files = await fs.readdir(pathDirectories);
//       } catch (error) {
//         console.log(error);
//         process.exit(1);
//       }
//       pathFiles = files.map(file => {
//         return path.join(pathDirectories, file);
//       });
//     }
//     return pathFiles;
//   });

//   const filesInfo = await Promise.all(filePromises);
//   const filePathsArray = filesInfo.filter((element) => element !== undefined);

//   for (const filePathArray of filePathsArray) {
//     for (const element of filePathArray) {
//       const code = await fs.readFile(element, 'utf-8');
//       const moduleExportsRegex = /module\.exports\s*=\s*{([\s\S]*?)}/;
//       const matches = code.match(moduleExportsRegex);

//       if (matches && matches.length >= 2) {
//         const moduleExportsContent = matches[1].trim();
//         const requireStatement = `const { ${moduleExportsContent} } = require('${element}')`;
//         moduleExportsArray.push(requireStatement);
//       } else {
//         throw new Error("No se pudo encontrar module.exports en el código proporcionado.");
//       }
//     }
//   }

//   return moduleExportsArray;
// };

// configGraphQl(folder)
// .then(res=>console.log(...res))
// module.exports = configGraphQl;



const resolversPath = path.join(__dirname, 'GraphQl', 'Resolvers');
const schemasPath = path.join(__dirname, 'GraphQl', 'Schemas');

const resolvers = {};
const schemas = [];

// Recorre la carpeta de Resolvers y carga los archivos User.js
fs.readdirSync(resolversPath).forEach(file => {
  if (file !== 'index.js') {
    const resolver = require(path.join(resolversPath, file));
    Object.assign(resolvers, resolver);
  }
});

// Recorre la carpeta de Schemas y carga los archivos User.js
fs.readdirSync(schemasPath).forEach(file => {
  if (file !== 'index.js') {
    const schema = require(path.join(schemasPath, file));
    schemas.push(schema);
  }
});
console.log({
  resolvers,
  schemas,
});
module.exports = {
  resolvers,
  schemas,
};
