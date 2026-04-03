## CEO Registration (POST /api/auth/ceo-signup)

This is the "Root" of your startup app.

Logic:

1. Check if email exists.
2. Hash password (bcrypt.hash).
3. Save CEO to MongoDB.
4. Generate JWT and set the Refresh Token in a cookie.

## CEO Adds Manager (POST /api/admin/add-manager)

Protection: Only accessible if req.user.role === 'ceo'.
Logic:
Generate a random string: const rawToken = crypto.randomBytes(16).toString('hex');
Hash it: const hashedToken = await bcrypt.hash(rawToken, 10);
Create the Manager record with ceoId: req.user.id and joiningToken: hashedToken.
Response: Send the rawToken back to the CEO. The CEO then gives this code to the Manager.

## Manager Activation (POST /api/auth/activate-manager)

This is the "First Login" for the Manager.

Input: email, rawToken, newPassword.

Logic:
Find Manager by email.
Compare rawToken with the stored joiningToken.
If it matches: Hash newPassword, set status: 'active', and clear the joiningToken.

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

