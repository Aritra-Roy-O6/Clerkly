import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

// --- Boilerplate Templates ---
// In a real app, these would be more complex and could be fetched from a server.
const boilerplates = {
  legalNotice: (data) => [
    new Paragraph({ text: "LEGAL NOTICE", heading: "Heading1", alignment: "center" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "To," }),
    new Paragraph({ text: data.opponentName || "[Opponent Name]" }),
    new Paragraph({ text: data.opponentAddress || "[Opponent Address]" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: `Sir,` }),
    new Paragraph({ text: "" }),
    new Paragraph({
      children: [
        new TextRun({ text: "Under the instructions from and on behalf of my client " }),
        new TextRun({ text: data.clientName || "[Client Name]", bold: true }),
        new TextRun({ text: ", I do hereby serve you with the following Legal Notice:" }),
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: `1. That the facts of the case are briefly that ${data.caseDetails || "[Details of the Case]"}.` }),
    new Paragraph({ text: `2. That you are hereby called upon to provide the following relief: ${data.reliefSought || "[Relief Sought]"}.`}),
    new Paragraph({ text: "3. That a copy of this notice is kept in my office for record and further necessary action." }),
  ],
  bailApplication: (data) => [
    new Paragraph({ text: "IN THE COURT OF THE SESSIONS JUDGE", heading: "Heading1", alignment: "center" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "BAIL APPLICATION NO. ______ OF 2025" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "IN THE MATTER OF:" }),
    new Paragraph({ text: `${data.clientName || "[Client Name]"} ...APPLICANT` }),
    new Paragraph({ text: "VERSUS" }),
    new Paragraph({ text: "STATE ...RESPONDENT" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "APPLICATION FOR GRANT OF BAIL", heading: "Heading2", alignment: "center" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "The applicant most respectfully submits as under:" }),
    new Paragraph({ text: `1. That the applicant is innocent and has been falsely implicated based on the following facts: ${data.caseDetails || "[Details of the Case]"}.` }),
    new Paragraph({ text: "2. That the applicant undertakes to abide by the conditions imposed by this Hon'ble Court." }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "It is, therefore, most respectfully prayed that this Hon'ble Court may be pleased to grant bail to the applicant." }),
  ]
};

// --- Main Drafter Page Component ---
function DrafterPage() {
  const [showModal, setShowModal] = useState(false);
  const [docType, setDocType] = useState('legalNotice');
  const [formData, setFormData] = useState({
    clientName: '',
    opponentName: '',
    opponentAddress: '',
    caseDetails: '',
    reliefSought: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateAndDownload = () => {
    if (!formData.clientName || !formData.caseDetails) {
        alert('Please fill in at least the Client Name and Case Details.');
        return;
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: boilerplates[docType](formData),
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${docType}-${Date.now()}.docx`);
      console.log("Document created successfully");
    });

    setShowModal(false); // Close modal after download
  };


  return (
    <div className="container-fluid">
      <div className="text-center" style={{ paddingTop: '10vh' }}>
        <h1 className="font-serif display-4 fw-bold">Drafter AI</h1>
        <p className="fs-5 text-secondary mx-auto" style={{ maxWidth: '600px' }}>
          Generate complex legal documents in seconds. Select a document type, fill in the key details, and let our AI do the rest.
        </p>
        <button
          className="btn btn-clerkly btn-clerkly-lg rounded-pill shadow-lg mt-4"
          onClick={() => setShowModal(true)}
        >
          Create New Draft
        </button>

        <div className="mt-5 mx-auto text-start" style={{ maxWidth: '700px' }}>
            <h5 className="font-serif">How It Works:</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>1. Select Template:</strong> Choose from a list of pre-defined legal document templates.</li>
                <li className="list-group-item"><strong>2. Fill Details:</strong> Provide the key information about your case in the simple form.</li>
                <li className="list-group-item"><strong>3. Generate & Download:</strong> Instantly generate a formatted .docx file ready for review and use.</li>
            </ul>
        </div>
      </div>

      {/* --- The Modal --- */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-serif">Create a New Document</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Document Type</label>
                  <select className="form-select" value={docType} onChange={(e) => setDocType(e.target.value)}>
                    <option value="legalNotice">Legal Notice</option>
                    <option value="bailApplication">Bail Application</option>
                  </select>
                </div>
                <hr />
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Client Name</label>
                        <input type="text" className="form-control" name="clientName" value={formData.clientName} onChange={handleInputChange} />
                    </div>
                     <div className="col-md-6">
                        <label className="form-label">Opponent Name</label>
                        <input type="text" className="form-control" name="opponentName" value={formData.opponentName} onChange={handleInputChange} />
                    </div>
                     <div className="col-12">
                        <label className="form-label">Opponent Address</label>
                        <input type="text" className="form-control" name="opponentAddress" value={formData.opponentAddress} onChange={handleInputChange} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Case Details</label>
                        <textarea className="form-control" name="caseDetails" rows="4" value={formData.caseDetails} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Relief Sought</label>
                        <input type="text" className="form-control" name="reliefSought" value={formData.reliefSought} onChange={handleInputChange} />
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-clerkly" onClick={handleGenerateAndDownload}>Generate & Download</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default DrafterPage;

