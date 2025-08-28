import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { EmailService } from '../utils/emailService';
import SEOHead from './SEOHead';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'RFT',
    message: '',
    phone: ''
  });

  const faqs = [
    {
      question: "How many different types of multiphase flow meters (MPFM) exist in the market?",
      answer: "Multiple technologies are combined in unique ways to detect the physical properties of a multiphase mixture. By analyzing differences in dielectric constant, density, and spectroscopic response, the proportions of oil, water, and gas can be distinguished."
    },
    {
      question: "Which multiphase sensing technology is widely used in oil and gas upstream industry?",
      answer: "The most established technology for multiphase sensing relies on gamma radiation, with an estimated 90% of existing MPFMs incorporating it in some form."
    },
    {
      question: "What are the common shortcomings of gamma based multiphase flow meters?",
      answer: "Although gamma radiation is the most established technology for multiphase sensing, it poses significant safety risks. The radiation emitted from gamma sources is uncontrollable and, upon exposure, can cause irreversible damage to living cells. Due to these hazards, gamma sources are subject to stringent regulations throughout their lifecycle—from procurement to disposal. Consequently, the total cost of ownership of gamma-based MPFMs is estimated to be at least 40% higher than that of non-gamma alternatives."
    },
    {
      question: "What are the existing non-gamma technologies, being used in multiphase flow meters?",
      answer: "Achieving reliable multiphase measurements without using gamma radiation is highly desirable, both for enhanced safety and lower total cost of ownership. Currently, several alternative technologies—including capacitance, conductance, microwave resonance and transmission, signal cross-correlation, IR spectroscopy, ultrasonics, and low/high-frequency magnetics—are employed to perform non-gamma multiphase measurements."
    },
    {
      question: "What are the challenges in existing non-gamma multiphase technologies?",
      answer: "Non-gamma multiphase measurement has been an active area of research for several decades. However, several challenges have slowed the commercial adoption of these technologies. Key obstacles include non-linear and non-monotonic dielectric responses measured by both low-frequency (capacitance and conductance) and high-frequency (microwave) sensors. Additionally, IR spectroscopy is an intrusive sensing method, while ultrasonic techniques suffer from extreme signal dispersion in multiphase (liquid/gas) conditions."
    },
    {
      question: "What makes Saher's MPFM technology unique?",
      answer: "Saher's multiphase technology eliminates the use of chemical radiation, such as gamma rays. Instead, we employ a patented microwave DMOR design to measure the dielectric properties of multiphase mixtures at microwave frequencies. To address the challenge of non-linear and non-monotonic inverse measurements, Saher has developed a proprietary digital twin AI model that predicts complex multiphase behavior. This AI-driven model trains Saher's flow computer with minimal reliance on flow-loop calibration and is fully parametrized for water-liquid ratio (WLR), gas volume fraction (GVF), brine salinity, fluid temperature, and pressure. By integrating raw dielectric measurements with the insights from the digital twin AI, Saher's MPFM delivers highly reliable, real-time multiphase measurements."
    },
    {
      question: "Does Saher MPFM require calibration?",
      answer: "Like any sensor, Saher's MPFM requires on-field calibration. However, its digital twin AI model already accounts for most process variables that could impact performance. By feeding field data into the Saher flow computer, operators can obtain accurate multiphase measurements under any field conditions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const result = await EmailService.sendContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', department: '', message: '', phone: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset status after 5 seconds
  React.useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <>
      <SEOHead
        title="Contact Us | Get in Touch | Saher Flow Solutions"
        description="Contact Saher Flow Solutions in Thuwal, Saudi Arabia. Get expert consultation on multiphase flow measurement technology. Phone: +966 54 286 2009"
        keywords="contact Saher Flow, Thuwal Saudi Arabia, KAUST office, flow measurement consultation, oil gas technology support, multiphase flow meter contact"
        url="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Saher Flow Solutions",
          "description": "Get in touch with our team of flow measurement experts",
          "url": "https://saherflow.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Saher Flow Solutions",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "KAUST, Office 2112, Olayan Building 40",
              "addressLocality": "Thuwal",
              "postalCode": "23955",
              "addressCountry": "SA"
            },
            "telephone": "+966-54-286-2009",
            "email": "contact@saherflow.com"
          }
        }}
      />
    <section id="contact" className="py-24 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-800 dark:to-gray-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team of experts in Thuwal, Saudi Arabia
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-yellow-500 rounded-full">
                <HelpCircle className="w-6 h-6 text-navy-900" />
              </div>
              <h2 className="text-4xl font-bold text-navy-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our multiphase flow measurement technology
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-8 pb-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="pt-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div className="mt-12 text-center bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Can't find what you're looking for? Our technical experts are here to help.
              </p>
              <button
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="bg-yellow-500 text-navy-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div id="contact-form" className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">Send us a message</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="RFQ">Request For Quote</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent transition-colors duration-200 resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-navy-800 dark:hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-800 dark:text-green-400 font-medium">
                      ✅ Message sent successfully! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-800 dark:text-red-400 font-medium">
                      ❌ {errorMessage || 'There was an error sending your message. Please try again.'}
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <MapPin className="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Headquarters</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        King Abdullah University of Science and Technology (KAUST) Building 1, Office 2204 Thuwal 23955, Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Phone className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">+966 12 808 0900</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sun-Thu 8:00 AM - 5:00 PM GMT+3</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Mail className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">contact@saherflow.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-white mb-1">Business Hours</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Sunday - Thursday: 8:00 AM - 5:00 PM GMT+3<br />
                        Friday - Saturday: Emergency support only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.755308536956!2d39.10441331495915!3d22.30868398532059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b74c5c3db3%3A0x3d1c8b0a87d9ba2b!2sKing%20Abdullah%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2ssa!4v1735123456789!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location - KAUST, Thuwal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;