import { useState } from 'react';
import { supabase } from '../../lib/supabase.js';

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    groupSize: ''
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
      setNotificationMessage('Please fill in all fields');
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
            is_coming: formData.attendance === 'yes',
            family_amount: parseInt(formData.groupSize)
          }
        ]);

      if (error) throw error;

      // Success notification
      setNotificationMessage('✓ RSVP submitted successfully!');
      setNotificationType('success');
      setShowNotification(true);
      
      // Reset form
      setFormData({
        name: '',
        attendance: '',
        groupSize: ''
      });

      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error submitting RSVP: ', error);
      setNotificationMessage('❌ Error submitting RSVP. Please try again.');
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
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-500 ${
          notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notificationMessage}
        </div>
      )}

      <div className="text-center z-10 max-w-md w-full mx-auto">
        <h1 className='text-3xl md:text-4xl font-light text-gray-300 mb-4 tracking-wider font-serif'>
          RSVP
        </h1>
        <p className="text-sm text-gray-300 mb-8 tracking-widest">
          Please confirm your attendance
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
          </div>

          {/* Attendance Field */}
          <div className="text-left">
            <label htmlFor="attendance" className="block text-sm font-medium text-gray-300 mb-2">
              Will you attend? *
            </label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all appearance-none cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="" className="bg-gray-800">Select an option</option>
              <option value="yes" className="bg-gray-800">Yes, I will attend</option>
              <option value="no" className="bg-gray-800">No, I cannot attend</option>
            </select>
          </div>

          {/* Group Size Field */}
          <div className="text-left">
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Guests *
            </label>
            <input
              type="number"
              id="groupSize"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 bg-white/10 border border-gray-300/30 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              placeholder="How many people?"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white/40 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-white/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;
