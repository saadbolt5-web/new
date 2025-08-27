import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { MapPin, Briefcase, Clock, Users, Award, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Careers: React.FC = () => {
  const [state, handleSubmit] = useForm("xldwenjz"); // JobApplication - SFS endpoint
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    position: '',
    coverLetter: '',
    resume: null as File | null,
    phone: '',
    experience: '',
    location: ''
  });

  // Updated jobs for Saudi Arabia location
  const jobs = [
    {
      id: 'senior-flow-engineer',
      title: 'Senior Flow Measurement Engineer',
      location: 'Thuwal, Saudi Arabia',
      department: 'Engineering',
      type: 'Full-time',
      description: 'Lead development of next-generation multiphase flow meters at our KAUST-based headquarters. Join our team of innovators working on cutting-edge DMOR technology.',
      requirements: [
        '10+ years experience in flow measurement',
        'PhD in Chemical/Petroleum Engineering',
        'Experience with multiphase flow systems',
        'Strong analytical and problem-solving skills',
        'Proficiency in English and Arabic preferred'
      ],
      benefits: [
        'Competitive salary package aligned with Saudi Vision 2030',
        'Comprehensive health benefits (Medical, Dental, Vision)',
        'Annual performance bonus',
        'Professional development budget',
        'KAUST campus housing allowance',
        'Relocation assistance for international candidates'
      ]
    },
    {
      id: 'embedded-systems-engineer',
      title: 'Embedded Systems Engineer',
      location: 'Thuwal, Saudi Arabia',
      department: 'R&D',
      type: 'Full-time',
      description: 'Design and develop embedded systems for real-time sensor control and data acquisition. Work with state-of-the-art microwave sensing technology.',
      requirements: [
        '5+ years embedded systems development experience',
        'Proficiency in C/C++, Python, and hardware programming',
        'Experience with microcontrollers and RTOS',
        'Knowledge of signal processing and RF systems',
        'Bachelor\'s degree in Electronics or Computer Engineering'
      ],
      benefits: [
        'Cutting-edge technology environment',
        'Stock options and profit sharing',
        'Continuous learning and development opportunities',
        'Work visa and Iqama processing support',
        'Annual vacation and Hajj/Umrah leave',
        'Family health insurance coverage'
      ]
    },
    {
      id: 'field-service-technician',
      title: 'Field Service Technician - GCC Region',
      location: 'Thuwal, Saudi Arabia (Travel Required)',
      department: 'Operations',
      type: 'Full-time',
      description: 'Install, maintain, and support flow measurement systems at client locations across GCC countries. Represent Saher in the field.',
      requirements: [
        'Technical diploma in Instrumentation or equivalent',
        '3+ years oil & gas instrumentation experience',
        'Valid GCC driving license',
        'Willingness to travel extensively across Middle East',
        'Strong troubleshooting and communication skills',
        'Arabic and English proficiency required'
      ],
      benefits: [
        'Travel allowances and per diem',
        'International project experience',
        'Comprehensive technical training programs',
        'Career progression to senior technical roles',
        'Transportation and accommodation provided',
        'Hazard pay for offshore assignments'
      ]
    },
    {
      id: 'business-development-manager',
      title: 'Business Development Manager - MENA',
      location: 'Thuwal, Saudi Arabia / Remote',
      department: 'Sales',
      type: 'Full-time',
      description: 'Drive business growth across Middle East and North Africa region. Build relationships with NOCs, IOCs, and service companies.',
      requirements: [
        '8+ years business development in oil & gas',
        'Proven track record in technology sales',
        'Deep understanding of MENA energy markets',
        'Strong network within regional energy companies',
        'MBA or equivalent business qualification preferred',
        'Fluent in Arabic and English'
      ],
      benefits: [
        'Attractive commission structure',
        'Regional travel opportunities',
        'Flexible hybrid working arrangements',
        'Access to C-level executive networks',
        'Sales performance incentives',
        'Professional development budget'
      ]
    }
  ];

  const openApplication = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const closeApplication = () => {
    setSelectedJob(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit to Formspree using handleSubmit directly
    await handleSubmit(e);
  };

  // Reset form after successful submission
  React.useEffect(() => {
    if (state.succeeded) {
      setApplicationData({ 
        name: '', 
        email: '', 
        position: '', 
        coverLetter: '', 
        resume: null,
        phone: '',
        experience: '',
        location: ''
      });
    }
  }, [state.succeeded]);

  return (
    <>
      <SEOHead
        title="Careers | Join Our Team in Saudi Arabia | Saher Flow Solutions"
        description="Join Saher Flow Solutions team in Thuwal, Saudi Arabia. Exciting opportunities in flow measurement technology, engineering, and innovation. Be part of Vision 2030."
        keywords="careers Saudi Arabia, jobs Thuwal, KAUST jobs, flow measurement careers, engineering jobs Saudi Arabia, Vision 2030 jobs, oil gas careers, technology jobs KSA"
        url="/careers"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Multiple Positions Available",
          "description": "Join our innovative team developing cutting-edge flow measurement technology",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Saher Flow Solutions",
            "sameAs": "https://saherflow.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Thuwal",
              "addressRegion": "Makkah Province",
              "addressCountry": "SA"
            }
          },
          "employmentType": "FULL_TIME",
          "industry": "Oil and Gas Technology"
        }}
      />
    <section id="careers" className="py-24 dark:bg-gray-900 pt-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-800 dark:to-gray-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Build the future of flow measurement technology from our Thuwal, Saudi Arabia headquarters
          </p>
        </div>
      </div>

      {/* Culture & Values - Updated for Saudi context */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Why Work With Us in Saudi Arabia?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of Saudi Vision 2030 and help transform the Kingdom's energy sector with innovative measurement solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award size={48} />,
                title: 'Innovation Culture',
                description: 'Work on cutting-edge DMOR technology that shapes the global energy industry'
              },
              {
                icon: <Briefcase size={48} />,
                title: 'Career Growth',
                description: 'Clear advancement paths with mentorship from KAUST faculty and industry experts'
              },
              {
                icon: <Zap size={48} />,
                title: 'Vision 2030 Impact',
                description: 'Contribute to Saudi Arabia\'s economic diversification and technological advancement'
              },
              {
                icon: <MapPin size={48} />,
                title: 'Regional Influence',
                description: 'Projects across GCC and MENA region with global technology deployment'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg">
                <div className="text-yellow-500 mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join our growing team at KAUST and be part of the energy transformation in Saudi Arabia
            </p>
          </div>

          <div className="space-y-8">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-3">{job.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Briefcase size={16} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock size={16} />
                          <span>{job.type}</span>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          Saudi Arabia
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-shrink-0">
                      <button 
                        onClick={() => openApplication(job.id)}
                        className="bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 px-8 py-3 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-yellow-400 transition-colors duration-200"
                      >
                        Apply Now
                      </button>
                      <button 
                        onClick={() => setSelectedJob(job.id)}
                        className="border-2 border-navy-900 dark:border-yellow-500 text-navy-900 dark:text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-navy-900 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-navy-900 transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Benefits Section for Saudi Context */}
      <div className="py-16 bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-800 dark:to-gray-700 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Working in Saudi Arabia</h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience world-class benefits and lifestyle in the Kingdom
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-yellow-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin size={32} className="text-navy-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prime Location</h3>
              <p className="text-gray-300">Work from KAUST campus with world-class facilities and Red Sea views</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-yellow-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users size={32} className="text-navy-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diverse Community</h3>
              <p className="text-gray-300">Join international talent from 100+ countries in a multicultural environment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-yellow-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award size={32} className="text-navy-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tax-Free Income</h3>
              <p className="text-gray-300">Competitive salary packages with no personal income tax</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && !applicationData.position && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {(() => {
                const job = jobs.find(j => j.id === selectedJob);
                if (!job) return null;
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">{job.title}</h2>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.department}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-3">Job Description</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                              <span className="text-gray-600 dark:text-gray-300">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-3">Benefits & Compensation</h3>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                              <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-4 pt-6">
                        <button 
                          onClick={() => {
                            setApplicationData(prev => ({ 
                              ...prev, 
                              position: job.title 
                            }));
                            setSelectedJob(null);
                          }}
                          className="flex-1 bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 py-3 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-yellow-400 transition-colors duration-200"
                        >
                          Apply for this Position
                        </button>
                        <button 
                          onClick={() => setSelectedJob(null)}
                          className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {applicationData.position && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Apply for Position</h2>
                <button 
                  onClick={() => setApplicationData({ 
                    name: '', 
                    email: '', 
                    position: '', 
                    coverLetter: '', 
                    resume: null,
                    phone: '',
                    experience: '',
                    location: ''
                  })}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={submitApplication} className="space-y-6" >
                {/* Hidden fields for Formspree */}
                <input type="hidden" name="_subject" value={`Job Application: ${applicationData.position} - ${applicationData.name}`} />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={applicationData.name}
                      name="name"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your full name"
                      required
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      value={applicationData.email}
                      name="email"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@company.com"
                      required
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel"
                      value={applicationData.phone}
                      name="phone"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+966 XX XXX XXXX"
                    />
                    <ValidationError 
                      prefix="Phone" 
                      field="phone"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years of Experience
                    </label>
                    <input 
                      type="text"
                      value={applicationData.experience}
                      name="experience"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., 5+ years"
                    />
                    <ValidationError 
                      prefix="Experience" 
                      field="experience"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input 
                    type="text"
                    value={applicationData.position}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Location
                  </label>
                  <input 
                    type="text"
                    value={applicationData.location}
                    name="location"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="City, Country"
                  />
                  <ValidationError 
                    prefix="Location" 
                    field="location"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <textarea 
                    rows={6}
                    value={applicationData.coverLetter}
                    name="coverLetter"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell us why you're perfect for this role and your interest in working in Saudi Arabia..."
                    required
                  />
                  <ValidationError 
                    prefix="Cover Letter" 
                    field="coverLetter"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume/CV
                  </label>
                  <input 
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <ValidationError 
                    prefix="Resume" 
                    field="resume"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit"
                    disabled={state.submitting}
                    className="flex-1 bg-navy-900 dark:bg-yellow-500 text-white dark:text-navy-900 py-4 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setApplicationData({ 
                      name: '', 
                      email: '', 
                      position: '', 
                      coverLetter: '', 
                      resume: null,
                      phone: '',
                      experience: '',
                      location: ''
                    })}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
                
                {state.succeeded && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-800 dark:text-green-400 font-medium">
                      ✅ Application submitted successfully! We'll review your application and get back to you within 5 business days.
                    </p>
                  </div>
                )}
                
                {state.errors && state.errors.length > 0 && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-800 dark:text-red-400 font-medium">
                      ❌ There was an error submitting your application. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Careers;