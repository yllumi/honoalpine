# Dokumentasi $heroicHelper

Library helper JavaScript untuk mempermudah operasi umum seperti HTTP requests, caching, cookie management, dan formatting.

## Instalasi

```html
<script src="/helper.js"></script>
```

Helper akan otomatis load dependencies (Toastify) dari CDN jika belum tersedia.

---

## Konfigurasi

### Base URL

Set base URL untuk semua request:

```javascript
window.base_url = 'https://api.example.com';
```

Jika tidak di-set, default adalah string kosong `''`.

---

## HTTP Requests

### `$heroicHelper.fetch(url, headers = {})`

Melakukan HTTP GET request dengan Fetch API.

**Parameters:**
- `url` (string) - Endpoint URL (akan digabung dengan `base_url`)
- `headers` (object, optional) - Custom headers

**Returns:** Promise dengan response object mirip Axios:
```javascript
{
  data: any,           // Parsed response body (JSON atau text)
  status: number,      // HTTP status code
  statusText: string,  // Status text
  headers: Headers,    // Response headers
  config: object,      // Request config
  request: Response    // Original Fetch Response
}
```

**Auto Features:**
- ✅ Auto-parse JSON/text response
- ✅ Bearer token dari `localStorage.getItem('heroic_token')`
- ✅ Auto-remove token jika 401 Unauthorized
- ✅ Throw error untuk status >= 400

**Contoh:**

```javascript
// Basic GET
$heroicHelper.fetch('api/users')
  .then(response => {
    console.log(response.data);
    console.log(response.status); // 200
  })
  .catch(error => {
    console.error(error.response.status); // 404, 500, dll
  });

// Dengan custom headers
$heroicHelper.fetch('api/profile', {
  'X-Custom-Header': 'value'
})
  .then(response => {
    console.log(response.data);
  });

// Dengan async/await
async function loadUsers() {
  try {
    const response = await $heroicHelper.fetch('api/users');
    return response.data;
  } catch (error) {
    console.error('Failed:', error);
  }
}
```

---

### `$heroicHelper.post(url, data = {}, headers = {})`

Melakukan HTTP POST request dengan FormData.

**Parameters:**
- `url` (string) - Endpoint URL (bisa full URL atau relative)
- `data` (object, optional) - Data yang akan dikirim
- `headers` (object, optional) - Custom headers

**Returns:** Promise dengan response object (sama seperti `.fetch()`)

**Auto Handling:**
- ✅ Array → `key[]` format
- ✅ File/Blob → Direct append
- ✅ Object → JSON.stringify
- ✅ Primitives → String conversion
- ✅ Bearer token auto-included

**Contoh:**

```javascript
// Basic POST
$heroicHelper.post('api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
  .then(response => {
    console.log('Created:', response.data);
  });

// Dengan file upload
const fileInput = document.querySelector('#file');
$heroicHelper.post('api/upload', {
  file: fileInput.files[0],
  title: 'My Document'
})
  .then(response => {
    console.log('Uploaded:', response.data);
  });

// Array data
$heroicHelper.post('api/tags', {
  tags: ['javascript', 'nodejs', 'vue']
  // Will be sent as: tags[]=javascript&tags[]=nodejs&tags[]=vue
});

// Nested object
$heroicHelper.post('api/profile', {
  user: {
    name: 'John',
    age: 30
  }
  // Object akan di-JSON.stringify
});
```

---

## Cache Management

### `$heroicHelper.setCache(key, data)`

Menyimpan data ke in-memory cache.

**Parameters:**
- `key` (string) - Cache key
- `data` (any) - Data yang akan disimpan

**Contoh:**

```javascript
$heroicHelper.setCache('user_profile', {
  id: 1,
  name: 'John Doe'
});
```

---

### `$heroicHelper.getCache(key)`

Mengambil data dari cache.

**Parameters:**
- `key` (string) - Cache key

**Returns:** Data yang tersimpan atau `null` jika tidak ada

**Contoh:**

```javascript
const profile = $heroicHelper.getCache('user_profile');
if (profile) {
  console.log('From cache:', profile);
} else {
  // Fetch dari server
}
```

---

### `$heroicHelper.clearCache(key)`

Menghapus data dari cache.

**Parameters:**
- `key` (string) - Cache key

**Contoh:**

```javascript
$heroicHelper.clearCache('user_profile');
```

---

## Cookie Management

### `$heroicHelper.setCookie(name, value, days)`

Menyimpan cookie.

**Parameters:**
- `name` (string) - Cookie name
- `value` (string) - Cookie value
- `days` (number, optional) - Expire dalam berapa hari

**Contoh:**

```javascript
// Cookie expires dalam 7 hari
$heroicHelper.setCookie('username', 'johndoe', 7);

// Session cookie (no expiry)
$heroicHelper.setCookie('temp_token', 'abc123');
```

---

### `$heroicHelper.getCookie(name)`

Mengambil nilai cookie.

**Parameters:**
- `name` (string) - Cookie name

**Returns:** Cookie value atau `null` jika tidak ada

**Contoh:**

```javascript
const username = $heroicHelper.getCookie('username');
if (username) {
  console.log('Welcome back,', username);
}
```

---

## Notification

### `$heroicHelper.toastr(message, type = "success", position = "top")`

Menampilkan toast notification menggunakan Toastify.

**Parameters:**
- `message` (string) - Pesan yang ditampilkan
- `type` (string, optional) - Tipe notifikasi: `"success"`, `"error"`, `"warning"`, `"info"`
- `position` (string, optional) - Posisi: `"top"`, `"bottom"`, `"center"`

**Contoh:**

```javascript
// Success notification (default)
$heroicHelper.toastr('Data berhasil disimpan');

// Error notification
$heroicHelper.toastr('Terjadi kesalahan', 'error');

// Warning di bottom
$heroicHelper.toastr('Peringatan!', 'warning', 'bottom');

// Info notification
$heroicHelper.toastr('Informasi penting', 'info');
```

---

## String Formatting

### `$heroicHelper.nl2br(str, is_xhtml)`

Mengonversi newline (`\n`) menjadi `<br>` tag.

**Parameters:**
- `str` (string) - String yang akan dikonversi
- `is_xhtml` (boolean, optional) - Use XHTML format (`<br />` vs `<br>`)

**Returns:** String dengan `<br>` tag

**Contoh:**

```javascript
const text = "Line 1\nLine 2\nLine 3";
const html = $heroicHelper.nl2br(text);
console.log(html); // "Line 1<br />Line 2<br />Line 3"

// Non-XHTML
const html2 = $heroicHelper.nl2br(text, false);
console.log(html2); // "Line 1<br>Line 2<br>Line 3"
```

---

## Date Formatting

### `$heroicHelper.formatDate(dateString)`

Format tanggal ke format Indonesia (contoh: "15 Januari 2026").

**Parameters:**
- `dateString` (string) - Date string (format: YYYY-MM-DD atau ISO format)

**Returns:** Formatted date string atau empty string jika invalid

**Contoh:**

```javascript
$heroicHelper.formatDate('2026-01-15');
// Output: "15 Januari 2026"

$heroicHelper.formatDate('2026-12-31');
// Output: "31 Desember 2026"

$heroicHelper.formatDate('0000-00-00');
// Output: ""

$heroicHelper.formatDate(null);
// Output: ""
```

---

## Number Formatting

### `$heroicHelper.currency(amount)`

Format angka dengan thousand separator (titik).

**Parameters:**
- `amount` (number|string) - Angka yang akan diformat

**Returns:** String dengan format currency Indonesia

**Contoh:**

```javascript
$heroicHelper.currency(1000);
// Output: "1.000"

$heroicHelper.currency(1234567);
// Output: "1.234.567"

$heroicHelper.currency(500000);
// Output: "500.000"

// Untuk display currency lengkap
const formatted = 'Rp ' + $heroicHelper.currency(150000);
console.log(formatted); // "Rp 150.000"
```

---

## Complete Example

```javascript
// Set base URL
window.base_url = 'https://api.example.com';

// Alpine.js component
Alpine.data('userProfile', () => ({
  user: null,
  loading: false,
  
  async init() {
    await this.loadProfile();
  },
  
  async loadProfile() {
    this.loading = true;
    
    // Cek cache dulu
    const cached = $heroicHelper.getCache('user_profile');
    if (cached) {
      this.user = cached;
      this.loading = false;
      return;
    }
    
    try {
      // Fetch dari server
      const response = await $heroicHelper.fetch('api/profile');
      this.user = response.data;
      
      // Simpan ke cache
      $heroicHelper.setCache('user_profile', this.user);
      
      // Show success notification
      $heroicHelper.toastr('Profile loaded successfully');
      
    } catch (error) {
      $heroicHelper.toastr('Failed to load profile', 'error');
    } finally {
      this.loading = false;
    }
  },
  
  async updateProfile(data) {
    try {
      const response = await $heroicHelper.post('api/profile', data);
      this.user = response.data;
      
      // Clear cache
      $heroicHelper.clearCache('user_profile');
      
      $heroicHelper.toastr('Profile updated!');
    } catch (error) {
      $heroicHelper.toastr('Update failed', 'error');
    }
  }
}));
```

---

## Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari 14+
- ✅ Mobile browsers

Menggunakan native Fetch API (IE11 tidak didukung).

---

## Dependencies

- **Toastify.js** (Auto-loaded dari CDN)
  - URL: `https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/`
  - Hanya diperlukan untuk `toastr()` function
  - Library lain tetap berfungsi tanpa Toastify

---

## Tips & Best Practices

### 1. Error Handling

Selalu gunakan try-catch untuk async operations:

```javascript
try {
  const response = await $heroicHelper.fetch('api/data');
  // Handle success
} catch (error) {
  if (error.response) {
    // Server error (4xx, 5xx)
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    // Network error
    console.log('Network error:', error.message);
  }
}
```

### 2. Token Management

Token otomatis diambil dari localStorage dengan key `heroic_token`:

```javascript
// Login
localStorage.setItem('heroic_token', 'your-jwt-token');

// Logout
localStorage.removeItem('heroic_token');

// Token akan otomatis dihapus jika server return 401
```

### 3. Cache Strategy

```javascript
async function getData(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = $heroicHelper.getCache('data_key');
    if (cached) return cached;
  }
  
  const response = await $heroicHelper.fetch('api/data');
  $heroicHelper.setCache('data_key', response.data);
  return response.data;
}
```

### 4. File Upload with Preview

```html
<input type="file" id="avatar" @change="uploadAvatar">
```

```javascript
async uploadAvatar(event) {
  const file = event.target.files[0];
  
  if (file.size > 2 * 1024 * 1024) {
    $heroicHelper.toastr('File too large (max 2MB)', 'error');
    return;
  }
  
  try {
    const response = await $heroicHelper.post('api/upload/avatar', {
      avatar: file,
      user_id: this.userId
    });
    
    $heroicHelper.toastr('Avatar uploaded!');
    this.avatarUrl = response.data.url;
  } catch (error) {
    $heroicHelper.toastr('Upload failed', 'error');
  }
}
```

---

## Troubleshooting

### `$heroicHelper is not defined`

Pastikan script di-load **sebelum** Alpine.js:

```html
<!-- Correct order -->
<script src="/helper.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### CORS Error

Pastikan backend allow CORS untuk origin Anda:

```javascript
// Hono example
app.use('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

### Token tidak terkirim

Cek localStorage key sudah benar `heroic_token`:

```javascript
console.log(localStorage.getItem('heroic_token'));
```

---

## Changelog

### v1.0.0 (2026-01-14)
- ✅ Initial release
- ✅ Fetch API integration (no axios dependency)
- ✅ Auto-load Toastify from CDN
- ✅ Sync initialization ($heroicHelper immediately available)
- ✅ Alpine.js debug directive
- ✅ Complete cache, cookie, and formatting utilities
