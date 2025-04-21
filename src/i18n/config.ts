
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "check_eligibility": "Check Eligibility",
      "personal_loan": "Personal Loan",
      "home_loan": "Home Loan",
      "business_loan": "Business Loan",
      "education_loan": "Education Loan",
      "select_language": "Select Language",
      "processing_time": "Processing Time",
      "loan_details": "Loan Details",
      "interest_rate": "Interest Rate",
      "max_loan_amount": "Max Loan Amount",
      "required_documents": "Required Documents",
      "apply_now": "Apply Now"
    }
  },
  hi: {
    translation: {
      "check_eligibility": "पात्रता की जाँच करें",
      "personal_loan": "व्यक्तिगत ऋण",
      "home_loan": "गृह ऋण",
      "business_loan": "व्यावसायिक ऋण",
      "education_loan": "शिक्षा ऋण",
      "select_language": "भाषा चुनें",
      "processing_time": "प्रोसेसिंग समय",
      "loan_details": "ऋण विवरण",
      "interest_rate": "ब्याज दर",
      "max_loan_amount": "अधिकतम ऋण राशि",
      "required_documents": "आवश्यक दस्तावेज़",
      "apply_now": "अभी आवेदन करें"
    }
  },
  ta: {
    translation: {
      "check_eligibility": "தகுதியை சரிபார்க்கவும்",
      "personal_loan": "தனிப்பட்ட கடன்",
      "home_loan": "வீட்டுக் கடன்",
      "business_loan": "வணிக கடன்",
      "education_loan": "கல்விக் கடன்",
      "select_language": "மொழியைத் தேர்ந்தெடுக்கவும்",
      "processing_time": "செயலாக்க நேரம்",
      "loan_details": "கடன் விவரங்கள்",
      "interest_rate": "வட்டி விகிதம்",
      "max_loan_amount": "அதிகபட்ச கடன் தொகை",
      "required_documents": "தேவையான ஆவணங்கள்",
      "apply_now": "இப்போது விண்ணப்பிக்கவும்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
