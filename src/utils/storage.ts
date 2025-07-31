export const getStorageItem = <T>(key: string): T | null => {
  // Sunucu taraflı render (SSR) durumunda window objesi olmayacağı için kontrol
  if (typeof window === 'undefined') return null;
  
  // localStorage'dan veriyi oku
  const item = localStorage.getItem(key);
  
  // Veri varsa JSON.parse ile objeye çevir, yoksa null döndür
  return item ? JSON.parse(item) : null;
};

export const setStorageItem = <T>(key: string, value: T): void => {
  // Veriyi JSON string'ine çevirerek localStorage'a kaydet
  localStorage.setItem(key, JSON.stringify(value));
}; 