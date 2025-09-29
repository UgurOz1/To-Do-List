// Firebase hata kodlarını Türkçe mesajlara çeviren yardımcı fonksiyon
export const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
        // Authentication hataları
        'auth/user-not-found': 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.',
        'auth/wrong-password': 'Girdiğiniz şifre hatalı.',
        'auth/invalid-email': 'Geçersiz e-posta adresi formatı.',
        'auth/user-disabled': 'Bu hesap devre dışı bırakılmış.',
        'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda.',
        'auth/weak-password': 'Şifre çok zayıf. En az 6 karakter olmalı.',
        'auth/operation-not-allowed': 'Bu işlem şu anda izin verilmiyor.',
        'auth/invalid-credential': 'Geçersiz giriş bilgileri.',
        'auth/too-many-requests': 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.',
        'auth/network-request-failed': 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.',
        'auth/requires-recent-login': 'Bu işlem için yeniden giriş yapmanız gerekiyor.',
        'auth/invalid-login-credentials': 'E-posta veya şifre hatalı.',

        // Firestore hataları
        'permission-denied': 'Bu işlem için yetkiniz bulunmuyor.',
        'unavailable': 'Servis şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
        'not-found': 'İstenen veri bulunamadı.',
        'already-exists': 'Bu veri zaten mevcut.',
        'resource-exhausted': 'Kaynak limiti aşıldı.',
        'failed-precondition': 'İşlem için gerekli koşullar sağlanmadı.',
        'aborted': 'İşlem iptal edildi.',
        'out-of-range': 'Geçersiz değer aralığı.',
        'unimplemented': 'Bu özellik henüz desteklenmiyor.',
        'internal': 'Sunucu hatası oluştu.',
        'deadline-exceeded': 'İşlem zaman aşımına uğradı.',
        'cancelled': 'İşlem iptal edildi.',
        'invalid-argument': 'Geçersiz parametre.',
        'unauthenticated': 'Giriş yapmanız gerekiyor.',
    };

    return errorMessages[errorCode] || 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
};

// Firebase hata objesinden mesaj çıkaran fonksiyon
export const extractErrorMessage = (error: any): string => {
    if (error?.code) {
        return getErrorMessage(error.code);
    }

    if (error?.message) {
        // Firebase'den gelen İngilizce mesajları kontrol et
        const message = error.message.toLowerCase();

        if (message.includes('user not found') || message.includes('no user record')) {
            return 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
        }

        if (message.includes('wrong password') || message.includes('invalid password')) {
            return 'Girdiğiniz şifre hatalı.';
        }

        if (message.includes('invalid email')) {
            return 'Geçersiz e-posta adresi formatı.';
        }

        if (message.includes('email already in use')) {
            return 'Bu e-posta adresi zaten kullanımda.';
        }

        if (message.includes('weak password')) {
            return 'Şifre çok zayıf. En az 6 karakter olmalı.';
        }

        if (message.includes('too many requests')) {
            return 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
        }

        if (message.includes('network')) {
            return 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.';
        }
    }

    return 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
};