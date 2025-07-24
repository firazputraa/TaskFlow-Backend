TaskFlow Backend
# Dokumentasi API Pengguna 👨‍💻

Dokumentasi ini menjelaskan endpoint yang tersedia untuk otentikasi dan manajemen pengguna.

---

## Otentikasi 🔑

Endpoint untuk registrasi dan login pengguna.

### Registrasi Pengguna Baru

Membuat akun pengguna baru.

- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Body (JSON):**
  ```json
  {
      "username": "firazputraa",
      "email": "firaz@example.com",
      "password": "password123"
  }

Login dengan akun pengguna
- **Method:** `POST`
- **Endpoint:** `/users/login`
- **Body (JSON):**
  ```json
  {
    "email": "firaz@example.com",
    "password": "password123"
  }
