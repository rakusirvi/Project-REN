# CEO registration. -- POST : /api/auth/ceo-signup

### InputData :

- Full_name
- Company_name
- Email

- Password_hash
- Phone
- Company_profile
- Varified : 'false'
- role : 'CEO'

#### Logic :

- Check if email exists.
- Hash password (bcrypt.hash).
- Save CEO to MongoDB.
- Generate JWT and set the Refresh Token in a cookie.
- OTP Generation

#### Functions :

- Mail (OTP Generator)
- Token Generator (JWT)

### Response :

- data
- token (access refresh)

# CEO Login -- ## POST : /api/auth/ceo-login

### InputData :

- Email
- Password_hash

#### Logic :

- Check if email exists.
- Check if password is correct.
- Check if varified

#### Functions :

- if Varified
  i. Generate JWT and set the Refresh Token in a cookie.
  ii.- CEO.varifed: true
- else Not VariFied
  i. Give Correct Data

### Response :

- data
- token

# AddManager -- POST : /api/admin/add-manager

### InputData :

- Ceo_ID : moongoose.Schema.Types ObjectId
- Manager_Name
- Manager_Email : Unique
- Manager_Phone : Unique
- Manager_Type
- Manager_Profile_pic
- role : "MANAGER"
- joiningTokenHash : "Random Token " : "" <- if user Logined Success
- varified : "false"
- password : ""

#### Logic :

- Check if email exists.
- Save Manager to MongoDB.

#### Functions :

- GenerateRandom JoiningToken
- Mail (send JoiningToken)
- HashJoiningToken and Save to DB
- varified : false

### Response :

- data
- Email Send ..

# ManagerAuthenticate -- POST : /api/auth/manager-authenticate

### InputData :

- Email
- JoiningToken : convert to hash and check with DB

#### Logic :

- if inCorrect Token -> Invalid User
- if Correct Token -> Manager.varified : true
- generate JWT and set the Refresh Token in a cookie.
- generate New Password : hashPass Save to DB

### Response :

- data
- token

# ManagerChangePassword -- POST : /api/auth/manager-change-password

### InputData :

- password
- confirm Password

#### Logic :

if Password Changed Success

- user varified : true
  redirect home Page

else show error

### Response :

- Password Changes Success

# ManagerLogin -- POST : /api/auth/manager-login

### input Data :

- Email
- Password

#### Logic :

login Success
generate Token

### Response :

- login Sucess
