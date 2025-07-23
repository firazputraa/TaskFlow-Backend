# TaskFlow-Backend
Tentu, berikut adalah dokumentasi API berdasarkan file index.js dan routes-user.js yang Anda berikan.

Otentikasi
Endpoint untuk registrasi dan login pengguna.

1. Registrasi Pengguna Baru
Method: POST

Endpoint: /api/user/register

Deskripsi: Membuat akun pengguna baru.

Body (JSON):

JSON

{
    "username": "firazputraa",
    "email": "firaz@example.com",
    "password": "password123"
}
Respons Sukses (201 Created):

JSON

{
    "status": "success",
    "data": {
        "user": {
            "id": "...",
            "username": "firazputraa",
            "email": "firaz@example.com"
        },
        "token": "..."
    }
}
2. Login Pengguna
Method: POST

Endpoint: /api/user/login

Deskripsi: Login untuk mendapatkan token otentikasi.

Body (JSON):

JSON

{
    "email": "firaz@example.com",
    "password": "password123"
}
Respons Sukses (200 OK):

Sama seperti respons registrasi, berisi data pengguna dan token JWT.

Manajemen Pengguna
Catatan: Semua endpoint di bawah ini memerlukan otentikasi.

Header Wajib: Authorization: Bearer <token_jwt_anda>

3. Mendapatkan Semua Pengguna
Method: GET

Endpoint: /api/user/users

Deskripsi: Mengambil daftar semua pengguna.

Respons Sukses (200 OK):

JSON

{
    "status": "success",
    "data": [
        {
            "id": "...",
            "username": "firazputraa",
            "email": "firaz@example.com"
        }
    ]
}
4. Mendapatkan Profil Pengguna Saat Ini
Method: GET

Endpoint: /api/user/me

Deskripsi: Mengambil detail profil pengguna yang sedang login.

Respons Sukses (200 OK):

JSON

{
    "status": "success",
    "data": {
        "id": "...",
        "username": "firazputraa",
        "email": "firaz@example.com"
    }
}
5. Memperbarui Profil Pengguna
Method: PATCH

Endpoint: /api/user/me

Deskripsi: Mengubah username atau email.

Body (JSON):

JSON

{
    "username": "firaz_baru"
}
Respons Sukses (200 OK):

Berisi data profil pengguna yang sudah diperbarui.

6. Mengubah Password
Method: PATCH

Endpoint: /api/user/password

Deskripsi: Mengubah password pengguna.

Body (JSON):

JSON

{
    "oldPassword": "password123",
    "newPassword": "password_baru",
    "confirmNewPassword": "password_baru"
}
Respons Sukses (200 OK):

JSON

{
    "status": "success",
    "message": "Password berhasil diperbarui"
}
7. Menghapus Akun
Method: DELETE

Endpoint: /api/user/me

Deskripsi: Menghapus akun pengguna yang sedang login.

Respons Sukses:

Status 204 No Content dengan body kosong.
