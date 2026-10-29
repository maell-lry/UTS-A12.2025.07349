
// Daftar harga promo produk
const daftarHarga = {
  "Maggot Segar":           { normal: 25000, promo: 20000 },
  "Maggot Kering":          { normal: 75000, promo: 60000 },
  "Kasgot (Pupuk Organik)": { normal: 8000,  promo: 6400 }
};

const form  = document.getElementById("formPesan");
const hasil = document.getElementById("hasil");

function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// supaya teks yang diketik pengguna tidak dibaca sebagai kode HTML
function aman(teks) {
  const div = document.createElement("div");
  div.textContent = teks;
  return div.innerHTML;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();   // cegah halaman reload

  // --- ambil nilai dari setiap inputan ---
  const nama   = document.getElementById("fnama").value.trim();
  const email  = document.getElementById("femail").value.trim();
  const hp     = document.getElementById("fhp").value.trim();
  const alamat = document.getElementById("falamat").value.trim();

  // radio: ambil yang sedang terpilih
  const jenis = document.querySelector('input[name="jenis"]:checked').value;

  // dropdown berat
  const pilihBerat = document.getElementById("fberat");
  const beratGram  = Number(pilihBerat.value);
  const beratTeks  = pilihBerat.options[pilihBerat.selectedIndex].text;

  const jumlah = Number(document.getElementById("fjumlah").value);

  // dropdown bonus (boleh tidak dipilih)
  const pilihBonus = document.getElementById("fbonus");
  const bonus = pilihBonus.value === ""
    ? "Tanpa bonus"
    : pilihBonus.options[pilihBonus.selectedIndex].text;

  // --- validasi sederhana nomor HP ---
  if (!/^(\+62|62|0)8\d{8,11}$/.test(hp.replace(/[\s-]/g, ""))) {
    alert("Nomor HP tidak valid. Contoh: 081234567890");
    document.getElementById("fhp").focus();
    return;
  }

  // --- hitung harga ---
  const beratKg = beratGram / 1000;
  const harga   = daftarHarga[jenis];
  const total   = Math.round(harga.promo  * beratKg * jumlah);
  const normal  = Math.round(harga.normal * beratKg * jumlah);
  const hemat   = normal - total;

  // --- tampilan hasil ---
  hasil.innerHTML = `
    <h5>Terima kasih, ${aman(nama)}! Pesananmu sudah tercatat.</h5>
    <ul class="mb-3">
      <li>Email: ${aman(email)}</li>
      <li>No. HP: ${aman(hp)}</li>
      <li>Alamat: ${aman(alamat).replace(/\n/g, "<br>")}</li>
      <li>Produk: ${jenis}, ${beratTeks} x ${jumlah}</li>
      <li>Bonus: ${bonus}</li>
    </ul>
    <p class="mb-1">Harga normal: <del>${rupiah(normal)}</del></p>
    <p class="mb-1">Hemat: ${rupiah(hemat)}</p>
    <p class="fs-5 fw-bold mb-0">Total bayar: ${rupiah(total)}</p>
  `;

  hasil.classList.remove("d-none");   // muemunculkan kotak hasil
  hasil.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", function () {
  hasil.classList.add("d-none");
});