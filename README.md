

# CEO registration. -- POST : /api/auth/ceo-signup

### InputData :

- Full_name
- Company_name
- Email
- Password_hash
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
- OTP

#### Logic :

- Check if email exists.
- Check if password is correct.
- Check if OTP varified

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

