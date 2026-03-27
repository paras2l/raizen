import { LanguageCode, LocalizationMap } from './types';

export class UILocalizationManager {
  private bundles: Record<LanguageCode, LocalizationMap> = {
    'en': { 'btn_save': 'Save', 'btn_cancel': 'Cancel', 'msg_welcome': 'Welcome, Chief.' },
    'es': { 'btn_save': 'Guardar', 'btn_cancel': 'Cancelar', 'msg_welcome': 'Bienvenido, Jefe.' },
    'fr': { 'btn_save': 'Enregistrer', 'btn_cancel': 'Annuler', 'msg_welcome': 'Bienvenue, Chef.' },
    'hi': { 'btn_save': 'सहेजें', 'btn_cancel': 'रद्द करें', 'msg_welcome': 'स्वागत है, प्रधान।' },
    'ja': { 'btn_save': '保存', 'btn_cancel': 'キャンセル', 'msg_welcome': 'ようこそ、チーフ。' },
    'zh': { 'btn_save': '保存', 'btn_cancel': '取消', 'msg_welcome': '欢迎，长官。' },
    'de': { 'btn_save': 'Speichern', 'btn_cancel': 'Abbrechen', 'msg_welcome': 'Willkommen, Chef.' },
    'ru': { 'btn_save': 'Сохранить', 'btn_cancel': 'Отмена', 'msg_welcome': 'Добро пожаловать, Шеф.' }
  };

  getBundle(lang: LanguageCode): LocalizationMap {
    console.log(`[BABEL-UI] Loading localization bundle for: ${lang}`);
    return this.bundles[lang] || this.bundles['en'];
  }
}
