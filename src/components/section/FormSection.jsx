import { useState } from 'react';
import { supabase } from '../../lib/supabase.js';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import { motion } from 'framer-motion';

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    groupSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.attendance || !formData.groupSize) {
      setNotificationMessage('Mohon lengkapi seluruh data yang diperlukan.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into Supabase
      const { data, error } = await supabase
        .from('rsvp')
        .insert([
          {
            name: formData.name,
            message: formData.message,
            is_coming: formData.attendance === 'yes',
            family_amount: parseInt(formData.groupSize)
          }
        ]);

      if (error) throw error;

      // Success notification
      setNotificationMessage('✓ Konfirmasi kehadiran telah kami terima. Terima kasih.');
      setNotificationType('success');
      setShowNotification(true);
      
      // Reset form
      setFormData({
        name: '',
        message: '',
        attendance: '',
        groupSize: ''
      });

      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error submitting RSVP: ', error);
      setNotificationMessage('❌ Mohon maaf, konfirmasi belum terkirim. Silakan coba kembali.');
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center py-12 px-4 relative">
      {/* Toast Notification */}
      {showNotification && (
        <motion.div 
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
            notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {notificationMessage}
        </motion.div>
      )}

      <div className="text-center z-10 max-w-md w-full mx-auto">
        <AnimatedSection variant="fadeInDown" delay={0.1}>
          <h1 className='text-3xl md:text-4xl font-light text-gray-300 mb-4 tracking-wider font-serif'>
            Konfirmasi Kehadiran
          </h1>
          <p className="text-sm text-gray-300 mb-8 tracking-widest">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kedua mempelai
          </p>
        </AnimatedSection>

        <StaggerContainer staggerDelay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <StaggerItem variant="fadeInUp">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nama *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Tuliskan nama Anda"
                  disabled={isSubmitting}
                />
              </div>
            </StaggerItem>

            {/* Attendance Field */}
            <StaggerItem variant="fadeInUp">
              <div className="text-left">
                <label htmlFor="attendance" className="block text-sm font-medium text-gray-300 mb-2">
                  Konfirmasi Kehadiran *
                </label>
                <select
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all appearance-none cursor-pointer"
                  disabled={isSubmitting}
                >
                  <option value="" className="bg-gray-800">Pilih jawaban</option>
                  <option value="yes" className="bg-gray-800">Insyaallah hadir</option>
                  <option value="no" className="bg-gray-800">Mohon maaf, belum dapat hadir</option>
                </select>
              </div>
            </StaggerItem>

            {/* Group Size Field */}
            <StaggerItem variant="fadeInUp">
              <div className="text-left">
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-300 mb-2">
                  Jumlah Tamu *
                </label>
                <input
                  type="number"
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Jumlah yang akan hadir"
                  disabled={isSubmitting}
                />
              </div>
            </StaggerItem>

            <StaggerItem variant="fadeInUp">
              <div className="text-left">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Ucapan & Doa
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all resize-none"
                  placeholder="Tulis doa dan ucapan terbaik"
                  disabled={isSubmitting}
                />
              </div>
            </StaggerItem>

            {/* Submit Button */}
            <StaggerItem variant="fadeInUp">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white/40 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-white/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </motion.button>
            </StaggerItem>
          </form>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FormSection;
