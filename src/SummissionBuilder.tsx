import React, { useState, useEffect } from 'react';

const SubmissionBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    quality_views: '',
    oversight_views: '',
    principles_concerns: [],
    mechanisms_feedback: '',
    board_views: '',
    powers_concerns: '',
    name: '',
    email: '',
    location: '',
    submission_type: 'personal' // or 'organisational'
  });

  useEffect(() => {
    const saved = localStorage.getItem('regulatorySubmission');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('regulatorySubmission', JSON.stringify(formData));
  }, [formData]);

  const principlesConcerns = [
    "The principles don't adequately reflect existing legal principles",
    "The focus on rights and liberties is too narrow",
    "Good law-making process principles need refinement",
    "Regulatory stewardship principles need strengthening",
    "Principles should be in secondary rather than primary legislation",
    "Additional principles should be included",
    "Other concerns (specify below)"
  ];

  const handlePrincipleToggle = (concern) => {
    setFormData(prev => ({
      ...prev,
      principles_concerns: prev.principles_concerns.includes(concern)
        ? prev.principles_concerns.filter(p => p !== concern)
        : [...prev.principles_concerns, concern]
    }));
  };

  const generatePreview = () => {
    return `SUBMISSION ON THE REGULATORY STANDARDS BILL

From: ${formData.name}
Email: ${formData.email}
Location: ${formData.location}
Submission type: ${formData.submission_type}

1. VIEWS ON QUALITY OF NEW ZEALAND'S REGULATION
${formData.quality_views}

2. VIEWS ON CURRENT REGULATORY OVERSIGHT ARRANGEMENTS
${formData.oversight_views}

3. CONCERNS ABOUT PROPOSED PRINCIPLES
${formData.principles_concerns.map(concern => `- ${concern}\n`).join('')}

4. FEEDBACK ON PROPOSED MECHANISMS
${formData.mechanisms_feedback}

5. VIEWS ON PROPOSED REGULATORY STANDARDS BOARD
${formData.board_views}

6. CONCERNS ABOUT NEW POWERS FOR MINISTRY FOR REGULATION
${formData.powers_concerns}`;
  };

  return (
    <div className="min-h-screen bg-white font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-4 mb-8">
          <h1 className="text-4xl font-bold mb-4">REGULATORY STANDARDS BILL SUBMISSION BUILDER</h1>
          <p className="bg-black text-white p-2">
            Build your submission responding to the proposed Regulatory Standards Bill. 
            Consultation closes January 13, 2025.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="border-4 border-black p-4 mb-8">
          <div className="flex justify-between">
            {[1,2,3,4,5].map(num => (
              <button 
                key={num}
                onClick={() => setStep(num)}
                className={`w-12 h-12 flex items-center justify-center border-4 border-black
                  ${step === num ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="border-4 border-black p-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">STEP 1: YOUR DETAILS</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border-4 border-black p-2 font-mono"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border-4 border-black p-2 font-mono"
              />
              <input
                type="text"
                placeholder="Location in New Zealand"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full border-4 border-black p-2 font-mono"
              />
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="submission_type"
                    value="personal"
                    checked={formData.submission_type === 'personal'}
                    onChange={(e) => setFormData({...formData, submission_type: e.target.value})}
                    className="mr-2"
                  />
                  Personal Submission
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="submission_type"
                    value="organisation"
                    checked={formData.submission_type === 'organisation'}
                    onChange={(e) => setFormData({...formData, submission_type: e.target.value})}
                    className="mr-2"
                  />
                  Organisation Submission
                </label>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-black text-white p-4 hover:bg-white hover:text-black border-4 border-black"
            >
              NEXT →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="border-4 border-black p-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">STEP 2: CURRENT REGULATION</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">What are your views on the quality of New Zealand's regulation?</label>
                <textarea
                  value={formData.quality_views}
                  onChange={(e) => setFormData({...formData, quality_views: e.target.value})}
                  className="w-full border-4 border-black p-2 h-32 font-mono"
                  placeholder="Consider: effectiveness, costs, benefits, impacts..."
                />
              </div>
              <div>
                <label className="block mb-2">What are your views on current regulatory oversight arrangements?</label>
                <textarea
                  value={formData.oversight_views}
                  onChange={(e) => setFormData({...formData, oversight_views: e.target.value})}
                  className="w-full border-4 border-black p-2 h-32 font-mono"
                  placeholder="Consider: RIS requirements, disclosure statements, monitoring..."
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => setStep(1)}
                className="bg-black text-white p-4 hover:bg-white hover:text-black border-4 border-black"
              >
                ← BACK
              </button>
              <button 
                onClick={() => setStep(3)}
                className="bg-black text-white p-4 hover:bg-white hover:text-black border-4 border-black"
              >
                NEXT →
              </button>
            </div>
          </div>
        )}

        {/* Additional steps omitted for brevity - would include principles feedback,
            mechanisms feedback, and board/powers concerns */}

        {step === 5 && (
          <div className="border-4 border-black p-4">
            <h2 className="text-2xl font-bold mb-4">PREVIEW SUBMISSION</h2>
            <pre className="whitespace-pre-wrap font-mono border-4 border-black p-4 mb-4">
              {generatePreview()}
            </pre>
            <div className="space-y-4">
              <p className="bg-black text-white p-2">
                1. Copy this text and submit through the{" "}
                <a 
                  href="https://www.parliament.nz/en/pb/sc/make-a-submission/" 
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  official consultation form
                </a>
              </p>
              <button 
                onClick={() => navigator.clipboard.writeText(generatePreview())}
                className="w-full bg-black text-white p-4 hover:bg-white hover:text-black border-4 border-black"
              >
                COPY TO CLIPBOARD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionBuilder;