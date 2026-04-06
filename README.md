# Admin registration. -- POST : /api/auth/admin-signup

### InputData :

name ,company_name,company_location,company_email,password_hash,phone,company_profile,varified : 'false',role : 'admin'

### Response :

admin,otp

# CEO Authenticate -- ## POST : /api/auth/admin-authenticate

### InputData :

Email,otp

### Response :

admin,acess token

# CEO Login -- ## POST : /api/auth/admin-login

### InputData :

Email,Password_hash

### Response :

admin,token

# AddManager -- POST : /api/admin/add-manager
### InputData :
admin_id : moongoose.Schema.Types ObjectId,name,email : Unique,type,joiningTokenHash : "Random Token " : "" <- if user Logined Success
### Response :
data

# ManagerAuthenticate -- POST : /api/auth/manager-authenticate

### InputData :
Email,JoiningToken

### Response :
data,token


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




AuthRoute.post("/employee-authenticate", ManagerAuthenticate);
AuthRoute.post("/employee-set-password", authMiddleware, ManagerSetPassword);
AuthRoute.post("/employee-login", ManagerLogin);


