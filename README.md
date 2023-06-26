MongoDB conected using mongoose, deployed to render.com

https://contactsdb-1lj9.onrender.com/api/contacts

**Auth algorithm:**

- create mongoose userSchema, joi register and login schema, model
- create router with paths, middelwares to check body
- create register controller, with checking uniqe email,check indexes in Compass , hashing password with bcrypt
- create login controller with check: is user?, password compare bcrypt, create token using jsonwebtoken: sign: payload user._id, SECRET_KEY - env, {expiresIn:"23h"}
- create middelware authenticate for all closed routes. Check if user in DB, writes in req.user - user with verified id from token, jwt.verify - throw an error => use try catch.
- add owner: {
  type: Schema.Types.ObjectId,
  // id of which collection?
  ref: "user",
  required: true,
  },
-  add token field to register Schema, create logout route - delete current token in user. check if user logging in with actual token.

**upload file**

set middleware express.static - to set folder where get request can find files.

create middleware upload(it saves file in tempDir):
multerConfig=multer.diskStorage({destination, filename}), upload=multer({storage}).
set middleware for router.patch

for temporary avatar use gravatar

create controller:
-path where to save
-get path, originalname from req.file.
-newFileName.
-resultUpload = where to save + newfilename.
-fs.rename move to avatars folder.
write to db avatarURL