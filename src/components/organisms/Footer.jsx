import FooterModal from '../molecules/FooterModal';
import PrivacyPolicy from '../../pages/common/PrivacyPolicy';
import TermsOfService from '../../pages/common/TermsOfService';
import ContactUs from '../../pages/common/ContactUs';

export default function Footer() {
  const openModal = (id) => document.getElementById(id).showModal();

  return (
    <>
      <footer className="mt-auto border-t border-gray-200 py-4 bg-base-100">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} CollabSphere
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => openModal('privacy_modal')} className="text-gray-700 hover:underline">Privacy Policy</button>
            <button onClick={() => openModal('terms_modal')} className="text-gray-700 hover:underline">Terms of Service</button>
            <button onClick={() => openModal('contact_modal')} className="text-gray-700 hover:underline">Contact Us</button>
          </div>
        </div>
      </footer>

      <FooterModal title="Privacy Policy" modalId="privacy_modal">
        <PrivacyPolicy />
      </FooterModal>

      <FooterModal title="Terms of Service" modalId="terms_modal">
        <TermsOfService />
      </FooterModal>

      <FooterModal title="Contact Us" modalId="contact_modal">
        <ContactUs />
      </FooterModal>
    </>
  );
}
